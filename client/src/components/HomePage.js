import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "Home",
            viewDetailedTweetScreenPropId: null,
            searchText: null,
            viewDetailedListProps: null
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    <Navbar>
                        <Nav>
                            <Nav.Link as={NavLink} to='/chart/'>Chart</Nav.Link>

                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to='/buy/'>Buy</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
            </div>
        );
    }
}

export default HomePage;