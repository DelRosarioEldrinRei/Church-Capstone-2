var express = require('express');
var loginRouter = express.Router();
var adminloginRouter = express.Router();
var logoutRouter = express.Router();
var signupRouter = express.Router();
var authMiddleware = require('./middlewares/auth');
var db = require('../../lib/database')();

loginRouter.route('/query')
    .post(authMiddleware.noAuthed, (req, res) => {
        console.log('============================')
        console.log(req.body)
        console.log('============================')
        console.log(req.query)
        console.log('============================')
        req.session.eventId = req.body.id
        req.session.document =req.body
       return res.render('auth/views/login');
    })
loginRouter.route('/queryservice')
    .post(authMiddleware.noAuthed, (req, res) => {
        console.log(req.body.id)
        req.session.serviceId = req.body.id
        res.render('auth/views/login');
    })

adminloginRouter.route('/')  
    .get(authMiddleware.noAuthed, (req, res) => {
        if(req.query){
            res.render('auth/views/login2',{reqQuery:req.query});
            }
            else{
                res.render('auth/views/login2')
            }
    })
adminloginRouter.route('/')  
    .get(authMiddleware.noAuthed, (req, res) => {
        if(req.query){
            res.render('auth/views/login2',{reqQuery:req.query});
            }
            else{
                res.render('auth/views/login2')
            }
    })
    .post((req, res) => {
        console.log('POST LOGIN');
        var db = require('../../lib/database')();
        db.query(`SELECT * FROM tbl_user WHERE var_username="${req.body.user_username}"`, (err, results, fields) => {
        
            if (err) throw err;
            if (results.length === 0) return res.redirect('/adminlogin?incorrect');
            var user = results[0];
            req.session.userID = user.int_userID
            console.log(req.session.userID)
            if (user.var_password !== req.body.user_password) return res.redirect('/adminlogin?incorrect');
            
            if(user.char_usertype == "Admin"){
                delete user.var_password;
                req.session.admin = user;
                console.log(req.session);
                return res.redirect('/admin');
            }
            else{
                return res.redirect('/login?guest');
            }
        });
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
                return res.redirect('/login?NotAllowed');
            }
            if(user.char_usertype == "Secretariat"){
                delete user.var_password;
                req.session.secretariat = user;
                console.log(req.session);
                return res.redirect('/secretariat?loggedin');
            }
            if(user.char_usertype == "Coordinator"){
                delete user.var_password;
                req.session.coordinator = user;
                console.log(req.session);
                return res.redirect('/coordinator?loggedin');
            }
            if(user.char_usertype == "Catechist"){
                delete user.var_password;
                req.session.catechist = user;
                console.log(req.session);
                return res.redirect('/catechist?loggedin');
            }
            if(user.char_usertype == "CoordinatorCatechist"){
                delete user.var_password;
                req.session.catechist = user;
                console.log(req.session);
                return res.redirect('/coorcatechist');
            }
            if(user.char_usertype == "Priest" || user.char_usertype == "Parish Priest"){
                delete user.var_password;
                req.session.priest = user;
                console.log(req.session);
                if(req.session.priest.var_userstatus=='Unconfirmed'){
                    return res.redirect('/priest/updateaccount')
                }
                else{
                return res.redirect('/priest?loggedin');
                }
            }

            if(user.char_usertype=="Guest"){
                if(req.session.eventId == 3){
                delete user.var_password;
                req.session.user = user;
                console.log(req.session.user);
                return res.redirect(`/guest/baptism/form?${req.session.eventId}`);
                }
                else if(req.session.eventId == 4 ||req.session.eventId == 7){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);

                    return res.redirect(`/guest/funeral/form?eventid=${req.session.eventId}`);
                }
                else if(req.session.eventId == 1){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/anointing/form');
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
                    console.log(req.body)
                    console.log(req.session);
                    return res.redirect('/guest/document/form');
                }
                else if(req.session.eventId == 15){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/facilities/form');
                }
                else if(req.session.eventId == 12){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest/establishment/form');
                }
                else if(req.session.eventId == 9){
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect(`/guest/baptism/form?${req.session.eventId}`);
                }
                else{
                    delete user.var_password;
                    req.session.user = user;
                    console.log(req.session);
                    return res.redirect('/guest?loggedin')
                    }  

            }
                });
    })
    
signupRouter.route('/')
.get(authMiddleware.noAuthed, (req, res) => {
    res.render('auth/views/signup.pug', req.query);
})
.post((req, res) => {
    
    var queryString = `INSERT INTO tbl_user(var_userlname, var_userfname, var_usermname, char_usergender, var_useraddress, var_usercontactnum, var_username, var_useremail, var_password, char_usertype, var_userstatus) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(queryString, [req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.contactnumber, req.body.username, req.body.email, req.body.password, "Guest", "Active"], (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/guest')

// username validation for signup
// signupRouter.route('/username/query')
// .post((req,res)=>{
//     var queryString = `SELECT var_username FROM tbl_user =?`
//         console.log(req.body)
//         db.query(queryString,[req.body.usernameData],(err,results,fields)=>{
//             if (err) console.log(err);
//             res.send(results[0])
//         })
//         res.redirect('/login?signUpSuccess');
//     });
})

    // res.redirect('/guest')

    });
// })

// signupRouter.get('/username/query',(req, res) => {
//     db.query('SELECT * FROM tbl_user WHERE var_username = ?', (err, results, fields) => {
//         if(err) console.log(err)
//         res.render('auth/views/signup', {usernameData: results})
//     })
// });

signupRouter.post('/username/query',(req, res) => {
    console.log('aaa')
    //Check if username is
    console.log(req.body)
    var usernameQuery = `SELECT * FROM tbl_user WHERE var_username = ?`;
    db.query(usernameQuery, [req.body.username], function (err, results, fields) {
        if (err) return console.log(err);
        console.log(results)
        console.log('aaa')
        if(results.length > 0){
            console.log('ID and ID Number is Existing')
            res.send({ "ID": false });
        }
        else{
            console.log('ID and ID Number is Available')
            res.send({ "ID": true });
        }
    })
})

signupRouter.post('/email/query',(req, res) => {
    console.log('aaa')
    //Check if username is
    console.log(req.body)
    var usernameQuery = `SELECT * FROM tbl_user WHERE var_useremail = ?`;
    db.query(usernameQuery, [req.body.email], function (err, results, fields) {
        if (err) return console.log(err);
        console.log(results)
        console.log('aaa')
        if(results.length > 0){
            console.log('ID and ID Number is Existing')
            res.send({ "ID": false });
        }
        else{
            console.log('ID and ID Number is Available')
            res.send({ "ID": true });
        }
    })
})

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/index');
    });
});

exports.login = loginRouter;
exports.adminlogin = adminloginRouter;
exports.logout = logoutRouter;
exports.signup = signupRouter;