module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      ratingValue: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      storeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      tableName: "Ratings",
      indexes: [{ unique: true, fields: ["userId", "storeId"] }], // each user can rate a store only once (update allowed)
    }
  );

  return Rating;
};
