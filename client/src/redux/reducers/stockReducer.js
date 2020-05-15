import {GET_FULL_HISTORY, GET_STOCK_SUGGESTION, GET_PORTFOLIO_INFO} from "../../redux/constants/actionTypes";

const initialState = {
    fullHistory: [],
    stockSuggestions: [],
    portfolioInfo: [],
    portfolioValue: 0,
    signinSuccess: null,
    signinMessage: null,
    userType: null,
    token: null,
    userId: null,
    userActive: null
};

const getMoneyDivision = (suggestions) => {
    const money = 5000;

    const totalSumPriorityScore = suggestions
        .map(suggestion => suggestion.sumPriorityScore)
        .reduce((prev, curr) => prev + curr, 0);

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
        })

        ans.division.push(division);
    });

    console.log("ans")
    console.log(ans)

    return ans;
}

const getPortfolioValue = (dataWithDivision) => {
    //dataWithDivision.suggestions.forEach()
    //const stockPrice = dataWithDivision.suggestions.map(suggestion => suggestion.stock).reduce((a, b) => [...a, ...b], []);

    const stockPriceMap = new Map()
    dataWithDivision.suggestions.forEach(suggestion => {
        suggestion.stock.forEach(s => {
            stockPriceMap.set(s.ticker, s.stockPrice);
        })
    });

    const stockDivision = dataWithDivision.division.map(divE => divE.stock.units * stockPriceMap.get(divE.ticker));

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

export default function stockReducer(state = initialState, action) {
    console.log("stockReducer reducer:");
    console.log(action.payload);

    if (action.type === GET_FULL_HISTORY) {
        return Object.assign({}, state, {
            fullHistory: [...state.fullHistory, action.payload],
        });
    } else if (action.type === GET_STOCK_SUGGESTION) {
        const dataWithDivision = getMoneyDivision(action.payload);

        return Object.assign({}, state, {
            stockSuggestions: dataWithDivision, portfolioValue: getPortfolioValue(dataWithDivision)
        });
    }
    if (action.type === GET_PORTFOLIO_INFO) {
        return Object.assign({}, state, {
            portfolioInfo: action.payload,
        });
    }

    return state;
}