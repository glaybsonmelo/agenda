import User from '../models/User.js';
import flash from 'express-flash';
import { validationResult } from 'express-validator';
import validator from 'validator';
import bcrypt from 'bcrypt';

class userController {

    getLogin(req, res, next) {
        res.render('auth/login',  {
            title: "Entrar",
            csrfToken: res.locals.csrfToken
        });
    }

    async postLogin(req, res, next) {
        const { email, password } = req.body;
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            errors = errors.array();
            req.flash('errors', errors);
            return res.redirect('back');
        }

        try {
            const user = await User.findOne({ email });
            if(!user){
                req.flash('errors', [{ msg: 'Usuário não encontrado.' }]);
                return res.redirect("back");
            }
            const doMatch = await bcrypt.compare(password, user.password);
            if(!doMatch){
                req.flash('errors', [{ msg: 'E-mail ou senha incorretos.' }]);
                return res.redirect("back");
            }
        
            req.flash('success', 'Login feito com sucesso!');
            req.session.isLoggedIn = true;
            req.session.user = user;

            await req.session.save();

            res.redirect("/");
        } catch (error) {
            return next(error);
        }

    }

    getSignup(req, res, next){
        const csrfToken = res.locals.csrfToken;
        res.render('auth/signup', { 
            title: "Criar Conta",
            csrfToken
         });
    }

    async postSignup(req, res, next){

        let errors = validationResult(req);

        if(!errors.isEmpty()){      
            errors = errors.array();
            req.flash('errors', errors);
            return res.redirect('back');
        }

        const { name, email, password } =  req.body;

        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({ name, email, password: hashedPassword });
            req.session.user = user;
            req.flash("success", "Conta criada com sucesso!");
            await req.session.save();
            res.redirect("/auth/login");

        } catch (error) {
            return next(error);
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