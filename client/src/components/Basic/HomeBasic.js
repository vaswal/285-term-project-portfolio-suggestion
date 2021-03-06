import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import {Link, NavLink, Route} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";
import Portfolio from './Portfolio'
import logo from "../../images/technology.png";
import Buy from './BuyPage'
import Trend from './Trend'
import HomePage from './HomePage'
import ChatInput from "./../Chat/ChatInput"

class HomeBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBasic: true,
            redirectVar: false,
            showChat: false
        }
    }

    reset = () => {
        localStorage.clear();
        this.setState({redirectVar: true})
    }

    render() {
        return (
            <div>
                {this.state.redirectVar === true && <Redirect to={{
                    pathname: "/basic/home/",
                }}/>}

                <div style={styles.container}>

                    <div className='rowC'>
                        <div>
                            <img style={styles.logo} src={logo} alt="Quora"/>
                        </div>
                        <div>
                            <h3 style={styles.message}>&nbsp;&nbsp;Spartan Gold Co.</h3>
                        </div>

                        <div className='rowC'>
                            <Button variant="primary"
                                    style={{alignSelf: "right", marginTop: "10%", marginLeft: "30%"}}
                                    onClick={() => this.setState({isBasic: !this.state.isBasic})}>
                                Toggle {this.state.isBasic === false ? "Basic" : "Advanced"}
                            </Button>

                            <Button variant="primary"
                                    style={{alignSelf: "right", marginTop: "10%", marginLeft: "70%"}}
                                    onClick={() => this.reset()}>
                                Reset
                            </Button>
                        </div>

                    </div>
                </div>

                <div>
                    <Navbar>
                        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
                        <Nav>
                            <Nav.Link as={NavLink} to="/basic/home/">
                                Home
                            </Nav.Link>
                        </Nav>

                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to='/basic/portfolio/'>Portfolio</Nav.Link>
                            <Nav.Link as={NavLink} to='/basic/trend/'>Trend</Nav.Link>
                            <Nav.Link as={NavLink} to='/basic/chat/' onClick={() => this.setState({showChat: !this.state.showChat})}>Chat</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>

                <div>
                    <Switch>
                        <Route exact path='/basic/home/' component={HomePage}/>
                        {/*<Route exact path='/basic/portfolio/' component={Portfolio}/>*/}
                        <Route exact path='/basic/portfolio/'
                               render={(props) => <Portfolio isBasic={this.state.isBasic} props={props}/>}/>
                        <Route exact path='/basic/buy/' render={() => <Buy isBasic={this.state.isBasic}/>}/>
                        <Route exact path='/basic/trend/' component={Trend}/>
                        <Route exact path="/basic/chat" render={() => <ChatInput showChat={this.state.showChat}/>}/>
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
        width: "80px",
    },
    searchComponent: {}
}

export default HomeBasic;