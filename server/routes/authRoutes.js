const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  updateUser,
  updatePassword,
  awardAchievement
} = require('../controllers/authController');

const { authenticateUser } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticateUser, getCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updatePassword', authenticateUser, updatePassword);
router.post('/award', authenticateUser, awardAchievement);

module.exports = router;