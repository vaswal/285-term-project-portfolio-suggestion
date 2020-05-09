import React, {Component} from 'react';
import { Redirect, Switch } from "react-router";
import { Link, NavLink, Route } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import Portfolio from './Portfolio'
import Buy from './BuyPage'

class HomeBasic extends Component {
    render() {

        return (
            <div>

                <div style={styles.container}>

                    <div className='rowC'>
                        {/*<div>*/}
                        {/*    <img style={styles.logo} src={logo} alt="Quora" />*/}
                        {/*</div>*/}
                        <div>
                            <h3 style={styles.message}>&nbsp;&nbsp;CartPool</h3>
                        </div>
                    </div>
                </div>

                <div>
                    <Navbar>
                        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
                        <Nav>
                            <Nav.Link as={NavLink} to="/homePooler/">
                                HomeBasic
                            </Nav.Link>
                        </Nav>

                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to='/basic/portfolio/'>Portfolio</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>

                <div>
                    <Switch>
                        <Route exact path='/basic/portfolio/' component={Portfolio} />
                        <Route exact path='/basic/buy/' component={Buy} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    button: {
        marginLeft: "45%"
    },
    message: {
        fontWeight: "bold",
        paddingTop: "15%"
    },
    logo: {
        paddingTop: "10px",
        width: "50px",
    },
    searchComponent: {}
}

export default HomeBasic;