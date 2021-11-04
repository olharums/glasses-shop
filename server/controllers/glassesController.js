const { Glasses } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class GlassesController {
  async create(req, res, next) {
    try {
      const { name, frameId, quantity, price, purpose, color } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const glasses = await Glasses.create({
        name,
        frameId,
        quantity,
        img: fileName,
        price,
        purpose,
        color,
      });
      return res.json(glasses);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { color, purpose, limit, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit;
    let glasses;
    if (!color && !purpose) {
      glasses = await Glasses.findAndCountAll({ limit, offset });
    }
    if (color && !purpose) {
      glasses = await Glasses.findAndCountAll({
        where: { color },
        limit,
        offset,
      });
    }
    if (!color && purpose) {
      glasses = await Glasses.findAndCountAll({
        where: { purpose },
        limit,
        offset,
      });
    }
    if (color && purpose) {
      glasses = await Glasses.findAndCountAll({
        where: { color, purpose },
        limit,
        offset,
      });
    }

    return res.json(glasses);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const glasses = await Glasses.findOne({ where: { id } });
    return res.json(glasses);
  }
  async edit(req, res) {
    const { id, name, frameId, quantity, price, purpose, color } = req.body;
    const glasses = await Glasses.update(
      { name, frameId, quantity, price, purpose, color },
      { where: { id } }
    );
    return res.json(glasses[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const glasses = await Glasses.findOne({ where: { id } });
    const { img } = glasses;
    const path = "./static/" + img;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    const result = await Glasses.destroy({ where: { id } });

    return res.json(result);
  }
}

module.exports = new GlassesController();
