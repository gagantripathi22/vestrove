const express = require("express");
const router = express.Router();
const Admin = require("../controller/admin");

router.get("/searchAdmin", Admin.searchAdmin);
router.post("/addAdmin", Admin.addAdmin);

module.exports = router;
