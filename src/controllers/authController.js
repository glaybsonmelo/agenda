import User from '../models/User.js';
import flash from 'express-flash';
import { validationResult } from 'express-validator';
import validator from 'validator';
import bcrypt from 'bcrypt';


// import User from '../models/User.js';

class userController {

    getLogin(req, res, next) {
        res.render('auth/login',  {
            title: "Entrar",
            csrfToken: res.locals.csrfToken,
            isAuth: req.isAuth
        });
    }

    async postLogin(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if(!user){
                const error = new Error("Usuario não encontrado");
                throw error;
            }
            const passIsCorrect = bcrypt.compare(password, user.password);
            if(!passIsCorrect){
                req.flash('errors', 'Senha incorreta');
                return res.redirect("/auth/login");
            }

            req.session.isLoggedIn = true;
            res.redirect("/");

        req.session.user = user;

        } catch (error) {
            return next(error);
        }

    }

    getSignup(req, res, next){
        const error = req.flash('error');
        const csrfToken = res.locals.csrfToken;
        res.render('auth/signup', { 
            title: "Criar Conta",
            csrfToken,
            error: [],
            isAuthenticated: req.session.user

         });
    }

    async postSignup(req, res, next){

        const errors = validationResult(req);
        if(errors.length > 0){
            const csrfToken = res.locals.csrfToken;
            req.flash('errors', errors);
            res.session.save().then(() => {
                res.redirect('back');
            })
            return;

        }

        const { name, email, password } =  req.body;

        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({ name, email, password: hashedPassword });
            req.session.user = user;
            await req.session.save()
            res.redirect("/");

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async logout(req, res, next){
        req.session.destroy(err => {
            console.log(err);
            res.redirect("/");
        });
    }
};

export default new userController();