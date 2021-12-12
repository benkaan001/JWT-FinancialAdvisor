const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotAuthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email, and password!");
  }

  const user = await User.create({ ...req.body });
  const token = user.generateToken();

  res.status(StatusCodes.CREATED).json({
    user: { name: user.getName() },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // check if the user provided any email and password to login
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password!");
  }
  const user = await User.findOne({ email });
  // check the email that the user provided
  if (!user) {
    throw new NotAuthenticatedError("Invalid email!");
  }
  // compare if the (raw) password that the user provided is valid
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new NotAuthenticatedError("Invalid password!");
  }
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({
    user: { name: user.getName() },
    token,
  });
};

module.exports = { register, login };
