const prisma = require('../config/db');
const { sendMail, contactAdminEmail } = require('../utils/mailer');

async function createContactSubmission(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;
    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, subject, message },
    });

    sendMail(contactAdminEmail(submission)).catch((e) => console.error('Email error:', e.message));

    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
}

async function getAllSubmissions(req, res, next) {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
}

async function markSubmissionRead(req, res, next) {
  try {
    const submission = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json(submission);
  } catch (err) {
    next(err);
  }
}

async function deleteSubmission(req, res, next) {
  try {
    await prisma.contactSubmission.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createContactSubmission,
  getAllSubmissions,
  markSubmissionRead,
  deleteSubmission,
};
