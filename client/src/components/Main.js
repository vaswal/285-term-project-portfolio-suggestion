import React, {Component} from "react";
import {Route} from "react-router-dom";
import HomePage from "./HomePage";
import Chart from "./Chart/index";
import BasicLayout from "./Layout/BasicLayout";
import Portfolio from "./Basic/Portfolio";
import './Account/Account.css'

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/basic" component={BasicLayout} />
                <Route exact path="/" component={BasicLayout}/>
                <Route exact path="/chart" component={Chart}/>
                <Route exact path="/portfolio" component={Portfolio}/>
            </div>
        );
    }
}

export default Main;
