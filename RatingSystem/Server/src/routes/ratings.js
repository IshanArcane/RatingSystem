const router = require("express").Router();
const ratingController = require("../controllers/ratingController");
const auth = require("../middlewares/authMiddleware");
const { ratingValidator } = require("../utils/validators");

router.post("/", auth, ratingValidator, ratingController.createOrUpdateRating);
router.get("/store/:storeId", auth, ratingController.getRatingsForStore);

module.exports = router;
