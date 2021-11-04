const { Lenses } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class LensesController {
  async create(req, res, next) {
    try {
      const {
        name,
        manufacturer,
        material,
        purpose,
        providerId,
        price,
        quantity,
      } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const lenses = await Lenses.create({
        name,
        manufacturer,
        material,
        purpose,
        providerId,
        price,
        img: fileName,
        quantity,
      });
      return res.json(lenses);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { material, purpose, limit, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit;
    let lenses;
    if (!material && !purpose) {
      lenses = await Lenses.findAndCountAll({ limit, offset });
    }
    if (material && !purpose) {
      lenses = await Lenses.findAndCountAll({
        where: { material },
        limit,
        offset,
      });
    }
    if (!material && purpose) {
      lenses = await Lenses.findAndCountAll({
        where: { purpose },
        limit,
        offset,
      });
    }
    if (material && purpose) {
      lenses = await Lenses.findAndCountAll({
        where: { material, purpose },
        limit,
        offset,
      });
    }

    return res.json(lenses);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const lenses = await Lenses.findOne({ where: { id } });
    return res.json(lenses);
  }

  async edit(req, res) {
    const {
      id,
      name,
      manufacturer,
      material,
      purpose,
      providerId,
      price,
      quantity,
    } = req.body;
    const lenses = await Lenses.update(
      { name, manufacturer, material, purpose, providerId, price, quantity },
      { where: { id } }
    );
    return res.json(lenses[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const lenses = await Lenses.findOne({ where: { id } });
    const { img } = lenses;
    const path = "./static/" + img;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    const result = await Lenses.destroy({ where: { id } });
    return res.json(result);
  }
}

module.exports = new LensesController();
