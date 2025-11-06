const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Cart, { foreignKey: "userId" });

Cart.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Product.hasMany(Cart, { foreignKey: "productId" });

module.exports = Cart;
