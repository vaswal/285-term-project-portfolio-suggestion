import React, {useState} from 'react';
import SimpleForm from './SimpleForm';
import './Chat.css';

const ChatInput = (props) => {
    // let [showChat, setShowChat] = useState(true);

    // const startChat = () => {
    //     setShowChat(true);
    // }
    // const hideChat = () => {
    //     setShowChat(false);
    // }


    return (
        <div>
            {/* <div className="main">
                <div className="content">
                    <div>
                        <h1>How can we help??.....</h1>
                        {!showChat
                            ? <button class="btn btn-primary btn-lg btn-block" onClick={() => startChat()}>click to
                                chat... </button>
                            : <button class="btn btn-primary btn-lg btn-block" onClick={() => hideChat()}>click to
                                hide... </button>}

                    </div>
                </div>
            </div> */}
            <div className="bot">
                <div style={{display: props.showChat ? "" : "none"}}>
                    <SimpleForm></SimpleForm>
                </div>
                {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}

            </div>
        </div>
    );
}

export default ChatInput;