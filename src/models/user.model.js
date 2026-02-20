const prisma = require('../database/connection')
const { v4: uuidv4 } = require('uuid')

const getAllUsers = () =>
    prisma.users.findMany({
        select: {
            user_id: true,
            fullname: true,
            email: true,
        }
    })

const createUser = (fullName, email, password, role = 'user', verificationToken) =>
    prisma.users.create({
        data: {
            user_id: uuidv4(),
            fullname: fullName,
            email,
            password,
            role,
            verification_token: verificationToken,
        },
        select: {
            user_id: true,
            fullname: true,
            email: true,
            role: true,
        }
    })

const updateUser = (userId, fullName, email, password) =>
    prisma.users.update({
        where: { user_id: userId },
        data: {
            fullname: fullName,
            email,
            password,
        },
        select: {
            user_id: true,
            fullname: true,
            email: true,
        }
    })

const deleteUser = (userId) =>
    prisma.users.delete({
        where: { user_id: userId },
        select: {
            user_id: true,
            fullname: true,
            email: true,
            role: true,
        }
    })

const getUserById = (userId) =>
    prisma.users.findUnique({
        where: { user_id: userId },
        select: {
            user_id: true,
            fullname: true,
            email: true,
        }
    })

const getUserByEmail = (email) =>
    prisma.users.findMany({
        where: { email }
    })

const getUserByVerificationToken = (token) =>
    prisma.users.findMany({
        where: { verification_token: token },
        select: {
            user_id: true,
            fullname: true,
            email: true,
        }
    })

const verifyUserEmail = (token) =>
    prisma.users.updateMany({
        where: { verification_token: token },
        data: {
            is_verified: true,
            verification_token: null,
        }
    })

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    getUserByVerificationToken,
    verifyUserEmail
}