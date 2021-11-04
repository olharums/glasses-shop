const { Order } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrdersController {
  async create(req, res, next) {
    try {
      const { date, sum, userId, accessoryId, glassId, lenseId } = req.body;
      console.log("d", userId, accessoryId, glassId, lenseId);
      const orders = await Order.create({
        accessoryId,
        glassId,
        lenseId,
        date,
        sum,
        userId,
      });
      console.log("d2", userId, accessoryId, glassId, lenseId);

      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let orders = await Order.findAll();
    return res.json(orders);
  }
  //   async getOne(req, res) {
  //     const { id } = req.params;
  //     const lenses = await Lenses.findOne({ where: { id } });
  //     return res.json(lenses);
  //   }
  async edit(req, res) {
    const { id, date, sum, userId, accessoryId, glassId, lenseId } = req.body;
    const orders = await Order.update(
      { date, sum, userId, accessoryId, glassId, lenseId },
      { where: { id } }
    );
    return res.json(orders[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const orders = await Order.destroy({ where: { id } });
    return res.json(orders);
  }
}

module.exports = new OrdersController();
