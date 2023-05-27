import User from '../models/User.js';
import flash from 'express-flash';

class userController {

    getLogin(req, res, next) {
        res.render('auth/login',  {
            title: "Entrar",
            csrfToken: res.locals.csrfToken
        });
    }

    postLogin(req, res, next) {
        res.send("");
    }

    getSignup(req, res, next){
        const error = req.flash('error');
        const csrfToken = res.locals.csrfToken;
        res.render('auth/signup', { 
            title: "Criar Conta",
            csrfToken
         });
    }

    async postSignup(req, res, next){
        const { name, age } =  req.body;
        if(!age){
            req.flash("error", "Invalid age!");
            return res.redirect('/auth/signup');
        }
        const user = await User.create({name, age});
        req.session.user = user;
        res.redirect("/");
    }
};

export default new userController();