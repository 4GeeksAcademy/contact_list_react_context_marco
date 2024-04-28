const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contactList: [],
            currentAgenda: ""
        },
        actions: {
            createAgenda: async (agendaSlug) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            slug: "your-slug-here"
                        })
                    });
                    if (!response.ok) {
                        throw new Error("Failed to create agenda");
                    }
                    const data = await response.json();
                    setStore({ currentAgenda: data.slug });
                } catch (error) {
                    console.error(error);
                }
            },
            getAgenda: async (slug) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch agenda");
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching agenda:", error);
                    throw error;
                }
            },
            fetchContacts: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().currentAgenda}/contacts`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch contacts");
                    }
                    const data = await response.json();
                    setStore({ contactList: data.contacts });
                } catch (error) {
                    console.error(error);
                }
            },
			addContact: async (formData) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().currentAgenda}/contacts`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							name: formData.fullName,
							phone: formData.phone,
							email: formData.email,
							address: formData.address
						})
					});
					if (!response.ok) {
						throw new Error("Failed to add contact");
					}
					getActions().fetchContacts(); // Fetch updated contact list after adding new contact
				} catch (error) {
					console.error(error);
				}
			},
            updateContact: async (contactId, formData) => {
                try {
                    console.log('Updating contact with ID:', contactId);
                    console.log('FormData:', formData);
            
                    // Construct the request payload
                    const requestBody = {
                        name: formData.fullName, // Assuming formData.fullName contains the updated name
                        phone: formData.phone || '', // Use formData.phone if available, or an empty string if not provided
                        email: formData.email || '', // Use formData.email if available, or an empty string if not provided
                        address: formData.address || '' // Use formData.address if available, or an empty string if not provided
                    };
            
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().currentAgenda}/contacts/${contactId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody) // Convert the payload to JSON string
                    });
            
                    console.log('Update contact response:', response);
            
                    if (!response.ok) {
                        throw new Error("Failed to update contact");
                    }
            
                    getActions().fetchContacts();
                } catch (error) {
                    console.error(error);
                }
            },
            deleteContact: async (contactId) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().currentAgenda}/contacts/${contactId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete contact");
                    }
                    // Fetch updated contact list after successful deletion
                    getActions().fetchContacts();
                } catch (error) {
                    console.error(error);
                }
            },
            deleteAgenda: async (agendaSlug) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete agenda");
                    }
                    // Clear the currentAgenda from the store after successful deletion
                    setStore({ currentAgenda: "", contactList: [] });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
};

export default getState;