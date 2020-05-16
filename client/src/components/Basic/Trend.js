import React, {Component} from 'react';
import AreaChart from "../Chart/AreaChart";
import axios from 'axios';
import {connect} from "react-redux";
import {getStockTrend,} from "../../redux/actions/stockActions";
import CanvasJSReact from '../../lib/canvasjs.react';

function mapStateToProps(store) {
    return {
        dateStockPriceList: store.stocks.dateStockPriceList,
        historicalData: store.stocks.historicalData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStockTrend: (payload) => dispatch(getStockTrend(payload)),
    };
}

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historicalData: [],
        }
    }

    componentDidMount() {
        const portfolioStockList = localStorage.getItem("portfolioStockList");

        if (portfolioStockList === null) return;

        const firstThree = Array.prototype.join.call(JSON.parse(portfolioStockList).slice(0,3),",");
        const lastThree = Array.prototype.join.call(JSON.parse(portfolioStockList).slice(3,6),",");

        this.props.getStockTrend({stockList: firstThree})
        this.props.getStockTrend({stockList: lastThree})
    }

        generateGraph() {
            console.log("this.props.dateStockPriceList")
            console.log(this.props.dateStockPriceList)
        }

    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }


    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{
                type: "column",
                dataPoints: this.props.dateStockPriceList
            }]
        }

        return (
            <div>
                <h1>Trend</h1>

                {this.generateGraph()}

                {/*<CanvasJSChart options={options}/>*/}
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trend);