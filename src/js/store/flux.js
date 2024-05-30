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
                        if (response.status === 404) {
                            setStore({ currentAgenda: "", agendaExists: false });
                        } else {
                            throw new Error("Failed to fetch agenda");
                        }
                    } else {
                        const data = await response.json();
                        setStore({ currentAgenda: data.slug, agendaExists: true }); // Set currentAgenda in the store
                        return data;
                    }
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
					getActions().fetchContacts(); 
				} catch (error) {
					console.error(error);
				}
			},
            updateContact: async (contactId, formData) => {
                try {
                    console.log('Updating contact with ID:', contactId);
                    console.log('FormData:', formData);
            
                    const requestBody = {
                        name: formData.fullName, 
                        phone: formData.phone || '', 
                        email: formData.email || '', 
                        address: formData.address || '' 
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
                    setStore({ currentAgenda: "", contactList: [] });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
};

export default getState;