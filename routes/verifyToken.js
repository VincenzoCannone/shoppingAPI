const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer is index 0 the token is index 1
    jwt.verify(
      token,
      process.env.JWT_SEC,

      (err, user) => {
        if (err) res.status(403).json("Your Token is not valid!");
        req.user = user; //! user is fantasy name
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!!");
  }
};

const verifyTokenandAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // will go to the route params "/:id" in user.js
    } else {
      res.status(403).json("Denied Access, please retry");
    }
  });
};

module.exports = { verifyToken, verifyTokenandAuthorization }; // will call the user.js route and the {} are used to export multiple funcions
