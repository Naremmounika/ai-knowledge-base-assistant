import  { Component } from "react";

import DocumentUpload from "../../components/DocumentUpload";
import DocumentList from "../../components/DocumentList";
import ChatBox from "../../components/ChatBox";
import SearchBox from "../../components/SearchBox";
import DashboardStats from "../../components/DashboardStats";

import "./index.css";


class Dashboard extends Component {


state={
    selectedDocument:null,
    refresh:false
}



selectDocument=(id)=>{

    this.setState({
        selectedDocument:id
    });

}



refreshDocuments=()=>{

    this.setState({
        refresh:!this.state.refresh
    });

}



render(){


return(

<div className="dashboard">


<h1>
AI Knowledge Base Assistant
</h1>
<SearchBox />

<DashboardStats/>
<div className="dashboard-grid">


<div>


<DocumentUpload

refreshDocuments={this.refreshDocuments}

/>



<DocumentList

refresh={this.state.refresh}

selectDocument={this.selectDocument}

/>


</div>



<div>


{

this.state.selectedDocument ?

<ChatBox

documentId={
this.state.selectedDocument
}

/>

:

<div className="select-message">

<h3>
Select a document to start chatting
</h3>

</div>

}



</div>



</div>


</div>

)


}


}


export default Dashboard;