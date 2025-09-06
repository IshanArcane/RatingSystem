const { validationResult } = require("express-validator");
const { User } = require("../models");
const jwtService = require("../services/jwtservice");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, address, password, role } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({
      name,
      email,
      address,
      password,
      role: role || "USER",
    });
    const token = jwtService.sign({ id: user.id, role: user.role });

    res.cookie(process.env.COOKIE_NAME || "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    const { password: p, ...userData } = user.get({ plain: true });
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await User.scope("withPassword").findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const valid = await user.validatePassword(password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwtService.sign({ id: user.id, role: user.role });
    res.cookie(process.env.COOKIE_NAME || "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const { password: p, ...userData } = user.get({ plain: true });
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || "token", { httpOnly: true });
  res.json({ message: "Logged out" });
};
