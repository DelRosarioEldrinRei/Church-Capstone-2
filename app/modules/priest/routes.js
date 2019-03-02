var express = require('express');
var priestRouter = express.Router();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();
var multer = require('multer');
var swal = require('sweetalert2')
priestRouter.use(authMiddleware.priestAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
priestRouter.get('/updateaccount', (req, res)=>{
    var queryString=`UPDATE tbl_user SET var_userstatus=? WHERE int_userID= ?`
            db.query(queryString, ['Active', req.session.priest.int_userID], (err, results, fields) => {
                if (err) throw err;
                
                res.redirect('/priest');
            });
        });

priestRouter.get('/', (req, res)=>{
    console.log(req.session.priest.int_userID)
    var queryString1 =`SELECT * FROM tbl_eventinfo
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    where tbl_eventinfo.int_userpriestID = ? AND tbl_eventinfo.bool_priestapproval = 0`
    db.query(queryString1,[req.session.priest.int_userID], (err, results, fields) => {
        if (err) console.log(err);
        details=results;
        for(i=0; i < details.length; i++){
            details[i].date_eventdate = moment(details[i].date_eventdate).format('YYYY-MM-DD');
        }
        return res.render('priest/views/appointments',{ details : details});
        
    });
});

priestRouter.post('/queryNotif', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_eventinfo
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userID
    WHERE tbl_eventinfo.int_eventinfoID = ?`
    db.query(queryString1,[req.body.id], (err, results, fields) => {
        if (err) console.log(err);
            results[0].date_eventdate = moment(results[0].date_eventdate).format('YYYY-MM-DD');
        
        res.send(results[0])
    });
});

priestRouter.post('/cancelNotif', (req, res)=>{
    var queryString1 =`DELETE from tbl_notification where int_eventinfoID = ?`
    db.query(queryString1,[req.body.id], (err, results, fields) => {
        return res.redirect('/priest');
    });
});

priestRouter.get('/notification', (req, res)=>{
    res.render('priest/views/notifications')
});

priestRouter.get('/priestSchedule', (req, res)=>{
    var queryString = `select * from tbl_eventinfo
    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    WHERE tbl_user.int_userID = ? AND tbl_services.var_eventname != "Baptism" AND tbl_eventinfo.bool_priestapproval=1`
    db.query(queryString,[req.session.userID],(err,results,fields)=>{
        console.log(results)
        console.log(req.session.userID)
        res.send(results)
    })
});

priestRouter.get('/priestRegularSchedule', (req, res)=>{
    var queryString = `select * from tbl_eventinfo
    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    WHERE tbl_user.int_userID = ? AND tbl_services.var_eventname = "Baptism"
    GROUP BY tbl_eventinfo.date_eventdate`
    db.query(queryString,[req.session.userID],(err,results,fields)=>{
        console.log(results)
        console.log(req.session.userID)
        res.send(results)
    })
});

priestRouter.post('/queryConfirmAppointment', (req,res)=>{
    var queryString1 = `UPDATE tbl_eventinfo SET bool_priestapproval=? where int_eventinfoID = ?`
    db.query(queryString1,[1,req.body.id],(err,results,fields)=>{

        if(err) throw err;
        return res.redirect('/priest');
        
    })
});

//here
priestRouter.get('/appointments', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_eventinfo
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    WHERE tbl_eventinfo.char_approvalstatus = ? and tbl_eventinfo.int_userpriestID`
    db.query(queryString1, ["Approved", req.session.userID,req.body.id], (err, results, fields) => {
        if (err) console.log(err);
        details=results;
        for(var i = 0; i < details.length; i++){
            details[i].date_eventdate = moment(details.date_eventdate).format('YYYY-MM-DD');
            
        }
        return res.render('priest/views/appointments',{ details : details});
        
    });      
    
});
        priestRouter.use(function (err, req, res, next) {
            console.error(err.stack)
            res.status(500)
            return res.render('priest/views/error/505', {title: '505: Something broke!'});
          })
        priestRouter.use(function(req, res, next) {
            res.status(404)
            return res.render('priest/views/error/404', {title: '404: File Not Found'});
        });
//===============================================================================================//
exports.priest = priestRouter;