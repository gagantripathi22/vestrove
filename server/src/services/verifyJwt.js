const jwt = require("jsonwebtoken");
require("dotenv").config();

verifyToken = (req, res, next) => {
  let bearerHeader = req.headers["x-access-token"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else {
    res.sendStatus(403);
  }

  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).send("Unauthorized (Invalid Token)");
    } else {
      req.authData = authData;
      next();
    }
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
