const db = require("../db");

exports.createPost = (req, res) => {
    const { title, content } = req.body;

    const sql =
        "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";

    db.query(
        sql,
        [title, content, req.user.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Post Created"
            });
        }
    );
};

exports.getPosts = (req, res) => {
    const sql = `
    SELECT posts.*, users.name
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;

    const sql =
        "UPDATE posts SET title=?, content=? WHERE id=?";

    db.query(
        sql,
        [title, content, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Post Updated"
            });
        }
    );
};

exports.deletePost = (req, res) => {
    const sql = "DELETE FROM posts WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Post Deleted"
        });
    });
};