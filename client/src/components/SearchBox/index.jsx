import  { Component } from "react";
import API from "../../api/axios";
import "./index.css";


class SearchBox extends Component {


state = {

    keyword:"",
    results:[],
    type:"documents",
    loading:false

};



handleChange = (e)=>{

    this.setState({

        keyword:e.target.value

    });

};



changeType=(e)=>{

    this.setState({

        type:e.target.value,
        results:[]

    });

};



search = async()=>{


if(!this.state.keyword.trim()){

    return;

}


try{


this.setState({

    loading:true

});



let response;



if(this.state.type==="documents"){


response = await API.get(

`/documents/search?keyword=${this.state.keyword}`

);


this.setState({

results:response.data.documents || []

});


}
else{


response = await API.get(

`/chat/search?keyword=${this.state.keyword}`

);


this.setState({

results:response.data.chats || []

});


}




this.setState({

loading:false

});



}
catch(error){

console.log(error);


this.setState({

loading:false

});


}


};



render(){


return(

<div className="search-box">


<div className="search-controls">


<select

value={this.state.type}

onChange={this.changeType}

>

<option value="documents">
Documents
</option>


<option value="chats">
Chats
</option>


</select>



<input

type="text"

placeholder="Search..."

value={this.state.keyword}

onChange={this.handleChange}

/>



<button

onClick={this.search}

>

{
this.state.loading
?
"Searching..."
:
"Search"
}


</button>


</div>




<div className="search-results">


{

this.state.results.length===0 ?

<p>
No results found
</p>


:


this.state.results.map((item,index)=>(


<div

key={index}

className="result-item"

>


{

this.state.type==="documents"

?


<p>

<b>
Document:
</b>

{item.originalName}

</p>


:


<>

<p>

<b>
Question:
</b>

{item.question}

</p>


<p>

<b>
Answer:
</b>

{item.answer}

</p>


</>


}



</div>


))


}


</div>


</div>

);


}


}


export default SearchBox;