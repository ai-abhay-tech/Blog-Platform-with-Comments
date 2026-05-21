const db = require("../db");

exports.addComment = (req, res) => {
    const { comment, post_id } = req.body;

    const sql =
        "INSERT INTO comments (comment, user_id, post_id) VALUES (?, ?, ?)";

    db.query(
        sql,
        [comment, req.user.id, post_id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Comment Added"
            });
        }
    );
};

exports.getComments = (req, res) => {
    const sql = `
    SELECT comments.*, users.name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE post_id = ?
    ORDER BY comments.id DESC
    `;

    db.query(sql, [req.params.postId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};