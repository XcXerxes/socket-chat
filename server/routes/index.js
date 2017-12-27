const express = require('express')
const router = express.Router()
const db = require('../models')
const api = require('../api')

router.get('/all', (req, res) => {
    api.all(req, res, db.user)
})

module.exports = router
