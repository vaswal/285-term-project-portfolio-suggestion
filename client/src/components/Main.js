import React, {Component} from "react";
import {Route} from "react-router-dom";
import HomePage from "./HomePage";
import Chart from "./Chart/index";

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/chart" component={Chart}/>
            </div>
        );
    }
}

export default Main;
