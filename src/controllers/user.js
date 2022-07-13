const User = require("../models/user");
const asyncHandler = require("../middlewares/asyncHandler");
const sendTokenResponse = require("../utils/sendTokenResponse");

// @desc   user register
// @route  POST /api/v1/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  if (!user) {
    return next(new ErrorResponse("Server error, try again later!"));
  }

  sendTokenResponse(user, 201, res);
});

// @desc   user login
// @route  POST /api/v1/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password.
  if (!email || !password) {
    return next(new ErrorResponse("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Wrong email or password, try again!", 401));
  }

  // check password
  const matched = await user.matchPassword(password);
  if (!matched) {
    return next(new ErrorResponse("Wrong email or password, try again!", 401));
  }

  sendTokenResponse(user, 201, res);
});

// @desc   user profile
// @route  GET /api/v1/auth/profile
exports.profile = asyncHandler(async (req, res, next) => {});
