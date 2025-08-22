import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.patch('/auth/updateUser', userData),
  updatePassword: (passwordData) => api.patch('/auth/updatePassword', passwordData),
  awardAchievement: (achievementData) => api.post('/auth/award', achievementData)
};

// Dashboard services
const dashboardService = {
  getAllDashboards: () => api.get('/dashboards'),
  getDefaultDashboard: () => api.get('/dashboards/default'),
  getDashboard: (id) => api.get(`/dashboards/${id}`),
  createDashboard: (dashboardData) => api.post('/dashboards', dashboardData),
  updateDashboard: (id, dashboardData) => api.patch(`/dashboards/${id}`, dashboardData),
  deleteDashboard: (id) => api.delete(`/dashboards/${id}`),
  addWidget: (dashboardId, widgetData) => api.post(`/dashboards/${dashboardId}/widgets`, widgetData),
  updateWidget: (dashboardId, widgetId, widgetData) => api.patch(`/dashboards/${dashboardId}/widgets/${widgetId}`, widgetData),
  removeWidget: (dashboardId, widgetId) => api.delete(`/dashboards/${dashboardId}/widgets/${widgetId}`)
};

// Chatbot services
const chatbotService = {
  sendMessage: (messageData) => api.post('/chatbot/chat', messageData),
  getConversations: () => api.get('/chatbot/conversations'),
  getConversation: (id) => api.get(`/chatbot/conversations/${id}`),
  deleteConversation: (id) => api.delete(`/chatbot/conversations/${id}`)
};

// Mock data services for development
const mockDataService = {
  getSalesData: () => Promise.resolve({
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales 2023',
          data: [12, 19, 3, 5, 2, 3, 20, 33, 23, 12, 33, 55],
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        },
        {
          label: 'Sales 2022',
          data: [10, 15, 2, 4, 1, 2, 17, 28, 20, 11, 28, 48],
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1
        }
      ]
    }
  }),
  getAnalyticsData: () => Promise.resolve({
    data: {
      visitors: {
        total: 12500,
        increase: 23.5,
        data: [1200, 1900, 2100, 2500, 2300, 2600]
      },
      pageViews: {
        total: 48200,
        increase: 18.2,
        data: [4500, 5200, 7800, 8900, 9500, 12300]
      },
      conversionRate: {
        value: 3.45,
        increase: 2.8,
        data: [3.1, 3.2, 3.25, 3.3, 3.4, 3.45]
      },
      bounceRate: {
        value: 42.5,
        decrease: 1.5,
        data: [45.2, 44.8, 44.1, 43.5, 43.0, 42.5]
      }
    }
  }),
  getFinanceData: () => Promise.resolve({
    data: {
      revenue: {
        total: 1250000,
        increase: 15.2,
        data: [95000, 115000, 130000, 125000, 140000, 155000, 180000, 190000, 120000]
      },
      expenses: {
        total: 780000,
        increase: 8.5,
        data: [65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 120000]
      },
      profit: {
        total: 470000,
        increase: 22.8,
        data: [30000, 45000, 55000, 45000, 55000, 65000, 85000, 90000, 0]
      },
      cashFlow: {
        positive: 850000,
        negative: 380000,
        net: 470000
      }
    }
  }),
  getMarketingData: () => Promise.resolve({
    data: {
      campaigns: [
        { name: 'Summer Sale', clicks: 12500, conversions: 1250, cost: 5000, roi: 3.2 },
        { name: 'New Product', clicks: 8700, conversions: 950, cost: 4200, roi: 2.8 },
        { name: 'Holiday Special', clicks: 15200, conversions: 1800, cost: 6500, roi: 4.1 },
        { name: 'Referral Program', clicks: 6300, conversions: 720, cost: 2800, roi: 3.5 }
      ],
      channels: {
        social: { visitors: 25600, conversions: 2300, conversionRate: 8.98 },
        email: { visitors: 18200, conversions: 3100, conversionRate: 17.03 },
        organic: { visitors: 31500, conversions: 2700, conversionRate: 8.57 },
        paid: { visitors: 22800, conversions: 3500, conversionRate: 15.35 }
      }
    }
  }),
  getHRData: () => Promise.resolve({
    data: {
      employees: {
        total: 245,
        newHires: 28,
        terminated: 12,
        growthRate: 6.5
      },
      departments: [
        { name: 'Engineering', headcount: 85, openPositions: 12 },
        { name: 'Sales', headcount: 55, openPositions: 8 },
        { name: 'Marketing', headcount: 35, openPositions: 5 },
        { name: 'HR', headcount: 15, openPositions: 2 },
        { name: 'Finance', headcount: 20, openPositions: 3 },
        { name: 'Operations', headcount: 35, openPositions: 6 }
      ],
      satisfaction: {
        overall: 8.2,
        workLife: 7.8,
        compensation: 7.5,
        management: 8.0,
        culture: 8.5
      }
    }
  })
};

export {
  api as default,
  authService,
  dashboardService,
  chatbotService,
  mockDataService
};