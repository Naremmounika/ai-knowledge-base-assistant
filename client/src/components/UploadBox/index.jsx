import  { Component } from "react";

import api from "../../services/api";

import "./index.css";

class UploadBox extends Component {

    state = {
        file: null,
        loading: false,
    };

    handleFileChange = (event) => {

        this.setState({
            file: event.target.files[0],
        });

    };

    uploadDocument = async () => {

        if (!this.state.file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append(
            "document",
            this.state.file
        );

        this.setState({
            loading: true,
        });

        try {

            await api.post(
                "/documents/upload",
                formData
            );

            alert("Document Uploaded Successfully");

            this.setState({
                file: null,
                loading: false,
            });

            if (this.props.onUploadSuccess) {
                this.props.onUploadSuccess();
            }

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

            this.setState({
                loading: false,
            });

        }

    };

    render() {

        return (

            <div className="upload-box">

                <input
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={this.handleFileChange}
                />

                <button
                    onClick={this.uploadDocument}
                >

                    {

                        this.state.loading ?

                            "Uploading..."

                            :

                            "Upload"

                    }

                </button>

            </div>

        );

    }

}

export default UploadBox;