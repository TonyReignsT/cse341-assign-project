// controllers/contactsController.js
const { getDb } = require("../modules/db");
const { ObjectId } = require("mongodb");

// GET
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
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ message: "Error fetching contact" });
  }
};

// POST
const createContact = async (req, res) => {
  try {
    const db = getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // Validation
    if (Object.values(contact).some((v) => !v)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.collection("contacts").insertOne(contact);

    res.status(201).json({
      message: "Contact created",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating contact" });
  }
};

// PUT 
const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send(); // required by rubric
  } catch (err) {
    res.status(500).json({ message: "Error updating contact" });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
