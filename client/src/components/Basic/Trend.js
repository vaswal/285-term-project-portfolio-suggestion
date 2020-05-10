import React, { Component } from 'react';
import {Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import strategyLogo from "../../images/cart.png";
import valueInvesting from "../../images/value-investing.png";
import qualityInvesting from "../../images/quality-investing.png";
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