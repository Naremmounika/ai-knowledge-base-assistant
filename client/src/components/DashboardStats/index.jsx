import {Component} from "react";
import API from "../../api/axios";
import "./index.css";


class DashboardStats extends Component{


state={

totalDocuments:0,
totalQuestions:0,
recentUploads:[]

};



componentDidMount(){

this.loadStats();

}



loadStats=async()=>{


try{


const response = await API.get(
"/dashboard"
);



this.setState({

totalDocuments:
response.data.stats.totalDocuments,


totalQuestions:
response.data.stats.totalQuestions,


recentUploads:
response.data.stats.recentUploads || []

});


}
catch(error){

console.log(error);

}


}



render(){


return(

<div className="stats">


<div className="card">

<h3>
Documents
</h3>

<p>
{this.state.totalDocuments}
</p>

</div>



<div className="card">

<h3>
Questions
</h3>

<p>
{this.state.totalQuestions}
</p>

</div>



<div className="recent">


<h3>
Recent Uploads
</h3>


{

this.state.recentUploads.map(
(doc,index)=>(

<p key={index}>

{doc.originalName}

</p>

)

)

}


</div>


</div>

)


}


}


export default DashboardStats;