const Router = require("express");
const router = new Router();
const glassesController = require("../controllers/glassesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), glassesController.create);
router.get("/", glassesController.getAll);
router.get("/:id", glassesController.getOne);
router.delete("/:id", glassesController.delete);
router.put("/:id", glassesController.edit);

module.exports = router;
