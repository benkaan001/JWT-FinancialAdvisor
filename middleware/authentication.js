// const { User } = require ('../models/User');
const { NotAuthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // check header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new NotAuthenticatedError("Authentication failed!");
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the prospect routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new NotAuthenticatedError("Authentication failed!");
  }
};

module.exports = isAuthenticated;
