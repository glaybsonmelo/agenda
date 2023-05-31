export default (req, res, next) => {
    if(!req.session.user){
        req.flash("errors", "Você precisa fazer login!")
        res.redirect("/auth/login");
    }
    //req.session.isAuthenticated = true;
    next();
}