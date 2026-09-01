import { Router } from "express";

import {
    getSpecifications
} from "../controllers/specificationController.js";

const router = Router();

router.get("/:deviceId", getSpecifications);

export default router;