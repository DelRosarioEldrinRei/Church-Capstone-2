var express = require('express');
var priestRouter = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();

priestRouter.use(authMiddleware.priestAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
priestRouter.get('/', (req, res)=>{
    res.render('priest/views/appointments')
});
priestRouter.get('/notification', (req, res)=>{
    res.render('priest/views/notification')
});
priestRouter.get('/schedule', (req, res)=>{
    res.render('priest/views/schedule')
});
priestRouter.get('/appointments', (req, res)=>{
  
        // var queryString1 =`SELECT * FROM tbl_eventinfo 
        // JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        // JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        // WHERE tbl_eventapplication.char_approvalstatus = 'Approved'`
        // db.query(queryString1, (err, results, fields) => {
        //     if (err) console.log(err);
        //     var details = results[0];
        //     console.log('labas ng for')
           
        //     // showAppointments(details)
        //     return res.render('priest/views/appointments',{ details : details });
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
        WHERE tbl_eventinfo.int_userID = ?`
        db.query(queryString1, [11], (err, results, fields) => {
            if (err) console.log(err);
        
            return res.render('priest/views/schedule',{ reservations : results });
        });

        // });
        function showAppointments(details){
            for(var i = 0; i < details.length; i++){
                if(details[i].var_eventname =='Establishment Blessing'){
                        var queryString4 =`select * from tbl_houseblessing where int_eventinfoID = ?`
                        db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
                            if (err) console.log(err);
                            var moredetails = results[0];
                            var varName = moredetails.var_owner;
                            // var schedule = moredetails.date_desireddate +" " + moredetails.time_desiredtiime
                            details[i].varName = varName;
                            details[i].schedule = schedule;
                            details[i].location = moredetails.var_estloc
                            console.log('loob ng establishment blessing')
                        });
                }
                if(details[i].var_eventname =='Marriage'){
                    var queryString4 =`select * from tbl_wedgroom 
                    join tbl_wedbride on tbl_wedgroom.int_eventinfoID =tbl_wedbride.int_eventinfoID
                    join tbl_wedcouple on tbl_wedgroom.int_eventinfoID =tbl_wedcouple.int_eventinfoID 
                    join tbl_relation on tbl_wedgroom.int_eventinfoID =tbl_relation.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ?`
                    db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        var varName = "Mr. "+moredetails.var_lastname + " & Ms." + moredetails.var_blastname;
                        // var schedule = moredetails.date_desireddate +" " + moredetails.time_desiredtiime
                        details[i].varName = varName;
                        details[i].schedule = schedule;
                        details[i].location = 'INLPP'
                        console.log('Marriage')
                    });
                }
                if(details[i].var_eventname =='Baptism' || details[i].var_eventname =='Special Baptism' || details[i].var_eventname =='Confirmation' ||details[i].var_eventname =='Special Confirmation'   ){
                    var queryString4 =`select * from tbl_relation
                    join tbl_baptism  on tbl_relation.int_eventinfoID =tbl_baptism.int_eventinfoID 
                    where int_eventinfoID = ?`
                    db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        var varName = moredetails.var_lastname +', ' + moredetails.var_firstname;
                        // var schedule = moredetails.date_desireddate +" " + moredetails.time_desiredtiime
                        details[i].schedule = schedule;
                        details[i].varName = varName;
                        details[i].location = 'INLPP'
                        console.log('loob ng other heheh')
                    });
                }   
                if(details[i].var_eventname =='Anointing of the sick' || details[i].var_eventname =='Funeral Mass' || details[i].var_eventname =='Funeral Service'){
                    var queryString4 =`select * from tbl_relation
                    join tbl_blessing  on tbl_relation.int_eventinfoID =tbl_blessing.int_eventinfoID 
                    where int_eventinfoID = ?`
                    db.query(queryString4, [details[i].int_eventinfoID],(err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        var varName = moredetails.var_lastname +', ' + moredetails.var_firstname;
                        // var schedule = moredetails.date_desireddate +" " + moredetails.time_desiredtiime
                        details[i].schedule = schedule;
                        details[i].varName = varName;
                        details[i].location = 'INLPP'
                        console.log('loob ng other heheh')
                    });
                }   
            }
 


        }
});

//===============================================================================================//
exports.priest = priestRouter;