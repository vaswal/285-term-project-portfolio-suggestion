import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Redirect} from 'react-router';

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToBuyPage: null,
        }
    }

    render() {
        return (
            <div>
                {this.state.redirectToBuyPage === true && <Redirect to={{
                    pathname: "/basic/buy/"
                }}/>}

                <h1>Portfolio HomePage</h1>
                <Button variant="primary" style={styles.button} onClick={() => this.setState({redirectToBuyPage: true})}>
                    Add ETF
                </Button>
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