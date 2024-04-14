import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">contact.io</Link>
                <ul className="navbar-nav ml-auto">
                    {/* Link or button for navigating to new contact form */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/new-contact">
                            <button className="btn btn-success">Add New Contact</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};