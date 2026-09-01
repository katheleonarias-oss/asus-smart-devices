import { Router } from "express";

import {
    getComments,
    postComment
} from "../controllers/commentController.js";

const router = Router();

router.get("/:deviceId", getComments);

router.post("/:deviceId", postComment);

export default router;