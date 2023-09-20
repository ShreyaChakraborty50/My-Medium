const router = require("express").Router();
const authorRouter = require("./authorRouter.js");
const blogRouter = require("./blogRouter.js");

router.use("/authors", authorRouter);
router.use("/blogs", blogRouter);
module.exports = router;
