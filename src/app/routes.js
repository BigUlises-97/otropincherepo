module.exports = (app, passport) => { //son los parametros que recibe desde server.js

    app.get('/', (req, res) => {
        res.render('index', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/menu',
        failureRedirect: '/login',
        failureFlash: true
    }));

    /*app.get('/menu', (req, res) => {
        res.render('menu', {
            user: req.user
        });
    });*/
};