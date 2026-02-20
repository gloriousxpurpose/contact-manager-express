const contactModel = require('../models/contact.model')
const { errorHandler, successHandler } = require('../utils/responses')

const getAllContacts = async (req, res) => {
    try {
        const userId = req.user.userId

        const { sortOrder, search } = req.query

        if (sortOrder && !['desc', 'asc'].includes(sortOrder)) {
            return errorHandler(res, false, 400, "sortOrder harus desc atau asc")
        }

        const filters = { sortOrder, search }

        const allContacts = await contactModel.getAllContacts(userId, filters)

        if (!allContacts || allContacts.length === 0) {
            return errorHandler(res, false, 404, "Belum ada kontak")
        }

        return successHandler(res, true, 200, "Menampilkan seluruh kontak", allContacts)

    } catch (error) {
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

const createContact = async (req, res) => {
    try {
        const { fullname, email, phone, company, job_title, notes } = req.body
        const userId = req.user.userId

        if (!fullname || !email || !phone) {
            return errorHandler(res, false, 400, "Fullname, email, dan phone wajib diisi")
        }

        const createdContact = await contactModel.createContact(
            userId, fullname, email, phone, company, job_title, notes
        )

        return successHandler(res, true, 201, "Kontak berhasil dibuat", createdContact)

    } catch (error) {
        if (error.code === 'P2002') return errorHandler(res, false, 409, "Kontak sudah terdaftar")
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

const updateContact = async (req, res) => {
    try {
        const { contactId } = req.params
        const { fullname, email, phone, company, job_title, notes } = req.body

        if (!fullname || !email || !phone) {
            return errorHandler(res, false, 400, "Fullname, email, dan phone wajib diisi")
        }

        const updatedContact = await contactModel.updateContact(
            contactId, fullname, email, phone, company, job_title, notes
        )

        return successHandler(res, true, 200, "Kontak berhasil diperbarui", updatedContact)

    } catch (error) {
        if (error.code === 'P2025') return errorHandler(res, false, 404, "Kontak tidak ditemukan")
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

const deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params

        const deletedContact = await contactModel.deleteContact(contactId)

        return successHandler(res, true, 200, "Kontak berhasil dihapus", deletedContact)

    } catch (error) {
        if (error.code === 'P2025') return errorHandler(res, false, 404, "Kontak tidak ditemukan")
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

const getContactById = async (req, res) => {
    try {
        const { contactId } = req.params

        const contact = await contactModel.getContactById(contactId)

        if (!contact) {
            return errorHandler(res, false, 404, "Kontak tidak ditemukan")
        }

        return successHandler(res, true, 200, "Kontak berhasil ditemukan", contact)

    } catch (error) {
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById,
}