module.exports = (app, passport) => { //son los parametros que recibe desde server.js

    app.get('/', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/login', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/menu',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/register', (req, res) => {
        res.render('register', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/menu',
        failureRedirect: '/register',
        failureFlash: true
    }));

    /*app.get('/menu', (req, res) => {
        res.render('menu', {
            user: req.user
        });
    });*/
};