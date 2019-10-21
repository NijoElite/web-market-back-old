const createError = require('http-errors');

const forbiddenError = () => {
  return createError(403, 'Not enough permissions to access');
};

function isRequired(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  next(forbiddenError());
}

function isOptional(req, res, next) {
  return next();
}

function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  next(forbiddenError());
}

module.exports = {
  optional: isOptional,
  required: isRequired,
  notAuthenticated: isNotAuthenticated,
};
