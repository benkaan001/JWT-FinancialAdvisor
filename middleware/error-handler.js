const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Please try it again later!",
  };
  // customize errors from Postman by destructuring object response
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.name === 'CastError'){
    customError.msg = `No prospect found with the id : ${err.value}`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field.Please enter a different value!`;
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
