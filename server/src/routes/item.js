const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const { verifyToken } = require("../services/verifyJwt");
const basicAuth = require("../services/basicAuth");
const multer = require("multer");
// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/addItem",
  basicAuth,
  upload.single("file"),
  Item.uploadImage,
  Item.addItem
);
router.delete("/removeItem/:id", basicAuth, Item.removeItem);
router.get("/men/all", basicAuth, Item.getAllMaleItem);
router.get("/women/all", basicAuth, Item.getAllFemaleItem);
router.get("/getAll", basicAuth, Item.getAll);
router.patch("/updateItem/:id", basicAuth, Item.updateItem);
router.get("/men/:category", basicAuth, Item.getMaleItemByCategory);
router.get("/women/:category", basicAuth, Item.getWomenItemByCategory);
router.get("/product/:id", basicAuth, Item.getItemById);
router.get("/recentSix", basicAuth, Item.getRecentSixProducts);

module.exports = router;
