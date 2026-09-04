const prisma = require('../config/db');
const { sendMail, orderCustomerEmail, orderAdminEmail } = require('../utils/mailer');

async function createOrder(req, res, next) {
  try {
    const { customerName, phone, email, orderType, address, notes, items } = req.body;

    const menuIds = items.map((i) => i.menuItemId);
    const menuItems = await prisma.menuItem.findMany({ where: { id: { in: menuIds } } });
    const menuMap = new Map(menuItems.map((m) => [m.id, m]));

    let total = 0;
    const orderItemsData = items.map((i) => {
      const menuItem = menuMap.get(i.menuItemId);
      if (!menuItem) {
        const err = new Error(`Menu item not found: ${i.menuItemId}`);
        err.status = 400;
        throw err;
      }
      const price = Number(menuItem.price);
      const quantity = Number(i.quantity);
      total += price * quantity;
      return { menuItemId: menuItem.id, name: menuItem.name, price, quantity };
    });

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        email,
        orderType,
        address,
        notes,
        total,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    sendMail(orderCustomerEmail(order)).catch((e) => console.error('Email error:', e.message));
    sendMail(orderAdminEmail(order)).catch((e) => console.error('Email error:', e.message));

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: { items: true },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, getAllOrders, updateOrderStatus };
