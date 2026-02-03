// controllers/contactsController.js
const { getDb } = require("../modules/db");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ message: "Error fetching contact" });
  }
};

module.exports = {
  getAllContacts,
  getContactById
};
