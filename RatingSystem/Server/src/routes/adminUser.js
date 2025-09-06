// routes/adminUserRoutes.js
const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const authMiddleware = require("../middlewares/authMiddleware"); // checks JWT
const roleMiddleware = require("../middlewares/roleMiddleware");

// Apply auth & admin role middleware
router.use(authMiddleware);
router.use(roleMiddleware(["ADMIN"]));

router.get("/", adminUserController.getAllUsers); // list users with filters
router.get("/:id", adminUserController.getUserById); // single user
router.post("/", adminUserController.createUser); // create user
router.put("/:id", adminUserController.updateUser); // update user
router.delete("/:id", adminUserController.deleteUser); // delete user

module.exports = router;
