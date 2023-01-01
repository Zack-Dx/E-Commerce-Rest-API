const { Product } = require("../models/product");

function addProduct(router) {
  router.post("/create/new", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
}
module.exports = { addProduct };
