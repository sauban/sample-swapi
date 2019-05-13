/* eslint-disable camelcase */

const { Promise } = require('bluebird');

const SQLDb = require('../helpers/db');

// Comment object constructor
class Comment {
  constructor(comment) {
    this.comment = comment.comment;
    this.movie_id = comment.movie_id;
    this.commenter_ip = comment.commenter_ip;
    this.updated_at = new Date();
  }

  static createComment(newComment) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        await sql.query('SET @@auto_increment_increment = 1');
        const res = await sql.query('INSERT INTO comments SET ?', newComment);
        resolve(res.insertId);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }

  static getCommentById(commentId) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        const res = sql.query('SELECT comment FROM comments WHERE id = ? ', commentId);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }

  static getAllComment(movie_id) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        const res = await sql.query('SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at DESC', [movie_id]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }

  static updateById(id, comment) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        const res = sql.query('UPDATE comments SET comment = ? WHERE id = ?', [comment.comment, id]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }

  static remove(id) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        const res = await sql.query('DELETE FROM comments WHERE id = ?', [id]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }

  static getMovieCommentCount(movieId) {
    return new Promise(async (resolve, reject) => {
      const sql = new SQLDb();
      try {
        const res = await sql.query('SELECT COUNT(*) as "count" FROM comments WHERE movie_id = ?', [movieId]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      await sql.close();
    });
  }
}

module.exports = Comment;
