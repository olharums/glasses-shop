const Router = require("express");
const router = new Router();
const accessoriesRouter = require("./accessoriesRouter");
const basketRouter = require("./basketRouter");
const framesRouter = require("./framesRouter");
const glassesRouter = require("./glassesRouter");
const lensesRouter = require("./lensesRouter");
const userRouter = require("./userRouter");
const providersRouter = require("./providersRouter");
const ordersRouter = require("./ordersRouter");

router.use("/user", userRouter);
router.use("/basket", basketRouter);
router.use("/accessories", accessoriesRouter);
router.use("/glasses", glassesRouter);
router.use("/lenses", lensesRouter);
router.use("/frames", framesRouter);
router.use("/providers", providersRouter);
router.use("/orders", ordersRouter);
// and others

module.exports = router;
