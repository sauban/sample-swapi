'use strict';

const Comment = require('../models/comment');

exports.listAllMovieComments = async (req, res) => {
    const { movieId } = req.params;
    const comments = await Comment.getAllComment({ movieId });
    return res.json(comments);
};


exports.createMovieComment = async (req, res) => {
    const newComment = new Comment(req.body);
    const createdComment = await Comment.createComment(newComment);
    return res.json(createdComment);
};


exports.getMovieCommentById = async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.getCommentById(commentId);
    return res.json(comment);
};


exports.updateMovieComment = async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.updateById(commentId, new Comment(req.body));
    return res.json(comment);
};


exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    await Comment.remove(commentId);
    return res.json({ message: 'Comment successfully deleted' });
};
