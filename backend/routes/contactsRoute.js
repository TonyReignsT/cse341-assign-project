// routes/contactsRoute.js
const router = require('express').Router();
const contactsController = require('../controllers/contactsController');

router.get('/contacts', contactsController.getAllContacts);
router.get('/contacts/:id', contactsController.getContactById);

module.exports = router;
