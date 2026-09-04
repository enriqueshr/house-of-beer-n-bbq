const prisma = require('../config/db');
const { sendMail, reservationCustomerEmail, reservationAdminEmail } = require('../utils/mailer');

async function createReservation(req, res, next) {
  try {
    const { name, phone, email, date, time, partySize, specialRequests } = req.body;

    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        email,
        date: new Date(date),
        time,
        partySize: Number(partySize),
        specialRequests,
      },
    });

    sendMail(reservationCustomerEmail(reservation)).catch((e) => console.error('Email error:', e.message));
    sendMail(reservationAdminEmail(reservation)).catch((e) => console.error('Email error:', e.message));

    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
}

async function getAllReservations(req, res, next) {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: [{ date: 'asc' }],
    });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
}

async function updateReservationStatus(req, res, next) {
  try {
    const { status } = req.body;
    const reservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(reservation);
  } catch (err) {
    next(err);
  }
}

async function deleteReservation(req, res, next) {
  try {
    await prisma.reservation.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createReservation,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
};
