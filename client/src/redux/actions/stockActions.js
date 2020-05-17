import {GET_FULL_HISTORY, GET_STOCK_SUGGESTION, GET_PORTFOLIO_INFO, GET_STOCK_TREND, GET_MAJOR_INDEX_DATA, GET_PORTFOLIO_VALUE} from "../../redux/constants/actionTypes";
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

export function getStockTrend(payload) {
    console.log("getPortfolioInfo payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${payload.stockList}?timeseries=15`)
            .then((response) => dispatch(getStockTrendDispatch(response.data)));
    }
}

export const getStockTrendDispatch = (returnData) => {
    console.log("Inside getPortfolioInfoDispatch");
    console.log(returnData);

    return {type: GET_STOCK_TREND, payload: returnData}
};

export function getPortfolioValue(payload) {
    console.log("getPortfolioValue payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`https://financialmodelingprep.com/api/v3/quote/${payload.stockList}`)
            .then((response) => dispatch(getPortfolioValueDispatch({responseData: response.data, stockSuggestions: payload.stockSuggestions})));
    }
}

export const getPortfolioValueDispatch = (returnData) => {
    console.log("Inside getPortfolioValueDispatch");
    console.log(returnData);

    return {type: GET_PORTFOLIO_VALUE, payload: returnData}
};

export function getMajorIndicesData() {
    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:5000/major_indexes`)
            .then((response) => dispatch(getMajorIndicesDispatch({
                indexData: response.data
            })));
    }
}

export const getMajorIndicesDispatch = (returnData) => {
    return {type: GET_MAJOR_INDEX_DATA, payload: returnData}
};

