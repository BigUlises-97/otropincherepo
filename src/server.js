const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const session = require('express-session');

const db = require('./config/database').mongoURI; //extrae la url de la bd
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Conectado a DB'))
    .catch(err => console.log(err));

//passport
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev')); //ver en consola cositas magicas

app.use(cookieparser());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(session({
    secret: 'ilab',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes')(app, passport);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Está corriendo en el puerto ${PORT}`));