const { Frames } = require("../models/models");
const ApiError = require("../error/ApiError");

class FramesController {
  async create(req, res) {
    const { name } = req.body;
    const frame = await Frames.create({ name });
    return res.json(frame);
  }
  async getAll(req, res) {
    const frames = await Frames.findAll();
    return res.json(frames);
  }
  async getOne(req, res) {}

  async edit(req, res) {
    const { id, name } = req.body;
    const frames = await Frames.update({ name }, { where: { id } });
    return res.json(frames[1]);
  }
  async delete(req, res) {
    const { id } = req.params;
    const frames = await Frames.destroy({ where: { id } });
    return res.json(frames);
  }
}
module.exports = new FramesController();
