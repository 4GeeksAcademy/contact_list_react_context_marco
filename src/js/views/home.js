import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts();
    }, []);

    const handleDeleteContact = (contactId) => {
        console.log(contactId)
        actions.deleteContact(contactId);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">My Contact List</h1>
            <div className="row">
                {store.contactList.map((contact, index) => (
                    <div key={index} className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <img
                                    src="https://via.placeholder.com/100"
                                    className="card-img-top rounded-circle"
                                    alt="Contact"
                                    style={{ width: "100px", height: "100px", marginRight: "15px" }}
                                />
                                <h5 className="card-title">{contact.full_name}</h5>
                                <p className="card-text">
                                    Email: {contact.email}<br />
                                    Phone: {contact.phone}<br />
                                    Address: {contact.address}<br />
                                </p>
                                <Link to={{ pathname: "/update-contact", state: { initialData: contact } }} className="btn btn-primary">Update Contact</Link>
                                <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger">Delete Contact</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};