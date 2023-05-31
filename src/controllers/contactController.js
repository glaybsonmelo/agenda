import { validationResult } from "express-validator";
import Contact from "../models/Contact.js";

class contactController {
    getAddContact(req, res, next){
        res.render("contact/add-contact", { title: "Adicionar contato" });
    }
    async postContact(req, res, next){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            errors = errors.array()
            console.log(errors)
            req.flash("errors", errors);
            return res.redirect("back");
        }
        const { firstName, lastName, email, phone } = req.body;

        try {
            const contact = await Contact.create({ firstName, lastName, email, phone });
            console.log(contact)
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    }
}

export default new contactController();