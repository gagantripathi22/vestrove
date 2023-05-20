const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { verifyToken } = require("../services/verifyJwt");

//Post Method
router.post("/signup", userController.signUp);

router.post("/addToCart", verifyToken, userController.addToCard);

router.delete("/removeFromCart", verifyToken, userController.removeFromCart);

router.post("/addToWishlist", verifyToken, userController.addToWishlist);

router.delete(
  "/removeFromWishlist",
  verifyToken,
  userController.removeFromWishlist
);

router.post("/login", userController.login);

router.post("/getUserData", verifyToken, userController.getUserInfo);

router.post("/getWishlist", verifyToken, userController.getWishlist);

router.post("/getCart", verifyToken, userController.getCart);

router.patch("/updateUser/:id", verifyToken, userController.updateUserInfo);

router.patch(
  "/updateProfile/:id",
  verifyToken,
  userController.updateProfileData
);

router.patch("/updatePassword/:id", verifyToken, userController.updatePassword);

module.exports = router;
