
import React, { Component }  from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
 import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import {connect} from "react-redux";
import axios from "axios";
import {HOSTNAME} from "../../../constants/appConstants";

class ChartComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const payload = {};
        payload.ticker = this.props.ticker;

        //axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.ticker}`)
        axios.get(`http://${HOSTNAME}:5000/fullHistory/${this.props.ticker}`)
            .then(data => data.data.historical)
            .then((data) => {
                for (let i = 0;  i < data.length; i++) {
                    let parts = data[i].date.match(/(\d+)/g);
                    data[i].date = new Date(parts[0], parts[1] - 1, parts[2])
                    //console.log("data[i]")
                    //console.log(data[i])
                }

                this.setState({ data })
            });
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }

        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}

export default ChartComponent;
