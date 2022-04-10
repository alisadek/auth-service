const express = require("express");
const { httpGetAllPosts } = require("../models/posts/posts.controller");

const postsRouter = express.Router();

postsRouter.get("/", httpGetAllPosts);

module.exports = postsRouter;
