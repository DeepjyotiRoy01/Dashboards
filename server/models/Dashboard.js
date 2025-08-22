const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['chart', 'stats', 'table', 'calendar', 'custom']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dataSource: {
    type: String,
    required: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    w: { type: Number, default: 4 },
    h: { type: Number, default: 4 }
  },
  style: {
    backgroundColor: { type: String, default: 'rgba(255, 255, 255, 0.1)' },
    borderRadius: { type: String, default: '15px' },
    backdropFilter: { type: String, default: 'blur(10px)' },
    border: { type: String, default: '1px solid rgba(255, 255, 255, 0.2)' }
  }
});

const DashboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['sales', 'analytics', 'finance', 'marketing', 'hr', 'custom'],
    default: 'custom'
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  widgets: [WidgetSchema],
  layout: {
    type: String,
    enum: ['grid', 'list', 'compact'],
    default: 'grid'
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
DashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Dashboard', DashboardSchema);