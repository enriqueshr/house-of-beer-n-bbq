const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireAdmin } = require('../middleware/auth');
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

const CATEGORIES = ['APPETIZERS', 'BBQ_MAINS', 'BEER_DRINKS', 'SIDES', 'DESSERTS'];

const menuItemValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('imageUrl').optional({ nullable: true }).isString(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Public
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);

// Admin only
router.post('/', requireAdmin, menuItemValidation, validate, createMenuItem);
router.put('/:id', requireAdmin, menuItemValidation, validate, updateMenuItem);
router.delete('/:id', requireAdmin, deleteMenuItem);

module.exports = router;
