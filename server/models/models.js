const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  full_name: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, unique: true, allowNull: false },
});
//внешник ключи не надо
// const Clients = sequelize.define("clients", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   full_name: { type: DataTypes.STRING, allowNull: false },
//   phone_number: { type: DataTypes.STRING, unique: true, allowNull: false },
// });

// const Basket = sequelize.define("basket", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.STRING, allowNull: false },
  sum: { type: DataTypes.INTEGER, allowNull: false },
  accessoriesQuantity: { type: DataTypes.INTEGER },
  glassesQuantity: { type: DataTypes.INTEGER },
  lensesQuantity: { type: DataTypes.INTEGER },
});

const Accessories = sequelize.define("accessories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  material: { type: DataTypes.STRING, allowNull: false },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});
const Glasses = sequelize.define("glasses", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.STRING, allowNull: false },
});

const Providers = sequelize.define("providers", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  head: { type: DataTypes.STRING, allowNull: false },
  passport: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  tax_number: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  phone_number: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Frames = sequelize.define("frames", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Lenses = sequelize.define("lenses", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  material: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

// User.hasOne(Basket);
// Basket.belongsTo(User);

// Clients.hasOne(Basket);
// Basket.belongsTo(Clients);

// Basket.hasMany(Order); было
// Order.belongsTo(Basket);
User.hasMany(Order);
Order.belongsTo(User);

Accessories.hasMany(Order);
Order.belongsTo(Accessories);

Glasses.hasMany(Order);
Order.belongsTo(Glasses);

Providers.hasMany(Accessories);
Accessories.belongsTo(Providers);

Providers.hasMany(Lenses);
Lenses.belongsTo(Providers);

Frames.hasMany(Glasses);
Glasses.belongsTo(Frames);

Lenses.hasMany(Order);
Order.belongsTo(Lenses);

module.exports = {
  User,
  // Basket,
  // Clients,
  Order,
  Accessories,
  Glasses,
  Providers,
  Lenses,
  Frames,
};
