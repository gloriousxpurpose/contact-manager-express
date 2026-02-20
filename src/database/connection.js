require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

prisma.$connect()
    .then(() => console.log('Connected to database via Prisma'))
    .catch(err => console.error('Connection failed', err))

module.exports = prisma