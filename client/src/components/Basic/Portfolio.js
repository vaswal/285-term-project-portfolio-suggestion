import React, { Component } from 'react';
import {Button, ListGroup} from "react-bootstrap";
import {Redirect} from 'react-router';
import {getPortfolioCard} from "./UtilFunctions";
import axios from "axios";
import {HOSTNAME} from "../../constants/appConstants";
import {getStockSuggestion} from "../../redux/actions/stockActions";
import {connect} from "react-redux";



function mapStateToProps(store) {
    return {
        stockSuggestions: store.stocks.stockSuggestions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStockSuggestion: (payload) => dispatch(getStockSuggestion(payload)),
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
        const mainStrategyList = JSON.parse(localStorage.getItem("mainStrategyList"));
        return mainStrategyList ? mainStrategyList : [];
    }

    componentDidMount() {
        const payload = {};
        payload.choices = ["Ethical","Growth"];

        // //axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.ticker}`)
        // axios.post(`http://${HOSTNAME}:5000/stock_suggestion`, payload)
        //     .then(response => console.log(response))

        this.props.getStockSuggestion(payload);

    }

    getPortfolio() {
        const renderTodos = this.props.stockSuggestions.map((suggestion, index) => {
            return getPortfolioCard(suggestion.strategy, index)
        });

        return <ListGroup horizontal>{renderTodos}</ListGroup>
    }

    render() {
        return (
            <div>
                {this.state.redirectToBuyPage === true && <Redirect to={{
                    pathname: "/basic/buy/"
                }}/>}

                <h1>Portfolio HomePage</h1>
                {this.getMSLFromLocalStorage().length == 0 &&
                <Button variant="primary" style={styles.button} onClick={() => this.setState({redirectToBuyPage: true})}>
                    Create Portfolio
                </Button>}

                {this.getPortfolio()}

                <div>
                    <div className='rowC'>
                        <div style={{marginLeft: "25%", marginRight: "15%"}}>
                            {this.getMSLFromLocalStorage().length >= 1 && getPortfolioCard(this.getMSLFromLocalStorage()[0].name, 0)}
                        </div>
                        <div>
                            {this.getMSLFromLocalStorage().length >= 2 && getPortfolioCard(this.getMSLFromLocalStorage()[1].name, 1)}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);