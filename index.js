const { program } = require("commander");
require('colors');

const {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.log('Contact list:'.green);
      console.table(contacts);
      break;

    case 'get':
      const searchedContact = await getContactsById(id);
      console.log('Data for the searched contact:'.green);
      console.table(searchedContact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log('New contact has been added:'.green);
      console.table(newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(`Contact with id ${id} has been deleted`.green);
      console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!'.red);
  }
}

invokeAction(argv);