const express = require('express');
const router = express.Router();

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus } = require('../controllers/order');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock } = require('../controllers/product');

// PARAMS
router.param('userId', getUserById);
router.param('orderId', getOrderById);

// ROUTES -->

// CREATE ORDER
router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// READ or GET ORDERS
router.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// STATUS OF ORDER
router.get(
  '/oeder/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);


module.exports = router;