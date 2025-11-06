const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 },
  },
});

Product.belongsTo(User, { foreignKey: "farmerId", onDelete: "CASCADE" });
User.hasMany(Product, { foreignKey: "farmerId" });

module.exports = Product;
