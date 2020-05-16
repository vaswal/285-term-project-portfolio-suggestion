import {GET_FULL_HISTORY, GET_STOCK_SUGGESTION, GET_PORTFOLIO_INFO, GET_STOCK_TREND} from "../../redux/constants/actionTypes";

const initialState = {
    fullHistory: [],
    stockSuggestions: [],
    portfolioInfo: [],
    stocks: [],
    portfolioValue: 0,
    signinSuccess: null,
    signinMessage: null,
    historicalData: [],
    dateStockPriceList: [],
    token: null,
    userId: null,
    userActive: null
};

const getMoneyDivision = (suggestions) => {
    const money = 5000;

    const totalSumPriorityScore = suggestions
        .map(suggestion => suggestion.sumPriorityScore)
        .reduce((prev, curr) => prev + curr, 0);

    const stocks = new Set();
    const ans = {};
    ans.suggestions = suggestions
    ans.division = [];

    suggestions.forEach(suggestion => {
        const division = {};
        division.stock = [];

        const strategyMoney = money * suggestion.sumPriorityScore / totalSumPriorityScore;
        division.name = suggestion.strategy;
        division.money = strategyMoney;

        suggestion.stock.forEach(stock => {
            const stockMoney = strategyMoney * (stock.priorityScore / suggestion.sumPriorityScore);
            division.stock.push({ticker: stock.ticker, stockMoney: stockMoney, units: stockMoney / stock.stockPrice});

            stocks.add(stock.ticker);
        })

        ans.division.push(division);
    });

    console.log("ans")
    console.log(ans)

    return [ans, Array.from(stocks)];
}

const getPortfolioValue = (dataWithDivision) => {
    const stockPriceMap = new Map()
    dataWithDivision.suggestions.forEach(suggestion => {
        suggestion.stock.forEach(s => {
            stockPriceMap.set(s.ticker, s.stockPrice);
        })
    });

    let sum = 0;
    dataWithDivision.division.forEach(divE => {
        divE.stock.forEach(s => {
            sum += s.units * stockPriceMap.get(s.ticker);
            console.log("sum: " + sum)
        })
    });

    console.log("sum: " + sum)
    return sum
}


const generateGraph = (historicalData) => {
    let stockUnitList = [];
    const dataWithDivision = localStorage.getItem("dataWithDivision") !== null ? JSON.parse(localStorage.getItem("dataWithDivision")): [];
    dataWithDivision.division.forEach(divE => {
        console.log("divE")
        console.log(divE)
        stockUnitList = [...stockUnitList, ...divE.stock]
    });
    console.log("stockUnitList")
    console.log(stockUnitList)
    const stockUnitMap = new Map(stockUnitList.map(i => [i.ticker, i.units]));

    let dateStockPriceMap = new Map();

    historicalData.forEach(stockData => {
        const ticker = stockData.symbol
        stockData.historical.forEach(dailyData => {
            const date = dailyData.date;
            if (dateStockPriceMap.has(date)) {
                const dailyPortfolioValue = dateStockPriceMap.get(date);
                dateStockPriceMap.set(date, dailyPortfolioValue + stockUnitMap.get(ticker) * dailyData.close);
            } else {
                dateStockPriceMap.set(date, stockUnitMap.get(ticker) * dailyData.close);
            }
        })
    })

    console.log("dateStockPriceMap")
    console.log(dateStockPriceMap)

    return dateStockPriceMap;
}

const mapToObj = (map) => {
    let obj = {}
    map.forEach(function(v, k){
        obj[k] = v
    })
    return obj
}


export default function stockReducer(state = initialState, action) {
    console.log("stockReducer reducer:");
    console.log(action.payload);

    if (action.type === GET_FULL_HISTORY) {
        return Object.assign({}, state, {
            fullHistory: [...state.fullHistory, action.payload],
        });
    } else if (action.type === GET_STOCK_SUGGESTION) {
        const dataWithDivision = getMoneyDivision(action.payload);
        const portfolioValueAndStocks = getPortfolioValue(dataWithDivision[0])

        localStorage.setItem("portfolioStockList", JSON.stringify(dataWithDivision[1]));
        localStorage.setItem("dataWithDivision", JSON.stringify(dataWithDivision[0]));

        return Object.assign({}, state, {
            stockSuggestions: dataWithDivision[0], portfolioValue: portfolioValueAndStocks, stocks: dataWithDivision[1]
        });
    } else if (action.type === GET_PORTFOLIO_INFO) {
        return Object.assign({}, state, {
            portfolioInfo: action.payload,
        });
    } else if (action.type === GET_STOCK_TREND) {
        const historicalData = [...state.historicalData, ...action.payload.historicalStockList];
        const generatedMap = generateGraph(historicalData);

        console.log("generatedMap")
        console.log(generatedMap)

        console.log("JSON.stringify(generatedMap)")
        console.log(JSON.stringify(mapToObj(generatedMap)))

        let res = [];
        generatedMap.forEach(function(val, key) {
            res.push({ label: key, y: Math.trunc(val) });
        });

        console.log("res")
        console.log(res)


        return Object.assign({}, state, {
            dateStockPriceList: res.reverse(), historicalData: historicalData
        });
    }

    return state;
}