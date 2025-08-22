import { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Fab, Avatar, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send as SendIcon, Close as CloseIcon, Chat as ChatIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '../context/ChatbotContext';

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  zIndex: 1000,
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '16px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  maxWidth: '80%',
  padding: '10px 14px',
  borderRadius: '12px',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  background: isUser 
    ? 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)'
    : theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.9)',
  color: isUser ? '#fff' : theme.palette.text.primary,
  boxShadow: isUser 
    ? '0 2px 10px rgba(99, 102, 241, 0.3)'
    : '0 2px 10px rgba(0, 0, 0, 0.1)',
  wordBreak: 'break-word',
}));

const ChatInput = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
  },
  zIndex: 1000,
}));

const Chatbot = ({ show, onToggle }) => {
  const { messages, loading, sendMessage, currentConversation, createConversation } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation when chat is opened
  useEffect(() => {
    if (show && messages.length === 0 && !currentConversation) {
      // Initialize a new conversation with welcome message
      createConversation();
    }
  }, [show, messages.length, currentConversation, createConversation]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    try {
      await sendMessage(input);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ChatContainer elevation={6}>
              <ChatHeader>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <ChatIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Dashboard Assistant
                  </Typography>
                </Box>
                <IconButton size="small" onClick={onToggle}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </ChatHeader>
              
              <ChatMessages>
                {messages.map((message, index) => (
                  <MessageBubble key={index} isUser={message.role === 'user'}>
                    <Typography variant="body2">{message.content}</Typography>
                  </MessageBubble>
                ))}
                {loading && (
                  <MessageBubble isUser={false}>
                    <Typography variant="body2">Thinking...</Typography>
                  </MessageBubble>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>
              
              <ChatInput>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  size="small"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: '20px' }
                  }}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || loading}
                >
                  <SendIcon />
                </IconButton>
              </ChatInput>
            </ChatContainer>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Tooltip title={show ? "Close chat" : "Open chat"}>
        <ChatFab color="primary" onClick={onToggle} size="medium">
          <ChatIcon />
        </ChatFab>
      </Tooltip>
    </>
  );
};

export default Chatbot;