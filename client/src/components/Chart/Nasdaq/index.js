
import React from 'react';
import Chart from './Chart';
// import { getData } from "./util"
import axios from "axios";
import {HOSTNAME} from "../../../constants/appConstants";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {

	constructor(props) {
        super(props);
	}
	
	componentDidMount() {
		
		// axios.get(`http://${HOSTNAME}:5000/fullHistory/AAPL`)
		axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/index/%5EIXIC?apikey=762458844e8f364cfb45d465a2e556e6`)
                .then(data => data.data.historical.reverse())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        let parts = data[i].date.match(/(\d+)/g);
                        data[i].date = new Date(parts[0], parts[1] - 1, parts[2])
                        //console.log("data[i]")
                        //console.log(data[i])
                    }

                    this.setState({data})
                });
		// getData().then(data => {
		// 	this.setState({ data })
		// })
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