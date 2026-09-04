const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireAdmin } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');
const {
  createContactSubmission,
  getAllSubmissions,
  markSubmissionRead,
  deleteSubmission,
} = require('../controllers/contactController');

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ nullable: true }).isString(),
  body('subject').optional({ nullable: true }).isString(),
  body('message').trim().notEmpty().isLength({ max: 2000 }).withMessage('Message is required'),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Public
router.post('/', contactLimiter, contactValidation, validate, createContactSubmission);

// Admin only
router.get('/', requireAdmin, getAllSubmissions);
router.patch('/:id/read', requireAdmin, markSubmissionRead);
router.delete('/:id', requireAdmin, deleteSubmission);

module.exports = router;
