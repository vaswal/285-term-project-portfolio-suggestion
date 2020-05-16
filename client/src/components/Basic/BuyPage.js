import React, {Component} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import HeikinAshiChart from "../Chart/HeikinAshi";
import AreaChart from "../Chart/AreaChart";
import {Redirect} from "react-router";
import {getPortfolioCard} from "./UtilFunctions";

class BuyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //mainStrategyList: localStorage.getItem("mainStrategyList") !== null ? JSON.parse(localStorage.getItem("mainStrategyList")) : [],
            mainStrategyList: [],
            showSelectionComponent: null,
            mainStrategiesIndex: null,
            selectedStrategyIndex: null,
            selectedStepIndex: 0,
            redirectToPortfolio: false,
            strategyList: ["Ethical", "Growth", "Index", "Quality", "Value"],
            stepsList: ["1. Select strategy", "2. Review", "3. Finish"],
        }
    }

    getEmptyPortfolioCard = (index, portfolios) => {
        return <Card style={{width: '18rem'}}>
            <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top"
                      src={require("../../images/strategy.png")}/>
            <Card.Body style={{alignSelf: "center"}}>
                <Card.Title>Strategy {index + 1}</Card.Title>

                <button class="btn-primary btn-circle"
                        onClick={() => this.setState({showSelectionComponent: true, mainStrategiesIndex: index})}
                        type="button">+
                </button>
                <br/>
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
                active={index === this.state.selectedStrategyIndex ? true : false}
                onClick={() => this.setState({selectedStrategyIndex: index})}
            >
                {strategy + " Investing"}
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
                active={index === this.state.selectedStepIndex ? true : false}
                disabled={index === (index > this.state.selectedStepIndex ? true : (this.state.selectedStepIndex ? false : true))}
                onClick={() => this.setState({selectedStepIndex: index})}
            >
                {step}
            </ListGroup.Item>
        });

        return <ListGroup as="ul" style={{marginTop: "2%", marginLeft: "2%", width: "15rem"}}>{renderTodos}</ListGroup>
    }

    addToMainStrategyList = () => {
        // const mainStrategyList = JSON.parse(localStorage.getItem("mainStrategyList"))
        // console.log("mainStrategyList: " + mainStrategyList)
        // mainStrategyList.push({name: this.state.strategyList[this.state.selectedStrategyIndex], test: "test"})
        // localStorage.setItem("mainStrategyList", JSON.stringify(mainStrategyList));

        this.setState({
            mainStrategyList: [...this.state.mainStrategyList, {
                name: this.state.strategyList[this.state.selectedStrategyIndex],
                test: "test"
            }],
            selectedStepIndex: this.state.selectedStepIndex + 1
        }, () => {
            console.log("this.state.mainStrategyList: " + this.state.mainStrategyList)
        })

        //this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})
    }

    completePurchase = () => {
        localStorage.setItem("mainStrategyList", JSON.stringify(this.state.mainStrategyList));
        this.setState({redirectToPortfolio: true});
    }

    getStockGraphs = (strategy) => {
        if (!this.state.strategyStockMap) return null;

        const renderTodos = this.state.strategyStockMap.get(strategy).map((stock, index) => {
            console.log("stock")
            console.log(stock)

            return <ListGroup.Item>
                <h3>{stock}</h3>
                {!this.props.isBasic ? <HeikinAshiChart ticker={stock}/> : <AreaChart ticker={stock}/>}
            </ListGroup.Item>
        });

        return <ListGroup as="ul" style={{width: "100%"}}>{renderTodos}</ListGroup>
    }

    componentDidMount() {
        console.log("this.props.isBasic: " + this.props.isBasic)

        if (localStorage.getItem("mainStrategyList") == null) {
            localStorage.setItem("mainStrategyList", JSON.stringify([]));
        }

        //strategyList: ["Ethical", "Growth", "Index", "Quality", "Value"],
        const strategyStockMap = new Map();
        strategyStockMap.set("Ethical", ['SHE', 'DSI', 'CRBN', 'SPYX'])
        strategyStockMap.set("Growth", ['DISCA', 'QQQ', 'VGT', 'XLV', 'VB','MDY','VIG'])
        strategyStockMap.set("Index", ['VOO', 'SPY', 'IVV'])
        strategyStockMap.set("Quality", ['QUAL', 'SPHQ', 'DGRW', 'QDF', 'JQUA','SDY','DGRS'])
        strategyStockMap.set("Value", ['ALB', 'VIAC', 'BTI', 'CVS', 'AZO','VZ','ALXN'])

        this.setState({strategyStockMap: strategyStockMap})
    }

    render() {
        return (
            <div>
                {this.state.redirectToPortfolio === true && <Redirect to={{
                    pathname: "/basic/portfolio/"
                }}/>}

                <h1>Buy HomePage</h1>
                <div>
                    <div className='rowC'>
                        <div style={{marginLeft: "25%", marginRight: "15%"}}>
                            {this.state.mainStrategyList.length >= 1 ? getPortfolioCard(this.state.mainStrategyList[0].name, 0) : this.getEmptyPortfolioCard(0)}
                        </div>
                        <div>
                            {this.state.mainStrategyList.length >= 2 ? getPortfolioCard(this.state.mainStrategyList[1].name, 1) : this.getEmptyPortfolioCard(1)}
                        </div>
                    </div>
                </div>

                {this.state.mainStrategyList.length >= 1 &&
                <Button variant="primary" style={{marginRight: "50%", marginTop: "1%", width:"10rem"}}
                        onClick={() => this.completePurchase()}>
                    Complete and Buy
                </Button>}

                {this.state.showSelectionComponent && <div className='rowC' style={{marginTop: "5%"}}>
                    {this.getStepsList()}

                    {this.state.selectedStepIndex === 0 &&
                    <div style={{marginLeft: "10%"}}>
                        {this.getStrategyList()}
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%", width:"10rem"}}
                                onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>
                    </div>}

                    {this.state.selectedStepIndex === 1 &&
                    <div style={{marginLeft: "10%", width: "90%"}}>
                        <h2>{this.state.strategyList[this.state.selectedStrategyIndex]} Investing</h2>
                        <Button variant="primary" style={{marginRight: "80%", marginTop: "1%", width:"10rem"}}
                                onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>

                        {this.getStockGraphs(this.state.strategyList[this.state.selectedStrategyIndex])}

                    </div>}

                    {this.state.selectedStepIndex === 2 &&
                    <div style={{marginLeft: "10%", width: "90%"}}>
                        <h4>I confirm that I am selecting </h4>
                        <Button variant="primary" style={{marginRight: "80%", marginTop: "1%", width:"10rem"}}
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