'user strict';
const { Promise } = require('bluebird');

const Sql = require('../helpers/db');

//Comment object constructor
class Comment {
    constructor(comment) {
        this.comment = comment.comment;
        this.movie_id = comment.movie_id;
        this.commenter_ip = comment.commenter_ip;
        this.updated_at = new Date();
    }
    static createComment(newComment) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query('SET @@auto_increment_increment = 1');
                conn.query("INSERT INTO comments SET ?", newComment, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res.insertId);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }
        });
    }
    static getCommentById(commentId) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query("SELECT comment FROM comments WHERE id = ? ", commentId, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }

        });
    }
    static getAllComment(movie_id) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query("SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at DESC", [movie_id],  (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }

        });
    }
    static updateById(id, comment) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query("UPDATE comments SET comment = ? WHERE id = ?", [comment.comment, id], (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }
        });
    }
    static remove(id) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query("DELETE FROM comments WHERE id = ?", [id], (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }
        });
    }
    static getMovieCommentCount(movieId) {
        return new Promise(async (resolve, reject) => {
            const sql = new Sql();
            try {
                const conn = await sql.connect();
                conn.query('SELECT COUNT(*) as "count" FROM comments WHERE movie_id = ?', [movieId], (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                    sql.close();
                });
            } catch (error) {
                sql.close();
                reject(error);
            }
        });
    }
}

module.exports = Comment;