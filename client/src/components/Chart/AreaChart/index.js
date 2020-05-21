import React, {Component} from 'react';
import Chart from './Chart';

import {TypeChooser} from "react-stockcharts/lib/helper";
import axios from "axios";
import {HOSTNAME} from "../../../constants/appConstants";

class ChartComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.ticker) {
            const payload = {};
            payload.ticker = this.props.ticker;

            //axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.ticker}`)
            axios.get(`http://${HOSTNAME}:5000/fullHistory/${this.props.ticker}?apikey=762458844e8f364cfb45d465a2e556e6`)
                .then(data => data.data.historical)
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        let parts = data[i].date.match(/(\d+)/g);
                        data[i].date = new Date(parts[0], parts[1] - 1, parts[2])
                        //console.log("data[i]")
                        //console.log(data[i])
                    }

                    this.setState({data})
                });
        } else {
            console.log("this.props.data")
            console.log(this.props.data)

            this.setState({data: this.props.data})
        }
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }

        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data}/>}
            </TypeChooser>
        )
    }
}

export default ChartComponent;
