const express = require('express')
const router = express.Router()
const {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById
} = require('../controllers/contact.controller')

const {verifyToken} = require('../middlewares/auth.middleware')

router.get('/contact', verifyToken, getAllContacts) 
router.post('/contact', verifyToken, createContact)
router.patch('/contact/:contactId', verifyToken, updateContact)
router.delete('/contact/:contactId', verifyToken, deleteContact)
router.get('/contact/:contactId', verifyToken, getContactById)

module.exports = router