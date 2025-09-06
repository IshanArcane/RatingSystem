// controllers/adminUserController.js
const { User } = require("../models");
const { Op } = require("sequelize");

exports.getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "id",
      order = "ASC",
      filter,
    } = req.query;

    const where = {};
    if (filter) {
      // Example filter: role:ADMIN
      const [field, value] = filter.split(":");
      where[field] = value;
    }

    const users = await User.findAndCountAll({
      where,
      order: [[sort, order]],
      offset: (page - 1) * limit,
      limit: +limit,
      attributes: { exclude: ["password"] },
    });

    res.json({
      total: users.count,
      page: +page,
      pages: Math.ceil(users.count / limit),
      data: users.rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const user = await User.create({ name, email, address, password, role });
    const userSafe = user.toJSON();
    delete userSafe.password;
    res.status(201).json(userSafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name, email, address, password, role });
    const userSafe = user.toJSON();
    delete userSafe.password;
    res.json(userSafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
