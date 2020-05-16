import React, {Component} from "react";
import {Route} from "react-router-dom";
import Chart from "./Chart/HeikinAshi";
import BasicLayout from "./Layout/BasicLayout";
import Portfolio from "./Basic/Portfolio";
import NavPage from "./Navigation/NavPage"
import './Account/Account.css'


class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/basic" component={BasicLayout}/>
                <Route exact path="/" component={NavPage}/>
                <Route exact path="/chart" component={Chart}/>
                <Route exact path="/portfolio" component={Portfolio}/>
            </div>
        );
    }
}

export default Main;
