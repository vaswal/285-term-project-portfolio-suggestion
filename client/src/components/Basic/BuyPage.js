import React, { Component } from 'react';
import {Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import strategyLogo from "../../images/cart.png";
import valueInvesting from "../../images/value-investing.png";
import qualityInvesting from "../../images/quality-investing.png";
import HeikinAshiChart from "../Chart/HeikinAshi";
import AreaChart from "../Chart/AreaChart";

class BuyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainStrategyList: localStorage.getItem("mainStrategyList") !== null ? JSON.parse(localStorage.getItem("mainStrategyList")) : [],
            showSelectionComponent: null,
            mainStrategiesIndex: null,
            selectedStrategyIndex: null,
            selectedStepIndex: 0,
            strategyList: ["Ethical Investing", "Growth Investing", "Index Investing", "Quality Investing", "Value Investing"],
            stepsList: ["1. Select strategy", "2. Review", "3. Finish"],
        }
    }

    getEmptyPortfolioCard = (index, portfolios) => {
        return <Card style={{width: '18rem'}}>
            <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top" src={require("../../images/strategy.png")}/>
            <Card.Body style={{alignSelf: "center"}}>
                <Card.Title >Strategy {index + 1}</Card.Title>

                <button class="btn-primary btn-circle"
                        onClick={() => this.setState({showSelectionComponent: true, mainStrategiesIndex: index})}
                        type="button">+</button>
                <br/>
                {/*<br/>*/}
                {/*<Button onClick={() => this.deleteStore(store)} type="button" variant="primary">Delete</Button>*/}
            </Card.Body>
        </Card>
    }

    getPortfolioCard = (index, portfolios) => {
        const name = this.getMSLFromLocalStorage()[index].name;

        return <Card style={{width: '22rem'}}>
            <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top" src={this.getStrategyLogo(name)}/>

            <Card.Body>
                <Card.Title >Strategy {index + 1} - {name}</Card.Title>
                <Card.Text>
                    <b>Portfolios</b> - TBD
                </Card.Text>
                    {/*<Button onClick={() => this.handleShow(index)} type="button" variant="primary">Edit</Button>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<Button onClick={() => this.deleteStore(store)} type="button" variant="primary">Delete</Button>*/}
            </Card.Body>
        </Card>
    }

    getStrategyList = () => {
        const renderTodos = this.state.strategyList.map((strategy, index) => {
            console.log("strategy")
            console.log(strategy)

            return <ListGroup.Item
                style={{margin: "1px", width: "15rem"}}
                action
                active={index === this.state.selectedStrategyIndex ? true: false}
                onClick={() => this.setState({selectedStrategyIndex: index})}
            >
                {strategy}
            </ListGroup.Item>
        });

        return <ListGroup>{renderTodos}</ListGroup>
    }

    getStepsList = () => {
        const renderTodos = this.state.stepsList.map((step, index) => {
            console.log("step")
            console.log(step)

            return <ListGroup.Item
                style={{margin: "1px", width: "15rem"}}
                active={index === this.state.selectedStepIndex ? true: false}
                disabled={index === (index > this.state.selectedStepIndex ? true: (this.state.selectedStepIndex ? false: true))}
                onClick={() => this.setState({selectedStepIndex: index})}
            >
                {step}
            </ListGroup.Item>
        });

        return <ListGroup as="ul" style={{marginTop: "2%", marginLeft: "2%", width: "15rem"}}>{renderTodos}</ListGroup>
    }

    addToMainStrategyList = () => {
        const mainStrategyList = JSON.parse(localStorage.getItem("mainStrategyList"))
        console.log("mainStrategyList: " + mainStrategyList)
        mainStrategyList.push({name: this.state.strategyList[this.state.selectedStrategyIndex], test: "test"})
        localStorage.setItem("mainStrategyList", JSON.stringify(mainStrategyList));

        this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})
    }

    componentDidMount() {
        console.log("this.props.isBasic: " + this.props.isBasic)

        if (localStorage.getItem("mainStrategyList") == null) {
            localStorage.setItem("mainStrategyList", JSON.stringify([]));
        }
    }

    getMSLFromLocalStorage = () => {
        const mainStrategyList = JSON.parse(localStorage.getItem("mainStrategyList"));
        return mainStrategyList ? mainStrategyList : [];
    }

    getStrategyLogo = (name) => {
        const fontSize = 20;
        let badge = null;

        switch (name) {
            case "Value Investing":
                badge = valueInvesting;
                break;

            case "Quality Investing":
                badge = qualityInvesting;
                break;

            case "Ethical Investing":
                badge = qualityInvesting;
                break;

            case "Growth Investing":
                badge = qualityInvesting;
                break;

            case "IndexTrend Investing":
                badge = qualityInvesting;
                break;
        }

        return badge;
    };

    render() {
        return (
            <div>
                <h1>Buy HomePage</h1>
                <div>
                    <div className='rowC'>
                        <div style={{marginLeft: "25%", marginRight: "15%"}}>
                            {this.getMSLFromLocalStorage().length >= 1 ? this.getPortfolioCard(0) : this.getEmptyPortfolioCard(0)}
                        </div>
                        <div>
                            {this.getMSLFromLocalStorage().length >= 2 ? this.getPortfolioCard(1) : this.getEmptyPortfolioCard(1)}
                        </div>
                    </div>
                </div>

                {this.state.showSelectionComponent && <div className='rowC' style={{marginTop: "5%"}}>
                    {this.getStepsList()}

                    {this.state.selectedStepIndex === 0 &&
                    <div style={{marginLeft: "10%"}}>
                        {this.getStrategyList()}
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}}
                                onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>
                    </div>}

                    {this.state.selectedStepIndex === 1 &&
                    <div style={{marginLeft: "10%", width:"90%"}}>
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}}
                                onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>

                        <h3>ViacomCBS</h3>
                        {!this.props.isBasic ? <HeikinAshiChart ticker="VIAC"/> : <AreaChart ticker="VIAC"/>}

                        <h3>Albemarle Corp.</h3>
                        {!this.props.isBasic  ? <HeikinAshiChart ticker="ALB"/> : <AreaChart ticker="ALB"/>}


                    </div>}

                    {this.state.selectedStepIndex === 2 &&
                    <div style={{marginLeft: "10%", width:"90%"}}>
                        <h4>I confirm that I am selecting </h4>
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}}
                                onClick={() => this.addToMainStrategyList()}>
                            Agree and add
                        </Button>
                    </div>}
                </div>
                }
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    button: {
        marginLeft: "45%"
    },
    storeList: {
        flex: 2,
        alignSelf: 'left'
    },
    formField: {
        marginLeft: "1rem",
        marginRight: "1rem"
    }
};

export default BuyPage;