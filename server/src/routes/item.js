const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const { verifyToken } = require("../services/verifyJwt");
const basicAuth = require("../services/basicAuth");

router.post("/addItem", basicAuth, Item.addItem);
router.delete("/removeItem/:id", basicAuth, Item.removeItem);
router.get("/male/all", basicAuth, Item.getAllMaleItem);
router.get("/female/all", basicAuth, Item.getAllFemaleItem);
router.get("/getAll", basicAuth, Item.getAll);
router.patch("/updateItem/:id", basicAuth, Item.updateItem);

module.exports = router;
