const express = require('express');
const router = express.Router();

const {
  chat,
  getConversations,
  getConversation,
  deleteConversation
} = require('../controllers/chatbotController');

const { authenticateUser } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateUser);

router.post('/chat', chat);
router.get('/conversations', getConversations);
router.route('/conversations/:id')
  .get(getConversation)
  .delete(deleteConversation);

module.exports = router;