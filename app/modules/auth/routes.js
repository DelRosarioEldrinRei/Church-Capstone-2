var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var signupRouter = express.Router();
var authMiddleware = require('./middlewares/auth');
var db = require('../../lib/database')();

loginRouter.route('/query')
    .post(authMiddleware.noAuthed, (req, res) => {
        console.log(req.body.id)
        req.session.eventId = req.body.id
        res.render('auth/views/login');
    })
loginRouter.route('/queryservice')
    .post(authMiddleware.noAuthed, (req, res) => {
        console.log(req.body.id)
        req.session.serviceId = req.body.id
        res.render('auth/views/login');
    })
loginRouter.route('/')  
    .get(authMiddleware.noAuthed, (req, res) => {
        if(req.query){
            res.render('auth/views/login',{reqQuery:req.query});
            }
            else{
                res.render('auth/views/login')
            }
    })
    .post((req, res) => {
        console.log('POST LOGIN');
        var db = require('../../lib/database')();
        db.query(`SELECT * FROM tbl_user WHERE var_username="${req.body.user_username}"`, (err, results, fields) => {
        
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');
            
            var user = results[0];
            req.session.userID = user.int_userID
            console.log(req.session.userID)
            if (user.var_password !== req.body.user_password) return res.redirect('/login?incorrect');
            
            if(user.char_usertype == "Admin"){
                delete user.var_password;
                req.session.admin = user;
                console.log(req.session);
                return res.redirect('/admin');
            }
            if(user.char_usertype == "Secretariat"){
                delete user.var_password;
                req.session.secretariat = user;
                console.log(req.session);
                return res.redirect('/secretariat');
            }
            if(user.char_usertype == "Coordinator"){
                delete user.var_password;
                req.session.coordinator = user;
                console.log(req.session);
                return res.redirect('/coordinator');
            }
            if(user.char_usertype == "Catechist"){
                delete user.var_password;
                req.session.catechist = user;
                console.log(req.session);
                return res.redirect('/catechist');
            }
            if(user.char_usertype == "CoordinatorCatechist"){
                delete user.var_password;
                req.session.catechist = user;
                console.log(req.session);
                return res.redirect('/coorcatechist');
            }
            if(user.char_usertype == "Priest"){
                delete user.var_password;
                req.session.priest = user;
                console.log(req.session);
                return res.redirect('/priest');
            }

            if(user.char_usertype=="Guest"){         
                
                if(req.session.eventId == 3){
                delete user.var_password;
                req.session.user = user;
                console.log(req.session.user);
                return res.redirect(`/guest/baptism/form?${req.session.eventId}`);
                }
                else if(req.session.eventId == 4){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/funeral/form');
                }
                else if(req.session.eventId == 5){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/marriage/form');
                }
                else if(req.session.eventId == 6){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/communion/form');
                }
                else if(req.session.eventId == 14){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/document/form');
                }
                else if(req.session.eventId == 15){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/facilities/form');
                }
                else if(req.session.serviceId == 3){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/establishment/form');
                }
                else{
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest')
                    }  

            }
                });
    })

    signupRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/signup.pug', req.query);
    })
    .post((req, res) => {
        
        var queryString = `INSERT INTO tbl_user(var_userlname, var_userfname, var_usermname, char_usergender, var_useraddress, var_usercontactnum, var_username, var_useremail, var_password, char_usertype) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString, [req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.contactnumber, req.body.username, req.body.email, req.body.password, "Guest"], (err, results, fields) => {
            if (err) throw err;
            
            res.redirect('/login?signUpSuccess');
        });

        // res.redirect('/guest')

        });
    // })

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/index');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = signupRouter;