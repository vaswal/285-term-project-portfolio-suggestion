
import React, {Component} from 'react';
import {Redirect} from "react-router";

class NavPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBasic: true
        }
    }

    render() {
        return (
            <Redirect to={{
            pathname: "/basic/home/"
        }}/>)
    }
}

export default NavPage;