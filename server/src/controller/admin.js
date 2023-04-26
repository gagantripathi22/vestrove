const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const searchAdmin = async (req, res) => {
  console.log("searchADmin");
  try {
    const AdminData = await Admin.find({ username: req.body.username });
    console.log(req.body.password, AdminData[0].password);
    if (AdminData) {
      const comparePass = await bcrypt.compare(
        req.body.password,
        AdminData[0].password
      );
      if (comparePass) {
        res.status(200).json(comparePass);
      } else {
        throw "Access Denied";
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const addAdmin = async (req, res) => {
  const data = new Admin({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const addAdmin = await data.save();
    res.status(200).json(addAdmin);
  } catch (error) {
    res.status(400).json(error);
  }
};

const AdminController = {
  searchAdmin: searchAdmin,
  addAdmin: addAdmin,
};

module.exports = AdminController;
