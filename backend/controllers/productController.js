const Product = require("../models/productModel")

//for add or fetch
const getProduct= async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).send(products);

    } catch(error) {
        console.log(error);
    }
}

//for add
 const addProduct = async (req, res) => {

    try {

        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send("Products Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}

//for update
 const updateProduct = async (req, res) => {
    try {

        await Product.findOneAndUpdate({_id: req.body.productId}, req.body, {new: true})
        res.status(201).json("Product Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

//for delete
 const deleteProduct = async (req, res) => {
    try {

        await Product.findOneAndDelete({_id: req.body.productId})
        res.status(200).json("Product Deleted!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}