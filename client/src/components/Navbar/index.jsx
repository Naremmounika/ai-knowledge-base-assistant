import  { Component } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import "./index.css";

class Navbar extends Component {

    static contextType = AuthContext;

    state = {
        logout:false,
    }

    onLogout = () =>{
        this.context.logout();

        this.setState({
            logout:true,
        });
    }

    render(){

        if(this.state.logout){
            return <Navigate to="/login" replace />
        }

        return(
            <nav className="navbar">

                <div className="logo">
                    AI Knowledge Base
                </div>

                <ul className="nav-links">

                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/documents">
                            Documents
                        </Link>
                    </li>

                    <li>

                        <button
                        className="logout-btn"
                        onClick={this.onLogout}
                        >
                            Logout
                        </button>

                    </li>

                </ul>

            </nav>
        )
    }

}

export default Navbar;