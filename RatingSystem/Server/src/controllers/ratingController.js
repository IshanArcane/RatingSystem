const { Rating, Store } = require("../models");

exports.createOrUpdateRating = async (req, res) => {
  const { storeId, ratingValue } = req.body;
  const userId = req.user.id;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const [rating, created] = await Rating.upsert(
      { userId, storeId, ratingValue, updatedAt: new Date() },
      { returning: true, where: { userId, storeId } }
    );

    // upsert behavior: Some dialects don't return row; use findOne if needed
    const saved = await Rating.findOne({ where: { userId, storeId } });
    res.json({ rating: saved, created: created || false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRatingsForStore = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const ratings = await Rating.findAll({
      where: { storeId },
      include: ["user"],
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
