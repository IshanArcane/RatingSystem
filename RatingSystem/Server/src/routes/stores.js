const router = require("express").Router();
const storeController = require("../controllers/storeController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { storeValidator } = require("../utils/validators");

router.get("/", storeController.listStores); // public listing
router.get("/:id", storeController.getStore);

router.post(
  "/",
  auth,
  role(["ADMIN", "STORE_OWNER"]),
  storeValidator,
  storeController.createStore
);
router.put(
  "/:id",
  auth,
  role(["ADMIN", "STORE_OWNER"]),
  storeController.updateStore
);
router.delete("/:id", auth, role(["ADMIN"]), storeController.deleteStore);

module.exports = router;
