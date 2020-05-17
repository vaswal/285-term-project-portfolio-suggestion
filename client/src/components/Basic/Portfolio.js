import React, {Component} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import {Redirect} from 'react-router';
import {getPortfolioCard} from "./UtilFunctions";
import {getPortfolioInfo, getStockSuggestion, getPortfolioValue} from "../../redux/actions/stockActions";
import {connect} from "react-redux";


function mapStateToProps(store) {
    return {
        stockSuggestions: store.stocks.stockSuggestions,
        portfolioInfo: store.stocks.portfolioInfo,
        portfolioValue: store.stocks.portfolioValue,
        stocks: store.stocks.stocks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStockSuggestion: (payload) => dispatch(getStockSuggestion(payload)),
        getPortfolioInfo: (payload) => dispatch(getPortfolioInfo(payload)),
        getPortfolioValue: (payload) => dispatch(getPortfolioValue(payload)),
    };
}

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToBuyPage: null,
        }
    }

    getMSLFromLocalStorage = () => {
        console.log("mainStrategyList");
        if (this.props.location && this.props.location.state && this.props.location.state.mainStrategyList) {
            return this.props.location.state.mainStrategyList;
        }

        const mainStrategyList = JSON.parse(localStorage.getItem("mainStrategyList"));
        return mainStrategyList ? mainStrategyList : [];
    }

    getStockSuggestions = () => {
        const mainStrategyList = JSON.parse(localStorage.getItem("dataWithDivision"));
        return mainStrategyList ? mainStrategyList : [];
    }

    componentDidMount() {
        console.log("componentDidMount mainStrategyList");
        console.log(this.props.location);

        console.log("names")
        console.log(this.getMSLFromLocalStorage().map(strategy => strategy.name));

        let portfolioStockList;

        const localStoragePortfolioStockList = JSON.parse(localStorage.getItem("portfolioStockList"))
        if (localStoragePortfolioStockList !== null && localStoragePortfolioStockList.length > 0) {
            console.log("Portfolio.componentDidMount localStorage")
            console.log(localStoragePortfolioStockList)
            portfolioStockList = localStoragePortfolioStockList;
        } else {
            console.log("Portfolio.componentDidMount this.props.stocks")
            console.log(this.props.stocks)
            portfolioStockList = this.props.stocks
        }

        console.log("Portfolio.componentDidMount portfolioStockList")
        console.log(portfolioStockList)


        console.log("Portfolio.componentDidMount portfolioStockList")
        console.log(portfolioStockList)

        const payload = {};
        payload.stockSuggestions = JSON.parse(localStorage.getItem("dataWithDivision"));
        payload.stockList = Array.prototype.join.call(portfolioStockList, ",");

        this.props.getPortfolioValue(payload)

        if (portfolioStockList && portfolioStockList.length > 3) {
            const firstThree = portfolioStockList.slice(0, 3);
            const lastThree = portfolioStockList.slice(3, 6);

            this.props.getPortfolioInfo({tickers: firstThree});
            this.props.getPortfolioInfo({tickers: lastThree});

        } else if (portfolioStockList && portfolioStockList.length <= 3) {
            this.props.getPortfolioInfo({tickers: JSON.parse(localStorage.getItem("portfolioStockList"))});
        }

        if (localStorage.getItem("dataWithDivision")) {
            return
        }

        if (this.getMSLFromLocalStorage().length > 0) {
            const payload = {};
            payload.choices = this.getMSLFromLocalStorage().map(strategy => strategy.name);
            console.log("payload.choices")
            console.log(payload.choices)

            console.log("Calling getStockSuggestion")
            this.props.getStockSuggestion(payload);
        }
    }

    getPortfolio() {
        console.log("this.props.stockSuggestions")
        console.log(this.props.stockSuggestions)
        const stockSuggestions = this.getStockSuggestions()

        if (stockSuggestions.length === 0) return null;

        const renderTodos = stockSuggestions.suggestions.map((suggestion, index) => {
            return getPortfolioCard(suggestion.strategy, index, stockSuggestions.suggestions, stockSuggestions.division, this.props.portfolioInfo, this.props.isBasic)
        });

        return <div>
            <Card style={{width: '22rem'}}>
                <Card.Body>
                    <Card.Title>Portfolio overview</Card.Title>
                    <Card.Text>
                        <b>Current value - {this.props.portfolioValue}</b>
                    </Card.Text>
                </Card.Body>
            </Card>

            <ListGroup horizontal>{renderTodos}</ListGroup>
        </div>
    }

    render() {
        console.log("this.props.props: ")
        console.log(this.props.props)
        console.log("this.props.location: " + this.props.location)

        return (
            <div>
                {/*{this.props.props && this.props.props.location && this.props.props.location.state && this.props.props.location.state.refreshPage &&*/}
                {/*window.location.reload(false) && window.history.replaceState({}, '', "/basic/portfolio/")}*/}

                {this.state.redirectToBuyPage === true && <Redirect to={{
                    pathname: "/basic/buy/"
                }}/>}

                <h1>Portfolio HomePage</h1>
                {this.getMSLFromLocalStorage().length === 0 &&
                <Button variant="primary" style={styles.button}
                        onClick={() => this.setState({redirectToBuyPage: true})}>
                    Create Portfolio
                </Button>}

                {this.getMSLFromLocalStorage().length !== 0 && this.getPortfolio()}
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
        width: "10%",
        marginRight: "45%"
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);