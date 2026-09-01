import {
    getCommentsByDeviceId,
    addComment
} from "../services/commentService.js";

export const getComments = (req, res) => {
    const { deviceId } = req.params;

    const comments = getCommentsByDeviceId(deviceId);

    res.json(comments);
};

export const postComment = (req, res) => {
    try {
        const { deviceId } = req.params;

        const {
            userId,
            rating,
            comment
        } = req.body;

        const result = addComment({
            deviceId,
            userId,
            rating,
            comment
        });

        res.status(201).json({
            mensaje: "Comentario creado correctamente",
            commentId: result.lastInsertRowid
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};