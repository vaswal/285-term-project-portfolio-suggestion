import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Redirect} from 'react-router';
import {getPortfolioCard} from "./UtilFunctions";

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

    render() {
        return (
            <div>
                {this.state.redirectToBuyPage === true && <Redirect to={{
                    pathname: "/basic/buy/"
                }}/>}

                <h1>Portfolio HomePage</h1>
                {this.getMSLFromLocalStorage().length == 0 &&
                <Button variant="primary" style={styles.button} onClick={() => this.setState({redirectToBuyPage: true})}>
                    Add ETF
                </Button>}

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

export default Portfolio;