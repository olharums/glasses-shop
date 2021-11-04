const Router = require("express");
const router = new Router();
const accessoriesController = require("../controllers/accessoriesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), accessoriesController.create);
// router.post("/", (req, res) => {
//   console.log("req", req.body, "file", req.files);
// });
router.get("/", accessoriesController.getAll);
router.delete("/:id", accessoriesController.delete);
router.put("/:id", accessoriesController.edit);

router.get("/:id", accessoriesController.getOne);

module.exports = router;
