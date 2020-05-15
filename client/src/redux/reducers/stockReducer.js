import {GET_FULL_HISTORY, GET_STOCK_SUGGESTION, SIGN_UP} from "../../redux/constants/actionTypes";

const initialState = {
    fullHistory: [],
    stockSuggestions: [],
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

    suggestions.division = [];

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

        suggestions.division.push(division);
    });

    console.log("suggestions")
    console.log(suggestions)

    return suggestions;

}

export default function stockReducer(state = initialState, action) {
    console.log("signin auth reducer:");
    console.log(action.payload);

    if (action.type === GET_FULL_HISTORY) {
        return Object.assign({}, state, {
            fullHistory: [...state.fullHistory, action.payload],
        });
    } else if (action.type === GET_STOCK_SUGGESTION) {
        return Object.assign({}, state, {
            stockSuggestions: getMoneyDivision(action.payload)
        });
    }
    if (action.type === SIGN_UP) {
        return Object.assign({}, state, {
            signupSuccess: action.payload.id !== null ? true : false,
            signupMessage: "",
        });
    }

    return state;
}