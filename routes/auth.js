const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

// Register User
function authController(router) {
  router.post("/register", async (req, res) => {
    try {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
}

// Login User
function loginController(router) {
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).redirect("/login");
      }

      const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return res.status(200).json({ msg: "Login Success" });
      }
      return res.status(422).send("Wrong Credentials");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
}
module.exports = { authController, loginController };
