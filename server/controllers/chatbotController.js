const Conversation = require('../models/Chatbot');
const { StatusCodes } = require('http-status-codes');

// Predefined Q&A database for limited chatbot functionality
const predefinedQA = {
  // Greetings
  'hello': 'Hello! I\'m your dashboard assistant. How can I help you today?',
  'hi': 'Hi there! Welcome to your dashboard. What would you like to know?',
  'hey': 'Hey! I\'m here to help you with your dashboard. What can I assist you with?',
  'good morning': 'Good morning! Ready to explore your dashboard data?',
  'good afternoon': 'Good afternoon! How can I help you with your dashboard today?',
  'good evening': 'Good evening! What dashboard features would you like to learn about?',
  
  // Dashboard Features
  'what is dashboard': 'A dashboard is a visual interface that displays key metrics, charts, and data insights in an organized way to help you make informed decisions.',
  'how to create dashboard': 'To create a dashboard: 1) Click "Create New" in the sidebar, 2) Choose a template or start blank, 3) Add widgets by dragging them from the widget panel, 4) Customize and save your dashboard.',
  'dashboard features': 'Our dashboard includes: Analytics widgets, Sales tracking, Marketing metrics, Financial reports, Operations data, Drag & drop customization, Real-time updates, and Export capabilities.',
  'edit dashboard': 'To edit a dashboard: 1) Click the edit button (pencil icon), 2) Drag widgets to rearrange, 3) Click on widgets to configure them, 4) Add new widgets from the sidebar, 5) Save your changes.',
  
  // Analytics
  'analytics': 'The Analytics dashboard shows key performance indicators, user engagement metrics, traffic data, conversion rates, and trend analysis to help you understand your business performance.',
  'what is analytics': 'Analytics refers to the systematic analysis of data to discover meaningful patterns, trends, and insights that can guide business decisions.',
  'analytics features': 'Analytics features include: Revenue tracking, User activity monitoring, Performance metrics, Custom date ranges, Export reports, and Interactive charts.',
  
  // Sales
  'sales dashboard': 'The Sales dashboard tracks revenue, deals pipeline, conversion rates, sales targets, team performance, and customer acquisition metrics.',
  'sales features': 'Sales features include: Revenue tracking, Deal pipeline, Sales forecasting, Team performance, Customer metrics, and Goal tracking.',
  'sales metrics': 'Key sales metrics: Total revenue, Monthly recurring revenue, Conversion rate, Average deal size, Sales cycle length, and Customer lifetime value.',
  
  // Marketing
  'marketing dashboard': 'The Marketing dashboard monitors campaign performance, lead generation, social media metrics, email marketing stats, and ROI analysis.',
  'marketing features': 'Marketing features include: Campaign tracking, Lead analytics, Social media metrics, Email performance, SEO insights, and ROI calculation.',
  'marketing metrics': 'Key marketing metrics: Lead conversion rate, Cost per acquisition, Return on ad spend, Email open rates, Social engagement, and Website traffic.',
  
  // Finance
  'finance dashboard': 'The Finance dashboard provides financial health overview, budget tracking, expense analysis, profit margins, and cash flow monitoring.',
  'finance features': 'Finance features include: Budget tracking, Expense analysis, Profit & loss, Cash flow monitoring, Financial forecasting, and Cost analysis.',
  'financial metrics': 'Key financial metrics: Revenue growth, Profit margins, Operating expenses, Cash flow, Budget variance, and Return on investment.',
  
  // Operations
  'operations dashboard': 'The Operations dashboard tracks operational efficiency, resource utilization, process performance, quality metrics, and productivity indicators.',
  'operations features': 'Operations features include: Process monitoring, Resource tracking, Quality metrics, Productivity analysis, Efficiency indicators, and Performance benchmarks.',
  'operations metrics': 'Key operations metrics: Process efficiency, Resource utilization, Quality scores, Productivity rates, Downtime tracking, and Cost per unit.',
  
  // Widgets
  'widgets': 'Widgets are customizable components that display specific data or metrics. Available widgets include charts, tables, KPI cards, progress bars, and custom visualizations.',
  'add widget': 'To add a widget: 1) Enter edit mode, 2) Click "Add Widget" button, 3) Choose widget type, 4) Configure data source and settings, 5) Position it on your dashboard.',
  'widget types': 'Available widget types: Line charts, Bar charts, Pie charts, KPI cards, Data tables, Progress indicators, Gauges, and Custom widgets.',
  
  // Charts
  'charts': 'Charts visualize your data in various formats like line graphs, bar charts, pie charts, and scatter plots to help identify trends and patterns.',
  'chart types': 'Available chart types: Line charts (trends), Bar charts (comparisons), Pie charts (proportions), Area charts (volume), and Scatter plots (correlations).',
  'customize charts': 'To customize charts: Click on the chart, modify colors, labels, data ranges, chart type, and styling options in the configuration panel.',
  
  // Data
  'data sources': 'Data can be imported from CSV files, connected databases, APIs, or manually entered. The system supports real-time data updates and historical data analysis.',
  'export data': 'To export data: 1) Select the widget or dashboard, 2) Click export button, 3) Choose format (PDF, Excel, CSV), 4) Download the file.',
  'data refresh': 'Data refreshes automatically every 5 minutes. You can also manually refresh by clicking the refresh button on any widget.',
  
  // Help & Support
  'help': 'I can help you with: Dashboard creation, Widget configuration, Data analysis, Feature explanations, Navigation guidance, and Troubleshooting.',
  'support': 'For additional support: Check the help documentation, contact your system administrator, or reach out to our support team.',
  'tutorial': 'To get started: 1) Explore the sample dashboards, 2) Try creating your first dashboard, 3) Add some widgets, 4) Customize the layout, 5) Save and share your work.',
  
  // Navigation
  'navigation': 'Use the sidebar to access different dashboards, the top navbar for user settings and search, and the floating chat button to talk with me anytime.',
  'sidebar': 'The sidebar contains: Dashboard list (Analytics, Sales, Marketing, Finance, Operations), Favorites, Recent dashboards, and Create new dashboard option.',
  'navbar': 'The navbar includes: Search functionality, Theme toggle, Notifications, User profile, and Settings menu.',
  
  // Settings
  'settings': 'Access settings from the user menu to: Update profile, Change password, Manage notifications, Set preferences, and Configure data sources.',
  'theme': 'Switch between light and dark themes using the theme toggle in the navbar. Your preference is saved automatically.',
  'notifications': 'Notifications alert you about: Data updates, System messages, Shared dashboards, and Important announcements.',
  
  // Troubleshooting
  'not working': 'If something isn\'t working: 1) Refresh the page, 2) Check your internet connection, 3) Clear browser cache, 4) Contact support if the issue persists.',
  'slow loading': 'For slow loading: 1) Check internet speed, 2) Reduce widget complexity, 3) Limit date ranges, 4) Contact admin for server optimization.',
  'error': 'If you encounter errors: 1) Note the error message, 2) Try refreshing, 3) Check if data sources are accessible, 4) Report to support with details.',
  
  // Thanks
  'thank you': 'You\'re welcome! I\'m always here to help you make the most of your dashboard.',
  'thanks': 'Happy to help! Feel free to ask me anything about the dashboard features.',
  'bye': 'Goodbye! Remember, I\'m always here when you need help with your dashboard.',
  'goodbye': 'See you later! Don\'t hesitate to ask if you need any dashboard assistance.'
};

// Function to find the best matching response
const getResponse = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Direct match
  if (predefinedQA[lowerMessage]) {
    return predefinedQA[lowerMessage];
  }
  
  // Partial match - find the best matching key
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [key, response] of Object.entries(predefinedQA)) {
    const keyWords = key.split(' ');
    const messageWords = lowerMessage.split(' ');
    
    let matchCount = 0;
    keyWords.forEach(keyWord => {
      if (messageWords.some(messageWord => messageWord.includes(keyWord) || keyWord.includes(messageWord))) {
        matchCount++;
      }
    });
    
    const score = matchCount / keyWords.length;
    if (score > bestScore && score > 0.5) {
      bestScore = score;
      bestMatch = response;
    }
  }
  
  if (bestMatch) {
    return bestMatch;
  }
  
  // Default response for unmatched queries
  return 'I\'m a dashboard assistant with limited knowledge. I can help you with dashboard features, analytics, sales, marketing, finance, operations, widgets, charts, and navigation. Try asking about specific dashboard topics!';
}

// Create a new conversation or continue existing one
exports.chat = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    if (!message) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Please provide a message'
      });
    }
    
    let conversation;
    
    // If conversationId is provided, find and update existing conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: req.user.userId
      });
      
      if (!conversation) {
        return res.status(StatusCodes.NOT_FOUND).json({
          msg: `No conversation with id ${conversationId}`
        });
      }
    } else {
      // Create a new conversation
      conversation = await Conversation.create({
        user: req.user.userId,
        title: message.substring(0, 30) + '...',
        messages: []
      });
    }
    
    // Add user message to conversation
    conversation.messages.push({
      content: message,
      role: 'user'
    });
    
    // Get response from predefined Q&A system
    const assistantResponse = getResponse(message);
    
    // Add assistant response to conversation
    conversation.messages.push({
      content: assistantResponse,
      role: 'assistant'
    });
    
    await conversation.save();
    
    res.status(StatusCodes.OK).json({
      response: assistantResponse,
      conversation
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Error processing your request',
      error: error.message
    });
  }
};

// Get all conversations for a user
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user.userId })
      .sort({ updatedAt: -1 });
    
    res.status(StatusCodes.OK).json({
      count: conversations.length,
      conversations
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Get a single conversation
exports.getConversation = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: req.user.userId
    });
    
    if (!conversation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `No conversation with id ${conversationId}`
      });
    }
    
    res.status(StatusCodes.OK).json({ conversation });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Delete a conversation
exports.deleteConversation = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const conversation = await Conversation.findOneAndDelete({
      _id: conversationId,
      user: req.user.userId
    });
    
    if (!conversation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `No conversation with id ${conversationId}`
      });
    }
    
    res.status(StatusCodes.OK).json({ msg: 'Conversation deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};