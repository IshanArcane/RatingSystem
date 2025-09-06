const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("DB connected");
    // await db.sequelize.sync({ force: false }); // optional for dev
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
