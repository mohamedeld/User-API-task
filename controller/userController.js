const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUser = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      return next(new AppError("user is already exist", 422));
    }
    // create user
    const newUser = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
    });
    // generate token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_TIME,
      }
    );
    response.status(201).json({
      status: "success",
      data: {
        newUser,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.protect = catchAsync(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new Error("access denied");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    throw new Error("the user that belong to this token does no longer exist");
  }

  request.user = currentUser;
  next();
});

exports.getUserById = async (request, response, next) => {
  try {
    // get user by id
    const user = await User.findById(request.params.id);
    if (!user) {
      return next(new AppError("invalid id ", 401));
    }
    // Omit email property if marketingConsent is false
    if (!user.marketingConsent) {
      user.email = undefined;
    }
    response.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
