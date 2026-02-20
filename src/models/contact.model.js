const prisma = require('../database/connection')
const { v4: uuidv4 } = require('uuid')

const getAllContacts = (userId, filters = {}) => {
    const where = {
        user_id: userId,
        ...(filters.search && {
            OR: [
                { fullname: { contains: filters.search, mode: 'insensitive' } },
                { email:    { contains: filters.search, mode: 'insensitive' } },
                { phone:    { contains: filters.search, mode: 'insensitive' } },
            ]
        })
    }

    return prisma.contacts.findMany({
        where,
        select: {
            contact_id: true,
            fullname:   true,
            email:      true,
            phone:      true,
            company:    true,
            job_title:  true,
            notes:      true,
            created_at: true,
        },
        orderBy: {
            fullname: filters.sortOrder === 'desc' ? 'desc' : 'asc',
        }
    })
}

const createContact = (userId, fullname, email, phone, company, job_title, notes) =>
    prisma.contacts.create({
        data: {
            contact_id: uuidv4(),
            user_id: userId,
            fullname,
            email,
            phone,
            company,
            job_title,
            notes,
        },
        select: {
            contact_id: true,
            fullname:   true,
            email:      true,
            phone:      true,
            company:    true,
            job_title:  true,
            notes:      true,
            created_at: true,
        }
    })

const updateContact = (contactId, fullname, email, phone, company, job_title, notes) =>
    prisma.contacts.update({
        where: { contact_id: contactId },
        data: {
            fullname,
            email,
            phone,
            company,
            job_title,
            notes,
        },
        select: {
            fullname:  true,
            email:     true,
            phone:     true,
            company:   true,
            job_title: true,
            notes:     true,
        }
    })

const deleteContact = (contactId) =>
    prisma.contacts.delete({
        where: { contact_id: contactId },
        select: {
            contact_id: true,
            fullname:   true,
            email:      true,
            phone:      true,
            company:    true,
            job_title:  true,
            notes:      true,
        }
    })

const getContactById = (contactId) =>
    prisma.contacts.findUnique({
        where: { contact_id: contactId },
        select: {
            contact_id: true,
            fullname:   true,
            email:      true,
            phone:      true,
            company:    true,
            job_title:  true,
            notes:      true,
        }
    })

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById,
}