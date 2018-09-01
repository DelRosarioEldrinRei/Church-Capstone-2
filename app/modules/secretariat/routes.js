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
    // secretariatRouter.get('/transaction-facilityreservation', (req, res)=>{
    //     var queryString1 =`SELECT * FROM tbl_facilityreservation 
    //     join tbl_facility on tbl_facilityreservation.int_facilityID = tbl_facility.int_facilityID 
    //     join tbl_user on tbl_facilityreservation.int_userID = tbl_user.int_userID`
    //     db.query(queryString1, (err, results, fields) => {
    //         var reservations = results;
    //         for(var i = 0; i < reservations.length; i++){

    //             reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
    //             reservations[i].time_reservestart= moment(reservations[i].time_reservestart, 'HH:mm:ss').format('h:mm a');
    //             reservations[i].time_reserveend= moment(reservations[i].time_reserveend, 'HH:mm:ss').format('h:mm a');
    //         }
    //         if (err) console.log(err);       
    //         return res.render('secretariat/views/transactions/facilityres',{ reservations : reservations });
    //     });     
        
    // });
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
        join tbl_docureqtype on tbl_docureqtype.int_docureqtypeID = tbl_requirementsdocument.int_docureqtypeID
        where tbl_documentrequest.int_requestID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
        });
    });
    secretariatRouter.post('/transaction-documentrequest/update/query', (req, res)=>{
        var queryString1 =`SELECT tbl_user.int_userID,tbl_documentrequest.int_requestID,char_docustatus,tbl_payment.int_paymentID,char_paymentstatus,tbl_requirementsdocument.int_requirementdocumentID,bool_reqstatus,dbl_docuprice FROM tbl_documentrequest 
        join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
        join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
        join tbl_docureqtype on tbl_docureqtype.int_docureqtypeID = tbl_requirementsdocument.int_docureqtypeID
        join tbl_user on tbl_user.int_userID = tbl_documentrequest.int_userID
        where tbl_documentrequest.int_requestID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            req.session.userID = results[0].int_userID
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
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        where tbl_services.var_eventname ='Baptism'`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var regulars=results;
                for(var i = 0; i < regulars.length; i++){   
                    regulars[i].date_birthday= moment(regulars[i].date_birthday).format('YYYY-MM-DD');
                    regulars[i].date_desireddate= moment(regulars[i].date_desireddate).format('YYYY-MM-DD');
                    regulars[i].time_desiredtime= moment(regulars[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A'); 
                }
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                    JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                    join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
                    JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
                    where tbl_services.var_eventname ='Special Baptism'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var specials = results;                
                            for(var i = 0; i < specials.length; i++){
                                
                                specials[i].date_birthday= moment(specials[i].date_birthday).format('YYYY-MM-DD');
                                specials[i].date_desireddate= moment(specials[i].date_desireddate).format('MM/DD/YYYY');
                                specials[i].time_desiredtime= moment(specials[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                                
                            }   
                                // console.log('results' + results[i])

                            return res.render('secretariat/views/transactions/eventapp/baptism',{regulars:regulars, specials:specials});
        }); 
        }); 
    });
    secretariatRouter.post('/transaction-baptism/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_eventapplication on tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID
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
        JOIN tbl_eventapplication ON tbl_eventapplication.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
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
                    var queryString3 = `UPDATE tbl_eventapplication SET char_approvalstatus =?
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
                            return res.redirect('/secretariat/transaction-baptism')
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

    
    
    secretariatRouter.get('/transaction-blessings', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Anointing of the sick'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var anointings=results; 
                for(var i = 0; i < anointings.length; i++){
                    
                    anointings[i].date_birthday= moment(anointings[i].date_birthday).format('MM/DD/YYYY');
                    anointings[i].date_desireddate= moment(anointings[i].date_desireddate).format('MM/DD/YYYY');
                    anointings[i].time_desiredtime= moment(anointings[i].time_desiredtime,'HH:mm:ss').format('hh:mm A'); 
                }             
            
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
                JOIN tbl_eventapplication on tbl_eventapplication.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                where tbl_services.var_eventname = 'Funeral Service'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var funerals = results;                
                            for(var i = 0; i < funerals.length; i++){
                                
                                funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                                funerals[i].date_desireddate= moment(funerals[i].date_desireddate).format('MM/DD/YYYY');
                                funerals[i].time_desiredtime= moment(funerals[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                                
                            }   

                    var queryString4 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                    
                    JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    join tbl_houseblessing on tbl_eventinfo.int_eventinfoID = tbl_houseblessing.int_eventinfoID
                    
                    where tbl_services.var_eventname ='Establishment Blessing'`

                        db.query(queryString4, (err, results, fields) => {
                            if (err) console.log(err);
                            var establishments = results;                
                            for(var i = 0; i < establishments.length; i++){
                                
                                
                                establishments[i].date_desireddate1= moment(establishments[i].date_desireddate1).format('MM/DD/YYYY');
                                establishments[i].time_desiredtime1= moment(establishments[i].time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                                establishments[i].date_desireddate2= moment(establishments[i].date_desireddate2).format('MM/DD/YYYY');
                                establishments[i].time_desiredtime2= moment(establishments[i].time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                                
                            }   

                            return res.render('secretariat/views/transactions/eventapp/blessings',{anointings:anointings, funerals:funerals, establishments:establishments});
        });
        });  
        }); 
    });
    secretariatRouter.post('/transaction-blessings/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_eventapplication on tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID
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
        JOIN tbl_eventapplication ON tbl_eventapplication.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
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
    secretariatRouter.post('/transaction-blessings/update',(req,res)=>{
        var queryString1 = `UPDATE tbl_requirements SET var_reqstatus = ? 
        WHERE int_requirementID = ?`
        db.query(queryString1,[req.body.reqstatus,req.body.reqid],(err,results,fields) =>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
            db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                if(req.body.reqstatus == "Approved" && req.body.paystatus == "Paid"){
                    var queryString3 = `UPDATE tbl_eventapplication SET char_approvalstatus =?
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
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_payment on tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        
        where tbl_services.var_eventname ='Confirmation'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var regulars=results;
                for(var i = 0; i < regulars.length; i++){
                    regulars[i].date_birthday= moment(regulars[i].date_birthday).format('MM/DD/YYYY');
                    regulars[i].date_desireddate= moment(regulars[i].date_desireddate).format('MM/DD/YYYY');
                    regulars[i].time_desiredtime= moment(regulars[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A'); 
                }             
            
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                    JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                    join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
                    
                    where tbl_services.var_eventname ='Special Confirmation'`

                        db.query(queryString3, (err, results, fields) => {

                            
                            var specials = results;                
                            for(var i = 0; i < specials.length; i++){
                                
                                specials[i].date_birthday= moment(specials[i].date_birthday).format('MM/DD/YYYY');
                                specials[i].date_desireddate= moment(specials[i].date_desireddate).format('MM/DD/YYYY');
                                specials[i].time_desiredtime= moment(specials[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                                
                            }
                                if (err) console.log(err);
                                return res.render('secretariat/views/transactions/eventapp/confirmation',{regulars:regulars, specials:specials});
                        
                                // console.log('results' + results[i])
                            
                            
            }); 
        }); 
    });
    secretariatRouter.post('/transaction-confirmation/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_eventapplication on tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID
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
        JOIN tbl_eventapplication ON tbl_eventapplication.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
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
                    var queryString3 = `UPDATE tbl_eventapplication SET char_approvalstatus =?
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
        var queryString2 = `UPDATE tbl_eventapplication SET var_reqstatus = "Complete" 
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            res.send(results[0])
        })
    })
    secretariatRouter.get('/transaction-marriage', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID
         
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
                    marriages[i].date_desireddate= moment(marriages[i].date_desireddate).format('MM/DD/YYYY');
                    marriages[i].time_desiredtime= moment(marriages[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A'); 
                }                        
                    return res.render('secretariat/views/transactions/eventapp/marriage',{marriages:marriages});
        }); 
    });
    secretariatRouter.post('/transaction-marriage/query', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_eventapplication on tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID
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
        JOIN tbl_eventapplication ON tbl_eventapplication.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventapplication.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
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
                var queryString3 = `UPDATE tbl_eventapplication SET char_approvalstatus =?
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
    var queryString2 = `UPDATE tbl_eventapplication SET var_reqstatus = "Complete" 
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

exports.secretariat = secretariatRouter;