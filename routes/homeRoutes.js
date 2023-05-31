import { Router } from "express";
import homeController from "../src/controllers/homeController.js";

const router = Router();

router.get('/', homeController.getIndex);

export default router;