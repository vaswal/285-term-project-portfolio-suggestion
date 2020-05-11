import React, {Component} from "react";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBasic: true
        }
    }

    render() {
        return (
            <h1>HomePage</h1>
        )
    }
}

export default HomePage;