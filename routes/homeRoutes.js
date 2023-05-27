import { Router } from "express";
import homeController from "../src/controllers/homeController.js";

const router = Router();

router.get('/', homeController.getIndex);
// router.get('/contacts', homeController.getContacts);

export default router;