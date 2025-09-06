const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/sequelize.config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associations
db.User.hasMany(db.Store, { foreignKey: "ownerId", as: "stores" });
db.Store.belongsTo(db.User, { foreignKey: "ownerId", as: "owner" });

db.User.hasMany(db.Rating, { foreignKey: "userId", as: "ratings" });
db.Rating.belongsTo(db.User, { foreignKey: "userId", as: "user" });

db.Store.hasMany(db.Rating, { foreignKey: "storeId", as: "ratings" });
db.Rating.belongsTo(db.Store, { foreignKey: "storeId", as: "store" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
