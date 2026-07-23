import  { Component } from "react";
import API from "../../api/axios";
import "./index.css";


class DocumentUpload extends Component {


state={
    file:null,
    message:""
}


handleChange=(e)=>{

    this.setState({
        file:e.target.files[0]
    });

}



handleUpload=async()=>{


    try{

        const formData=new FormData();

        formData.append(
            "document",
            this.state.file
        );


        await API.post(
            "/documents/upload",
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );


        this.setState({
            message:"Document uploaded successfully"
        });


        this.props.refreshDocuments();


    }
    catch(error){

        console.log(error);

        this.setState({
            message:"Upload failed"
        });

    }

}



render(){

return(

<div className="upload-box">


<h3>
Upload Document
</h3>


<input
type="file"
onChange={this.handleChange}
/>


<button onClick={this.handleUpload}>
Upload
</button>


<p>
{this.state.message}
</p>


</div>

)

}


}


export default DocumentUpload;