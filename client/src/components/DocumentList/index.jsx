import {Component} from "react";
import API from "../../api/axios";
import "./index.css";


class DocumentList extends Component{


state={
    documents:[]
}



componentDidMount(){

    this.loadDocuments();

}



componentDidUpdate(prevProps){

    if(prevProps.refresh!==this.props.refresh){

        this.loadDocuments();

    }

}



loadDocuments=async()=>{


try{


const response=await API.get(
"/documents"
);


this.setState({

documents:response.data.documents || []

});


}
catch(error){

console.log(error);

}


}



handleDelete=async(id)=>{


try{

await API.delete(
`/documents/${id}`
);


this.loadDocuments();


}
catch(error){

console.log(error);

}


}



render(){


return(

<div>


<h2>
My Documents
</h2>


{

this.state.documents.map((doc)=>(


<div className="document-card"
key={doc._id}>


<h3>
{doc.originalName}
</h3>


<p>
Type: {doc.fileType}
</p>


<button
onClick={()=>this.props.selectDocument(doc._id)}
>
Chat
</button>


<button
onClick={()=>this.handleDelete(doc._id)}
>
Delete
</button>


</div>


))


}


</div>

)


}


}


export default DocumentList;