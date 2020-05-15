import React, {Component} from 'react';
import ChartComponent from "../Chart/AreaChart";


class Trend extends Component {
    constructor(props) {
        super(props);

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

export default Trend;