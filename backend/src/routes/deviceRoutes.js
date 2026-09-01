import { Router } from "express";

import {
    getDevices,
    getDevice
} from "../controllers/deviceController.js";

const router = Router();

router.get("/", getDevices);

router.get("/:id", getDevice);

export default router;