import React, { Component } from "react";
import ChartComponent from "../Chart/Nasdaq";
import { Carousel, Card, Row, Col } from 'react-bootstrap';
import { getMajorIndicesData } from "../../redux/actions/stockActions";
import {connect} from "react-redux";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBasic: true,
            index: 0,
            i: 0
        }
        this.generateDataPoints = this.generateDataPoints.bind(this);
    }

    componentDidMount = () => {
        this.props.getMajorIndicesData();
    }

    handleSelect = (selectedIndex, e) => {
        this.setState({
            ...this.state,
            index: selectedIndex,
            i: this.state.i + 3
        });
    };

    generateDataPoints(noOfDps) {
        var xVal = 1, yVal = 100;
        var dps = [];
        for (var i = 0; i < noOfDps; i++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            dps.push({ x: xVal, y: yVal });
            xVal++;
        }
        return dps;
    }

    render() {
        const indexData = this.props.majorIndexData.slice(this.state.i, this.state.i + 3).map((data, index) => {
            return (
                <Carousel.Item key={index}>
                    <Row>
                        {this.props.majorIndexData[this.state.i] && <Col>
                        <Card style={{ width: '12rem', height: '10rem' }} className = "shadow p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            {/* <Card.Header style = {{ fontFamily: 'Jost', fontSize: '12px' }}>{data.name}</Card.Header> */}
                            <Card.Title style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 700 }}>{this.props.majorIndexData[this.state.i].name}</Card.Title>
                            <Card.Subtitle style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600 }} className="mb-2 text-muted">${this.props.majorIndexData[this.state.i].price}</Card.Subtitle>
                            <Card.Text style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600, color: this.props.majorIndexData[this.state.i].change[0] == '+' ? 'green' : 'red' }} >
                                {this.props.majorIndexData[this.state.i].change}<br/>
                                {this.props.majorIndexData[this.state.i].changesPercentage}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                        </Col>}
                    {this.props.majorIndexData[this.state.i+1] && <Col>
                    <Card style={{ width: '12rem', height: '10rem' }} className = "shadow p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            {/* <Card.Header style = {{ fontFamily: 'Jost', fontSize: '12px' }}>{data.name}</Card.Header> */}
                            <Card.Title style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 700 }}>{this.props.majorIndexData[this.state.i+1].name}</Card.Title>
                            <Card.Subtitle style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600 }} className="mb-2 text-muted">${this.props.majorIndexData[this.state.i+1].price}</Card.Subtitle>
                            <Card.Text style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600, color: this.props.majorIndexData[this.state.i+1].change[0] == '+' ? 'green' : 'red' }} >
                                {this.props.majorIndexData[this.state.i+1].change}<br/>
                                {this.props.majorIndexData[this.state.i+1].changesPercentage}
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>}
                    {this.props.majorIndexData[this.state.i+2] && <Col>
                    <Card style={{ width: '12rem', height: '10rem' }} className = "shadow p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            {/* <Card.Header style = {{ fontFamily: 'Jost', fontSize: '12px' }}>{data.name}</Card.Header> */}
                            <Card.Title style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 700 }}>{this.props.majorIndexData[this.state.i+2].name}</Card.Title>
                            <Card.Subtitle style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600 }} className="mb-2 text-muted">${this.props.majorIndexData[this.state.i+2].price}</Card.Subtitle>
                            <Card.Text style = {{ fontFamily: 'Jost', fontSize: '12px', fontWeight: 600, color: this.props.majorIndexData[this.state.i+2].change[0] == '+' ? 'green' : 'red' }} >
                                {this.props.majorIndexData[this.state.i+2].change}<br/>
                                {this.props.majorIndexData[this.state.i+2].changesPercentage}
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>}
                    </Row>
                </Carousel.Item>
            )
        });

        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Try Zooming and Panning"
            },
            axisY: {
                includeZero: false
            },
            data: [{
                type: "area",
                dataPoints: this.generateDataPoints(500)
            }]
        }

        return (
            <div className="container">
                {/* <h1>HomePage</h1> */}
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} interval={null}>
                    {indexData}
                </Carousel>
                <ChartComponent />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        majorIndexData: store.stocks.majorIndexData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMajorIndicesData: () => dispatch(getMajorIndicesData()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);