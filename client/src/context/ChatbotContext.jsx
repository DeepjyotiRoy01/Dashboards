import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { chatbotService } from '../utils/api';

const ChatbotContext = createContext();

export function useChatbot() {
  return useContext(ChatbotContext);
}

export function ChatbotProvider({ children }) {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user's conversations when user is logged in
  useEffect(() => {
    if (currentUser) {
      fetchConversations();
    } else {
      // Reset state when user logs out
      setConversations([]);
      setCurrentConversation(null);
      setMessages([]);
    }
  }, [currentUser]);

  // Fetch messages when current conversation changes
  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  // Fetch all conversations for the current user
  const fetchConversations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await chatbotService.getConversations();
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (conversationId) => {
    setLoading(true);
    setError('');
    try {
      const response = await chatbotService.getConversation(conversationId);
      setMessages(response.data.conversation.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  // Create a new conversation
  const createConversation = async (initialMessage) => {
    setLoading(true);
    setError('');
    try {
      // Add welcome message if this is a brand new conversation
      if (!initialMessage) {
        setMessages([
          { content: 'Hi there! I\'m your dashboard assistant. How can I help you today?', role: 'assistant' }
        ]);
        return null;
      }
      
      const response = await chatbotService.sendMessage({
        message: initialMessage,
      });
      
      // Add the new conversation to the list
      const newConversation = response.data.conversation;
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      
      // Set the initial messages
      setMessages([
        { content: initialMessage, role: 'user' },
        { content: response.data.response, role: 'assistant' }
      ]);
      
      return newConversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      setError('Failed to create conversation');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send a message in the current conversation
  const sendMessage = async (message) => {
    if (!message) return;
    
    // Add user message to the UI immediately
    const userMessage = { content: message, role: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    setLoading(true);
    setError('');
    try {
      const response = await chatbotService.sendMessage({
        message,
        conversationId: currentConversation?._id
      });
      
      // If this is a new conversation, update the current conversation
      if (!currentConversation) {
        const newConversation = response.data.conversation;
        setConversations([newConversation, ...conversations]);
        setCurrentConversation(newConversation);
      }
      
      // Add assistant response to messages
      const assistantMessage = { content: response.data.response, role: 'assistant' };
      setMessages([...updatedMessages, assistantMessage]);
      
      return assistantMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
      
      // Add error message to the UI
      setMessages([...updatedMessages, {
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant'
      }]);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a conversation
  const deleteConversation = async (conversationId) => {
    setLoading(true);
    setError('');
    try {
      await chatbotService.deleteConversation(conversationId);
      
      // Remove the conversation from the list
      setConversations(conversations.filter(conv => conv._id !== conversationId));
      
      // If the deleted conversation was the current one, reset current conversation
      if (currentConversation && currentConversation._id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setError('Failed to delete conversation');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Select a conversation to view
  const selectConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const value = {
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
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}