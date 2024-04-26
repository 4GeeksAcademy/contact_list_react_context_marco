import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../appContext'; // Import the context

const UpdateContact = ({ contactId, onSubmit }) => {
    const { store, actions } = useContext(Context); // Access store and actions from the context

    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch contact data when component mounts
        fetchContactData();
    }, []);

    const fetchContactData = async () => {
        try {
            // Find the contact in the store based on the contact ID
            const contact = store.contactList.find(contact => contact.id === contactId);
            if (!contact) {
                throw new Error('Contact not found');
            }
            // Populate form fields with contact data
            setFormData(contact);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.updateContact(contactId, formData); // Call the updateContact action with the updated data
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                placeholder="Full Name"
            />
            <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Phone"
            />
            <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Address"
            />
            <button type="submit">Update Contact</button>
        </form>
    );
};

export default UpdateContact;