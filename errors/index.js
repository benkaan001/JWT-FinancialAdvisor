const NotAuthenticatedError = require('./notAuthenticated');
const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');

module.exports = { NotAuthenticatedError, CustomAPIError, BadRequestError, NotFoundError}