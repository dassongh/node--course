const contactsHelper = require('./contacts');
const argv = require('yargs').argv;

(async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsHelper.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await contactsHelper.getContactById(id);
      if (!contact) throw new Error(`Contact with id=${id} not found`);

      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsHelper.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const updatedContacts = await contactsHelper.removeContact(id);
      console.log(updatedContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
})(argv);
