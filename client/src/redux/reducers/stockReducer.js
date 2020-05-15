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

export default function stockReducer(state = initialState, action) {
    console.log("signin auth reducer:");
    console.log(action.payload);

    if (action.type === GET_FULL_HISTORY) {
        return Object.assign({}, state, {
            fullHistory: [...state.fullHistory, action.payload],
        });
    } else if (action.type === GET_STOCK_SUGGESTION) {
        return Object.assign({}, state, {
            stockSuggestions: action.payload,
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