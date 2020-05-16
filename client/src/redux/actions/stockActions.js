import {GET_FULL_HISTORY, GET_STOCK_SUGGESTION, GET_PORTFOLIO_INFO} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

export function getFullHistory(payload) {
    console.log("getFullHistory payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:5000/fullHistory/${payload.ticker}`)
            .then((response) => dispatch(getFullHistoryDispatch({
                ticker: payload.ticker,
                historicalData: response.data.historical
            })));
    }
}

export const getFullHistoryDispatch = (returnData) => {
    console.log("Inside getFullHistoryDispatch");
    console.log(returnData);

    return {type: GET_FULL_HISTORY, payload: returnData}
};

export function getStockSuggestion(payload) {
    console.log("getStockSuggestion payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:5000/stock_suggestion`, payload)
            .then((response) => dispatch(getStockSuggestionDispatch(response.data)));
    }
}

export const getStockSuggestionDispatch = (returnData) => {
    console.log("Inside getStockSuggestionDispatch");
    console.log(returnData);

    return {type: GET_STOCK_SUGGESTION, payload: returnData}
};

export function getPortfolioInfo(payload) {
    console.log("getPortfolioInfo payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:5000/portfolio_info`, payload)
            .then((response) => dispatch(getPortfolioInfoDispatch(response.data)));
    }
}

export const getPortfolioInfoDispatch = (returnData) => {
    console.log("Inside getPortfolioInfoDispatch");
    console.log(returnData);

    return {type: GET_PORTFOLIO_INFO, payload: returnData}
};



