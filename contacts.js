import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contact.json");

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find(el => el.id === contactId);
  return searchedContact || null;
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(el=>el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

export const addContact= async(name, email, phone)=> {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
