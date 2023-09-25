const blogController = require("../controllers/blogController.js");
const router = require("express").Router();
const verifyToken = require("../middleware/jwtToken.js");
const { missingBlogFieldMiddleware } = require("../middleware/validation.js");


router.post("/", verifyToken.verifyToken, missingBlogFieldMiddleware , blogController.addBlog);

router.get("/", blogController.getAllBlogs);

router.get("/:blogId", blogController.getBlogById);

router.get("/authors/:authorId", blogController.getBlogsByAuthor);

router.put(
  "/:blogId",
  verifyToken.verifyToken,
  verifyToken.authorize,
  missingBlogFieldMiddleware,
  blogController.updateBlogById,
);

router.delete(
  "/:blogId",
  verifyToken.verifyToken,
  verifyToken.authorize,
  blogController.deleteBlogById,
);

module.exports = router;
