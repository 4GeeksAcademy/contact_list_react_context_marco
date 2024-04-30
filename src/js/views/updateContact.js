import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const UpdateContact = () => {
    const { id } = useParams(); 
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        actions.updateContact(id, formData); 
        alert("Contact updated successfully!");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Update Contact</h1>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Full Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        E-Mail:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="E-Mail"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Phone"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address:
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Address"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Contact
                </button>
            </form>
            <Link to="/" className="btn btn-secondary mt-3">
                Back to Home
            </Link>
        </div>
    );
};

export default UpdateContact;
