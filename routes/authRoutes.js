import userController from "../src/controllers/authController.js";
import { body } from "express-validator";
import { Router } from "express";
const router = Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/signup', userController.getSignup);
router.post('/signup', [
    body("name")
        .trim()
        .isLength({ min: 3, max: 255 }).withMessage("Nome inválido"),
    body("email")
        .trim()
        .isEmail().withMessage("Email inválido"),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4, max: 2056 })
        .withMessage("Senha deve ter mais que 4 caracteres")
], userController.postSignup);

export default router;