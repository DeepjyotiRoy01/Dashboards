const Dashboard = require('../models/Dashboard');
const { StatusCodes } = require('http-status-codes');

// Create a new dashboard
exports.createDashboard = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    
    // Check if this is the first dashboard for the user
    const dashboardCount = await Dashboard.countDocuments({ user: req.user.userId });
    if (dashboardCount === 0) {
      req.body.isDefault = true;
    }
    
    const dashboard = await Dashboard.create(req.body);
    
    res.status(StatusCodes.CREATED).json({ dashboard });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      msg: error.message 
    });
  }
};

// Get all dashboards for a user
exports.getAllDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find({ user: req.user.userId })
      .sort('createdAt');
    
    res.status(StatusCodes.OK).json({ 
      count: dashboards.length,
      dashboards 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Get a single dashboard
exports.getDashboard = async (req, res) => {
  try {
    const { id: dashboardId } = req.params;
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      user: req.user.userId
    });
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    res.status(StatusCodes.OK).json({ dashboard });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Get default dashboard for a user
exports.getDefaultDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      user: req.user.userId,
      isDefault: true
    });
    
    if (!dashboard) {
      // If no default dashboard, get the most recently created one
      const latestDashboard = await Dashboard.findOne({ user: req.user.userId })
        .sort({ createdAt: -1 });
      
      if (!latestDashboard) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          msg: 'No dashboards found for this user' 
        });
      }
      
      return res.status(StatusCodes.OK).json({ dashboard: latestDashboard });
    }
    
    res.status(StatusCodes.OK).json({ dashboard });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Update a dashboard
exports.updateDashboard = async (req, res) => {
  try {
    const { id: dashboardId } = req.params;
    
    // If setting this dashboard as default, unset any existing default
    if (req.body.isDefault === true) {
      await Dashboard.updateMany(
        { user: req.user.userId, isDefault: true },
        { isDefault: false }
      );
    }
    
    const dashboard = await Dashboard.findOneAndUpdate(
      { _id: dashboardId, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    res.status(StatusCodes.OK).json({ dashboard });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Delete a dashboard
exports.deleteDashboard = async (req, res) => {
  try {
    const { id: dashboardId } = req.params;
    const dashboard = await Dashboard.findOneAndDelete({
      _id: dashboardId,
      user: req.user.userId
    });
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    // If deleted dashboard was default, set another one as default
    if (dashboard.isDefault) {
      const anotherDashboard = await Dashboard.findOne({ user: req.user.userId });
      if (anotherDashboard) {
        anotherDashboard.isDefault = true;
        await anotherDashboard.save();
      }
    }
    
    res.status(StatusCodes.OK).json({ msg: 'Dashboard removed successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Add a widget to a dashboard
exports.addWidget = async (req, res) => {
  try {
    const { id: dashboardId } = req.params;
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      user: req.user.userId
    });
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    dashboard.widgets.push(req.body);
    await dashboard.save();
    
    res.status(StatusCodes.OK).json({ 
      msg: 'Widget added successfully',
      dashboard 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Update a widget in a dashboard
exports.updateWidget = async (req, res) => {
  try {
    const { dashboardId, widgetId } = req.params;
    
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      user: req.user.userId
    });
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    const widgetIndex = dashboard.widgets.findIndex(
      widget => widget._id.toString() === widgetId
    );
    
    if (widgetIndex === -1) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No widget with id ${widgetId}` 
      });
    }
    
    // Update widget properties
    Object.keys(req.body).forEach(key => {
      dashboard.widgets[widgetIndex][key] = req.body[key];
    });
    
    await dashboard.save();
    
    res.status(StatusCodes.OK).json({ 
      msg: 'Widget updated successfully',
      dashboard 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};

// Remove a widget from a dashboard
exports.removeWidget = async (req, res) => {
  try {
    const { dashboardId, widgetId } = req.params;
    
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      user: req.user.userId
    });
    
    if (!dashboard) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No dashboard with id ${dashboardId}` 
      });
    }
    
    const widgetIndex = dashboard.widgets.findIndex(
      widget => widget._id.toString() === widgetId
    );
    
    if (widgetIndex === -1) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        msg: `No widget with id ${widgetId}` 
      });
    }
    
    dashboard.widgets.splice(widgetIndex, 1);
    await dashboard.save();
    
    res.status(StatusCodes.OK).json({ 
      msg: 'Widget removed successfully',
      dashboard 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: error.message 
    });
  }
};