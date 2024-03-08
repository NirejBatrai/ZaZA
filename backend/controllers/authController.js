const User = require("../models/userModel");
const ErrorReponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorReponse("E-mail already registred", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorReponse("Please add an email", 403));
    }

    if (!password) {
      return next(new ErrorReponse("Please add an password", 403));
    }
    //check user email
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorReponse("invalid credentials", 400));
    }

    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorReponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      id: user_id,
      role: user.role,
    });
};

//logout
exports.logout = (req, res, next) => {
  res.clearCookies("token");
  res.status(200).json({
    success: true,
    Message: "Logged out",
  });
};
//user profile
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
