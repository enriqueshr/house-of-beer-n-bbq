const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[mailer] SMTP not configured, skipping email send:', subject);
    return;
  }
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
}

function reservationCustomerEmail(reservation) {
  return {
    to: reservation.email,
    subject: `Reservation Received - The House of Beer N' BBQ`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#1c1917; color:#f5f0e8; padding:24px;">
        <h2 style="color:#c77b2c;">Thanks for your reservation, ${reservation.name}!</h2>
        <p>We've received your request and will confirm shortly.</p>
        <table style="margin-top:16px; color:#f5f0e8;">
          <tr><td style="padding:4px 12px 4px 0;">Date:</td><td>${new Date(reservation.date).toDateString()}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;">Time:</td><td>${reservation.time}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;">Party size:</td><td>${reservation.partySize}</td></tr>
        </table>
        <p style="margin-top:16px;">See you soon at The House of Beer N' BBQ!</p>
      </div>
    `,
  };
}

function reservationAdminEmail(reservation) {
  return {
    to: process.env.RESTAURANT_NOTIFY_EMAIL,
    subject: `New Reservation: ${reservation.name} - ${new Date(reservation.date).toDateString()}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h3>New reservation request</h3>
        <ul>
          <li>Name: ${reservation.name}</li>
          <li>Phone: ${reservation.phone}</li>
          <li>Email: ${reservation.email}</li>
          <li>Date: ${new Date(reservation.date).toDateString()}</li>
          <li>Time: ${reservation.time}</li>
          <li>Party size: ${reservation.partySize}</li>
          <li>Special requests: ${reservation.specialRequests || 'None'}</li>
        </ul>
      </div>
    `,
  };
}

function contactAdminEmail(submission) {
  return {
    to: process.env.RESTAURANT_NOTIFY_EMAIL,
    subject: `New Contact Form Submission: ${submission.subject || 'General inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h3>New contact submission</h3>
        <p><strong>From:</strong> ${submission.name} (${submission.email})</p>
        <p><strong>Phone:</strong> ${submission.phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
      </div>
    `,
  };
}

function orderCustomerEmail(order) {
  const itemsHtml = order.items
    .map((i) => `<li>${i.quantity} x ${i.name} - $${(i.price * i.quantity).toFixed(2)}</li>`)
    .join('');
  return {
    to: order.email,
    subject: `Order Received - The House of Beer N' BBQ`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#1c1917; color:#f5f0e8; padding:24px;">
        <h2 style="color:#c77b2c;">Thanks for your order, ${order.customerName}!</h2>
        <p>Order type: ${order.orderType}</p>
        <ul>${itemsHtml}</ul>
        <p style="margin-top:16px;"><strong>Total: $${Number(order.total).toFixed(2)}</strong></p>
        <p style="margin-top:16px;">We'll be in touch shortly to confirm.</p>
      </div>
    `,
  };
}

function orderAdminEmail(order) {
  const itemsHtml = order.items
    .map((i) => `<li>${i.quantity} x ${i.name} - $${(i.price * i.quantity).toFixed(2)}</li>`)
    .join('');
  return {
    to: process.env.RESTAURANT_NOTIFY_EMAIL,
    subject: `New Order: ${order.customerName} - $${Number(order.total).toFixed(2)}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h3>New online order</h3>
        <ul>
          <li>Name: ${order.customerName}</li>
          <li>Phone: ${order.phone}</li>
          <li>Email: ${order.email}</li>
          <li>Type: ${order.orderType}</li>
          <li>Address: ${order.address || 'N/A'}</li>
          <li>Notes: ${order.notes || 'None'}</li>
        </ul>
        <ul>${itemsHtml}</ul>
        <p><strong>Total: $${Number(order.total).toFixed(2)}</strong></p>
      </div>
    `,
  };
}

module.exports = {
  sendMail,
  reservationCustomerEmail,
  reservationAdminEmail,
  contactAdminEmail,
  orderCustomerEmail,
  orderAdminEmail,
};
