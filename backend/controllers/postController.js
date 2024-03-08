const cloudinary = require("../utils/cloudinary");

const Post = require("../models/postModel");

const ErrorReponse = require("../utils/errorResponse");

//create post
exports.createPost = async (req, res, next) => {
  const { title, content, postedBy, image, likes, comments } = req.body;

  try {
    //upload image in cloudniary
    const result = await cloudinary.uploader.upload(image, {
      folder: "posts",
      width: 1200,
      crop: "scale",
    });

    const post = await Post.create({
      title,
      content,
      postedBy: req.user._id,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//show post
exports.showPost = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ craetedAt: -1 })
      .populate("postedBy", "name");
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
//show single post
exports.showSinglePost = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ craetedAt: -1 })
      .populate("comments.postedBy", "name");
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
//delete post
exports.deletePost = async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);

  //delete post image in cloudinary
  const ImgId = currentPost.image.public_id;
  if (ImgId) {
    await cloudinary.uploader.destroy(ImgId);
  }

  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "post deleted",
    });
  } catch (error) {
    next(error);
  }
};
//update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentPost = await Post.findById(req.params.id);

    //build  the object data
    const data = {
      title: title || currentPost.title,
      content: content || currentPost.content,
      image: image || currentPost.image,
    };

    //modify post image conditionallu
    if (req.body.image !== "") {
      const ImgId = currentPost.image.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader(req.body.image, {
        folder: "pass",
        width: 1200,
        crop: "scale",
      });

      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const postUpdate = await Post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.satus(200).json({
      success: true,
      postUpdate,
    });
  } catch (error) {
    next(error);
  }
};

//add connect
exports.addComment = async (req, res, next) => {
  const { comment } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },

      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
//add like
exports.addLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,

      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
//remove like
exports.removeLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,

      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
