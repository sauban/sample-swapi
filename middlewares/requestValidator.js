const _ = require('lodash');
const APIError = require('../helpers/apierror');


const validateQuery = (allowedKeys, queryObj) => Object.keys(queryObj).reduce((acc, curr) => {
  if (!_.includes(allowedKeys, curr)) {
    return new APIError({
      status: 400,
      message: 'Validation Error',
      errors: [
        {
          location: 'query',
          message: `Invalid '${curr}' query key, it must be one of [${allowedKeys}]`,
        },
      ],
    });
  }
  return acc;
}, null);

module.exports = (allowedKeys, attr = 'query') => async (req, res, next) => {
  const error = validateQuery(allowedKeys, req[attr]);
  if (error) {
    throw error;
  }
  return next();
};
