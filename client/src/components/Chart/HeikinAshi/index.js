import React, {Component} from 'react';
import Chart from './Chart';
import axios from 'axios';
import {connect} from "react-redux";
import {getFullHistory,} from "../../../redux/actions/stockActions";
import {TypeChooser} from "react-stockcharts/lib/helper";
import {HOSTNAME} from "../../../constants/appConstants";

function mapStateToProps(store) {
    return {
        fullHistory: store.stocks.fullHistory,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFullHistory: (payload) => dispatch(getFullHistory(payload)),
    };
}

class ChartComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const payload = {};
        payload.ticker = this.props.ticker;
        //this.props.getFullHistory(payload);

        //axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.ticker}`)
        axios.get(`http://${HOSTNAME}:5000/fullHistory/${this.props.ticker}`)
            .then(data => data.data.historical)
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let parts = data[i].date.match(/(\d+)/g);
                    data[i].date = new Date(parts[0], parts[1] - 1, parts[2])
                }

                this.setState({data})
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
                {type => <Chart type={type} data={this.state.data}/>}
            </TypeChooser>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
