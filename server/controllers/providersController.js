const { Providers } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProvidersController {
  async create(req, res, next) {
    try {
      const { name, country, head, passport, tax_number, phone_number } =
        req.body;
      const providers = await Providers.create({
        name,
        country,
        head,
        passport,
        tax_number,
        phone_number,
      });
      return res.json(providers);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let providers = await Providers.findAll();
    return res.json(providers);
  }
  //   async getOne(req, res) {
  //     const { id } = req.params;
  //     const lenses = await Lenses.findOne({ where: { id } });
  //     return res.json(lenses);
  //   }
  async edit(req, res) {
    const { id, name, country, head, passport, tax_number, phone_number } =
      req.body;
    const providers = await Providers.update(
      { name, country, head, passport, tax_number, phone_number },
      { where: { id } }
    );
    return res.json(providers[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const providers = await Providers.destroy({ where: { id } });
    return res.json(providers);
  }
}

module.exports = new ProvidersController();
