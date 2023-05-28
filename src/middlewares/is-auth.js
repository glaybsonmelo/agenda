export default (req, res, next) => {
    if(!req.session.user){
        req.redirect("auth/login");
    }
    req.session.isAuth = true;
    next();
}