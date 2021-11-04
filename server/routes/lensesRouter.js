const Router = require("express");
const router = new Router();
const lensesController = require("../controllers/lensesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), lensesController.create);
router.get("/", lensesController.getAll);
// router.delete("/");
router.get("/:id", lensesController.getOne);
router.delete("/:id", lensesController.delete);
router.put("/:id", lensesController.edit);

module.exports = router;
