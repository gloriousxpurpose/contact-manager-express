const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact.controller')

router.get('/contacts', contactController.getAllContacts) 
router.post('/contacts', contactController.createContact)
router.put('/contacts/:contactId', contactController.updateContact)
router.delete('/contacts/:contactId', contactController.deleteContact)
router.get('/contacts/:contactId', contactController.getContactById)

module.exports = router