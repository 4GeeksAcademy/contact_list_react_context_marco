const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contactList: [],
            currentAgenda: ""
        },
        actions: {
            createAgenda: async (agendaSlug) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/${agendaSlug}", {
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
            }
        }
    };
};

export default getState;