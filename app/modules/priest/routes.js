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
    var queryString1 =`SELECT * FROM tbl_notification 
    JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_notification.int_eventinfoID
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    where tbl_eventinfo.char_approvalstatus =? AND tbl_notification.int_userID = ?`
    db.query(queryString1,["Approved",req.session.userID], (err, results, fields) => {
        if (err) console.log(err);
        details=results;
        for(var i = 0; i < details.length; i++){
            details[i].date_eventdate = moment(details.date_eventdate).format('YYYY-MM-DD');
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
    WHERE tbl_user.int_userID = ?`
    db.query(queryString,[req.session.int_userID],(err,results,fields)=>{
        console.log(results)
        res.send(results)
    })
});
// priestRouter.get('/schedule', (req, res)=>{
//     var queryString1 =`SELECT * FROM tbl_schedule
//     WHERE int_userID=?`
//     db.query(queryString1, [req.session.priest.int_userID], (err, results, fields) => {
//         if (err) console.log(err);
//         var schedules= results
//         for(var i = 0; i < schedules.length; i++){
//             schedules[i].date_schedule= moment(schedules[i].date_schedule).format('MM/DD/YYYY');
            
//         }
//     return res.render('priest/views/schedule',{schedules:results})
// });
// });

priestRouter.post('/queryConfirmAppointment', (req,res)=>{
    var queryString1 = `UPDATE tbl_eventinfo SET int_userpriestID = ? where int_eventinfoID = ?`
    db.query(queryString1,[req.session.userID,req.body.id],(err,results,fields)=>{
        if(err) throw err;
        var queryString2 = `DELETE from tbl_notification where int_eventinfoID = ?`
        db.query(queryString2,[req.body.id],(err,results,fields)=>{
            if(err) throw err;
            console.log(req.body.id)
            return res.redirect('/priest');
        })
    })
    // var success =0
    // var notsuccess =1
    // var queryString1 =`select var_eventname, int_eventinfoID from tbl_eventinfo join tbl_services on tbl_eventinfo.int_eventID = tbl_services.int_eventID where tbl_eventinfo.int_eventinfoID = ${req.body.id}`
    // db.query(queryString1, (err, results, fields) => {
    //     // console.log(queryString1)
    //     console.log(err)
    //     var eventID = results[0];

    //     if(eventID.var_eventname == 'Anointing of the sick' || eventID.var_eventname == 'Funeral Service' || eventID.var_eventname == 'Funeral Mass' || eventID.var_eventname == 'Establishment Blessing'){
    //         var selectInfo = `select * from tbl_relation join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID where tbl_relation.int_eventinfoID = ${req.body.id}`
    //         db.query(selectInfo, (err, results, fields) => {
    //             var scheduleInfo = results[0];
    //             console.log(err)
    //             var scheduleInsert= `insert into tbl_schedule (int_userID, int_eventinfoID, var_venue, time_schedend, date_schedule ) values(?,?,?,?,?)`
    //             db.query(scheduleInsert, [req.session.priest.int_userID, eventID.int_eventinfoID, 'INLPP', scheduleInfo.time_desiredtime, scheduleInfo.date_desireddate ], (err, results, fields) => {
    //                 var updateStatus= `UPDATE tbl_eventapplication SET char_approvalstatus = 'Confirmed' where int_eventinfoID= ?;`;
    //                 db.query(updateStatus, [eventID.int_eventinfoID],(err, results, fields) => {
                
    //             if (err){
    //                 console.log(err)
    //                 res.send({alertDesc:notsuccess})
    //             }
    //             else{
    //                 res.send({alertDesc:success})
    //             }
    //         });});});
    //     }
    //     if(eventID.var_eventname == 'Baptism' || eventID.var_eventname == 'Special Baptism' || eventID.var_eventname == 'Confirmation' || eventID.var_eventname == 'Special Confirmation'){
            
    //         var selectInfo = `select * from tbl_relation join tbl_baptism
    //         on tbl_relation.int_eventinfoID = tbl_baptism.int_eventinfoID where tbl_relation.int_eventinfoID = ${req.body.id}`
    //         db.query(selectInfo, (err, results, fields) => {
    //             var scheduleInfo = results[0];
    //             console.log(scheduleInfo)
    //             console.log(err)
    //             var scheduleInsert= `insert into tbl_schedule (int_userID, int_eventinfoID, var_venue, time_schedend, date_schedule ) values(?,?,?,?,?)`
    //             db.query(scheduleInsert, [req.session.priest.int_userID, eventID.int_eventinfoID, 'INLPP', scheduleInfo.time_eventstart, scheduleInfo.date_eventdate ], (err, results, fields) => {
    //                 var updateStatus= `UPDATE tbl_eventinfo SET char_approvalstatus = 'Approved' where int_eventinfoID= ?;`;
    //                 db.query(updateStatus, [eventID.int_eventinfoID],(err, results, fields) => {
                
    //                 if (err){
    //                 console.log(err)
    //                 res.send({alertDesc:notsuccess})}
    //                 else{
    //                 res.send({alertDesc:success})}
    //         });});});
    //     }
    //     if(eventID.var_eventname == 'Marriage'){
    //         var selectInfo = `select * from tbl_relation join tbl_wedcouple
    //         on tbl_relation.int_eventinfoID = tbl_wedcouple.int_eventinfoID where tbl_relation.int_eventinfoID = ${req.body.id}`
    //         db.query(selectInfo, (err, results, fields) => {
    //             var scheduleInfo = results[0];
    //             console.log(scheduleInfo)
    //             console.log(err)
    //             var scheduleInsert= `insert into tbl_schedule (int_userID, int_eventinfoID, var_venue, time_schedend, date_schedule ) values(?,?,?,?,?)`
    //             db.query(scheduleInsert, [req.session.priest.int_userID, eventID.int_eventinfoID, 'INLPP', scheduleInfo.time_desiredtime, scheduleInfo.date_desireddate ], (err, results, fields) => {
    //                 var updateStatus= `UPDATE tbl_eventapplication SET char_approvalstatus = 'Confirmed' where int_eventinfoID= ?;`;
    //                 db.query(updateStatus, [eventID.int_eventinfoID],(err, results, fields) => {
                
    //             if (err){
    //             console.log(err)
    //             res.send({alertDesc:notsuccess})}
    //             else{
    //             res.send({alertDesc:success})}
    //         });});});
    //     }
        // if (err)
        // {
        //     console.log(err)
        //     res.send({alertDesc:notsuccess})

        // }
        // else
        // {
        //     res.send({alertDesc:success})
        // }
    // });
});

priestRouter.get('/appointments', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_eventinfo
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    WHERE tbl_eventinfo.char_approvalstatus = ? and tbl_services.var_eventname  ? `
    db.query(queryString1, ["Approved", 'Document Request'], (err, results, fields) => {
        if (err) console.log(err);
        details=results;
        for(var i = 0; i < details.length; i++){
            details[i].date_eventdate = moment(details.date_eventdate).format('YYYY-MM-DD');
            
        }
        return res.render('priest/views/appointments',{ details : details});
        
    });      
    
});


        // for(var i = 0; i < details.length; i++){
        //     if(details[i].var_eventname =='Establishment Blessing'){
        //             var queryString4 =`select * from tbl_houseblessing where int_eventinfoID = ?`
        //             db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
        //                 if (err) console.log(err);
        //                 // details[0].date_approveddate = moment(details[0].date_approveddate).format('MM/DD/YYYY')
        //                 console.log('loob ng establishment blessing')
        //             });
        //     }
        //     if(details[i].var_eventname =='Marriage'){
        //         var queryString4 =`select * from tbl_wedgroom 
        //         join tbl_wedbride on tbl_wedgroom.int_eventinfoID =tbl_wedbride.int_eventinfoID
        //         join tbl_wedcouple on tbl_wedgroom.int_eventinfoID =tbl_wedcouple.int_eventinfoID 
        //         join tbl_relation on tbl_wedgroom.int_eventinfoID =tbl_relation.int_eventinfoID 
        //         where tbl_relation.int_eventinfoID = ?`
        //         db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
        //             if (err) console.log(err);
        //             console.log('Marriage')
        //             details[0].date_approveddate = moment(details[0].date_approveddate).format('MM/DD/YYYY')
        //         });
        //     }
        //     if(details[i].var_eventname =='Baptism' || details[i].var_eventname =='Special Baptism' || details[i].var_eventname =='Confirmation' ||details[i].var_eventname =='Special Confirmation'   ){
        //         var queryString4 =`select * from tbl_relation
        //         join tbl_baptism  on tbl_relation.int_eventinfoID =tbl_baptism.int_eventinfoID 
        //         where tbl_relation.int_eventinfoID = ?`
        //         db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
        //             if (err) console.log(err);
        //             details[0].date_approveddate = moment(details[0].date_approveddate).format('MM/DD/YYYY')
        //             console.log('loob ng other heheh')
        //         });
        //     }   
        //     if(details[i].var_eventname =='Anointing of the sick' || details[i].var_eventname =='Funeral Mass' || details[i].var_eventname =='Funeral Service'){
        //         var queryString4 =`select * from tbl_relation
        //         join tbl_blessing  on tbl_relation.int_eventinfoID =tbl_blessing.int_eventinfoID 
        //         where tbl_relation.int_eventinfoID = ?`
        //         db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
        //             if (err) console.log(err);
        //             var varName = moredetails.var_lastname +', ' + moredetails.var_firstname;
        //             console.log('loob ng other heheh')
        //         });
        //     }   
        // }

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