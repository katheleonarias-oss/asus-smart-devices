import {
    findCommentsByDeviceId,
    createComment
} from "../repositories/commentRepository.js";

export const getCommentsByDeviceId = (deviceId) => {
    return findCommentsByDeviceId(deviceId);
};

export const addComment = (commentData) => {
    const {
        deviceId,
        userId,
        rating,
        comment
    } = commentData;

    if (!deviceId || !userId || !rating || !comment) {
        throw new Error("Todos los campos son obligatorios");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("La calificación debe estar entre 1 y 5");
    }

    if (comment.trim().length === 0) {
        throw new Error("El comentario no puede estar vacío");
    }

    return createComment({
        deviceId,
        userId,
        rating,
        comment
    });
};