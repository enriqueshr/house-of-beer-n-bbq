const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireAdmin } = require('../middleware/auth');
const { reservationLimiter } = require('../middleware/rateLimiter');
const {
  createReservation,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');

const router = express.Router();

const reservationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('partySize').isInt({ min: 1, max: 30 }).withMessage('Party size must be between 1 and 30'),
  body('specialRequests').optional({ nullable: true }).isString().isLength({ max: 1000 }),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Public
router.post('/', reservationLimiter, reservationValidation, validate, createReservation);

// Admin only
router.get('/', requireAdmin, getAllReservations);
router.patch('/:id/status', requireAdmin, updateReservationStatus);
router.delete('/:id', requireAdmin, deleteReservation);

module.exports = router;
