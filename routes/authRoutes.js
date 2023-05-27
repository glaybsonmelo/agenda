import userController from "../src/controllers/authController.js";
import { Router } from "express";
const router = Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);

export default router;