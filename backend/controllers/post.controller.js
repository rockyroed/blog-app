import Post from "../models/post.model.js";

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
  const newPost = new Post(req.body);

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json("Post deleteed");
};
