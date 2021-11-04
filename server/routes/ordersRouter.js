const Router = require("express");
const ordersController = require("../controllers/ordersController");
const router = new Router();
// const lensesController = require("../controllers/lensesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", ordersController.getAll);
router.put("/:id", checkRole("ADMIN"), ordersController.edit);
router.delete("/:id", checkRole("ADMIN"), ordersController.delete);
router.post("/", ordersController.create);

module.exports = router;
