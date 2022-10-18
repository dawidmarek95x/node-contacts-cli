const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
}

const getContactsById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter(({id}) => id === contactId);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactsById(contactId);
    const updatedContacts = contacts.filter(({id}) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return contact;
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
}