const express = require('express');
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/orders - Create a new order (private)
// GET /api/orders - Get all orders (private/admin)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// GET /api/orders/myorders - Get current user's orders (private)
router.route('/myorders').get(protect, getMyOrders);

// GET /api/orders/:id - Get a single order by ID (private)
// PUT /api/orders/:id/status - Update order status (private/admin)
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;