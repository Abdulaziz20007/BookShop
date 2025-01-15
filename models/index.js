const sequelize = require("../config/db");

const Admin = require("./Admin");
const Author = require("./Author");
const Ban = require("./Ban");
const Book = require("./Book");
const CartItem = require("./CartItem");
const Category = require("./Category");
const Contract = require("./Contract");
const Coupon = require("./Coupon");
const Customer = require("./Customer");
const Image = require("./Image");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const Plan = require("./Plan");
const Review = require("./Review");

Category.hasMany(Book, { foreignKey: "category_id" });
Category.belongsTo(Category, {
  as: "parent",
  foreignKey: {
    name: "parent_category_id",
    allowNull: true,
  },
});

Category.hasMany(Category, {
  as: "children",
  foreignKey: "parent_category_id",
});

Book.belongsTo(Category, { foreignKey: "category_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });
Book.hasMany(Image, { foreignKey: "book_id" });
Book.hasMany(Review, { foreignKey: "book_id" });

Customer.hasMany(Order, { foreignKey: "customer_id" });
Customer.hasMany(CartItem, { foreignKey: "customer_id" });
Customer.hasMany(Review, { foreignKey: "customer_id" });

Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });
Order.hasOne(Contract, { foreignKey: "order_id" });

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Book, { foreignKey: "book_id" });

Contract.belongsTo(Order, { foreignKey: "order_id" });
Contract.belongsTo(Plan, { foreignKey: "plan_id" });
Contract.hasMany(Payment, { foreignKey: "contract_id" });

Review.belongsTo(Customer, { foreignKey: "customer_id" });
Review.belongsTo(Book, { foreignKey: "book_id" });

Ban.belongsTo(Admin, { foreignKey: "admin_id" });
Ban.belongsTo(Customer, { foreignKey: "user_id" });

module.exports = {
  Admin,
  Author,
  Ban,
  Book,
  CartItem,
  Category,
  Contract,
  Coupon,
  Customer,
  Image,
  Order,
  OrderItem,
  Payment,
  Plan,
  Review,
  sequelize,
};
