class HomeController{
    getIndex = (req, res) => {
        console.log(req.session.user)
        res.render("index", {
            title: "Home"
        });
    }
    getContacts = (req, res) => {
        res.send("<h1>Thanks for contacting</h1>");
    }
};

export default new HomeController();

