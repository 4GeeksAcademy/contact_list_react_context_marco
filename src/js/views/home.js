import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [agendaSlug, setAgendaSlug] = useState("");

    useEffect(() => {
        actions.fetchContacts();
    }, []);

    const handleDeleteContact = (contactId) => {
        console.log(contactId)
        actions.deleteContact(contactId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.createAgenda(agendaSlug);
        // Clear the input field after submitting
        setAgendaSlug("");
    };

    const handleChange = (e) => {
        setAgendaSlug(e.target.value);
    };

    const handleDeleteAgenda = async () => {
        await actions.deleteAgenda(store.currentAgenda);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{store.currentAgenda ? `${store.currentAgenda}'s Contact List` : "My Contact List"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="agendaSlug" className="form-label">Enter Desired Username</label>
                    <input type="text" className="form-control" id="agendaSlug" value={agendaSlug} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create Agenda</button>
                {store.currentAgenda && (
                    <button onClick={handleDeleteAgenda} className="btn btn-danger ms-2">Delete Agenda</button>
                )}
            </form>
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
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">
                                    Email: {contact.email}<br />
                                    Phone: {contact.phone}<br />
                                    Address: {contact.address}<br />
                                </p>
                                <Link to={{ pathname: `/update-contact/${contact.id}` }} className="btn btn-primary">Update Contact</Link>
                                <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger">Delete Contact</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};