const prisma = require('../config/db');

async function getAllMenuItems(req, res, next) {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const items = await prisma.menuItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function getMenuItem(req, res, next) {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function createMenuItem(req, res, next) {
  try {
    const { name, description, price, category, imageUrl, isAvailable, sortOrder } = req.body;
    const item = await prisma.menuItem.create({
      data: { name, description, price, category, imageUrl, isAvailable, sortOrder },
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function updateMenuItem(req, res, next) {
  try {
    const { name, description, price, category, imageUrl, isAvailable, sortOrder } = req.body;
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: { name, description, price, category, imageUrl, isAvailable, sortOrder },
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function deleteMenuItem(req, res, next) {
  try {
    await prisma.menuItem.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
