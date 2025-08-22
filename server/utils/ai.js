const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Generate a response using OpenAI's GPT model
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - The generated response text
 */
const generateChatResponse = async (messages, options = {}) => {
  try {
    const defaultOptions = {
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    };

    const completion = await openai.createChatCompletion({
      ...defaultOptions,
      ...options,
      messages,
    });

    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};

/**
 * Generate dashboard insights based on data
 * @param {Object} dashboardData - The dashboard data to analyze
 * @returns {Promise<string>} - Insights about the dashboard data
 */
const generateDashboardInsights = async (dashboardData) => {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are an analytics expert. Analyze the dashboard data and provide concise, actionable insights.'
      },
      {
        role: 'user',
        content: `Analyze this dashboard data and provide 3 key insights: ${JSON.stringify(dashboardData)}`
      }
    ];

    return await generateChatResponse(messages, {
      max_tokens: 200,
      temperature: 0.5,
    });
  } catch (error) {
    console.error('Error generating dashboard insights:', error);
    throw new Error('Failed to generate dashboard insights');
  }
};

/**
 * Generate recommendations for dashboard improvements
 * @param {Object} userPreferences - User preferences and behavior data
 * @param {Object} dashboardData - Current dashboard configuration
 * @returns {Promise<Array>} - Array of recommendation objects
 */
const generateDashboardRecommendations = async (userPreferences, dashboardData) => {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a dashboard optimization expert. Suggest improvements based on user preferences and current dashboard setup.'
      },
      {
        role: 'user',
        content: `Suggest 3 dashboard improvements based on these user preferences: ${JSON.stringify(userPreferences)} and current dashboard: ${JSON.stringify(dashboardData)}. Format as JSON array with fields: title, description, and type.`
      }
    ];

    const response = await generateChatResponse(messages, {
      max_tokens: 300,
      temperature: 0.4,
    });

    // Parse the JSON response
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error('Error parsing AI recommendations:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error generating dashboard recommendations:', error);
    return [];
  }
};

module.exports = {
  generateChatResponse,
  generateDashboardInsights,
  generateDashboardRecommendations
};