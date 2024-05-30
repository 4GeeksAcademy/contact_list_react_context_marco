import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [agendaSlug, setAgendaSlug] = useState("");

    useEffect(() => {
        if (store.currentAgenda) {
            actions.fetchContacts();
        }
    }, [store.currentAgenda]);

    const handleDeleteContact = (contactId) => {
        actions.deleteContact(contactId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.createAgenda(agendaSlug);
        setAgendaSlug("");
        actions.fetchContacts();
    };

    const handleChange = (e) => {
        setAgendaSlug(e.target.value);
    };

    const handleGetAgenda = async () => {
        // Check if currentAgenda already exists before calling getAgenda
        if (!store.currentAgenda) {
            await actions.getAgenda(agendaSlug);
            actions.fetchContacts();
        }
    };

    const handleDeleteAgenda = async () => {
        await actions.deleteAgenda(store.currentAgenda);
    };

    return (
        <div className="container mt-5">
            {store.agendaExists === false && <div className="alert alert-danger">Agenda Does Not Exist</div>}
            <h1 className="text-center mb-4">{store.agendaExists && store.currentAgenda ? `${store.currentAgenda}'s Contact List` : "My Contact List"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="agendaSlug" className="form-label">Enter Username</label>
                    <input type="text" className="form-control" id="agendaSlug" value={agendaSlug} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    {store.currentAgenda && store.agendaExists ? (
                        <button onClick={handleDeleteAgenda} className="btn btn-danger">Delete Agenda</button>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-primary">Create Agenda</button>
                            <button onClick={handleGetAgenda} className="btn btn-success ms-2">Get Existing Agenda</button>
                        </>
                    )}
                </div>
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
                                <Link to={{ pathname: `/update-contact/${contact.id}` }} className="btn btn-primary me-2">Update Contact</Link>
                                <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger">Delete Contact</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};