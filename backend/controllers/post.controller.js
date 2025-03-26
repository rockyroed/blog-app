import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).send(posts);
};

export const getPost = async (req, res) => {
  const posts = await Post.findOne({ slug: req.params.slug });

  if (!posts) {
    res.status(404).send({ message: "Post not found" });
    return;
  }
  res.status(200).send(posts);
};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const newPost = new Post({ user: user._id, ...req.body });

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const deletedPost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    res.status(403).json({
      message: "You can delete only your posts",
    });
    return;
  }

  res.status(200).json("Post deleted");
};
