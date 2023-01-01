const { Product } = require("../models/product");

// Create Products
function addProduct(router) {
  router.post("/product/create/new", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
}

// Get All products with Search
function getProduct(router) {
  router.get("/", async (req, res) => {
    try {
      const qNew = req.query.name; // To search with name
      const qCategory = req.query.category; // To search with category
      let products;
      if (qNew) {
        products = await products.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await products
          .find({ categories: $in[qCategory] })
          .sort({ createdAt: -1 })
          .limit(1);
      } else {
        products = await Product.find();
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
}

module.exports = { addProduct, getProduct };
