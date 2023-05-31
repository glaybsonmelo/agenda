import { Router } from "express";
import contactController from "../src/controllers/contactController.js";
import { body } from "express-validator";
import isAuth from '../src/middlewares/is-auth.js';
const router = Router();

router.get("/add-contact", isAuth, contactController.getAddContact);

router.post("/add-contact", [
    body("firstName")
        .trim()
        .notEmpty({ min: 1, max: 512 }).withMessage("Nome inválido")
], isAuth, contactController.postContact);

export default router;