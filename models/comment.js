'user strict';
var { Promise } = require('bluebird');

var sql = require('../helpers/db.js/index.js');

//Comment object constructor
class Comment {
    constructor(comment) {
        this.comment = comment.comment;
        this.movie_id = comment.movie_id;
        this.commenter_ip = comment.commenter_ip;
        this.created_at = new Date();
    }
    static createComment(newComment) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO comments set ?", newComment, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.insertId);
                }
            });
        });
    }
    static getCommentById(commentId) {
        return new Promise((resolve, reject) => {
            sql.query("Select comment from comments where id = ? ", commentId, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            }); 
        });
    }
    static getAllComment() {
        return new Promise((resolve, reject) => {
            sql.query("Select * from comments", (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    static updateById(id, comment) {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE comments SET comment = ? WHERE id = ?", [comment.comment, id], (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    static remove(id) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM comments WHERE id = ?", [id], (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    static getMovieCommentCount(movieId) {
        return new Promise((resolve, reject) => {
            sql.query('SELECT COUNT(*) as "count" FROM comments WHERE movie_id = ?', [movieId], (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            })
        });
    }
}

module.exports = Comment;