/**
 * Utility functions for validating request data
 */

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
  // At least 6 characters, containing at least one number and one letter
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

// Validate registration data
const validateRegistration = (data) => {
  const errors = {};
  
  // Validate name
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Name cannot be more than 50 characters';
  }
  
  // Validate email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email';
  }
  
  // Validate password
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (!isStrongPassword(data.password)) {
    errors.password = 'Password must contain at least one letter and one number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate login data
const validateLogin = (data) => {
  const errors = {};
  
  // Validate email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  }
  
  // Validate password
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate dashboard data
const validateDashboard = (data) => {
  const errors = {};
  
  // Validate name
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Dashboard name is required';
  }
  
  // Validate type
  const validTypes = ['sales', 'analytics', 'finance', 'marketing', 'hr', 'custom'];
  if (data.type && !validTypes.includes(data.type)) {
    errors.type = `Dashboard type must be one of: ${validTypes.join(', ')}`;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate widget data
const validateWidget = (data) => {
  const errors = {};
  
  // Validate type
  const validTypes = ['chart', 'stats', 'table', 'calendar', 'custom'];
  if (!data.type || !validTypes.includes(data.type)) {
    errors.type = `Widget type must be one of: ${validTypes.join(', ')}`;
  }
  
  // Validate title
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Widget title is required';
  }
  
  // Validate dataSource
  if (!data.dataSource || data.dataSource.trim() === '') {
    errors.dataSource = 'Data source is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  isValidEmail,
  isStrongPassword,
  validateRegistration,
  validateLogin,
  validateDashboard,
  validateWidget
};