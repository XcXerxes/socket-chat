const express = require('express')
const router = express.Router()
const db = require('../models')
const api = require('../api')
const frontendUser = require('../api/frontend-user')

/**
 * ========= 前台 =========
 */
// 用户登陆
router.post('/login', frontendUser)

router.get('/all', (req, res) => {
    api.all(req, res, db.user)
})


module.exports = router
