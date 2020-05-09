
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"
import axios from 'axios';

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: [],
        // }
    }

    componentDidMount() {
        // getData().then(data => {
        //     this.setState({ data })
        // })

        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.ticker}`)
            .then(data => data.data.historical)
            .then((data) => {
                //console.log("Axios response")
                //console.log(data)

                for (let i = 0;  i < data.length; i++) {
                    //console.log("data[i]")
                    let parts = data[i].date.match(/(\d+)/g);
                    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
                    //return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
                    data[i].date = new Date(parts[0], parts[1] - 1, parts[2])
                    //console.log(data[i].date)
                }
                //this.setState({data: response})
                this.setState({ data })
            });
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }

        if (this.state.data !== null) {
            //console.log("State data")
            //console.log(this.state.data)
        }
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}

export default ChartComponent;
