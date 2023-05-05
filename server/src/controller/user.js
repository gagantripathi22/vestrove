const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const saltRounds = 10;

const signUp = async (req, res) => {
  const data = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  console.log(data);

  try {
    bcrypt.hash(data.password, saltRounds).then(async function (hash) {
      data.password = hash;
      console.log(data);
      const dataToSave = await data.save();
      res.status(200);
      console.log(dataToSave);
      res.json(dataToSave);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const fetchedUser = await User.find({ email: req.body.email });
    const match = await bcrypt.compare(
      req.body.password,
      fetchedUser[0].password
    );
    if (match) {
      res.status(200);
      jwt.sign(
        { fetchedUser },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "86400s" },
        (err, token) => {
          res.json({
            token,
            user: fetchedUser,
          });
        }
      );
    } else {
      throw "Incorrect Credentials";
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addToCard = async (req, res) => {
  try {
    const itemToAdd = await User.updateOne(
      { email: req.body.email },
      { $addToSet: { cart: req.body.itemId } }
    );
    res.status(200).json({ itemToAdd });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const itemToRemove = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $pull: {
          cart: req.body.itemId,
        },
      }
    );
    res.status(200).json({ itemToRemove });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const itemToAdd = await User.updateOne(
      { email: req.body.email },
      { $addToSet: { wishlist: req.body.itemId } }
    );
    res.status(200).json({ itemToAdd });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const itemToRemove = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $pull: {
          wishlist: req.body.itemId,
        },
      }
    );
    res.status(200).json({ itemToRemove });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

var userController = {
  signUp: signUp,
  login: login,
  addToCard: addToCard,
  removeFromCart: removeFromCart,
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist,
};

module.exports = userController;
