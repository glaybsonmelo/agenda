import userController from "../src/controllers/authController.js";
import { body } from "express-validator";
import { Router } from "express";
import User from "../src/models/User.js";
const router = Router();

router.get('/login', userController.getLogin);
router.post('/login',[
    body("email")
        .trim()
        .isEmail()
        .withMessage("Por favor, Insira um email valido!")
        .normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 4, max: 2056 })
        .withMessage("Senha deve ter mais que 4 caracteres.")
], userController.postLogin);

router.get('/signup', userController.getSignup);
router.post('/signup', [
    body("name")
        .trim()
        .isLength({ min: 3, max: 255 }).withMessage("Nome inválido."),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email inválido.")
        .custom(async (email, { req }) => {
            return User.findOne({ email }).then(userDock => {
                if(userDock){
                   throw new Error("Já existe um usuário com esse e-mail.");
                }
            });
        }).withMessage("Já existe um usuário com esse e-mail."),
    body("password")
        .trim()
        .isLength({ min: 4, max: 2056 })
        .withMessage("Senha deve ter mais que 4 caracteres.")
], userController.postSignup);

router.post('/logout', userController.logout);

export default router;