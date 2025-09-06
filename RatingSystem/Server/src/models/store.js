module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      address: { type: DataTypes.STRING, allowNull: false },
      ownerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      tableName: "Stores",
    }
  );

  return Store;
};
