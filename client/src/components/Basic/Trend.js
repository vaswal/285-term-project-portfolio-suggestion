import React, {Component} from 'react';
import ChartComponent from "../Chart/AreaChart";
import axios from 'axios';
import {connect} from "react-redux";

function mapStateToProps(store) {
    return {
        stocks: store.stocks.stocks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToBuyPage: null,
        }
    }



    componentDidMount() {
        const portfolioStockList = localStorage.getItem("portfolioStockList");

        if (portfolioStockList === null) return;

        const firstThree = Array.prototype.join.call(JSON.parse(portfolioStockList).slice(0,3),",");

        console.log("firstThree: " + firstThree)
        //
        console.log("Trend")

        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${firstThree}?timeseries=5`)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Trend</h1>

                <ChartComponent ticker="ALB"/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trend);