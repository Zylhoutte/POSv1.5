const express = require('express')
const router = express.Router()
const {  loginAdmin,} = require('../controllers/adminController')

const { protect } = require('../middleware/authMiddleware')



router.post('/admin', loginAdmin)








module.exports = router