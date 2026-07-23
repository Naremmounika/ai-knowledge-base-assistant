import  { Component } from "react";

import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import UploadBox from "../../components/UploadBox";
import DocumentCard from "../../components/DocumentCard";
import Loader from "../../components/Loader";

import "./index.css";

class Documents extends Component {

    state={
        documents:[],
        loading:true,
    };

    componentDidMount(){
        this.getDocuments();
    }

    getDocuments=async()=>{

        try{

            const response=await api.get("/documents");

            this.setState({
                documents:response.data.documents || [],
                loading:false,
            });

        }catch(error){

            console.log(error);

            this.setState({
                loading:false,
            });

        }

    };

    deleteDocument=async(id)=>{

        const confirmDelete=window.confirm(
            "Delete this document?"
        );

        if(!confirmDelete){
            return;
        }

        try{

            await api.delete(`/documents/${id}`);

            this.getDocuments();

        }catch(error){

            console.log(error);

            alert("Delete Failed");

        }

    };

    render(){

        if(this.state.loading){
            return <Loader/>
        }

        return(

            <>

            <Navbar/>

            <div className="documents-layout">

                <Sidebar/>

                <div className="documents-content">

                    <h1>Documents</h1>

                    <UploadBox
                        onUploadSuccess={this.getDocuments}
                    />

                    {

                        this.state.documents.length===0 ?

                        (

                            <p>No Documents Uploaded</p>

                        )

                        :

                        (

                            this.state.documents.map(document=>(
                                <DocumentCard
                                    key={document._id}
                                    document={document}
                                    onDelete={this.deleteDocument}
                                />
                            ))

                        )

                    }

                </div>

            </div>

            </>

        )

    }

}

export default Documents;