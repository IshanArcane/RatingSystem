const jwtService = require("../services/jwtservice");
const { User } = require("../models");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies[process.env.COOKIE_NAME || "token"];
    if (!token)
      return res.status(401).json({ message: "Authentication required" });

    const decoded = jwtService.verify(token);
    const user = await User.scope("withPassword").findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    // Remove password from user object passed forward
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
