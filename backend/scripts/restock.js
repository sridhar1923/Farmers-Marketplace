const Product = require("../models/Product");
const sequelize = require("../config/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to DB");

    const [count] = await Product.update(
      { stock: 200 }, // change stock value
      { where: {} }
    );

    console.log(`🌾 Restocked ${count} products to 200 units each`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error restocking:", error);
    process.exit(1);
  }
})();
