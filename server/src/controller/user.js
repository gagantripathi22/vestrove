const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Item = require('../models/item');

const saltRounds = 10;

const signUp = async (req, res) => {
  const data = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });

  const fetchedUserTokenData = {
    email: data.email,
    _id: data._id,
  };
  try {
    const findEmail = await User.find({ email: req.body.email });
    if (findEmail.length > 0) {
      res.status(409).json({ message: 'This email is already registered' });
    } else {
      bcrypt.hash(data.password, saltRounds).then(async function (hash) {
        data.password = hash;
        console.log(data);
        const dataToSave = await data.save();
        res.status(200);
        console.log(dataToSave);
        jwt.sign(
          { fetchedUserTokenData },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '86400s' },
          (err, token) => {
            res.json({ token, user: dataToSave });
          }
        );
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const fetchedUser = await User.find({ email: req.body.email });
    console.log(fetchedUser);
    if (fetchedUser.length > 0) {
      const match = await bcrypt.compare(
        req.body.password,
        fetchedUser[0].password
      );
      const fetchedUserTokenData = {
        email: fetchedUser[0].email,
        _id: fetchedUser[0]._id,
      };
      console.log(fetchedUserTokenData);
      if (await match) {
        res.status(200);
        jwt.sign(
          { fetchedUserTokenData },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '86400s' },
          (err, token) => {
            res.json({
              token,
              user: fetchedUserTokenData,
            });
          }
        );
      } else {
        res.status(400).json('Incorrect Credentials');
      }
    } else {
      res.status(400).json('Invalid Credentials');
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addToCard = async (req, res) => {
  try {
    const itemToAdd = await User.updateOne(
      { email: req.body.email },
      { $addToSet: { cart: { _id: req.body.itemId } } }
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
      { $addToSet: { wishlist: { _id: req.body.itemId } } }
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

const getUserInfo = async (req, res) => {
  console.log('getuserinfo inside');
  try {
    const userIdToFetch = req.body.userId;
    const fetchUser = await User.find({ _id: userIdToFetch });
    if (fetchUser) {
      res.status(200).json({
        firstname: fetchUser[0]?.firstname,
        lastname: fetchUser[0]?.lastname,
        email: fetchUser[0]?.email,
        wishlist: fetchUser[0]?.wishlist,
        cart: fetchUser[0]?.cart,
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getWishlist = async (req, res) => {
  try {
    const IdToFetch = req.body.userId;
    // if (IdToFetch === req.authData.fetchedUser[0]._id) {
    const fetchWishlist = await User.find({ _id: IdToFetch });
    const getItemUsingId = await Item.find({
      _id: { $in: fetchWishlist[0]?.wishlist },
    });
    if (getItemUsingId) {
      res.status(200).json({
        wishlist: getItemUsingId,
      });
    }
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getCart = async (req, res) => {
  try {
    const IdToFetch = req.body.userId;
    // if (IdToFetch === req.authData.fetchedUser[0]._id) {
    const fetchCart = await User.find({ _id: IdToFetch });
    const getItemUsingId = await Item.find({
      _id: { $in: fetchCart[0]?.cart },
    });
    if (getItemUsingId) {
      res.status(200).json({
        cart: getItemUsingId,
      });
    }
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const IdToFetch = req.params.id;
    if (IdToFetch === req.authData.fetchedUser[0]?._id) {
      const getUser = await User.find({ _id: IdToFetch });
      if (getUser) {
        const filter = { _id: IdToFetch };
        const toUpdate = req.body;
        console.log(filter, toUpdate);
        try {
          const userUpdate = await User.findOneAndUpdate(filter, toUpdate);
          res.status(200).json(userUpdate);
        } catch (error) {
          res.status(400).json(error);
        }
      }
    }
  } catch (error) {
    res.status(400).json(error.messsage);
  }
};

const updateProfileData = async (req, res) => {
  try {
    const IdToFetch = req.params.id;
    const getUser = await User.find({ _id: IdToFetch });
    if (getUser) {
      const filter = { _id: IdToFetch };
      const toUpdate = req.body;
      console.log(filter, toUpdate);
      try {
        const userUpdate = await User.findOneAndUpdate(filter, toUpdate);
        res.status(200).json(userUpdate);
      } catch (error) {
        res.status(400).json(error);
      }
    }
  } catch (error) {
    res.status(400).json(error.messsage);
  }
};

const updatePassword = async (req, res) => {
  try {
    const IdToFetch = req.params.id;
    const getUser = await User.find({ _id: IdToFetch });
    console.log(req.body.currentPassword, getUser[0]?.password);
    if (await bcrypt.compare(req.body.currentPassword, getUser[0]?.password)) {
      const filter = { _id: IdToFetch };
      const newHashedPassword = await bcrypt.hash(
        req.body.newPassword,
        saltRounds
      );
      const toUpdate = {
        password: newHashedPassword,
      };
      console.log(filter, toUpdate);
      try {
        const userUpdate = await User.findOneAndUpdate(filter, toUpdate);
        res.status(200).json(userUpdate);
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json('Incorrect Current Password');
    }
  } catch (error) {
    res.status(400).json(error.messsage);
  }
};

var userController = {
  signUp: signUp,
  login: login,
  addToCard: addToCard,
  removeFromCart: removeFromCart,
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist,
  getUserInfo: getUserInfo,
  getWishlist: getWishlist,
  getCart: getCart,
  updateUserInfo: updateUserInfo,
  updateProfileData: updateProfileData,
  updatePassword: updatePassword,
};

module.exports = userController;
