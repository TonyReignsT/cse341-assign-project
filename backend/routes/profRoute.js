const routes = require('express').Router();
const profController = require('../controllers/profController');

routes.get('/professional', profController.professional)

module.exports = routes