import yargs from "yargs";
import { listContacts } from "./contacts.js";
import { getContactById } from "./contacts.js";
import { removeContact } from "./contacts.js";
import { addContact } from "./contacts.js";

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            return console.table(allContacts);
        case "get":
            const searchedContact = await getContactById(id);
            return console.log(searchedContact);
        case "remove":
            const removedContact = await removeContact(id);
            return console.log(removedContact);
        case "add":
            const newContact = await addContact(name, email, phone);
            return console.log(newContact)
        default: 
            console.warn('\x1B[31m Unknown action type!');
    }
}
const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);
