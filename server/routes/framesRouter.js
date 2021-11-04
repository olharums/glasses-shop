const Router = require("express");
const router = new Router();
const framesController = require("../controllers/framesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), framesController.create);
router.get("/", framesController.getAll);
// router.delete("/");
router.get("/:id", framesController.getOne);
router.put("/:id", framesController.edit);
router.delete("/:id", framesController.delete);

module.exports = router;
