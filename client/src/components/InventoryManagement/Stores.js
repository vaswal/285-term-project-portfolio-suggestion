import React, {Component} from "react";
import {Button, Card, Col, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {createStore, deleteStore, getStoresByAdmin} from "../../redux/actions/inventoryActions";

function mapStateToProps(store) {
    return {
        stores: store.inventory.stores,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStoresByAdmin: (payload) => dispatch(getStoresByAdmin(payload)),
        createStore: (payload) => dispatch(createStore(payload)),
        deleteStore: (payload) => dispatch(deleteStore(payload)),
    };
}

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectVar: null,
            selectedOrder: null,
            currentStoreEditIndex: null,
            show: false,
            allOrders: [{_id: 1, name: "foo", street: "1SM", city: "SJ", state: "CA", zip: "95113"},
                {_id: 2, name: "bar", street: "2SM", city: "SF", state: "CA", zip: "98122"}]
        };
    }

    handleClose = () => this.setState({show: false});
    handleShow = (index) => {
        console.log("handleShow index: " + index);
        this.setState({show: true, currentStoreEditIndex: index})
    };

    getStoresByAdmin = (order) => {
        console.log("getStoresByAdmin")
        console.log(order)
        this.setState({redirectVar: true, selectedOrder: order})
    }


    deleteStore = (store) => {
        const payload = {};
        payload.storeId = store.id;
        payload.adminId = localStorage.getItem('id');

        this.props.deleteStore(payload)
    }

    deleteStore = (store) => {
        const payload = {};
        payload.storeId = store.id;
        payload.adminId = localStorage.getItem('id');

        this.props.deleteStore(payload)
    }

    createStore = (e) => {
        e.preventDefault();

        console.log("Inside createStore")

        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].id !== "") {
                data[e.target[i].id] = e.target[i].value;
            }
        }

        let updatedData = {
            name: data.name,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            storeId: this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].id : null,
            adminId: localStorage.getItem('id'),
        }

        console.log(updatedData)

        this.props.createStore(updatedData)
    }

    componentDidMount() {
        const payload = {};
        payload.adminId = localStorage.getItem('id');

        this.props.getStoresByAdmin(payload)
    }

    populateSection = () => {
        console.log("populateSection");

        const renderTodos = this.props.stores.map((store, index) => {
            return <li key={index}>
                <Card style={{width: '22rem'}}>
                    {/*<Card.Img variant="top" src={require("../../images/restaurant-logo.png")}/>*/}
                    <Card.Body>
                        <Card.Title>Store</Card.Title>
                        <Card.Text>
                            <b>Store Name</b> - {store.name}
                            <br/>
                            <b>Store
                                Address</b> - {store.address.street + " " + store.address.city + " " + store.address.state + " " + store.address.zip}

                        </Card.Text>
                        <Button onClick={() => this.handleShow(index)} type="button" variant="primary">Edit</Button>
                        <br/>
                        <br/>
                        <Button onClick={() => this.deleteStore(store)} type="button" variant="primary">Delete</Button>
                    </Card.Body>
                </Card>
            </li>;
        });

        return <div>
            <ul className="ul li">{renderTodos}</ul>
        </div>;
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={() => this.handleShow(null)}>
                    Create new store
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Form onSubmit={this.createStore}>

                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                defaultValue={this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].name : ""}
                                placeholder="Enter store name" required/>
                        </Form.Group>

                        <Form.Group controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                defaultValue={this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].address.street : ""}
                                placeholder="Enter store street" required/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].address.city : ""}
                                    placeholder="Enter store city" required/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].address.state : ""}
                                    placeholder="Enter store state" required/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="zip">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.currentStoreEditIndex !== null ? this.props.stores[this.state.currentStoreEditIndex].address.zip : ""}
                                    placeholder="Enter store zipcode" required/>
                            </Form.Group>
                        </Form.Row>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>

                {this.populateSection()}
            </div>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        height: "100vh",
    },
    channelList: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    chat: {
        display: "flex",
        flex: 3,
        flexDirection: "column",
        borderWidth: "1px",
        borderColor: "#ccc",
        borderRightStyle: "solid",
        borderLeftStyle: "solid",
    },
    settings: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);