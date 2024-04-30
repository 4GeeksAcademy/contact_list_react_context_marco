import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">contact.io</Link>
                {store.currentAgenda ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/new-contact">
                                <button className="btn btn-success">Add New Contact</button>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div className="alert alert-warning" role="alert">
                        Please create an agenda first before adding a new contact.
                    </div>
                )}
            </div>
        </nav>
    );
};