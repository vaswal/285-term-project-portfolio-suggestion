import React, { Component } from 'react';
import {Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import strategyLogo from "../../images/cart.png";

class BuyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectionComponent: null,
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
                <Card.Title >Strategy {index}</Card.Title>

                <button class="btn-primary btn-circle" onClick={() => this.setState({showSelectionComponent: true})} type="button">+</button>
                <br/>
                {/*<br/>*/}
                {/*<Button onClick={() => this.deleteStore(store)} type="button" variant="primary">Delete</Button>*/}
            </Card.Body>
        </Card>
    }

    getPortfolioCard = (name, portfolios) => {
        return <Card style={{width: '22rem'}}>
            <Card.Body>
                <Card.Title>Store</Card.Title>
                <Card.Text>
                    <b>Strategy name</b> - {name}
                    <br/>
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

    render() {
        return (
            <div>
                <h1>Buy HomePage</h1>
                <div>
                    <div className='rowC'>
                        <div style={{marginLeft: "25%", marginRight: "15%"}}>
                            {this.getEmptyPortfolioCard(1)}
                        </div>
                        <div>
                            {this.getEmptyPortfolioCard(2)}
                        </div>
                    </div>
                </div>

                <div className='rowC' style={{marginTop: "5%"}}>
                    {this.getStepsList()}


                    {this.state.selectedStepIndex === 0 &&
                    <div style={{marginLeft: "15%"}}>
                        {this.getStrategyList()}
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}} onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>
                    </div>}

                    {this.state.selectedStepIndex === 1 &&
                    <div style={{marginLeft: "15%"}}>
                        {this.getStrategyList()}
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}} onClick={() => this.setState({selectedStepIndex: this.state.selectedStepIndex + 1})}>
                            Select strategy
                        </Button>
                    </div>}
                </div>


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