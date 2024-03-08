const express = require("express");
const {
  createPost,
  showPost,
  showSinglePost,
  deletePost,
  updatePost,
  addComment,
  addLike,
  removeLike,
} = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//blog  routes
router.post("/post/create", isAuthenticated, isAdmin, createPost);
router.get("/posts/show", showPost);
router.get("/post/:id", showSinglePost);
router.delete("/delete/post/:id", isAuthenticated, isAdmin, deletePost);
router.put("/update/post/:id", isAuthenticated, isAdmin, updatePost);
router.put("/comment/post/:id", isAuthenticated, addComment);
router.put("/addLike/post/:id", isAuthenticated, addLike);
router.put("/removeLike/post/:id", isAuthenticated, removeLike);

module.exports = router;
