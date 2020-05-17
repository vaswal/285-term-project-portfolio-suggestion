import * as React from 'react';
import './Chat.css';
import {connect} from 'react-redux';

class ChatHistory extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props.chat in history ", this.props.chat);
    }

    render() {
        console.log("chat history", this.props.chat);
        if (this.props.chat != undefined && this.props.chat.length > 0) {
            return (
                <ul className="collection">
                    {this.props.chat.map((messageObj) => {
                        const imgURL = '//robohash.org/' + messageObj.Who + '?set=set2&bgset=bg2&size=70x70';
                        const messageDate = new Date(messageObj.When);
                        const messageDateTime = messageDate.toLocaleDateString() +
                            ' at ' + messageDate.toLocaleTimeString();
                        return (<li className="collection-item avatar" key={messageObj.When}>
                                <img src={imgURL} alt={messageObj.id} className="circle"/>
                                <span className="title">{messageObj.Who} #{messageObj.id}</span>
                                <p>
                                    <i className="prefix mdi-action-alarm"/>
                                    <span className="message-date">{messageDateTime}</span>
                                    <br/>
                                    <span>{messageObj.What}</span>
                                </p>
                            </li>
                        );
                    })
                    }
                </ul>);
        }
        return (<div></div>);
    }
}

function mapStateToProps(store) {
    return {
        chat: store.msg.chat,
    }
}

export default connect(mapStateToProps)(ChatHistory)