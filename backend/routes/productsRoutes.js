const express = require("express")
const  { getProduct, 
         addProduct, 
         updateProduct, 
         deleteProduct} = require("../controllers/productController")

const router = express.Router()

router.get("/getproducts", getProduct);

router.post("/addproducts", addProduct);

router.put("/updateproducts", updateProduct);

router.post("/deleteproducts", deleteProduct);

module.exports = router