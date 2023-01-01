const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

//Update User Profile

function updateUser(router) {
  try {
    router.put("/users/:id", async (req, res) => {
      if (req.body.userId === req.params.id) {
        if (req.body.password) {
          const hashPass = await bcrypt.hash(req.body.password, 10);
          const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: { password: hashPass },
            },
            { new: true }
          );
          return res.status(200).json(updateUser);
        }
      } else {
        return res
          .status(401)
          .json("You can only update your profile with a valid id");
      }
    });
  } catch (error) {
    return res.status(401).send("Something went wrong");
  }
}

module.exports = { updateUser };
