const express = require("express")
const router = express.Router()
const { addBills, 
        getBills } = require("../controllers/billsController")



router.post("/addbills", addBills);

router.get("/getbills", getBills);

module.exports = router