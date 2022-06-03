const { Posts } = require("../models");

// Used sequlize methods to make the crud functionallity

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findOne({ where: { id: id } });
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const values = req.body;
    const createdPost = await Posts.create(values);
    res.json(createdPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Posts.update(req.body, { where: { id: id } });
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.destroy({ where: { id: id } });
    if (!post) {
      return res.status(404).json({ message: "Post  dont exist" });
    } else res.send("Post deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPost, deletePost, updatePost, createPost };
