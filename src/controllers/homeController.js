import Contact from "../models/Contact.js";

class HomeController{
    async getIndex(req, res, next){
        try {
            const contacts = await Contact.find();
            res.render("index", {
                title: "Home",
                contacts
            });
        } catch (error) {
            next(error);
        }
    }
    getContacts(req, res){
        res.send("<h1>Thanks for contacting</h1>");
    }
};

export default new HomeController();

