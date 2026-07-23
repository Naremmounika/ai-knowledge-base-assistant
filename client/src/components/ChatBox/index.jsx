import  { Component } from "react";
import API from "../../api/axios";
import "./index.css";


class ChatBox extends Component {


state = {
    question:"",
    chats:[],
    loading:false,
    error:""
}



handleChange = (e)=>{

    this.setState({
        question:e.target.value
    });

}



askQuestion = async()=>{


    if(!this.state.question.trim()){
        return;
    }


    try{


        this.setState({
            loading:true,
            error:""
        });



        const response = await API.post(
            "/chat/ask",
            {
                documentId:this.props.documentId,
                question:this.state.question
            }
        );


        const newChat = {

            question:this.state.question,
            answer:response.data.answer

        };


        this.setState({

            chats:[
                ...this.state.chats,
                newChat
            ],

            question:"",

            loading:false

        });



    }
    catch(error){


        console.log(error);


        this.setState({

            error:"Failed to get AI response",
            loading:false

        });


    }


}




render(){


return(


<div className="chat-box">


<h2>
AI Assistant
</h2>



<div className="chat-history">


{
this.state.chats.map((chat,index)=>(


<div key={index}
className="chat-item">


<div className="user-question">

<b>
You:
</b>

<p>
{chat.question}
</p>

</div>



<div className="ai-answer">

<b>
AI:
</b>

<p>
{chat.answer}
</p>


</div>


</div>


))
}


</div>




<div className="chat-input">


<input

type="text"

value={this.state.question}

onChange={this.handleChange}

placeholder="Ask something about your document"

/>


<button
onClick={this.askQuestion}
disabled={this.state.loading}
>

{
this.state.loading
?
"Thinking..."
:
"Send"
}

</button>


</div>



<p>
{this.state.error}
</p>



</div>


)


}


}


export default ChatBox;