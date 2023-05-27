class Errors {
    get404(req, res, next) {
        res.render("errors/404", { title: 'Page not found' });

    }
    
    get500(error, req, res, next) {
        console.log(error)
        res.render("errors/500", { title: 'internal server error' });
    }
}

export default new Errors();