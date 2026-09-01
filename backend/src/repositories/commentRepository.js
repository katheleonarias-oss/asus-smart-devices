import db from "../database/database.js";

export const findCommentsByDeviceId = (deviceId) => {
    const comments = db.prepare(`
        SELECT
            comments.id,
            comments.device_id,
            comments.user_id,
            users.name AS user_name,
            comments.rating,
            comments.comment,
            comments.created_at,
            comments.updated_at
        FROM comments
        INNER JOIN users
            ON comments.user_id = users.id
        WHERE comments.device_id = ?
        ORDER BY comments.created_at DESC
    `).all(deviceId);

    return comments;
};

export const createComment = ({
    deviceId,
    userId,
    rating,
    comment
}) => {
    const result = db.prepare(`
        INSERT INTO comments (
            device_id,
            user_id,
            rating,
            comment
        )
        VALUES (?, ?, ?, ?)
    `).run(
        deviceId,
        userId,
        rating,
        comment
    );

    return result;
};