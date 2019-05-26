/* eslint-disable camelcase */

const { Promise } = require('bluebird');

const sql = require('../helpers/db')();

const CommentMovie = {
  createComment(newComment) {
    return new Promise(async (resolve, reject) => {
      try {
        await sql.query('SET @@auto_increment_increment = 1');
        const res = await sql.query('INSERT INTO comments SET ?', newComment);
        resolve({ id: res.insertId, ...newComment });
      } catch (error) {
        reject(error);
      }
    });
  },

  getMovieComments(movie_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sql.query('SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at DESC', [movie_id]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },

  getMovieCommentCount(movieId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await sql.query('SELECT COUNT(*) as "count" FROM comments WHERE movie_id = ?', [movieId]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = CommentMovie;
