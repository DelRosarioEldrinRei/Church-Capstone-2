var express = require('express');
var secretariatRouter = express.Router();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();

secretariatRouter.use(authMiddleware.secretariatAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
    secretariatRouter.get('/', (req, res)=>{
        var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo`
        var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                
            return res.render('secretariat/views/index',{ application : application,  request : request});
        }); }); 

    });
    secretariatRouter.get('/details', (req, res)=>{
        res.render('secretariat/views/ref/details')
    });

//===============================================================================================//
// T R A N S A C T I O N S //
//===============================================================================================//
    secretariatRouter.get('/transaction-facilityreservation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_facilityreservation 
        join tbl_facility on tbl_facilityreservation.int_facilityID = tbl_facility.int_facilityID 
        join tbl_user on tbl_facilityreservation.int_userID = tbl_user.int_userID`
        db.query(queryString1, (err, results, fields) => {
            var reservations = results;
            for(var i = 0; i < reservations.length; i++){

                // reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
                reservations[i].datetime_reservestart= moment(reservations[i].datetime_reservestart, 'HH:mm:ss').format('MM/DD/YYYY h:mm a');
                reservations[i].datetime_reserveend= moment(reservations[i].datetime_reserveend, 'HH:mm:ss').format('MM/DD/YYYY h:mm a');
            }
            if (err) console.log(err);       
            return res.render('secretariat/views/transactions/facilityres',{ reservations : reservations });
        });     
        
    });
    secretariatRouter.post('/transaction-facilityreservation/query', (req, res)=>{
        console.log(req.body)
        var queryString1 =`SELECT * FROM tbl_facilityreservation 
        join tbl_facility on tbl_facilityreservation.int_facilityID = tbl_facility.int_facilityID 
        join tbl_user on tbl_facilityreservation.int_userID = tbl_user.int_userID
        join tbl_requirementsfacility on tbl_facilityreservation.int_reservationID = tbl_requirementsfacility.int_reservationID
        where tbl_facilityreservation.int_reservationID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            console.log(results[0])
            res.send(results[0])
        });
    });

    secretariatRouter.post('/transaction-facilityreservation/query/update', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_facilityreservation 
        join tbl_facility on tbl_facilityreservation.int_facilityID = tbl_facility.int_facilityID 
        join tbl_user on tbl_facilityreservation.int_userID = tbl_user.int_userID
        
        join tbl_requirementsfacility on tbl_facilityreservation.int_reservationID = tbl_requirementsfacility.int_reservationID
        where tbl_facilityreservation.int_reservationID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
                
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.get('/transaction-documentrequest', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_documentrequest 
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID 
        join tbl_user on tbl_documentrequest.int_userID = tbl_user.int_userID`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);       
            var requests = results;
            // var arrays
            for(var i = 0; i < requests.length; i++){
                requests[i].date_docurequested= moment(requests[i].date_docurequested).format('MM/DD/YYYY');
            }
            // for(var i = 0; i < requests.length; i++){
            //     requests[i].date_docurequested= moment(requests[i].date_docurequested).format('MM/DD/YYYY');
            // }
            
            return res.render('secretariat/views/transactions/docureq',{ requests : requests });
        }); 
        
    });
    secretariatRouter.post('/transaction-documentrequest/query', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_documentrequest
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
        join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
        join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
        where tbl_documentrequest.int_requestID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-documentrequest/update/query', (req, res)=>{
        var queryString1 =`SELECT tbl_user.int_userID,tbl_documentrequest.int_requestID,tbl_documentrequest.char_docustatus,tbl_payment.int_paymentID,tbl_payment.char_paymentstatus,
        tbl_requirementsdocument.int_requirementsdocumentID,tbl_requirementsdocument.char_reqstatus,tbl_document.dbl_docuprice FROM tbl_documentrequest 
        join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
        join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
        join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
        join tbl_user on tbl_user.int_userID = tbl_documentrequest.int_userID
        where tbl_documentrequest.int_requestID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-documentrequest/update', (req, res)=>{
        console.log(req.body)
        const queryString2 = `UPDATE tbl_requirementsdocument set bool_reqstatus=?
        where int_requirementdocumentID = ?`
        db.query(queryString2,[req.body.reqstatus,req.body.reqid], (err, results1, fields) => {
            const queryString3 = `UPDATE tbl_payment set char_paymentstatus=?
            where int_paymentID = ?`
            db.query(queryString3,[req.body.paystatus,req.body.payid], (err, results1, fields) => { 
                const queryString4 = `UPDATE tbl_documentrequest set char_docustatus=?
                where int_requestID = ?`
                if(req.body.reqstatus == "Approved"){
                    if(req.body.paystatus == "Unpaid"){
                        db.query(queryString4,["To be Released",req.body.docuid], (err, results1, fields) => { 
                            var queryString6 = `INSERT INTO tbl_notification(int_userID,var_notifdesc) VALUES(?,?)`
                            db.query(queryString6,[req.session.userID,'Your Document Request is to ready to release'], (err, results1, fields) => {
                                var queryString7 =`INSERT INTO tbl_voucher(int_notifID,int_requestID,date_issued,date_due)
                                VALUES(?,?,?,?)`
                                var datenow = new Date();
                                var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                                console.log(dateNow)
                                var dateDue = moment(dateNow,'YYYY-MM-DD').add(7,'days');
                                var dateDue1 = moment(dateDue).format('YYYY-MM-DD')
                                console.log(dateDue1)
                                db.query(queryString7,[results1.insertId,req.body.docuid,dateNow,dateDue1], (err, results1, fields) => {
                                if (err) console.log(err);
                                return res.redirect('/secretariat/transaction-documentrequest');
                                })
                            })
                        });
                    }
                    else if(req.body.paystatus == "Paid"){
                         db.query(queryString4,["Released",req.body.docuid], (err, results1, fields) => { 
                         if (err) console.log(err);
                         return res.redirect('/secretariat/transaction-documentrequest');
                         });
                    }
                }
                else if(req.body.reqstatus == "Pending" ||req.body.reqstatus == "Incomplete"){
                    db.query(queryString4,["Pending",req.body.docuid], (err, results1, fields) => {
                        var queryString5 =`UPDATE tbl_payment SET char_paymentstatus =?
                        WHERE int_paymentID = ?`
                        db.query(queryString5,["Unpaid",req.body.payid], (err, results1, fields) => {
                        if (err) console.log(err);
                        return res.redirect('/secretariat/transaction-documentrequest');
                        });
                    });
                }
                else if(req.body.paystatus == "Paid"){
                    db.query(queryString4,["Released",req.body.docuid], (err, results1, fields) => { 
                    if (err) console.log(err);
                    return res.redirect('/secretariat/transaction-documentrequest');
                    });
                }
                
            });
        });
   
    });
    secretariatRouter.get('/transaction-walkin', (req, res)=>{
        res.render('secretariat/views/transactions/walkin')
    });

    secretariatRouter.get('/transaction-baptism', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        where tbl_services.var_eventname ='Baptism'`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var regulars=results;
                for(var i = 0; i < regulars.length; i++){   
                    regulars[i].date_birthday= moment(regulars[i].date_birthday).format('YYYY-MM-DD');
                    regulars[i].date_eventdate= moment(regulars[i].date_eventdate).format('YYYY-MM-DD');
                    regulars[i].time_eventstart= moment(regulars[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                    join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
                    JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                    where tbl_services.var_eventname ='Special Baptism'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            console.log(results)
                            var specials = results;                
                            for(var i = 0; i < specials.length; i++){
                                
                                specials[i].date_birthday= moment(specials[i].date_birthday).format('YYYY-MM-DD');
                                specials[i].date_eventdate= moment(specials[i].date_eventdate).format('MM/DD/YYYY');
                                specials[i].time_eventstart= moment(specials[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }   
                                // console.log('results' + results[i])

                            return res.render('secretariat/views/transactions/eventapp/baptism',{regulars:regulars, specials:specials});
        }); 
        }); 
    });
    secretariatRouter.post('/transaction-baptism/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-baptism/query/update', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-baptism/update',(req,res)=>{
        var queryString1 = `UPDATE tbl_requirements SET var_reqstatus = ? 
        WHERE int_requirementID = ?`
        db.query(queryString1,[req.body.reqstatus,req.body.reqid],(err,results,fields) =>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
            db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                if(req.body.reqstatus == "Approved" && req.body.paystatus == "Paid"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
                    WHERE int_eventinfoID = ?`
                    db.query(queryString3,["Approved",req.body.eventid],(err,results,fields) =>{
                        var queryString4 = `UPDATE tbl_eventinfo SET date_eventdate =?,
                        time_eventstart = ?
                        WHERE int_eventinfoID = ?`
                        // var timeRequestedStart = moment(req.body.timeRequested).format('HH:mm:ss')
                        console.log(req.body.timeRequested)
                        var timeRequestedEnd = moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
                        var dateRequested = moment(req.body.dateRequested).format('YYYY-MM-DD')
                        db.query(queryString4,[dateRequested,req.body.timeRequested,req.body.eventid],(err,results,fields) =>{
                            
                        
                        })
                    }) 
                }
                else{
                    if(err) throw err
                    return res.redirect('/secretariat/transaction-baptism')
                }
            })
        })
    })
    secretariatRouter.post('/transaction-baptism/changerequirementstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log('body: ' +req.body.id1)
        var value = req.body.id1.split(',');
        console.log(value);
            if(value[1]=='1'){var status= 'Approved'}
            if(value[1]=='2'){var status= 'Submitted'}
            if(value[1]=='0'){var status= 'Disapproved'}
        console.log('status: '+ status)
        var queryString= `select * from tbl_eventinfo  join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID =  tbl_requirementsinevents.int_eventinfoID where tbl_requirementsinevents.int_eventinfoID =?`
        var queryString1 = `UPDATE tbl_requirements SET var_reqstatus = ? where int_requirementID = ?;`;
        
            db.query(queryString,[value[0]], (err, results, fields) => {
                reqqID=results[0];
                if (err) console.log(err);       
                console.log(results)
                db.query(queryString1,[status, reqqID.int_requirementID], (err, results, fields) => {
                    if (err) console.log(err);       
                    console.log(results)
                    if(status!='Disapproved'){
                        console.log(err)
                        res.send({statu:1})
                    }
                    else{
                        res.send({statu:0})
                    }
                }); 
            }); 
        
        
    });
    secretariatRouter.post('/transaction-baptism/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log('body: ' +req.body.id1)
        var value = req.body.id1.split(',');
        console.log(value);
        // for(var i=0; i>value.length; i++){
            if(value[1]=='1'){var status= 'Paid'}
            if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ status)
        var queryString= `select * from tbl_eventinfo 
            join tbl_payment on tbl_eventinfo.int_paymentID = 
            tbl_payment.int_paymentID
            
            where tbl_eventinfo.int_eventinfoID =?`
        var queryString1 = `UPDATE tbl_payment SET        
                char_paymentstatus = ?,
                datetime_paymentreceived = ?
                where int_paymentID = ?;`;

        db.query(queryString,[value[0]], (err, results, fields) => {
            reqqID=results[0];
            if (err) console.log(err);       
            console.log(results)
        db.query(queryString1,[status, date,reqqID.int_paymentID], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            if (err){
                console.log(err)
                res.send({alertDesc:notsuccess})
            }
            else{
                res.send({alertDesc:success})
            }
        }); }); 
        
    });
    secretariatRouter.post('/transaction-baptism/changeapprovalstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log('body: ' +req.body.id1)
        var value = req.body.id1.split(',');
        console.log(value);
            if(value[1]=='1'){var status= 'Approved'}
            if(value[1]=='2'){var status= 'Pending'}
            if(value[1]=='0'){var status= 'Disapproved'}

        console.log('status: '+ status)
        var queryString = `UPDATE tbl_eventinfo SET        
                char_approvalstatus = ?
                where int_eventinfoID = ?;`;

        db.query(queryString,[status,value[0]], (err, results, fields) => {
            console.log(results)
            if(status!='Disapproved'){
                if(err) throw err
                            var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                            , tbl_eventinfo.time_eventstart from tbl_user JOIN tbl_eventinfo 
                            ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID`
                            db.query(queryString8,(err,results1,fields)=>{
                                if(err) throw err
                                    var schedules = results1;
                                    console.log("SCHEDULE NG MGA PARI")
                                    console.log(schedules)
                                    var queryString9 = `SELECT * FROM tbl_eventinfo 
                                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                                    where int_eventinfoID = ?`
                                    db.query(queryString9,[value[0]],(err,results,fields)=>{
                                        if(results.var_eventname == "Special Baptism"){
                                        var event = results[0]
                                        console.log("YUNG ICOCOMPARE NA SCHED ")
                                        console.log(event.date_eventdate,event.time_eventstart)
                                        console.log(schedules.length)
                                            for(i=0;i<schedules.length;i++){
                                                console.log("PASOK: " + i)   
                                                schedules[i].date_eventdate = moment(schedules[i].date_eventdate,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
                                                event.date_eventdate = moment(event.date_eventdate,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
                                                console.log(event.date_eventdate + "?=" + schedules[i].date_eventdate )
                                                console.log(schedules[i].time_eventstart + "?=" + event.time_eventstart)
                                                if(moment(schedules[i].date_eventdate).isSame(event.date_eventdate) && schedules[i].time_eventstart == event.time_eventstart){  
                                                        console.log("WALANG PUMASOK KASE BUSY LAHAT TANGINA")
                                                }
                                                else{
                                                    console.log("PASOK: " + i)
                                                    var nowDate = new Date();
                                                    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                                        console.log(date)
                                                        var queryString10 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID)
                                                        VALUES(${schedules[i].int_userID},now(),${schedules[i].int_eventinfoID})`
                                                        db.query(queryString10,(err,results,fields)=>{
                                                            if(err) throw err;
                                                            res.send({statu:1})
                                                        })
                                                } 
                                            }
                                            
                                        }
                                        //- R E G U L A R  B A P T I S M
                                        else{
                                            console.log('here')
                                            var baptismDate;
                                            var queryDate = `SELECT date_eventdate FROM tbl_eventinfo WHERE int_eventinfoID = ?`
                                            var queryEvents = `SELECT * FROM tbl_eventinfo WHERE date_eventdate = ?`
                                            var updatePriests = `UPDATE tbl_eventinfo SET int_userpriestID = ? WHERE date_eventdate = ?`
                                            db.query(queryDate,[value[0]],(err,results,fields)=>{
                                                baptismDate = results[0].date_eventdate;
                                                db.query(queryEvents, [results[0].date_eventdate], (err, results, fields) => {
                                                    console.log(results[0])
                                                    if(results[0].int_userpriestID == null){
                                                        var queryString1 = `SELECT tbl_user.int_userID FROM tbl_eventinfo 
                                                        JOIN tbl_services ON tbl_eventinfo.int_eventID = tbl_services.int_eventID
                                                        JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
                                                        WHERE tbl_services.var_eventname = "Baptism" 
                                                        order by date_eventdate DESC`
                                                        db.query(queryString1,(err,results,fields)=>{
                                                            var lastPriest = results[0].int_userID;
                                                            console.log(lastPriest)
                                                            var queryString2 = `SELECT int_userID from tbl_user where char_usertype = "Priest"`
                                                            var nextPriest;
                                                            db.query(queryString2,(err,results,fields)=>{
                                                                for(var o=0; o<results.length; o++){
                                                                    if(results[o].int_userID == lastPriest){
                                                                        if(o == results.length - 1 ){
                                                                            nextPriest = results[0].int_userID
                                                                            console.log(nextPriest)
                                                                            db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                                if(err) throw err;
                                                                            })
                                                                        }
                                                                        else{
                                                                            nextPriest = results[o+1].int_userID
                                                                            console.log(nextPriest)
                                                                            db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                                if(err) throw err;
                                                                            })
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        })
                                                    }
                                                    else{
                                                        db.query(updatePriests,[results[0].int_userpriestID, baptismDate],(err,results,fields)=>{
                                                            if(err) throw err;
                                                        })
                                                    }
                                                })
                                            })                                        
                                            
                                        }
                                        
                                    })
                                }) 
                console.log(err)
                res.send({statu:1})
            }
            else{
                res.send({statu:0})
            }
        }); 






        
    });
    secretariatRouter.post('/message', (req, res)=>{
        var queryString1= `select * from tbl_user  where int_userID=?`
        db.query(queryString1,[req.body.int_userID], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            res.send(results[0])
        }); 
    }); 
    secretariatRouter.post('/message/send', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var nowDate = new Date(); 
            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
            
        var queryString3= `INSERT INTO tbl_message(int_senderID, int_receiverID, var_subject, text_message,datetime_sent) VALUES(?,?,?,?,?);`;
        
                db.query(queryString3,[req.session.secretariat.int_userID, req.body.int_receiverID, req.body.var_subject, req.body.text_message,date], (err, results, fields) => {
                    if (err) console.log(err);       
                    console.log(results)
                    if (err){
                        console.log(err)
                        res.send({alertDesc:notsuccess})
                    }
                    else{
                        res.send({alertDesc:success})
                    }
        }); 
    }); 
            
       
    

    
    secretariatRouter.get('/transaction-blessings', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Anointing of the sick'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var anointings=results; 
                for(var i = 0; i < anointings.length; i++){
                    
                    anointings[i].date_birthday= moment(anointings[i].date_birthday).format('MM/DD/YYYY');
                    anointings[i].date_eventdate= moment(anointings[i].date_eventdate).format('MM/DD/YYYY');
                    anointings[i].time_eventstart= moment(anointings[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                }             
            
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
                where tbl_services.var_eventname = 'Funeral Service'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var funerals = results;                
                            for(var i = 0; i < funerals.length; i++){
                                
                                funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                                funerals[i].date_eventdate= moment(funerals[i].date_eventdate).format('MM/DD/YYYY');
                                funerals[i].time_eventstart= moment(funerals[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }   

                    var queryString4 =`SELECT * FROM tbl_houseblessing 
                    JOIN tbl_user on tbl_houseblessing.int_userID =tbl_user.int_userID`

                        db.query(queryString4, (err, results, fields) => {
                            if (err) console.log(err);
                            var establishments = results;                
                            for(var i = 0; i < establishments.length; i++){
                                
                                
                                establishments[i].date_blessingdate= moment(establishments[i].date_blessingdate).format('MM/DD/YYYY');
                                establishments[i].time_blessingstart= moment(establishments[i].time_blessingstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }   

                            return res.render('secretariat/views/transactions/eventapp/blessings',{anointings:anointings, funerals:funerals, establishments:establishments});
        });
        });  
        }); 
    });
    secretariatRouter.post('/transaction-blessings/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-blessings/query/update', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-blessings/update',(req,res)=>{
        var queryString1 = `UPDATE tbl_requirements SET var_reqstatus = ? 
        WHERE int_requirementID = ?`
        db.query(queryString1,[req.body.reqstatus,req.body.reqid],(err,results,fields) =>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
            db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                if(req.body.reqstatus == "Approved" && req.body.paystatus == "Paid"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
                    WHERE int_eventinfoID = ?`
                    db.query(queryString3,["Approved",req.body.eventid],(err,results,fields) =>{
                        var queryString4 = `UPDATE tbl_eventinfo SET date_approveddate =?,
                        time_approvedstart = ?, time_approvedend =?
                        WHERE int_eventinfoID = ?`
                        // var timeRequestedStart = moment(req.body.timeRequested).format('HH:mm:ss')
                        console.log(req.body.timeRequested)
                        console.log(moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss'))
                        var timeRequestedEnd = moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
                        var dateRequested = moment(req.body.dateRequested).format('YYYY-MM-DD')
                        db.query(queryString4,[dateRequested,req.body.timeRequested,timeRequestedEnd,req.body.eventid],(err,results,fields) =>{
                            if(err) throw err
                            return res.redirect('/secretariat/transaction-blessings')
                        })
                    }) 
                }
                else{
                    if(err) throw err
                    return res.redirect('/secretariat/transaction-blessings')
                }
            })
        })
    })
    secretariatRouter.get('/transaction-confirmation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        
        where tbl_services.var_eventname ='Confirmation'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var regulars=results;
                for(var i = 0; i < regulars.length; i++){
                    regulars[i].date_birthday= moment(regulars[i].date_birthday).format('MM/DD/YYYY');
                    regulars[i].date_eventdate= moment(regulars[i].date_eventdate).format('MM/DD/YYYY');
                    regulars[i].time_eventstart= moment(regulars[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }             
            
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                    
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                    join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
                    
                    where tbl_services.var_eventname ='Special Confirmation'`

                        db.query(queryString3, (err, results, fields) => {

                            
                            var specials = results;                
                            for(var i = 0; i < specials.length; i++){
                                
                                specials[i].date_birthday= moment(specials[i].date_birthday).format('MM/DD/YYYY');
                                specials[i].date_eventdate= moment(specials[i].date_eventdate).format('MM/DD/YYYY');
                                specials[i].time_eventstart= moment(specials[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }                            
                                if (err) console.log(err);
                                return res.render('secretariat/views/transactions/eventapp/confirmation',{regulars:regulars, specials:specials});
                        
                                // console.log('results' + results[i])
                            
                            
            }); 
        }); 
    });
    secretariatRouter.post('/transaction-confirmation/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id],(err,results1,fields) => {
            if (err) console.log(err);
            res.send({results:results[0],requirements:results1})
            console.log(results[0])
            })
        });
    });

    secretariatRouter.post('/transaction-confirmation/query/update', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id],(err,results1,fields) => {
            if (err) console.log(err);
            res.send({results:results[0],requirements:results1})
            console.log({requirements:results1})
            });
        });
    });

    secretariatRouter.post('/transaction-confirmation/update',(req,res)=>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
            db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                if(req.body.reqstatus == "Complete" && req.body.paystatus == "Paid"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
                    WHERE int_eventinfoID = ?`
                    db.query(queryString3,["Approved",req.body.eventid],(err,results,fields) =>{
                        var queryString4 = `UPDATE tbl_eventinfo SET date_approveddate =?,
                        time_approvedstart = ?, time_approvedend =?
                        WHERE int_eventinfoID = ?`
                        // var timeRequestedStart = moment(req.body.timeRequested).format('HH:mm:ss')
                        console.log(req.body.timeRequested)
                        console.log(moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss'))
                        var timeRequestedEnd = moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
                        var dateRequested = moment(req.body.dateRequested).format('YYYY-MM-DD')
                        db.query(queryString4,[dateRequested,req.body.timeRequested,timeRequestedEnd,req.body.eventid],(err,results,fields) =>{
                            if(err) throw err
                            return res.redirect('/secretariat/transaction-confirmation')
                        })
                    }) 
                }
                else{
                    if(err) throw err
                    return res.redirect('/secretariat/transaction-confirmation')
                }
            })
    })
    secretariatRouter.post('/transaction-confirmation/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            res.send(results[0])
        })
    })
    secretariatRouter.post('/transaction-confirmation/updateRequirementStatus',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Complete" 
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            res.send(results[0])
        })
    })
    secretariatRouter.get('/transaction-marriage', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        
         
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_wedbride on tbl_eventinfo.int_eventinfoID = tbl_wedbride.int_eventinfoID
        JOIN tbl_wedcouple on tbl_eventinfo.int_eventinfoID = tbl_wedcouple.int_eventinfoID
        JOIN tbl_wedgroom on tbl_eventinfo.int_eventinfoID = tbl_wedgroom.int_eventinfoID
        
        where tbl_services.var_eventname ='Marriage'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var marriages=results;
                for(var i = 0; i < marriages.length; i++){
                    
                    marriages[i].date_birthday= moment(marriages[i].date_birthday).format('MM/DD/YYYY');
                    marriages[i].date_bbirthday= moment(marriages[i].date_bbirthday).format('MM/DD/YYYY');
                    marriages[i].date_bbapdate= moment(marriages[i].date_bbapdate).format('MM/DD/YYYY');
                    marriages[i].date_bcondate= moment(marriages[i].date_bcondate).format('MM/DD/YYYY');
                    marriages[i].date_gbapdate= moment(marriages[i].date_gbapdate).format('MM/DD/YYYY');
                    marriages[i].date_gcondate= moment(marriages[i].date_gcondate).format('MM/DD/YYYY');
                    marriages[i].date_cprevweddate= moment(marriages[i].date_cprevweddate).format('MM/DD/YYYY');
                    marriages[i].date_eventdate= moment(marriages[i].date_eventdate).format('MM/DD/YYYY');
                    marriages[i].time_eventstart= moment(marriages[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }                        
                    return res.render('secretariat/views/transactions/eventapp/marriage',{marriages:marriages});
        }); 
    });
    secretariatRouter.post('/transaction-marriage/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?
            AND tbl_requirements.var_reqstatus = 'Submitted'`
            db.query(queryString2,[req.body.id],(err,results1,fields) => {
            if (err) console.log(err);
            res.send({results:results[0],requirements:results1})
            console.log(results[0])
            })
        });
    });
    secretariatRouter.post('/transaction-marriage/query/update', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id],(err,results1,fields) => {
            if (err) console.log(err);
            res.send({results:results[0],requirements:results1})
            console.log({requirements:results1})
            });
        });
    });
    secretariatRouter.post('/transaction-marriage/update',(req,res)=>{
        var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
        WHERE int_paymentID = ?`
        db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
            if(req.body.reqstatus == "Complete" && req.body.paystatus == "Paid"){
                var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
                WHERE int_eventinfoID = ?`
                db.query(queryString3,["Approved",req.body.eventid],(err,results,fields) =>{
                    var queryString4 = `UPDATE tbl_eventinfo SET date_approveddate =?,
                    time_approvedstart = ?, time_approvedend =?
                    WHERE int_eventinfoID = ?`
                    // var timeRequestedStart = moment(req.body.timeRequested).format('HH:mm:ss')
                    console.log(req.body.timeRequested)
                    console.log(moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss'))
                    var timeRequestedEnd = moment(req.body.timeRequested,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
                    var dateRequested = moment(req.body.dateRequested).format('YYYY-MM-DD')
                    db.query(queryString4,[dateRequested,req.body.timeRequested,timeRequestedEnd,req.body.eventid],(err,results,fields) =>{
                        if(err) throw err
                        return res.redirect('/secretariat/transaction-marriage')
                    })
                }) 
            }
            else{
                if(err) throw err
                return res.redirect('/secretariat/transaction-baptism')
            }
        })
    })
    secretariatRouter.post('/transaction-marriage/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =?`
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            res.send(results[0])
        })
    })
    secretariatRouter.post('/transaction-marriage/updateRequirementStatus',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirement SET var_reqstatus = "Complete" 
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            res.send(results[0])
        })
    })
    secretariatRouter.get('/transaction-eventproposal', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_specialevent 
        JOIN tbl_user on tbl_specialevent.int_userID = tbl_user.int_userID`
        
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);       
            var proposals = results;
            for(var i = 0; i < proposals.length; i++){
                proposals[i].time_eventstart= moment(proposals[i].time_eventstart).format('MM/DD/YYYY h:mm a');
                proposals[i].time_eventend= moment(proposals[i].time_eventend).format('MM/DD/YYYY h:mm a');
            }
            return res.render('secretariat/views/transactions/eventproposal',{ proposals : proposals });
        }); 
        
    });

















    secretariatRouter.get('/newpriestaccount', (req, res)=>{
        res.render('secretariat/views/createaccount');
        
        
    });


    secretariatRouter.post('/newpriestaccount', (req, res)=>{
        var queryString = `INSERT INTO tbl_user(var_userlname, var_userfname, var_usermname, char_usergender, var_useraddress, var_usercontactnum, var_username, var_useremail, var_password, char_usertype) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString, [req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.contactnumber, req.body.username, req.body.email, req.body.createpassword, "Priest"], (err, results, fields) => {
            if (err) throw err;
            
            res.redirect('/secretariat?createAccountSuccess');
        });
 
        
    });


    secretariatRouter.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500)
        return res.render('secretariat/views/error/505', {title: '505: Something broke!'});
      })
    secretariatRouter.use(function(req, res, next) {
        res.status(404)
        return res.render('secretariat/views/error/404', {title: '404: File Not Found'});
    });
exports.secretariat = secretariatRouter;