import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongoSession from 'connect-mongodb-session';
import dotenv from 'dotenv';
import indexRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/authRoutes.js';
import csrf from 'csurf';
import helmet from 'helmet';
import errorController from './src/controllers/errorController.js';
import flash from 'express-flash';

dotenv.config();

const MongoDBStore = connectMongoSession(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URI,
    collection: 'sessions'
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 3600 * 24 * 7 // ms min hour day
    }
}));

app.use(flash());

// app.use(helmet())
app.use(csrf());


app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.errors = req.flash("errors");
    next();
});

app.use(indexRoutes);
app.use('/auth', userRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log('Server on');
        });
}).catch(e => {
    console.log(e)
})
