const { Accessories } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class AccessoriesController {
  async create(req, res, next) {
    try {
      const { name, material, manufacturer, providerId, price } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const accessories = await Accessories.create({
        name,
        material,
        manufacturer,
        providerId,
        price,
        img: fileName,
      });
      return res.json(accessories);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    const accessories = await Accessories.findAndCountAll();
    // console.log("aa", accessories);
    return res.json(accessories);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const accessories = await Accessories.findOne({ where: { id } });
    return res.json(accessories);
  }
  async edit(req, res) {
    const { id, name, material, manufacturer, providerId, price } = req.body;
    const accessories = await Accessories.update(
      { name, material, manufacturer, providerId, price },
      { where: { id } }
    );
    return res.json(accessories[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const accessories = await Accessories.findOne({ where: { id } });
    const { img } = accessories;
    const path = "./static/" + img;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    const result = await Accessories.destroy({ where: { id } });
    return res.json(result);
  }
}

module.exports = new AccessoriesController();
