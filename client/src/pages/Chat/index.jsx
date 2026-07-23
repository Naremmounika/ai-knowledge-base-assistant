import  { Component } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/ChatBox";

import "./index.css";

class Chat extends Component {

    render(){

        return(

            <>

                <Navbar/>

                <div className="chat-page">

                    <Sidebar/>

                    <div className="chat-content">

                        <h1>
                            AI Chat
                        </h1>

                        <ChatBox
                            documentId={this.props.documentId}
                        />

                    </div>

                </div>

            </>

        )

    }

}

function ChatWrapper(){

    const { documentId } = useParams();

    return(
        <Chat
            documentId={documentId}
        />
    )

}

export default ChatWrapper;