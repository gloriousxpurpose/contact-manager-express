const router = require('express').Router()

const routes = [
    require('./contact.route'),

];

routes.forEach((route) => router.use(route))

module.exports = router