const ErrorReponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//check if user is  authenticated
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //Make sure tokene exist
  if (!token) {
    return next(new ErrorReponse("you must log In...", 4001));
  }
  try {
    //verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorReponse("You must Log in", 401));
  }
};

//midleware for admin

exports.isAdmin = (req, res, next) => {
  if (req.user.role === "user") {
    return next(new ErrorReponse("Access denied, you must be an admin", 401));
  }
  next();
};
