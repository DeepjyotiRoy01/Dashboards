import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton, 
  ListItemIcon, 
  Divider, 
  IconButton, 
  TextField, 
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { 
  Chat as ChatIcon, 
  Delete as DeleteIcon, 
  Send as SendIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useChatbot } from '../context/ChatbotContext';

const ChatbotPage = () => {
  const { 
    conversations, 
    currentConversation, 
    messages, 
    loading, 
    error, 
    fetchConversations, 
    createConversation, 
    sendMessage, 
    deleteConversation, 
    selectConversation 
  } = useChatbot();
  
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    try {
      await sendMessage(input);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNewConversation = async () => {
    await createConversation();
  };

  const handleDeleteConversation = async (id, e) => {
    e.stopPropagation();
    await deleteConversation(id);
  };

  // Format date for conversation list
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get preview text from the first message
  const getPreviewText = (conversation) => {
    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
      return 'New conversation';
    }
    
    const firstUserMessage = conversation.messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      return firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '');
    }
    
    return 'New conversation';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chatbot
        </Typography>
        
        <Grid container spacing={3}>
          {/* Conversation List */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: 'calc(100vh - 180px)', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Conversations</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />} 
                  size="small"
                  onClick={handleNewConversation}
                >
                  New
                </Button>
              </Box>
              
              <Divider />
              
              <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                {loading && conversations.length === 0 ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : conversations.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                      No conversations yet
                    </Typography>
                  </Box>
                ) : (
                  conversations.map((conversation) => (
                    <ListItem 
                      key={conversation._id} 
                      disablePadding 
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={(e) => handleDeleteConversation(conversation._id, e)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton 
                        selected={currentConversation && currentConversation._id === conversation._id}
                        onClick={() => selectConversation(conversation)}
                      >
                        <ListItemIcon>
                          <ChatIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={getPreviewText(conversation)}
                          secondary={formatDate(conversation.updatedAt)}
                          primaryTypographyProps={{
                            noWrap: true,
                            style: { maxWidth: '180px' }
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Grid>
          
          {/* Chat Area */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: 'calc(100vh - 180px)', 
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {currentConversation ? (
                <>
                  {/* Messages */}
                  <Box 
                    sx={{ 
                      flexGrow: 1, 
                      overflow: 'auto', 
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2
                    }}
                  >
                    {messages.map((message, index) => (
                      <Box 
                        key={index}
                        alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                        sx={{ maxWidth: '70%' }}
                      >
                        <Card 
                          variant="outlined" 
                          sx={{
                            bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                            color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                            borderRadius: 2
                          }}
                        >
                          <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                            <Typography variant="body1">
                              {message.content}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                    {loading && (
                      <Box alignSelf="flex-start" sx={{ maxWidth: '70%' }}>
                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                          <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress size={16} />
                              <Typography>Thinking...</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </Box>
                  
                  {/* Input Area */}
                  <Box 
                    component="form" 
                    onSubmit={handleSendMessage}
                    sx={{ 
                      p: 2, 
                      borderTop: 1, 
                      borderColor: 'divider',
                      display: 'flex',
                      gap: 1
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      variant="outlined"
                      size="small"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                      disabled={!input.trim() || loading}
                    >
                      Send
                    </Button>
                  </Box>
                </>
              ) : (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%',
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <ChatIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No Conversation Selected
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    Select an existing conversation or start a new one
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleNewConversation}
                  >
                    New Conversation
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ChatbotPage;