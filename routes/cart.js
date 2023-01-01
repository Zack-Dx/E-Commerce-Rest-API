const { Cart } = require("../models/cart");
function cartController(router) {
  router.post("/addtoCart/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const cartexists = await Cart.find({ userId });
      if (cartexists) {
        return res.status(401).send(`Cart already exists`);
      }
      const newCart = new Cart({
        userId,
        products: {
          productId: productId,
        },
      });
      await newCart.save();
      return res.status(200).json(newCart);
    } catch (error) {
      return res.status(401).json(error);
    }
  });
}

module.exports = { cartController };
