const { Order } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrdersController {
  async create(req, res, next) {
    try {
      const {
        date,
        sum,
        userId,
        accessoryId,
        glassId,
        lenseId,
        accessoriesQuantity,
        glassesQuantity,
        lensesQuantity,
      } = req.body;
      const orders = await Order.create({
        accessoryId,
        glassId,
        lenseId,
        date,
        sum,
        userId,
        accessoriesQuantity,
        glassesQuantity,
        lensesQuantity,
      });
      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let orders = await Order.findAll();
    return res.json(orders);
  }

  async edit(req, res) {
    const {
      id,
      date,
      sum,
      userId,
      accessoryId,
      glassId,
      lenseId,
      accessoriesQuantity,
      glassesQuantity,
      lensesQuantity,
    } = req.body;
    const orders = await Order.update(
      {
        date,
        sum,
        userId,
        accessoryId,
        glassId,
        lenseId,
        accessoriesQuantity,
        glassesQuantity,
        lensesQuantity,
      },
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
