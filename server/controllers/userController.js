const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role, full_name, phone_number) => {
  return jwt.sign(
    { id: id, email, role, full_name, phone_number },
    process.env.SECRET_KEY
    // { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role, full_name, phone_number } = req.body;
    if (!email || !password)
      return next(ApiError.badRequest("Incorrect email or password"));
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("The email is already used"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      full_name,
      phone_number,
      password: hashPassword,
    });
    // const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.full_name,
      user.phone_number
    );
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("The user was not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Incorrect password"));
    }
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.full_name,
      user.phone_number
    );
    return res.json({ token });
  }
  async check(req, res, next) {
    const { user } = req;
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.full_name,
      user.phone_number
    );
    return res.json({ token });
  }
  async getAll(req, res) {
    let users = await User.findAll();
    return res.json(users);
  }
}
module.exports = new UserController();
