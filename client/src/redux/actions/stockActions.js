import {GET_FULL_HISTORY, SIGN_IN_ERROR, SIGN_UP} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

export function getFullHistory(payload) {
    console.log("getFullHistory payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:5000/fullHistory/${payload.ticker}`)
            .then((response) => dispatch(getFullHistoryDispatch({ticker: payload.ticker, historicalData: response.data.historical})));
    }
}

export const getFullHistoryDispatch = (returnData) => {
    console.log("Inside getFullHistoryDispatch");
    console.log(returnData);

    return {type: GET_FULL_HISTORY, payload: returnData}
};