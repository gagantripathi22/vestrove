const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, "base64").toString("ascii");
    const [username, password] = decoded.split(":");
    const authenticatedUser = await Admin.findOne({ username: username });
    // console.log("Authenticated User : ", authenticatedUser);
    if (authenticatedUser) {
      const match = await bcrypt.compare(password, authenticatedUser.password);
      if (match) {
        req.authenticatedUser = authenticatedUser;
      }
      next();
    } else {
      res.status(400).json({ error: "Authorization Failed" });
    }
  }
};
