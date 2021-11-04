const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
// router.post("/",);
router.get("/", basketController.get);
// router.delete("/");
module.exports = router;
