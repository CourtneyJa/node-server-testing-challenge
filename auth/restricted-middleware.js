const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  //changed to get a cookie and make its valid
  const token = req.headers.authorization;
  if (token) {
    jwt
      .verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ errorMessage: "Token not verified" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Unexpected error", err });
      });
  } else {
    res.status(400).json({ errorMessage: "No token provided" });
  }
};
