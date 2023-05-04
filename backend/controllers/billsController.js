const Bills = require('../models/billsModel.js')

//for add or fetch
 const getBills= async (req, res) => {
    try {

        const bills = await Bills.find();
        res.send(bills);

    } catch(error) {
        console.log(error);
    }
}

//for add
 const addBills = async (req, res) => {

    try {

        const newBills = new Bills(req.body);
        await newBills.save();
        res.send("Bill Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}

module.exports = {
    getBills,
    addBills,
}