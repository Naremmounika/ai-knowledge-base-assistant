import  { Component } from "react";

import "./index.css";

class DocumentCard extends Component {

    deleteDocument = () => {

        this.props.onDelete(
            this.props.document._id
        );

    };

    openChat = () => {

        window.location.href =
        `/chat/${this.props.document._id}`;

    };

    render() {

        const { document } = this.props;

        return (

            <div className="document-card">

                <h3>

                    {document.originalName}

                </h3>

                <p>

                    {document.fileType}

                </p>

                <p>

                    {(document.fileSize / 1024).toFixed(2)}
                    KB

                </p>

                <div className="document-buttons">

                    <button
                        onClick={this.openChat}
                    >
                        Open Chat
                    </button>

                    <button
                        className="delete-btn"
                        onClick={this.deleteDocument}
                    >
                        Delete
                    </button>

                </div>

            </div>

        );

    }

}

export default DocumentCard;