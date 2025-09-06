const { Store, Rating, User, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  try {
    const store = await Store.create({
      name,
      email,
      address,
      ownerId: ownerId || req.user.id,
    });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listStores = async (req, res) => {
  // filtering & sorting via query params: ?q=namePart&sort=name&order=asc&ownerId=3
  const {
    q,
    sort = "createdAt",
    order = "DESC",
    page = 1,
    limit = 20,
    ownerId,
  } = req.query;
  const where = {};
  if (q) where.name = { [Op.like]: `%${q}%` };
  if (ownerId) where.ownerId = ownerId;
  try {
    const stores = await Store.findAndCountAll({
      where,
      order: [[sort, order]],
      limit: +limit,
      offset: (+page - 1) * +limit,
      include: [
        { model: Rating, as: "ratings", attributes: ["ratingValue"] },
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
      ],
    });

    const rows = stores.rows.map((s) => {
      const avg = s.ratings.length
        ? s.ratings.reduce((a, b) => a + b.ratingValue, 0) / s.ratings.length
        : 0;
      return {
        ...s.get({ plain: true }),
        averageRating: +avg.toFixed(2),
        ratingsCount: s.ratings.length,
      };
    });

    res.json({ count: stores.count, rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStore = async (req, res) => {
  const id = req.params.id;
  try {
    const store = await Store.findByPk(id, {
      include: [
        {
          model: Rating,
          as: "ratings",
          include: [{ model: User, as: "user", attributes: ["id", "name"] }],
        },
        { model: User, as: "owner", attributes: ["id", "name"] },
      ],
    });
    if (!store) return res.status(404).json({ message: "Store not found" });
    const avg = store.ratings.length
      ? store.ratings.reduce((a, b) => a + b.ratingValue, 0) /
        store.ratings.length
      : 0;
    res.json({ ...store.get({ plain: true }), averageRating: +avg.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE store
exports.updateStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    // Only admin or owner can update
    if (req.user.role !== "ADMIN" && req.user.id !== store.ownerId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this store" });
    }

    const { name, email, address } = req.body;
    await store.update({ name, email, address });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE store
exports.deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    // Only admin or owner can delete
    if (req.user.role !== "ADMIN" && req.user.id !== store.ownerId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this store" });
    }

    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
