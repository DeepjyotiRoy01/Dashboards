const express = require('express');
const router = express.Router();

const {
  createDashboard,
  getAllDashboards,
  getDashboard,
  getDefaultDashboard,
  updateDashboard,
  deleteDashboard,
  addWidget,
  updateWidget,
  removeWidget
} = require('../controllers/dashboardController');

const { authenticateUser } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateUser);

router.route('/')
  .post(createDashboard)
  .get(getAllDashboards);

router.get('/default', getDefaultDashboard);

router.route('/:id')
  .get(getDashboard)
  .patch(updateDashboard)
  .delete(deleteDashboard);

router.post('/:id/widgets', addWidget);
router.patch('/:dashboardId/widgets/:widgetId', updateWidget);
router.delete('/:dashboardId/widgets/:widgetId', removeWidget);

module.exports = router;