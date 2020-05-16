import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import Review from './Review';
import axios from 'axios';

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    render() {
        let data = {};
        return (
            <ChatBot
                steps={[
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: 'name',
                    },
                    {
                        id: 'name',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}! You can find real-time stock prices!! Please enter stock symbol',
                        trigger: 'stock',
                    },
                    {
                        id: 'stock',
                        user: true,
                        trigger: '7',
                        validator: (value) => {
                            let url = `https://financialmodelingprep.com/api/v3/stock/real-time-price/${value}`;
                            axios.get(url).then((response) => {
                                console.log(response.data);
                                this.setState({
                                    data: response.data
                                });
                            });
                            return true;
                        },
                    },
                    {
                        id: '7',
                        message: 'Great! Check out our summary',
                        trigger: 'review',
                    },
                    {
                        id: 'review',
                        component: <Review/>,
                        asMessage: true,
                        trigger: '9',
                    },
                    {
                        id: '9',
                        message: 'Is there anything else we can help you with?',
                        trigger: 'query',
                    },
                    {
                        id: 'query',
                        user: true,
                        trigger: '11',
                    },
                    {
                        id: '11',
                        message: 'Thankyou for your query. Our support team will get back to you.',
                        end: true
                    }
                ]}
            />
        );
    }
}

export default SimpleForm;