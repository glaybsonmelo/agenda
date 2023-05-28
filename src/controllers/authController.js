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

    postLogin(req, res, next) {
        res.send(req.body);
    }

    getSignup(req, res, next){
        const error = req.flash('error');
        const csrfToken = res.locals.csrfToken;
        res.render('auth/signup', { 
            title: "Criar Conta",
            csrfToken,
            error: []

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
    logout(req, res, next){
        req.session.destroy();
        res.redirect('/');
    }
};

export default new userController();