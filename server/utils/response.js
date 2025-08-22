/**
 * Utility functions for consistent API responses
 */

// Success response with data
const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data
  });
};

// Error response with message
const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    msg: message
  });
};

// Not found response
const notFoundResponse = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    msg: message
  });
};

// Bad request response
const badRequestResponse = (res, message = 'Bad request') => {
  return res.status(400).json({
    success: false,
    msg: message
  });
};

// Unauthorized response
const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    msg: message
  });
};

// Forbidden response
const forbiddenResponse = (res, message = 'Forbidden') => {
  return res.status(403).json({
    success: false,
    msg: message
  });
};

module.exports = {
  successResponse,
  errorResponse,
  notFoundResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse
};