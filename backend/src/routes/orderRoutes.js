const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireAdmin } = require('../middleware/auth');
const { reservationLimiter } = require('../middleware/rateLimiter');
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

const orderValidation = [
  body('customerName').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('orderType').isIn(['PICKUP', 'DELIVERY']).withMessage('Invalid order type'),
  body('address').if(body('orderType').equals('DELIVERY')).trim().notEmpty().withMessage('Address is required for delivery'),
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.menuItemId').isString().notEmpty(),
  body('items.*.quantity').isInt({ min: 1 }),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Public
router.post('/', reservationLimiter, orderValidation, validate, createOrder);

// Admin only
router.get('/', requireAdmin, getAllOrders);
router.patch('/:id/status', requireAdmin, updateOrderStatus);

module.exports = router;
