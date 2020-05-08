import React, { Component } from 'react';
import {Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import strategyLogo from "../../images/cart.png";

class BuyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectionComponent: null,
            selectedStrategyIndex: null,
            strategyList: ["Ethical Investing", "Growth Investing", "Index Investing", "Quality Investing", "Value Investing"]
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
                    <ListGroup as="ul" style={{marginTop: "2%", marginLeft: "2%", width: "15rem"}}>
                        <ListGroup.Item as="li" active={false} disabled={true}>
                            1. Select strategy
                        </ListGroup.Item>
                        <ListGroup.Item as="li" active={false} disabled={true}>
                            2. Review
                        </ListGroup.Item>
                        <ListGroup.Item as="li" active={true} disabled={false}>
                            3. Finish
                        </ListGroup.Item>
                    </ListGroup>

                    <div style={{marginLeft: "15%"}}>
                        {this.getStrategyList()}
                        <Button variant="primary" style={{marginLeft: "20%", marginTop: "10%"}} onClick={() => this.setState({redirectToBuyPage: true})}>
                            Select strategy
                        </Button>
                    </div>
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