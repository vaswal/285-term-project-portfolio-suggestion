import React, {Component} from 'react';
import {Switch} from 'react-router';
import {Route} from "react-router-dom";
import HomeBasic from '../Basic/HomeBasic';

class BasicLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/basic" component={HomeBasic}/>
                </Switch>
            </div>
        );
    }
}

export default BasicLayout;