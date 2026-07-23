import { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

class Sidebar extends Component {

    render() {

        return (

            <aside className="sidebar">

                <h2 className="sidebar-title">
                    AI Assistant
                </h2>

                <ul className="sidebar-menu">

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

                </ul>

            </aside>

        );
    }
}

export default Sidebar;