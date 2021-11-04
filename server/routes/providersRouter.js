const Router = require("express");
const providersController = require("../controllers/providersController");
const router = new Router();
// const lensesController = require("../controllers/lensesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), providersController.create);
router.get("/", providersController.getAll);
router.put("/:id", checkRole("ADMIN"), providersController.edit);
router.delete("/:id", checkRole("ADMIN"), providersController.delete);

module.exports = router;
