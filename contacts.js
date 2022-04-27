const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname + '/db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(el => el.id == contactId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(el => el.id != contactId);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    return updatedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, removeContact, getContactById, addContact };
