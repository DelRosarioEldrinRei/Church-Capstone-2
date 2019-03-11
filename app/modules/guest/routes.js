var express = require('express');
var guestRouter = express.Router();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();
var multer = require('multer');
var swal = require('sweetalert2')
var pugpdf = require('pug-pdf')
fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/req')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
})
var upload = multer({ storage: storage})

//===============================================================================================//
// I N D E X //
//===============================================================================================//
    guestRouter.use(authMiddleware.guestAuth)
    
    guestRouter.get('/', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_services where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage'  or var_eventname = 'Anointing of the sick'`
        db.query(queryString1, (err, results, fields) => {
          var events =results;
          var queryString1 =`SELECT * FROM tbl_utilities join tbl_serviceutilities where tbl_utilities.int_serviceutilitiesID= tbl_serviceutilities.int_serviceutilitiesID and tbl_utilities.char_servicestatus = 'Enabled'`
            db.query(queryString1, (err, results, fields) => {
                var services =results;
                if (err) console.log(err);
                return res.render('guest/views/index',{ events : events, services: services });
        });  
          
        });
    });
    
    guestRouter.get('/profile', (req, res)=>{
        res.render('guest/views/profile/profile',{user: req.session.user});
    });
    guestRouter.post('/profile/query', (req, res) => {
        const queryString = `SELECT * from tbl_user WHERE int_userID = ?`;
        console.log(req.body.id)
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) console.log(err);
            res.send(results[0])
            console.log(results)
            });
    });

    guestRouter.post('/query', (req, res) => {
        var queryString1 =`SELECT * FROM tbl_services where int_eventID = ? `
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
          var queryString2 =`select var_reqname from tbl_requirementtype where int_eventID = ?`
          
        db.query(queryString2,[req.body.id], (err, results2, fields) => {
          if (err) console.log(err);
          res.send({firstQuery:results1[0],secondQuery:results2});
          });
        })
      })
      
      guestRouter.post('/baptismdesc', (req, res) => {
        //REGULAR BAPTISM
        var regularbap =`select * from tbl_services 
        join tbl_utilities on tbl_services.int_eventID = tbl_utilities.int_eventID  where var_eventname='Baptism'`  
          db.query(regularbap, (err, regularbap, fields) => {
            if (err) console.log(err);
            
        var regbapreq =`select var_reqname from tbl_requirementtype where int_eventID = 
          (select int_eventID from tbl_services where var_eventname= 'Baptism')`  
          db.query(regbapreq, (err, regbapreq, fields) => {
            if (err) console.log(err);
        
      
        //SPECIAL BAPTISM
        var specialbap =`select * from tbl_services
        join tbl_utilities on tbl_services.int_eventID = tbl_utilities.int_eventID  where var_eventname='Special Baptism'`    
          db.query(specialbap, (err, specialbap, fields) => {
            if (err) console.log(err);
        var spcbapreq =`select var_reqname from tbl_requirementtype where int_eventID = 
            (select int_eventID from tbl_services where var_eventname= 'Special Baptism')`  
              db.query(spcbapreq, (err, spcbapreq, fields) => {
                if (err) console.log(err);
       
      
            res.send({regularbap:regularbap[0], regbapreq:regbapreq,  specialbap:specialbap[0], spcbapreq:spcbapreq, });
            });
          })
        })
      
      })
      })

      guestRouter.post('/baptism/beforeloggingin', (req, res) => {
                console.log(req.body.id)
                req.session.eventId = req.body.id
                res.send('hello')
        })
      
      guestRouter.post('/blessingrequest', (req, res) => {
      
        var anointing =`SELECT * FROM tbl_services 
        join tbl_requirementtype on tbl_services.int_eventID = tbl_requirementtype.int_eventID
        join tbl_utilities on tbl_services.int_eventID =tbl_utilities.int_eventID where tbl_services.var_eventname= ? `
        db.query(anointing,['Anointing of the sick'], (err, anointing, fields) => {
        
        var funeralmass =`SELECT * FROM tbl_services 
        join tbl_requirementtype on tbl_services.int_eventID = tbl_requirementtype.int_eventID
        join tbl_utilities on tbl_services.int_eventID =tbl_utilities.int_eventID where tbl_services.var_eventname= ? `
        db.query(funeralmass,['Funeral Mass'], (err, funeralmass, fields) => {
      
        var funeralservice =`SELECT * FROM tbl_services 
        join tbl_requirementtype on tbl_services.int_eventID = tbl_requirementtype.int_eventID
        join tbl_utilities on tbl_services.int_eventID =tbl_utilities.int_eventID where tbl_services.var_eventname= ? `
        db.query(funeralservice,['Funeral Service'], (err, funeralservice, fields) => {
        
        var houseblessing =`SELECT * FROM tbl_services 
        join tbl_requirementtype on tbl_services.int_eventID = tbl_requirementtype.int_eventID
        join tbl_utilities on tbl_services.int_eventID =tbl_utilities.int_eventID where tbl_services.var_eventname= ? `
        db.query(houseblessing,['House Blessing'], (err, houseblessing, fields) => {
          
          
        res.send({anointing:anointing[0],funeralmass:funeralmass[0],funeralservice:funeralservice[0],houseblessing:houseblessing[0],});
      
        })})})})
      })
      guestRouter.post('/queryservice', (req, res) => {
        var queryString1 =`SELECT * FROM tbl_serviceutilities where int_serviceutilitiesID = ? `
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
          var queryString2 =`select var_reqname from tbl_servicereqtype where int_serviceutilitiesID = ?`
          
        db.query(queryString2,[req.body.id], (err, results2, fields) => {
          if (err) console.log(err);
          res.send({firstQuery:results1[0],secondQuery:results2});
          });
        })
      })
      
    //   guestRouter.get('/marriagedetails', (req, res) => {
    //     var queryString1 =`SELECT * FROM tbl_wedsteps`
    //     db.query(queryString1, (err, results, fields) => {
    //       if (err) console.log(err);
    //       var steps= results;
    //       console.log(steps)
    //       var queryString2 =`select * from tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname='Marriage')`
    //       db.query(queryString2, (err, results, fields) => {
    //         if (err) console.log(err);
    //         var requirements= results;
      
    //         var queryString3 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
    //         db.query(queryString3, (err, results, fields) => {
    //           var desc =results;
              
    //         var queryString4 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
    //         db.query(queryString4, (err, results, fields) => {
    //           var events =results;
              
        
      
    //         return res.render('home/views/marriage1', {steps: steps, requirements: requirements, description:desc, events: events});
    //       });
    //       });
    //     });
    //     });
    //   });
      
      guestRouter.get('/schedule', (req, res) => {
      
        res.render('home/views/schedule', req.query);
      });
      guestRouter.get('/facilities', (req, res) => {
      
        res.render('home/views/facilities', req.query);
      });
      
      guestRouter.get('/services', (req, res) => {
        var queryString1 =`SELECT * FROM tbl_services where var_eventname = "Anointing of the sick" or var_eventname = "Funeral Service" or var_eventname = "Baptism" var_eventname = "Marriage" order by char_type`
        db.query(queryString1, (err, results1, fields) => {
          
          if (err) console.log(err);
          res.render('home/views/services',{ events : results1 });
        });
      });
      
      
      guestRouter.route('/document')
      .get(authMiddleware.noAuthed, (req, res) => {
          res.render('home/views/document', req.query);
      })
    guestRouter.post('/queryy', (req, res) => {

        var queryString1 =`SELECT * FROM tbl_services where int_eventID = ? `
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            req.session.eventId = req.body.id
            var queryString2 =`select var_reqname from tbl_requirementtype where int_eventID = ?`
            db.query(queryString2,[req.body.id], (err, results2, fields) => {
                var queryString3 =`select double_fee from tbl_utilities where int_eventID = ?`
                db.query(queryString3,[req.body.id], (err, results3, fields) => {
                    if(results3.double_fee =='undefined'){
                        results3.double_fee = "No payment needed"
                        if (err) console.log(err);
                    }
                    res.send({firstQuery:results1[0],secondQuery:results2,thirdQuery:results3});
        });
        });
        });
    
    })
    
    guestRouter.post('/queryyservice', (req, res) => {
        var queryString1 =`SELECT * FROM tbl_serviceutilities where int_serviceutilitiesID = ? `
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
        var queryString2 =`select var_reqname from tbl_servicereqtype where int_serviceutilitiesID = ?`
        
        db.query(queryString2,[req.body.id], (err, results2, fields) => {
        if (err) console.log(err);
        res.send({firstQuery:results1[0],secondQuery:results2});
        });
        })
    })
    guestRouter.get('/servicee', (req, res)=>{
        console.log(req.session)
        var queryString =`select var_eventname from tbl_services where int_eventID =${req.session.eventId}`
        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            var services = results[0];
            if(services.var_eventname== 'Baptism'){ 
                var queryString1= `SELECT int_agemax, int_agemin, double_fee FROM tbl_utilities where int_eventID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
                db.query(queryString1, (err, results1, fields) => {
                    // var queryString2= `SELECT time_availabletime FROM tbl_utilities_availabletime where int_serviceID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
                    // db.query(queryString2, (err, results2, fields) => {
                        // for(i=0;i<results2.length;i++){
                        // results2[i].time_availabletime = moment(results2[i].time_availabletime,'HH:mm:ss').format('hh:mm A');
                        // }
                        if (err) console.log(err);
                    // console.log(results2);
                return res.render('guest/views/forms/baptism',{user: req.session.user, agelimits: results1})
                    });    
                // });
            ;}
            else if(services.var_eventname== 'Funeral Service'){ return res.render('guest/views/forms/funeral',{user: req.session.user})}
            else if(services.var_eventname== 'Marriage'){ return res.render('guest/views/marriage/marriage',{user: req.session.user});}
            else if(services.var_eventname== 'Confirmation'){ return res.render('guest/views/forms/confirmation',{user: req.session.user});}
            else if(services.var_eventname== 'Document Request'){ return res.render('guest/views/forms/document',{user: req.session.user});}
            else if(services.var_eventname== 'Facility Reservation'){ return res.render('guest/views/facilities/index',{user: req.session.user});}
            else if(services.var_eventname== 'Anointing of the sick'){
                var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
                db.query(queryString, (err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results);
                    return res.render('guest/views/forms/anointing',{user: req.session.user, ID:results})
                });
                }
           
            else{ return res.redirect('/guest')}
        });
    });

    guestRouter.get('/schedule', (req, res)=>{res.render('guest/views/schedule2') });
    guestRouter.get('/entourage', (req, res)=>{res.render('guest/views/marriage/entourage') });
    guestRouter.get('/parishevents', (req, res)=>{res.render('guest/views/parishevents1') });
    guestRouter.get('/parishevents/details', (req, res)=>{res.render('guest/views/parishdetails') });
    guestRouter.get('/parishservices', (req, res)=>{res.render('guest/views/parishservices') });
    guestRouter.get('/weddingorg', (req, res)=>{res.render('guest/views/forms/weddingorg') });
    guestRouter.get('/weddingorg/items', (req, res)=>{res.render('guest/views/forms/weddingorg1') });
    

    guestRouter.post('/message', (req, res)=>{
        console.log(req.body.id)
        var queryString1= `select * from tbl_message 
        JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_message.int_eventinfoID
        WHERE tbl_eventinfo.int_eventinfoID =?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            res.send(results[0])
        }); 
    });
    guestRouter.post('/refund', (req, res)=>{
        console.log(req.body.id)
        var queryString1= `select * from tbl_user
        JOIN tbl_eventinfo ON tbl_eventinfo.int_userID = tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        WHERE tbl_eventinfo.int_eventinfoID = ?
        `
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            if (err) console.log(err); 
            var queryString2 = `SELECT tbl_sponsors.var_sponsorname,tbl_sponsors.int_eventinfoID from tbl_sponsors 
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_sponsors.int_eventinfoID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id],(err,results2,fields)=>{
                console.log(results1[0])
                console.log(results2[0])
                res.send({voucherinfo:results1,sponsors:results2})
            })
        }); 
    });
    guestRouter.post('/message/send', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var nowDate = new Date(); 
            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
            
        var queryString3= `INSERT INTO tbl_message(int_senderID, int_receiverID, var_subject, text_message,datetime_sent) VALUES(?,?,?,?,?);`;
                console.log(req.session.userID)
                db.query(queryString3,[req.session.userID, req.body.int_receiverID, req.body.var_subject, req.body.text_message,date], (err, results, fields) => {
                    if (err) console.log(err); 
                    console.log(results)
                    res.send(results)
                }); 
    }); 

    guestRouter.post('/balancechecking', (req, res)=>{
        console.log(req.body.id)
        var queryString1= `select * from tbl_payment
        join tbl_eventinfo on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID
        join tbl_utilities on tbl_utilities.int_eventID = tbl_services.int_eventID 
        where tbl_payment.dbl_balance <> 0 and tbl_eventinfo.int_userID =? and char_approvalstatus<>'Cancelled'`
        db.query(queryString1,[req.session.userID], (err, results, fields) => {
            if (err) console.log(err); 
            var details = results
            for(i=0; i<details.length; i++){
                
                var datenow = new Date();
                var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY');
                var fullpaymentdeadlinee = moment(details[i].date_fullpaymentdeadline,'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY');
                console.log('==================')
                console.log('Date now: ')
                console.log(dateNow)
                console.log('==================')
                console.log('Deadline ')
                console.log(fullpaymentdeadlinee)
                console.log('==================')
                
                if(moment(fullpaymentdeadlinee).isSameOrAfter(dateNow)){
                    var eventinfoID = details[i].int_eventinfoID
                    console.log(eventinfoID)
                    var datenow = new Date();
                    var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                    var queryString1 =`UPDATE tbl_eventinfo SET char_approvalstatus ='Cancelled',var_eventstatus ='Cancelled', date_approval= ? where int_eventinfoID =?`
                    db.query(queryString1,[dateNow,eventinfoID], (err, results2, fields) => {
                        if(err) console.log(err)
                        console.log(results2)
                        console.log(eventinfoID)
                        var notifdesc ='Your application was automatically cancelled because you did not meet the payment deadline. If you have any concerns, you may send us a message or go directly to the office. Thank you.'
                        var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                        db.query(insertnotif,[req.session.userID, notifdesc, eventinfoID, datenow], (err, results4, fields) => {
                            if(err) console.log(err)
                        })
                    })
                }
                else if(i == details.length-1) res.send({details:details})
            }//for

        }); 
    });

//===============================================================================================//
// N O T I F I C A T I O N //
//===============================================================================================//
guestRouter.get('/notification', (req, res)=>{
    var queryString1 =`SELECT * from tbl_notification 
    WHERE int_userID =?`
    db.query(queryString1, [req.session.user.int_userID], (err, results, fields) => {
        if (err) console.log(err);
        return res.render('guest/views/others/notifications',{ notifications: results });
    });

});
guestRouter.get('/messages', (req, res)=>{
    var queryString1 =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID= tbl_message.int_senderID
    WHERE tbl_message.int_receiverID =?`
    db.query(queryString1, [req.session.user.int_userID], (err, results, fields) => {
        if (err) console.log(err);
        for(var i=0; i>results.length; i++){
            results[i].datetime_sent= moment(results[i].datetime_sent).format('MM/DD/YYYY h:mm a');
            console.log(results[i].datetime_sent)
        }
        
        var inboxs= results;

        var queryString =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID= tbl_message.int_receiverID
        WHERE int_senderID =?`
        db.query(queryString, [req.session.user.int_userID], (err, results, fields) => {
            if (err) console.log(err);
            for(var o=0; o>results.length; o++){
                results[o].datetime_sent= moment(results[o].datetime_sent).format('MM/DD/YYYY h:mm a');
            }
            var sents= results;
            
            // console.log('Inbox: '+JSON.stringify(inboxs))
            console.log(inboxs)
            console.log('Sent: '+JSON.stringify(sents))

        return res.render('guest/views/others/messages',{ inboxs: inboxs, sents:sents });
    });});

});

//===============================================================================================//
// V O U C H E R //
//===============================================================================================//
guestRouter.get(`/voucherLink`, (req, res)=>{
    var notifId = parseInt(req.query.notifId);
    var queryString = `SELECT * from tbl_voucher 
    JOIN tbl_notification ON tbl_voucher.int_notifID = tbl_notification.int_notifID
    JOIN tbl_user ON tbl_user.int_userID = tbl_notification.int_userID
    JOIN tbl_documentrequest ON tbl_documentrequest.int_requestID = tbl_voucher.int_requestID
    JOIN tbl_document ON tbl_document.int_documentID = tbl_documentrequest.int_documentID
    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
    WHERE tbl_voucher.int_notifID = ?`
    db.query(queryString,[notifId],(err,results,fields)=>{
    console.log(results[0])
    results[0].date_issued = moment(results[0].date_issued).format('MM/DD/YYYY')
    results[0].date_due = moment(results[0].date_due).format('MM/DD/YYYY')
    results[0].date_docurequested = moment(results[0].date_docurequested).format('MM/DD/YYYY')
    results = results[0];
    return res.render('guest/views/voucher',{results:results});
    })
});
guestRouter.post(`/voucherEvents`, (req, res)=>{    
    console.log("voucher id: "+" "+req.body.voucherId)
    var queryString = `select *  from tbl_voucherevents 
    JOIN tbl_user ON tbl_user.int_userID = tbl_voucherevents.int_userID
    JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_voucherevents.int_eventinfoID
    join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
    WHERE tbl_voucherevents.int_voucherID = ?`
    db.query(queryString,[req.body.voucherId],(err,results1,fields)=>{
        var eventid = results1[0].int_eventinfoID
        console.log("eventid: "+results1[0].int_eventinfoID)
        var queryString2 = `SELECT tbl_sponsors.var_sponsorname,tbl_sponsors.int_eventinfoID from tbl_sponsors 
        JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_sponsors.int_eventinfoID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString2,[results1[0].int_eventinfoID],(err,results2,fields)=>{
            console.log(results2[0])
            console.log("sponsors: "+ results2.length)
            res.send({voucherinfo:results1,sponsors:results2})
        })
    })
});
//===============================================================================================//
// R E S E R V A T I O N //
//===============================================================================================//
    guestRouter.get('/reservation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
        WHERE tbl_eventinfo.int_userID = ?`
        db.query(queryString1, [req.session.user.int_userID], (err, results, fields) => {
            if (err) console.log(err);
            console.log(results)
            for(i=0;i<results.length;i++){
                results[i].date_eventdate = moment(results[i].date_eventdate,'YYYY-MM-DD').format('MM/DD/YYYY')
                results[i].time_eventstart = moment(results[i].time_eventstart,'HH:mm:ss').format('hh:mm A')
            }
            return res.render('guest/views/reservations/reservations',{reservations:results});
        });

    });
    guestRouter.post('/reservation/query',(req,res)=>{
        console.log(req.body)
        var selecteventname = `SELECT * FROM tbl_eventinfo 
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(selecteventname,[req.body.id],(err,eventinfodetails,fields)=>{
                if(err) console.log(err)
                console.log(eventinfodetails)
            if(eventinfodetails[0].var_eventname == "Baptism" || eventinfodetails[0].var_eventname == "Special Baptism"){
                    var queryString = `SELECT * FROM tbl_eventinfo 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                    JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                    JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    WHERE tbl_eventinfo.int_eventinfoID = ?`
                console.log(req.body)
                db.query(queryString,[req.body.id],(err,results,fields)=>{
                    if(err) throw err
                    console.log(results)
                    res.send(results)
                })
            }
            else if(eventinfodetails[0].var_eventname == "Anointing of the sick" || eventinfodetails[0].var_eventname == "Funeral Service" ){
                var queryString = `SELECT * FROM tbl_eventinfo 
                
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID 
                JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID 
                WHERE tbl_eventinfo.int_eventinfoID = ?`
                console.log(req.body)
                db.query(queryString,[req.body.id],(err,results,fields)=>{
                    if(err) throw err
                    console.log(results)
                    res.send(results)
                })
            }
            else if(eventinfodetails[0].var_eventname == "Funeral Mass"){
                var queryString = `SELECT * FROM tbl_eventinfo 
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID 
                JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID 
                WHERE tbl_eventinfo.int_eventinfoID = ?`
                console.log(req.body)
                db.query(queryString,[req.body.id],(err,results,fields)=>{
                    if(err) throw err
                    console.log(results)
                    res.send(results)
                })
            }
            else if(eventinfodetails[0].var_eventname == "Marriage"){
                var queryString = `SELECT * FROM tbl_eventinfo 
                
                JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                WHERE tbl_eventinfo.int_eventinfoID = ?`
                console.log(req.body)
                db.query(queryString,[req.body.id],(err,results,fields)=>{
                    if(err) throw err
                    console.log(results)
                    res.send(results)
                })
            }
            else if(eventinfodetails[0].var_eventname == "House Blessing"){
                var queryString = `SELECT * FROM tbl_eventinfo 
                JOIN tbl_houseblessing ON tbl_houseblessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                WHERE tbl_eventinfo.int_eventinfoID = ?`
                console.log(req.body)
                db.query(queryString,[req.body.id],(err,results,fields)=>{
                    if(err) throw err
                    console.log(results)
                    res.send(results)
                })
            }
    })})
    

    guestRouter.post('/reservation/query/updateblessing', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var queryString1 =`UPDATE tbl_relation  SET var_relation = ?, var_lname = ?, var_fname=?, var_mname=?, char_gender=?, var_address=?, date_birthday=?, var_birthplace=?  where int_eventinfoID = ?`
        db.query(queryString1, [req.body.relation, req.body.lastname,req.body.firstname,req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace, req.body.id],(err, results, fields) => {
            
            //lagay dito ng update tblblessing
            if(err) console.log(err)
            var queryString1 =`UPDATE tbl_blessing  SET var_blessingdetails = ?, var_blessingvenue = ?  where int_eventinfoID = ?`
            db.query(queryString1, [req.body.details, req.body.venue,req.body.id],(err, results, fields) => {
            
            if (err)
            {
                console.log(err)
                res.send({alertDesc:notsuccess})

            }
            else
            {
                res.send({alertDesc:success})
            }
        
    })})})
    guestRouter.post('/reservation/query/baptism', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var queryString1 =`UPDATE tbl_relation  SET var_relation = ?, var_lname = ?, var_fname=?, var_mname=?, char_gender=?, var_address=?, date_birthday=?, var_birthplace=?  where int_eventinfoID = ?`
        db.query(queryString1, [req.body.relation, req.body.lastname,req.body.firstname,req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace, req.body.id],(err, results, fields) => {
            
            if(err) console.log(err)

            var queryString1 =`UPDATE tbl_baptism  SET var_parentmarriageadd = ?, var_mothername = ?, var_motherbplace = ?,  var_fathername = ?, var_fatherbplace = ?, var_contactnum=? where int_eventinfoID = ?`
            db.query(queryString1, [req.body.marriageaddress, req.body.mothername,req.body.motherplace,req.body.fathername,req.body.fatherplace, req.body.contactnumber,req.body.id],(err, results, fields) => {
            
            if (err)
            {
                console.log(err)
                res.send({alertDesc:notsuccess})

            }
            else
            {
                res.send({alertDesc:success})
            }
        
    })})})
    guestRouter.post('/reservation/query/updatehouseblessing', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var queryString1 =`UPDATE tbl_houseblessing  SET var_owner =?, var_estloc =?, var_ownercontactnum=?, var_owneremailadd=?
        where int_eventinfoID = ?`
        db.query(queryString1, [req.body.owner, req.body.estloc, req.body.contactnumber, req.body.emailadd, req.body.id],(err, results, fields) => {
            console.log(queryString1)
            console.log(err)
            if (err)
            {
                console.log(err)
                res.send({alertDesc:notsuccess})

            }
            else
            {
                res.send({alertDesc:success})
            }
        
    })})
    guestRouter.get('/reservation/requirements/query', (req, res)=>{
        
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID 
        WHERE tbl_eventinfo.int_userID = ? and tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1, [req.session.user.int_userID,req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results)
        });

    });
    guestRouter.post('/reservation/queryCancel', (req,res)=>{
        var success =0
        var notsuccess =1
        var datenow = new Date();
        var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        
        var queryString1 =`UPDATE tbl_eventinfo SET char_approvalstatus ='Cancelled',var_eventstatus ='Cancelled', date_approval= ? where int_eventinfoID = ${req.body.id}`
        db.query(queryString1,[dateNow], (err, results, fields) => {
            console.log(queryString1)
            var notifdesc ='A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.'
            var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                db.query(insertnotif,[6, notifdesc, req.body.id, datenow], (err, results4, fields) => {
                    if(err) console.log(err)
                    console.log(err)
                    if (err)
                    {
                        console.log(err)
                        res.send({alertDesc:notsuccess})

                    }
                    else
                    {
                        res.send({alertDesc:success})
                    }
                })
            
        });
    });

// ---------------------------------------------------------------------------------------------------------
// E  D  I  T    D  E  T  A  I  L  S 
// ---------------------------------------------------------------------------------------------------------
    guestRouter.get('/reservation/:int_eventinfoID/edit', (req, res)=>{
        
        var queryString1 =`SELECT * FROM tbl_eventinfo
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        WHERE tbl_eventinfo.int_eventinfoID = ${req.params.int_eventinfoID}`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var details = results[0];        
            
            
            if(details.var_eventname == 'Anointing of the sick'){
                var queryString2 =`SELECT * from tbl_relation 
                join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                where tbl_relation.int_eventinfoID = ?`
                db.query(queryString2, [details.int_eventinfoID],(err, results, fields) => {
                    // if (err) console.log(err);
                    var moredetails = results[0];
                    console.log(details, moredetails)
                    moredetails.date_birthday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                    moredetails.date_desireddate= moment(moredetails.date_desireddate).format('YYYY-MM-DD');
                    moredetails.time_desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                    
                    return res.render('guest/views/reservations/edit/editanointingdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                });
            }
            if(details.var_eventname == 'Funeral Mass' ||details.var_eventname == 'Funeral Service' ){
                var queryString2 =`SELECT * from tbl_relation 
                join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                where tbl_relation.int_eventinfoID =?`
                db.query(queryString2, [details.int_eventinfoID], (err, results, fields) => {
                    if (err) console.log(err);
                    var moredetails = results[0];
                    console.log(details, moredetails)
                    moredetails.date_birthday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                    moredetails.date_desireddate= moment(moredetails.date_desireddate).format('YYYY-MM-DD');
                    moredetails.time_desiredtime= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                    res.render('guest/views/reservations/edit/editfuneraldetails',{ details : details, moredetails:moredetails, user: req.session.user});
                });
            }
            if(details.var_eventname == 'Baptism' || details.var_eventname == 'Confirmation' ||details.var_eventname == 'Special Baptism'||details.var_eventname == 'Special Confirmation' ){
                var queryString2 =`SELECT * from tbl_relation 
                
                join tbl_baptism on tbl_relation.int_eventinfoID = tbl_baptism.int_eventinfoID
                join tbl_sponsors on tbl_relation.int_eventinfoID = tbl_sponsors.int_eventinfoID 
                where tbl_relation.int_eventinfoID = ?`
                db.query(queryString2, [details.int_eventinfoID], (err, results, fields) => {
                    if (err) console.log(err);
                    var moredetails = results[0];
                    console.log(details, moredetails)
                    var bday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                    var desireddate1= moment(moredetails.date_desireddate).format('YYYY-MM-DD');
                    moredetails.time_desiredtime= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                    moredetails.date_birthday=bday;
                    moredetails.date_desireddate=desireddate1;
                    // moredetails.time_desiredtime=desiredtime1;

                    res.render('guest/views/reservations/edit/editbaptismdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                });
            }
            if(details.var_eventname == 'Marriage'){
                var queryString3 =`SELECT * from tbl_relation 
                join tbl_wedgroom on tbl_relation.int_eventinfoID = tbl_wedgroom.int_eventinfoID
                join tbl_wedbride on tbl_relation.int_eventinfoID = tbl_wedbride.int_eventinfoID
                join tbl_wedcouple on tbl_relation.int_eventinfoID = tbl_wedcouple.int_eventinfoID
                where tbl_relation.int_eventinfoID = ?`
                db.query(queryString3, [details.int_eventinfoID], (err, results, fields) => {
                    if (err) console.log(err);
                    var moredetails = results[0];    
                    console.log(details, moredetails)            
                    moredetails.date_birthday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                    moredetails.date_bbirthday = moment(moredetails.date_bbirthday).format('YYYY-MM-DD');
                    moredetails.date_gbapdate = moment(moredetails.date_gbapdate).format('YYYY-MM-DD');
                    moredetails.date_gcondate = moment(moredetails.date_gcondate).format('YYYY-MM-DD');
                    moredetails.date_bbapdate = moment(moredetails.date_bbapdate).format('YYYY-MM-DD');
                    moredetails.date_bcondate = moment(moredetails.date_bcondate).format('YYYY-MM-DD');
                    moredetails.date_desireddate= moment(moredetails.date_desireddate).format('YYYY-MM-DD');   
                    moredetails.time_desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                    res.render('guest/views/reservations/edit/editmarriagedetails',{ details : details, moredetails:moredetails, user: req.session.user});
                });       
            }
            if(details.var_eventname == 'Establishment Blessing'){
                var queryString4 =`select * from tbl_houseblessing where int_eventinfoID =?`
                db.query(queryString4, [details.int_eventinfoID], (err, results, fields) => {
                    if (err) console.log(err);
                    var moredetails = results[0];
                    console.log(details, moredetails)
                    moredetails.date_desireddate= moment(moredetails.date_desireddate).format('YYYY-MM-DD');
                    moredetails.time_desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                    
                    // moredetails.date_desireddate=desireddate3;
                    // moredetails.date_desireddate2=desireddate4;
                    // moredetails.time_desiredtime=desiredtime3;
                    // moredetails.time_desiredtime2=desiredtime4;
                    res.render('guest/views/reservations/edit/editestablishmentdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                });
            }   
        });
    });
    guestRouter.post('/reservation/:int_eventinfoID/edit', (req, res) => {

        if(req.body.eventname == 'Anointing of the sick'){
            console.log('SIMULAN NA ANG PAG EDIT')
            // if(req.body.venue == 'sameaddress') var venue= req.body.address;
            // if(req.body.venue == 'hospital') var venue= req.body.hospitalname;
            // if(req.body.venue == 'other') var venue= req.body.othervenue;
            
            var queryString = `UPDATE tbl_relation SET        
            var_relation = "${req.body.relation}",
            var_lname = "${req.body.lastname}",
            var_fname = "${req.body.firstname}",
            var_mname = "${req.body.middlename}",
            char_gender = "${req.body.gender}",
            var_address = "${req.body.address}",
            date_birthday = "${req.body.birthday}",
            var_birthplace = "${req.body.birthplace}"
            where int_eventinfoID= ${req.params.int_eventinfoID};`;
            
            var queryString1 = `UPDATE tbl_blessing SET        
                var_blessingvenue = ${req.body.venue},
                var_blessingdetails = "${req.body.details}"
                where int_eventinfoID= ${req.params.int_eventinfoID};`;
            db.query(queryString,  (err, results, fields) => {
                if (err) console.log(err);
                db.query(queryString1, (err, results, fields) => {
                    if (err) console.log(err);
                    return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
            });
            });
        }

        if(req.body.eventname == 'Funeral Mass' || req.body.eventname == 'Funeral Service'){
            console.log('SIMULAN NA ANG PAG EDIT')
            
            var queryString = `UPDATE tbl_relation SET        
            var_relation = "${req.body.relation}",
            var_lname = "${req.body.lastname}",
            var_fname = "${req.body.firstname}",
            var_mname = "${req.body.middlename}",
            char_gender = "${req.body.gender}",
            var_address = "${req.body.address}",
            date_birthday = "${req.body.birthday}",
            var_birthplace = "${req.body.birthplace}"
            where int_eventinfoID= ${req.params.int_eventinfoID};`;
            
            var queryString1 = `UPDATE tbl_blessing SET        
                var_blessingvenue = ${req.body.venue},
                var_blessingdetails = "${req.body.details}"
                where int_eventinfoID= ${req.params.int_eventinfoID};`;
            db.query(queryString,  (err, results, fields) => {
                if (err) console.log(err);
                db.query(queryString1, (err, results, fields) => {
                    if (err) console.log(err);
                    return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
            });
            });
        }

        if(req.body.eventname == 'Establishment Blessing'){
            console.log('SIMULAN NA ANG PAG EDIT')
            var queryString = `UPDATE tbl_houseblessing SET        
            var_owner = "${req.body.owner}",
            var_estloc = "${req.body.location}",
            var_ownercontactnum = "${req.body.contactnumber}",
            var_owneremailadd = "${req.body.email}"
            where int_eventinfoID= ${req.params.int_eventinfoID};`;
            
                db.query(queryString, (err, results, fields) => {
                    if (err) console.log(err);
                    return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
            });
        }        

        
        if(req.body.eventname == 'Baptism' || req.body.eventname == 'Special Baptism'||req.body.eventname == 'Confirmation' || req.body.eventname == 'Special Confirmation'){
            console.log('SIMULAN NA ANG PAG EDIT')
            
            var queryString = `UPDATE tbl_relation SET        
            var_relation = "${req.body.relation}",
            var_lname = "${req.body.lastname}",
            var_fname = "${req.body.firstname}",
            var_mname = "${req.body.middlename}",
            char_gender = "${req.body.gender}",
            var_address = "${req.body.address}",
            date_birthday = "${req.body.birthday}",
            var_birthplace = "${req.body.birthplace}"
            where int_eventinfoID= ${req.params.int_eventinfoID};`;
            
            var queryString1 = `UPDATE tbl_baptism SET        
                var_parentmarriageadd = ${req.body.marriageaddress},
                var_fatherbplace = "${req.body.fatherbirthplace}",
                var_motherbplace = ${req.body.motherbirthplace},
                var_fathername = ${req.body.fathername},
                var_mothername = ${req.body.mothername},
                var_contactnum = ${req.body.contactnumber}
                where int_eventinfoID= ${req.params.int_eventinfoID};`;
            db.query(queryString,  (err, results, fields) => {
                if (err) console.log(err);
                db.query(queryString1, (err, results, fields) => {
                    if (err) console.log(err);
                    return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
            });
            });
        }



        if(req.body.eventname == 'Marriage'){
            console.log('SIMULAN NA ANG PAG EDIT')
            
            var queryString = `UPDATE tbl_relation SET        
            var_relation = "${req.body.relation}",
            var_lname = "${req.body.lastname}",
            var_fname = "${req.body.firstname}",
            var_mname = "${req.body.middlename}",
            char_gender = "${req.body.gender}",
            var_address = "${req.body.address}",
            date_birthday = "${req.body.birthday}",
            var_birthplace = "${req.body.birthplace}"
            where int_eventinfoID= ${req.params.int_eventinfoID};`;
            
            var queryString1 = `UPDATE tbl_wedgroom SET        
                var_gnationality = ${req.body.gnationality},
                var_gcivilstatus = "${req.body.gcivilstatus}",
                var_greligion = "${req.body.greligion}",
                var_goccupation = "${req.body.goccupation}",
                var_gfathername = "${req.body.gfathername}",
                var_gfatherreligion = "${req.body.gfatherreligion}",
                var_gfatherbplace = "${req.body.gfatherbplace}",
                var_gmothername = "${req.body.gmothername}",
                var_gmotherreligion = "${req.body.gmotherreligion}",
                var_gmotherbplace = "${req.body.gmotherbplace}",
                var_gcurrparish = "${req.body.gcurrparish}"
                
                where int_eventinfoID= ${req.params.int_eventinfoID};`;
            db.query(queryString,  (err, results, fields) => {
                if (err) console.log(err);
                db.query(queryString1, (err, results, fields) => {
                    if (err) console.log(err);
                    var queryString2 = `UPDATE tbl_wedbride SET 
                    var_blname = ${req.body.blastname},       
                    var_bfname = ${req.body.bfirstname},       
                    var_bmname = ${req.body.bmiddlename},       
                    var_baddress = ${req.body.baddress},       
                    var_bbirthday = ${req.body.bbirthday},
                    var_bbirthplace = ${req.body.bbirthplace},       
                    var_bcivilstatus = "${req.body.gcivilstatus}",
                    var_breligion = "${req.body.greligion}",
                    var_boccupation = "${req.body.goccupation}",
                    var_bfathername = "${req.body.gfathername}",
                    var_bfatherreligion = "${req.body.gfatherreligion}",
                    var_bfatherbplace = "${req.body.gfatherbplace}",
                    var_bmothername = "${req.body.gmothername}",
                    var_bmotherreligion = "${req.body.gmotherreligion}",
                    var_bmotherbplace = "${req.body.gmotherbplace}",
                    var_bcurrparish = "${req.body.gcurrparish}"
                    where int_eventinfoID= ${req.params.int_eventinfoID};`;
                    db.query(queryString2,  (err, results, fields) => {
                        if (err) console.log(err);
                    
                    
                    return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
            });
            });
        });
        }


    });
//===============================================================================================//
// E V E N T S //
//===============================================================================================//
    guestRouter.get('/events', (req, res)=>{
        res.render('guest/views/events/index')
    });
    guestRouter.get('/marriageinfo', (req, res)=>{
        res.render('guest/views/events/marriage')
    });
//==============================================================
//E V E N T S  F O R M S                                      
//==============================================================
//==============================================================
// A N O I N T I N G
//==============================================================
    guestRouter.get('/anointing/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 1`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })
    guestRouter.post('/anointing/query', (req, res) => {

        var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            res.send({firstQuery:results1[0]});
        });

    })
    guestRouter.get('/anointing/form', (req, res)=>{
        var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results);
            return res.render('guest/views/forms/anointing',{user: req.session.user, ID:results})
        });
    });
    guestRouter.post('/anointing/form', upload.single('image'),(req, res) => {
        var success =0
        var notsuccess =1
        var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
            
        db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
                // var eventID = results[0];
                console.log(req.session.user);
                
            var desiredtime1= moment(req.body.desiredtime1, 'h:mm a').format('HH:mm:ss');
            var desiredtimeend= moment(req.body.desiredtimeend, 'h:mm a').format('HH:mm:ss');
            var datenow = new Date();
            var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
            var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`
                db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1, desiredtime1,desiredtimeend, "Pending", "Submitted", dateNow], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                        if (err) console.log(err);
                        
                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                        db.query(queryString3, [eventinfoID.insertId, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                            if (err) console.log(err);
                            var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails) VALUES (?,?,?)`
                            db.query(queryString4, [eventinfoID.insertId, req.body.venue, req.body.details], (err, results, fields) => {
                                if (err) console.log(err);
                                        // var reqq = results[0];
                                var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [eventID.int_eventID], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];
                                    
                                    // console.log('looooob'+reqid)
                                    var path = '/img/req/'+req.file.filename;
                                    var nowDate = new Date(); 
                                    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                    var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID,var_reqpath, datetime_reqreceived, var_reqstatus) VALUES (?,?,?,?);`
                                    db.query(queryString7,[reqq.int_reqtypeID,path,date, 'Submitted'],(err, results, fields)=>{    
                                        if (err) console.log(err);
                                        var requirementID = results;
                                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                console.log(results[0])
                                                res.send(results[0]);
                                          
                                        });
                                    });
                                });
                            });
                        });
                    })
                })
                });    
        //     });            
            
        // });

//==============================================================
// B A P T I S M
//==============================================================
    guestRouter.get('/baptism/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = ${req.session.eventId}`
        db.query(queryString3,(err,results2,fields)=>{
        var queryString = `SELECT * FROM tbl_eventinfo JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        where tbl_services.var_eventname != "Baptism"`
            db.query(queryString,(err,results,fields) =>{
                res.send({queries:results,utilities:results2})
            })
        })
    })
    guestRouter.get('/baptism/query/regular', (req, res)=>{
        var queryString = `SELECT * FROM tbl_eventinfo where char_approvalstatus = "Approved" GROUP BY date_eventdate` 
            db.query(queryString,(err,results,fields) =>{
                console.log(results)
                    res.send(results)
            })
    })
    guestRouter.post('/baptism/query/regular/bilang', (req, res)=>{
        req.body.eventdate = moment(req.body.eventdate).format('YYYY-MM-DD')
        var queryString = `SELECT COUNT(*)AS bilang FROM tbl_eventinfo WHERE date_eventdate = ?` 
            db.query(queryString,req.body.eventdate,(err,results,fields) =>{
                var eventdate = req.body.eventdate
                results.push(eventdate)
                console.log(results)
                res.send(results)
                
            })
    })
    guestRouter.get('/baptism/form', (req, res)=>{
        console.log(req.query[0])
        console.log(req.session.eventId)
       
        var queryString1= `SELECT int_agemax, int_agemin, double_fee FROM tbl_utilities where int_eventID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
        db.query(queryString1, (err, results1, fields) => {
            var queryString2= `SELECT time_availabletime FROM tbl_utilities_availabletime where int_serviceID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
            db.query(queryString2, (err, results2, fields) => {
                if(results2 != undefined){
                    for(i=0;i<results2.length;i++){ 
                    results2[i].time_availabletime = moment(results2[i].time_availabletime,'HH:mm:ss').format('hh:mm A');
                    }
                }
                else{
                    return res.render('guest/views/forms/baptism',{eventid:req.session.eventId,user: req.session.user, agelimits: results1,utilities:results2})
                }
                if (err) throw err;
            });    
            });
        
    });

    guestRouter.post('/baptism/form',upload.single('image'), (req, res) => {
        console.log(req.body)
        if (req.body.baptismtype == 'Regular'){
            var desireddate= moment(req.body.eventDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            var desiredtime= moment(req.body.timeStart, 'hh:mm a').format('HH:mm:ss');
            var desiredend= moment(req.body.timeEnd, 'hh:mm a').format('HH:mm:ss'); 
            var queryString= `select int_eventID from tbl_services where var_eventname="Baptism"`
            db.query(queryString, (err, results, fields) => {
                if (err) throw err;
                var eventID = results[0];
                console.log(eventID)
                // var defaulttimeQuery =`select time_defaulttime from tbl_defaulttime where int_eventID= ?`
                // db.query(defaulttimeQuery,[eventID.int_eventID], (err, results, fields) => {
                    if (err) throw err;
                    console.log(desiredtime)
                    console.log(desireddate)
                    
                    queries(eventID.int_eventID, desiredtime, desireddate, desiredend);
                // });
            });
            }
        if (req.body.baptismtype == 'Special'){
            console.log(req.body)
                var desireddate= moment(req.body.eventDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
                var desiredtime= moment(req.body.timeStart, 'hh:mm a').format('HH:mm:ss');
                var desiredend= moment(req.body.timeEnd, 'hh:mm a').format('HH:mm:ss');
                var queryString= `select int_eventID from tbl_services where var_eventname="Special Baptism"`
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    // console.log(results);
                    var eventID = results[0];
                    console.log(eventID)
                    // var defaulttimeQuery =`select time_defaulttime from tbl_defaulttime where int_eventID= ?`
                    // db.query(defaulttimeQuery,[eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        console.log(desiredtime)
                        console.log(desireddate)
                        queries(eventID.int_eventID, desiredtime, desireddate, desiredend);
                    // });
                });
            }
                
            function queries(eventid, dtime, ddate,dend){    
                console.log(dtime)
                console.log(ddate)
                console.log('desired end')
                console.log(dend)
                
            var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
            db.query(paymentQuery,[eventid], (err, results, fields) => {
                if (err) throw err;
                var amount= results[0];
                var datenow = new Date()
                var downpaymentdeadline = moment(datenow).add(results[0].int_downpaymentdays,'days')
                var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                console.log(downpaymentdeadline)
                console.log(fullpaymentdeadline)
                console.log(downdateDeadline)
                console.log(fulldateDeadline)
                var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus,dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?)`;
                console.log(req.body.sponsoramount)
                var totalsponsor=parseInt(req.body.sponsoramount)
                    db.query(paymentInsert,[totalsponsor+ amount.double_fee,'Unpaid',totalsponsor+ amount.double_fee,downdateDeadline,fulldateDeadline], (err, results, fields) => {
                        if (err) throw err;
                        var paymentid= results;
                    var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID,char_approvalstatus,int_paymentID,date_eventdate,time_eventstart,time_eventend,date_applied,char_requirements,var_eventstatus) VALUES(?,?,?,?,?,?,?,?,?,?)`;
                        db.query(queryString1, [req.session.user.int_userID, eventid,"Pending",paymentid.insertId,ddate,dtime,dend,moment(datenow).format('YYYY-MM-DD'), 'Pending', 'Pending'], (err, results3, fields) => {
                            if (err) throw err;
                            var eventinfoID= results3;
                                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                                        db.query(queryString3, [eventinfoID.insertId, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                            if (err) throw err;

                                            //select req id
                                            var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                            db.query(requirementQuery, [eventid], (err, results, fields) => {
                                                if (err) throw err;
                                                var reqq = results[0];
                                                    
                                                var path = '/img/req/'+req.file.filename;
                                                var nowDate = new Date(); 
                                                var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                                                var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,int_reqtypeID, var_reqstatus,datetime_reqreceived) VALUES (?,?,?,?);`
                                                    db.query(queryString7,[path,reqq.int_reqtypeID,"Submitted",nowDate],(err, requirement, fields)=>{
                                                        console.log(requirement)
                                                        var queryString8 = `INSERT INTO tbl_requirementsinevents(int_requirementID,int_eventinfoID) VALUES (?,?)`
                                                        db.query(queryString8,[requirement.insertId,eventinfoID.insertId],(err, results, fields)=>{
                                                            if (err) throw err;
                                                            var queryString4 = `INSERT INTO tbl_baptism(int_eventinfoID, var_parentmarriageadd, var_fatherbplace, var_motherbplace, var_fathername, var_mothername, var_contactnum) VALUES(?,?,?, ?,?,? ,?);`
                                                            console.log(dtime)
                                                            
                                                            db.query(queryString4 , [eventinfoID.insertId, req.body.marriageaddress, req.body.fatherbirthplace, req.body.motherbirthplace, req.body.fathername, req.body.mothername, req.body.contactnumber], (err, results, fields) => {
                                                               
                                                                var text="";
                                                                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                                                                for(i=0;i<8;i++){
                                                                    text += possible.charAt(Math.floor(Math.random()*possible.length));
                                                                }
                                                                var datenow = new Date();
                                                                var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                                                                var dateDue = moment(dateNow,'YYYY-MM-DD').add(7,'days');
                                                                var dateDue1 = moment(dateDue).format('YYYY-MM-DD')
                                                                console.log(dateNow)
                                                                console.log(dateDue1)
                                                                sponsors(eventinfoID.insertId);
                                                                var queryString9 = `INSERT INTO tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode) VALUES(?,?,now(),?,?)`
                                                                db.query(queryString9,[eventinfoID.insertId,dateDue1,req.session.user.int_userID,text],(err,results,fields)=>{
                                                                    if(err) throw err 
                                                                    res.redirect('/guest/reservation')
                                                                    //var queryString10 = `SELECT * FROM tbl_voucherevents WHERE int_eventinfoID = ?`
                                                                    // db.query(queryString10,[eventinfoID.insertId],(err,results,fields)=>{
                                                                    //     if (err) throw err;
                                                                    //     console.log(results[0])
                                                                    //     res.send(results[0]);

                                                                    // })
                                                                })
                                                                
                                                        })
                                                    })
                                                })
                                            })
                                        });
                                    });      
                                });
                            });
            }
            function sponsors(eventinfoID){
                var i;
                console.log(req.body.sponsorname)
                var sponsorname = req.body.sponsorname;
                var newsponsors = sponsorname.split(",")
                console.log(newsponsors)
                for(i=0; i < newsponsors.length; i++){
                    var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                    db.query(queryString5, [eventinfoID,newsponsors[i]], (err, results, fields) => {
                        if(err) throw err;
                    });
                }
            }
        });
        guestRouter.get('/baptism/form/success', (req, res)=>{

            return res.render('guest/views/forms/success');
            
        });
        guestRouter.get('/voucherforchild', (req, res)=>{

            return res.render('guest/views/voucherforchild');
            
        });


//==============================================================
//  C O N F I R M A T I O N
//==============================================================
    guestRouter.get('/confirmation/form', (req, res)=>{
        // res.render('guest/views/forms/confirmation',{user: req.session.user})
        var queryString2= `SELECT time_availabletime FROM tbl_utilities_availabletime where int_serviceID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
            db.query(queryString2, (err, results2, fields) => {
                for(i=0;i<results2.length;i++){
                results2[i].time_availabletime = moment(results2[i].time_availabletime,'HH:mm:ss').format('hh:mm A');
                }
                if (err) console.log(err);
            console.log(results2);
        return res.render('guest/views/forms/confirmation',{user: req.session.user,times:results2})
            });
    });

    var imageUpload = upload.fields([{name:'birthCert',maxCount:1},{name:'baptCert',maxCount:1},{name:'validID',maxCount:1}])
    guestRouter.post('/confirmation/form',imageUpload,(req, res) => {
        console.log(req.files['birthCert'][0].path)
        var birthday= moment(req.body.birthday, 'MM/DD/YYYY').format('YYYY-MM-DD')
        
        if (req.body.baptismtype == 'Regular'){
            var desireddate= moment(req.body.regdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            var queryString= `select int_eventID from tbl_services where var_eventname="Confirmation"`
            db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                var eventID = results[0];
            
                var defaulttimeQuery =`select time_defaulttime from tbl_defaulttime where int_eventID= ?`
                    db.query(defaulttimeQuery,[eventID.int_eventID], (err, results, fields) => {
                        if (err) console.log(err);
                        var desired = results[0];
                        var desiredtime=desired.time_defaulttime;
                        console.log(desiredtime)
                        queries(eventID.int_eventID, desiredtime, desireddate);
                    });
            });
        }            

        if (req.body.baptismtype == 'Special'){
            var desireddate= moment(req.body.spcdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            var desiredtime= moment(req.body.desiredtime, 'h:mm a').format('HH:mm:ss');
            
            var queryString= `select int_eventID from tbl_services where var_eventname="Special Confirmation";`
                db.query(queryString, (err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results);
                    var eventID = results[0];
                    console.log(req.session.user);
                    queries(eventID.int_eventID, desiredtime, desireddate);
                });
            }            
            
        
            function queries(eventid, dtime, ddate){
                console.log(dtime)
                console.log(ddate)
                var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
                db.query(paymentQuery,[eventid], (err, results, fields) => {
                    if (err) console.log(err);
                    var amount= results[0];
                    
                    var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus) values(?,?)`;
                    db.query(paymentInsert,[amount.double_fee,'Unpaid'], (err, results, fields) => {
                        if (err) console.log(err);
                        var paymentid= results;
                        var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID,char_approvalstatus, int_paymentID) VALUES(?,?,?,?)`;
                            db.query(queryString1, [req.body.userID, eventid,"Pending", paymentid.insertId], (err, results, fields) => {
                                if (err) console.log(err);
                                var eventinfoID= results;       
                                var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                                db.query(queryString3, [eventinfoID.insertId, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                    if (err) console.log(err);
                                            var pathBirthc = '/img/req/'+req.files['birthCert'][0].filename;
                                            var nowDate = new Date();
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
                                            var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,datetime_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                            db.query(queryString7,[pathBirthc,date,3,'Submitted'],(err, results, fields)=>{
                                                var pathBaptc = '/img/'+req.files['baptCert'][0].filename;
                                                var queryString8 = `INSERT INTO tbl_requirements(var_reqpath,datetime_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                               
                                                db.query(queryString8,[pathBaptc,date,4,'Submitted'],(err, results, fields)=>{
                                                    var queryString9 = `INSERT INTO tbl_requirements(var_reqpath,datetime_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                                    var pathValidid = '/img/req/'+req.files['validID'][0].filename;
                                                    db.query(queryString9,[pathValidid,date,48,'Submitted'],(err, results, fields)=>{ 
                                                        var queryString4 = `INSERT INTO tbl_baptism(int_eventinfoID, var_parentmarriageadd, var_fatherbplace, var_motherbplace, var_fathername, var_mothername, var_contactnum, date_desireddate, time_desiredtime) VALUES(?,?,?, ?,?,? ,?,?,?);`
                                               
                                                        db.query(queryString4 , [eventinfoID.insertId, req.body.marriageaddress, req.body.fatherbirthplace, req.body.motherbirthplace, req.body.fathername, req.body.mothername, req.body.contactnumber, ddate, dtime], (err, results, fields) => {
                                                            if (err) console.log(err);
                                                            sponsors(eventinfoID.insertId);
                                                            return res.redirect(`/guest`);
                                                });
                                            });                                        
                                        });
                                    });      
                                });
                            });
                    });    
                });        
            }
            function sponsors(eventinfoID){
                var i;
                for(i=0; i < req.body.sponsorname.length; i++){
                    var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                    db.query(queryString5, [eventinfoID, req.body.sponsorname[i]], (err, results, fields) => {
                        if(err) throw err;
                    });
                }
            } 
        });
//==============================================================
//E S T A B L I S H M E N T  B L E S S I N G
//==============================================================
    guestRouter.post('/establishment/query', (req, res) => {

        var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            res.send({firstQuery:results1[0]});
        });

    })
    guestRouter.get('/establishment/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 12`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })

    guestRouter.get('/establishment/form', (req, res)=>{
        res.render('guest/views/forms/establishment',{user: req.session.user});
    });

    guestRouter.post('/establishment/form',upload.single('image'), (req, res) => {
        var success =0
        var notsuccess =1
        var queryString= `select int_eventID from tbl_services where var_eventname="House Blessing"`
            
        db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
                console.log(req.session.user);
                        if(req.body.blessloc=='1'){
                            var desiredtime1= moment(req.body.desiredtime1, 'h:mm a').format('HH:mm:ss');
                            var desiredtimeend= moment(req.body.desiredtimeend, 'h:mm a').format('HH:mm:ss');
                            
                            var datenow = new Date();
                            var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                            var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID, date_eventdate, time_eventstart, time_eventend,char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`
                                db.query(queryString1, [req.session.user.int_userID,12, req.body.desireddate1, desiredtime1, desiredtimeend,"Pending", "Submitted", dateNow], (err, results, fields) => {
                                    if (err) console.log(err);
                                    var eventinfoID= results;
                                    console.log(eventinfoID)
                            var queryString3 = `INSERT INTO tbl_houseblessing(int_eventinfoID,var_owner, var_estloc, var_ownercontactnum, var_owneremailadd) VALUES(?,?,?,?,?);`
                            db.query(queryString3, [eventinfoID.insertId, req.body.owner, req.body.locations, req.body.contactnumber, req.body.email], (err, results, fields) => {
                                var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                            db.query(requirementQuery, [eventID.int_eventID], (err, results, fields) => {
                                if (err) console.log(err);
                                var reqq = results[0];
                                var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID,var_reqpath, datetime_reqreceived, var_reqstatus) VALUES (?,?,?,?);`
                                    db.query(queryString7,[reqq.int_reqtypeID,'None',date, 'Submitted'],(err, results, fields)=>{    
                                        if (err) console.log(err);
                                        var requirementID = results;
                                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                if (err) console.log(err);                         
                                if (err){
                                    console.log(err)
                                    res.send({alertDesc:notsuccess})
                                }
                                else{
                                    res.send({alertDesc:success})
                                }                         
                            });})})})})
                        }
                        if(req.body.blessloc=='2'){
                            var desiredtime1= moment(req.body.desiredtime1, 'h:mm a').format('HH:mm:ss');
                            var desiredtimeend= moment(req.body.desiredtimeend, 'h:mm a').format('HH:mm:ss');
                            var path = '/img/req/'+req.file.filename;
                            var nowDate = new Date(); 
                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                            console.log(date)
                            var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                            db.query(requirementQuery, [eventID.int_eventID], (err, results, fields) => {
                                if (err) console.log(err);
                                var reqq = results[0];
                                var datenow = new Date();
                                var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`
                                db.query(queryString1, [req.session.user.int_userID, eventID.int_eventID, req.body.desireddate1, desiredtime1,desiredtimeend, "Pending", "Submitted", dateNow], (err, results, fields) => {
                                    if (err) console.log(err);
                                    var eventinfoID= results;
                                    var queryString3 = `INSERT INTO tbl_houseblessing(int_eventinfoID,var_owner, var_estloc, var_ownercontactnum, var_owneremailadd) VALUES(?,?,?,?,?);`
                                    db.query(queryString3, [eventinfoID.insertId, req.body.owner, req.body.locations, req.body.contactnumber, req.body.email], (err, results, fields) => {
                                
                                    var path = '/img/req/'+req.file.filename;
                                    var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID,var_reqpath, datetime_reqreceived, var_reqstatus) VALUES (?,?,?,?);`
                                    db.query(queryString7,[reqq.int_reqtypeID,path,date, 'Submitted'],(err, results, fields)=>{    
                                        if (err) console.log(err);
                                        var requirementID = results;
                                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                console.log(results[0])
                                                res.send(results[0]);
                                            if (err) console.log(err);                        
                                            if (err){
                                                console.log(err)
                                                res.send({alertDesc:notsuccess})
                                            }
                                            else{
                                                res.send({alertDesc:success})
                                            }
                                    });});
                                });})
                            });    
                        }      
                }); 

            }); 
    // });
//==============================================================
// F U N E R A L  B L E S S I N G
//=============================================================
    guestRouter.get('/funeral/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 4`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })

    guestRouter.post('/funeral/query', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            res.send({firstQuery:results1[0]});
        });
    })

    guestRouter.get('/funeral/query/checksched', (req, res) => {
            var queryString2 = `SELECT int_priestID from tbl_priestsequence`
            db.query(queryString2,(err,results2,fields)=>{
                var queryString3 = `SELECT date_eventdate,time_eventstart from tbl_eventinfo`
                db.query(queryString3,(err,results3,fields)=>{
                    for(i=0;i<results3.length;i++){
                        results3[i].date_eventdate = moment(results3[i].date_eventdate).format('YYYY-MM-DD');
                    }
                    console.log(results2)
                    console.log(results3)
                    res.send({priestLength:results2,schedules:results3});
                })
            })
    
        })
    guestRouter.post('/funeral/query/checksched2', (req, res) => {
        var queryString1 = `SELECT date_eventdate,int_eventinfoID from tbl_eventinfo join tbl_priestsequence 
        on tbl_priestsequence.int_priestID
        = tbl_eventinfo.int_userpriestID WHERE tbl_eventinfo.int_userpriestID = ?
        AND tbl_eventinfo.date_eventdate = ? AND tbl_eventinfo.time_eventstart=?`
        console.log(req.body.priestid)
        console.log(req.body.eventdate)
            db.query(queryString1,[req.body.priestid,req.body.eventdate,req.body.eventtime],(err,results,fields)=>{
                var shit =0;
                if(results != ""){
                    console.log("MERON")
                    shit =1;
                    res.send({shit})
                }
                else{
                    shit =0;
                    res.send({shit})
                }
                console.log(results)
            })
    })

    guestRouter.get('/funeral/form', (req, res)=>{
        res.render('guest/views/forms/funeral',{user: req.session.user})
    });
    // var requirements = upload.fields([{name:'birthCertificate',maxCount:1});
    guestRouter.post('/funeral/form',upload.single('image'),(req, res) => {
        var success =0
        var notsuccess =1
        if (req.body.blessloc== '1'){
            
            var queryString= `select int_eventID from tbl_services where var_eventname="Funeral Service"`
            db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                var eventID = results[0];
                var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                var datenow = new Date();
                var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID,date_eventdate, time_eventstart, time_eventend, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`;
                db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1,desiredtime1, desiredtimeend,"Pending", 'Submitted', dateNow], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;

                queries( eventID, eventinfoID.insertId);;});});
        }

        if(req.body.blessloc =='2'){
            
            var queryString5= `select int_eventID from tbl_services where var_eventname="Funeral Mass";`
            db.query(queryString5, (err, results, fields) => {
                if (err) console.log(err);
                var eventID = results[0];  
                var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
                db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                    if (err) console.log(err);
                    var amount= results[0];
                    var datenow = new Date()
                    var downpaymentdeadline = moment(datenow).add(results[0].int_downpaymentdays,'days')
                    var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                    var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                    var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                    console.log(downpaymentdeadline)
                    console.log(fullpaymentdeadline)
                    console.log(downdateDeadline)
                    console.log(fulldateDeadline)
                    var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus, dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?)`;
                    db.query(paymentInsert,[amount.double_fee,'Unpaid', amount.double_fee, downdateDeadline,fulldateDeadline], (err, results, fields) => {
                        if (err) console.log(err);
                        var paymentid= results;
                        console.log(paymentid)
                        var datenow = new Date();
                        var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                        var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID, date_eventdate, time_eventstart, time_eventend, int_paymentID, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?,?)`;
                        db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1, desiredtime1, desiredtimeend,paymentid.insertId, "Pending", "Submitted", dateNow], (err, results, fields) => {
                            if (err) console.log(err);
                            var eventinfoID= results;
                            var text="";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                            for(i=0;i<8;i++){
                                text += possible.charAt(Math.floor(Math.random()*possible.length));
                            }
                            var datenow = new Date();
                            var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                            var dateDue = moment(dateNow,'YYYY-MM-DD').add(7,'days');
                            var dateDue1 = moment(dateDue).format('YYYY-MM-DD')
                            console.log(dateNow)
                            console.log(dateDue1)
                            var queryString9 = `INSERT INTO tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode) VALUES(?,?,now(),?,?)`
                            db.query(queryString9,[eventinfoID.insertId,dateDue1,req.session.user.int_userID,text],(err,results,fields)=>{
                                if(err) throw err 
                
                queries( eventID, eventinfoID.insertId);
            ;});});});});});
        }
        

        function queries(eventid, eventinfoid){
            req.body.image =req.file.filename
            console.log(req.body.image)
            var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
            db.query(queryString3, [eventinfoid, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                if (err) console.log(err);
                
                var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails) VALUES (?,?,?)`
                db.query(queryString4, [eventinfoid, req.body.venue, req.body.details], (err, results, fields) => {
                    if (err) console.log(err);
                    var path = '/img/req/' + req.file.filename;
                    var nowDate = new Date(); 

                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ? `
                    db.query(requirementQuery, [eventid.int_eventID], (err, results, fields) => {
                        if (err) console.log(err);
                        var reqq = results[0];
                        console.log(reqq)


                        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                        var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID,var_reqpath, datetime_reqreceived, var_reqstatus) VALUES (?,?,?,?);`
                        db.query(queryString7,[reqq.int_reqtypeID,path,date, 'Submitted'],(err, results, fields)=>{ 
                        if (err) console.log(err);
                        var requirementID = results;
                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                        db.query(reqevent,[requirementID.insertId, eventinfoid],(err, results, fields)=>{    
                        
                            if (err){
                                console.log(err)
                                res.send({alertDesc:notsuccess})
                            }
                            else{
                                res.send({alertDesc:success})
                            }
                        });});
                    });
                });
            });

        }

                        
            });
    // });
//==============================================================
// M A R R I A G E
//============================================================== 
guestRouter.get('/marriage/query', (req, res) => {
    var queryString = `SELECT * FROM tbl_eventinfo 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        where tbl_eventinfo.char_approvalstatus = "Approved" AND tbl_services.var_eventname != "Baptism"`
        db.query(queryString,(err,results,fields) =>{
            res.send(results)
            console.log('=================================')
            console.log('Marriage query ')
            console.log('=================================')
            console.log(results)
            console.log('=================================')
        })
    })
    guestRouter.get('/marriage/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 5`
        db.query(queryString3,(err,results,fields)=>{
            console.log('=================================')
            console.log('marriage utilities query')
            console.log('=================================')
            console.log(results)
            console.log('=================================')
        res.send(results[0])
    })
    })

guestRouter.get('/marriage/form', (req, res)=>{
    res.render('guest/views/marriage/marriage',{user: req.session.user})
});
guestRouter.get('/marriagedetails', (req, res)=>{                
    var queryString1 =`SELECT * FROM tbl_wedsteps`
    db.query(queryString1, (err, results, fields) => {
    if (err) console.log(err);
    var steps= results;
    console.log(steps)
    var queryString2 =`select * from tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname='Marriage' and char_reqtype= 'Default')`
    db.query(queryString2, (err, results, fields) => {
        if (err) console.log(err);
        var requirements= results;
        var queryString3 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
        db.query(queryString3, (err, results, fields) => {
        var desc =results;
        
        var queryString4 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
        db.query(queryString4, (err, results, fields) => {
        var events =results;
        
    

        return res.render('guest/views/marriage/marriagedetails', {steps: steps, requirements: requirements, description:desc, events: events});
     }); }); }); });});

   
var imageUpload1 = upload.fields([{name:'validIDGroom',maxCount:1},{name:'birthCertGroom',maxCount:1},{name:'validIDBride',maxCount:1},{name:'birthCertBride',maxCount:1}])

guestRouter.post('/marriage/form',imageUpload1, (req, res) => {
    var success =0
    var notsuccess =1

    var text="";
    console.log(req.body)
    var caseArray =[]
    var queryString= `select int_eventID from tbl_services where var_eventname="Marriage";`
    db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            var eventID = results[0];
            // console.log(eventID.int_eventID)
            // console.log(req.session.user);
            var desiredtime1= moment(req.body.desiredtime, 'hh:mm A').format('HH:mm:ss');
            var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
            db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                if (err) console.log(err);
                console.log(results)
                var fee= results[0].double_fee;
                var otherfee= results[0].double_addrate* req.body.sponsorname.length
                var totalfee= fee+otherfee-100
                var downamount = (fee+otherfee-100)/2
                console.log(totalfee)
                var datenow = new Date()
                var downpaymentdeadline = moment(datenow).add(results[0].int_downpaymentdays,'days')
                var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                console.log(downpaymentdeadline)
                console.log(fullpaymentdeadline)
                console.log(downdateDeadline)
                console.log(fulldateDeadline)
                var paymentInsert = `insert into tbl_payment(dbl_amount, dbl_balance, dbl_downpaymentamount, char_paymentstatus, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?,?)`;
            db.query(paymentInsert,[totalfee,totalfee,downamount, 'Unpaid', downdateDeadline,fulldateDeadline], (err, results2, fields) => {
                if (err) console.log(err);
                var paymentid= results2;
                // console.log(paymentid.insertId)
                var datenow = new Date()
                var dateDue1 = moment(datenow).add(7,'days')
                var dateDue = moment(dateDue1).format('YYYY-MM-DD')
                req.body.timeStart = moment(req.body.timeStart,'hh:mm a').format('HH:mm:ss')
                req.body.timeEnd2 = moment(req.body.timeEnd2,'hh:mm a').format('HH:mm:ss')
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID , date_eventdate, time_eventstart,time_eventend, char_approvalstatus, int_paymentID, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?,?)`;
                db.query(queryString1, [req.session.user.int_userID, eventID.int_eventID, req.body.eventDate, req.body.timeStart,req.body.timeEnd2,"Pending", paymentid.insertId, "Incomplete", datenow], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                    // console.log(eventinfoID.insertId)
                    
                    
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                    for(i=0;i<8;i++)
                    text += possible.charAt(Math.floor(Math.random()*possible.length));
                    var queryString01 =`insert into tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode)
                    VALUES(?,?,?,?,?)`
                    db.query(queryString01,[eventinfoID.insertId,fulldateDeadline,datenow,req.session.user.int_userID,text],(err,results,fields)=>{
                        console.log('voucher results')
                        console.log(results)
                    var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?);`
                            db.query(queryString3, [eventinfoID.insertId, req.body.lastname, req.body.firstname, req.body.middlename,'Male', req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                if (err) console.log(err); 
                                var getvouchercode =`select var_vouchercode from tbl_voucherevents where int_eventinfoID =?`
                                db.query(getvouchercode, [eventinfoID.insertId], (err, results, fields) => {
                                    if (err) console.log(err); 
                                    console.log('voucher results')
                                    var vouchercode = results[0]
                                    console.log(vouchercode)
                                    
                                var updatevoucher = `UPDATE tbl_payment set var_vouchercode=? where int_paymentID = ?`
                                db.query(updatevoucher,[vouchercode.var_vouchercode, eventinfoID.insertId],(err,results,fields)=>{
                                    if (err) console.log(err); 
                                    //hardcoded file loc, baguhin na lang

                                groombapconChecking(eventinfoID);
                                if(req.body.gcivilstatus == 'Married' && req.body.bcivilstatus == 'Married'){
                                    var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married, date_cprevweddate, var_cprevwedplace,int_weddingsteps) VALUES(?,?,?,?,?, ?);`
                                        db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, 1, req.body.cprevweddingdate, req.body.cprevweddingplace,3], (err, results, fields) => {
                                            if (err) console.log(err);                                                    
                                            requirementUpload(eventinfoID.insertId,req.files['birthCertGroom'][0].filename,req.files['validIDGroom'][0].filename,req.files['birthCertBride'][0].filename,req.files['validIDBride'][0].filename);
                                            defaultReq(eventinfoID.insertId);
                                            sponsors(eventinfoID.insertId);
                                            var eventid = eventinfoID.insertId
                                            res.redirect(`/guest/weddingDetails/${eventinfoID.insertId}`)
                                        });
                                    }
                                else{
                                    var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married,int_weddingsteps) VALUES(?,?,?,?);`
                                        db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, 0, 3], (err, results, fields) => {
                                            if (err) console.log(err);
                                            requirementUpload(eventinfoID.insertId,req.files['birthCertGroom'][0].filename,req.files['validIDGroom'][0].filename,req.files['birthCertBride'][0].filename,req.files['validIDBride'][0].filename);
                                            defaultReq(eventinfoID.insertId);
                                            sponsors(eventinfoID.insertId);
                                            var eventid = eventinfoID.insertId
                                            res.redirect(`/guest//weddingDetails/${eventinfoID.insertId}`)
                                        });
                                    }      
                                });});})});});});});
    });
    function groombapconChecking(eventinfoID){
        var gcurrparish;

        if(req.body.greligion=='Catholic'){
            if(req.body.gcurrentparishbool==1){
                gcurrparish = 'Ina ng Lupang Pangako Parish'
            }
            else if(req.body.gcurrentparishbool==0){
                gcurrparish =req.body.gcurrentparish
            }

            if(req.body.gbaptized == '1'){
                if(req.body.gconfirmed=='1'){
                    
                    var queryString4 = `INSERT INTO tbl_wedgroom(int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, date_gbapdate, var_gbapplace, bool_gconfirmed, date_gcondate, var_gconplace ) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?);`
                        db.query(queryString4, [eventinfoID.insertId, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, req.body.gbapdate, req.body.gbapplace, req.body.gconfirmed, req.body.gcondate, req.body.gconplace],(err, results, fields) => {if (err) console.log(err);bridebapconChecking(eventinfoID);
                            });
                }
                else if(req.body.gconfirmed=='0'){
                    var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, date_gbapdate, var_gbapplace, bool_gconfirmed) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?);`
                        db.query(queryString4 , [eventinfoID.insertId, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, req.body.gbapdate, req.body.gbapplace, '0'],(err, results, fields) => {
                            if (err) console.log(err);
                            bridebapconChecking(eventinfoID);
                            });
                }
            }
            else if(req.body.gbaptized=='0'){
                
                var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, bool_gconfirmed) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?);`
                    db.query(queryString4 , [eventinfoID.insertId, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, '0'],(err, results, fields) => {if (err) console.log(err);bridebapconChecking(eventinfoID);
                        });
                
            }
        }//catholic
        else if(req.body.greligion!='Catholic'){
            var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?);`
                db.query(queryString4 , [eventinfoID.insertId, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace],(err, results, fields) => {
                    if (err) console.log(err);
                    bridebapconChecking(eventinfoID);
                    });
        }
    }
    function bridebapconChecking(eventinfoID){
        var bcurrparish;
        if(req.body.breligion=='Catholic'){
             
            if(req.body.bbaptized == '1'){
                if(req.body.bconfirmed=='1'){
                    var queryString5 = `INSERT INTO tbl_wedbride( int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized, date_bbapdate, var_bbapplace, bool_bconfirmed, date_bcondate, var_bconplace) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,?, ?);`
                        db.query(queryString5 , [eventinfoID.insertId, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, req.body.bbapdate, req.body.bbapplace, req.body.bconfirmed, req.body.bcondate, req.body.bconplace],(err, results, fields) => {
                        if (err) console.log(err);
                        });
                }
                else if(req.body.bconfirmed=='0'){
                    var queryString5 = `INSERT INTO tbl_wedbride( int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized,date_bbapdate,  var_bbapplace, bool_bconfirmed) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?,?,?);`
                        db.query(queryString5 , [eventinfoID.insertId, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, req.body.bbapdate, req.body.bbapplace, '0'],(err, results, fields) => {
                            if (err) console.log(err);
                        });
                }
            }
            else if(req.body.bbaptized=='0'){
                var queryString5 = `INSERT INTO tbl_wedbride(int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized, bool_bconfirmed) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?);`
                db.query(queryString5 , [eventinfoID.insertId, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, '0'],(err, results, fields) => {
                    if (err) console.log(err);
                });
            }
        }//catholic
        else if(req.body.breligion!='Catholic'){
            var queryString5 = `INSERT INTO tbl_wedbride(int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?);`
            db.query(queryString5 , [eventinfoID.insertId, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace],(err, results, fields) => {
                if (err) console.log(err);
            });
        }

    }

    function sponsors(eventinfoID){
        var i;
        for(i=0; i < req.body.sponsorname.length; i++){
            var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
            db.query(queryString5, [eventinfoID, req.body.sponsorname[i]], (err, results, fields) => {
                if(err) throw err;
            });
        }
        
    }
    
    function defaultReq(eventinfoID){
        // var nowDate = new Date(); 
        // var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                        
        var requirement = `insert into tbl_requirements(int_reqtypeID,var_reqstatus) values(?,?)`
        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
            var datenow = new Date()
            if(req.body.greligion=='Catholic'){
                if(req.body.gbaptized==1){
                    db.query(requirement, [15,'To be submitted'], (err, results1, fields) => {
                    var requirementID = results1;
                    db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                
                    db.query(requirement, [16, 'To be submitted'], (err, results, fields) => {
                    var requirementID14 = results;
                    db.query(reqevent,[requirementID14.insertId, eventinfoID],(err, results, fields)=>{      
                    });});});});
                }
                else{
                    db.query(requirement, [49,'To be submitted'], (err, results1, fields) => {
                        var requirementID = results1;
                        db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{
                        });});
                }
            }
            if(req.body.breligion=='Catholic'){
                if(req.body.bbaptized==1){
                    db.query(requirement, [17, 'To be submitted'], (err, results, fields) => {
                    var requirementID15 = results;
                    db.query(reqevent,[requirementID15.insertId, eventinfoID],(err, results, fields)=>{      
                
                    db.query(requirement, [18, 'To be submitted'], (err, results, fields) => {
                    var requirementID16 = results;
                    db.query(reqevent,[requirementID16.insertId, eventinfoID],(err, results, fields)=>{      
                    });});});});
                }
                else{
                    db.query(requirement, [50, 'To be submitted'], (err, results, fields) => {
                        var requirementID16 = results;
                        db.query(reqevent,[requirementID16.insertId, eventinfoID],(err, results, fields)=>{      
                        });});
                }
        
            }
            db.query(requirement, [23, 'To be submitted'], (err, results, fields) => {
            var requirementID17 = results;
            db.query(reqevent,[requirementID17.insertId, eventinfoID],(err, results, fields)=>{      
        
            db.query(requirement, [24, 'To be submitted'], (err, results, fields) => {
            var requirementID18 = results;
            db.query(reqevent,[requirementID18.insertId, eventinfoID],(err, results, fields)=>{      
        
            db.query(requirement, [25, 'To be submitted'], (err, results, fields) => {
            var requirementID19 = results;
            db.query(reqevent,[requirementID19.insertId, eventinfoID],(err, results, fields)=>{      
                        
            additionalReq(eventinfoID)
            });});});});});});
    }
    function requirementUpload(eventinfoID){
        var queryString1 = `INSERT INTO tbl_requirements (var_reqpath,datetime_reqreceived,int_reqtypeID,var_reqstatus)
        VALUES (?,?,?,?)`
        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        
        var birthCertGroom = '/img/req/' + req.files['birthCertGroom'][0].filename;
        var validIDGroom = '/img/req/' + req.files['validIDGroom'][0].filename;
        var birthCertBride = '/img/req/' + req.files['birthCertBride'][0].filename;
        var validIDBride = '/img/req/' + req.files['validIDBride'][0].filename;

        db.query(queryString1,[birthCertGroom,date,13,"Submitted"],(err,results1,fields)=>{
            if(err) throw err
            db.query(queryString1,[validIDGroom,date,46,"Submitted"],(err,results2,fields)=>{
                if(err) throw err
                db.query(queryString1,[validIDBride,date,45,"Submitted"],(err,results3,fields)=>{
                    if(err) throw err
                    db.query(queryString1,[birthCertBride,date,14,"Submitted"],(err,results4,fields)=>{
                        if(err) throw err
                        var queryString2 = `INSERT INTO tbl_requirementsinevents (int_requirementID,int_eventinfoID)
                        VALUES(?,?)`

                        db.query(queryString2,[results1.insertId,eventinfoID],(err,results,fields)=>{
                            if(err) throw err
                            db.query(queryString2,[results2.insertId,eventinfoID],(err,results,fields)=>{
                                if(err) throw err
                                db.query(queryString2,[results3.insertId,eventinfoID],(err,results,fields)=>{
                                    if(err) throw err
                                    db.query(queryString2,[results4.insertId,eventinfoID],(err,results,fields)=>{
                                        if(err) throw err

                                        console.log(req.files)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    function additionalReq(eventinfoID){
        var requirement1 = `insert into tbl_requirements(int_reqtypeID,  var_reqstatus, datetime_reqreceived) values(?,?,?)`
        var reqevent1=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
        var datenow = new Date()
        
        if(req.body.boolmarried == 1){
            db.query(requirement1, [37, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
               
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
            });});
        }

        if(req.body.boolpregnant==1|| req.body.breligion != 'Catholic' || req.body.greligion !='No'){
            db.query(requirement1, [26, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                
                
                   
            });});
        }

        if(req.body.gnationality != 'Filipino' || req.body.bnationality != 'Filipino'){
            db.query(requirement1, [27, 'To be submitted', datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
               
            });});
        }

        if(req.body.greligion !='Catholic' && req.body.greligion != 'No religion'){
            db.query(requirement1, [29, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
            });});
        }

        if(req.body.gcivilstatus == 'Divorced'|| req.body.bcivilstatus=='Divorced'){
           
            db.query(requirement1, [33, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                        db.query(requirement1, [34, 'To be submitted',datenow], (err, results, fields) => {
                            if(err) console.log(err);
                            var requirementID1 = results;
                            db.query(reqevent1,[requirementID1.insertId, eventinfoID],(err, results, fields)=>{          
                            if(err) console.log(err);
                                db.query(requirement1, [35, 'To be submitted',datenow], (err, results, fields) => {
                                    if(err) console.log(err);
                                    var requirementID2 = results;
                                    db.query(reqevent1,[requirementID2.insertId, eventinfoID],(err, results, fields)=>{      
                                    if(err) console.log(err);
                                        db.query(requirement1, [36, 'To be submitted',datenow], (err, results, fields) => {
                                            if(err) console.log(err);
                                            var requirementID3 = results;
                                            db.query(reqevent1,[requirementID3.insertId, eventinfoID],(err, results, fields)=>{      
                                            if(err) console.log(err);
                                            
                                        });});});});});});});});
        }

        if(req.body.gcivilstatus == 'Widow'|| req.body.bcivilstatus=='Widower'){
            db.query(requirement1, [38, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                    db.query(requirement1, [39, 'To be submitted',datenow], (err, results, fields) => {
                        if(err) console.log(err);
                        var requirementID1 = results;
                        db.query(reqevent1,[requirementID1.insertId, eventinfoID],(err, results, fields)=>{      
                        if(err) console.log(err);
                    });});});});
        }

        if(req.body.boollivingin == 1){
            db.query(requirement1, [30, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                });});
        }

        if(req.body.boccupation == 'Military' ||req.body.goccupation =='Military'){
            db.query(requirement1, [40, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                });});
        }

        if(req.body.breligion == 'No religion' ||req.body.greligion =='No religion'){
            db.query(requirement1, [31, 'To be submitted',datenow], (err, results, fields) => {
                if(err) console.log(err);
                var requirementID = results;
                db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                if(err) console.log(err);
                });});
        }



        //case checking part 2, pushing  in an array leggo
        if(req.body.boolmarried == 1) caseArray.push(1)
        if(req.body.boolpregnant==1) caseArray.push(2)
        if(req.body.greligion !='Catholic' && req.body.greligion != 'No religion' || req.body.breligion !='Catholic' && req.body.breligion != 'No religion') caseArray.push(3)
        if(req.body.gnationality != 'Filipino' || req.body.bnationality != 'Filipino')caseArray.push(4)
        if(req.body.breligion == 'No religion' ||req.body.greligion =='No religion')caseArray.push(5)
        if(req.body.gcivilstatus == 'Divorced'|| req.body.bcivilstatus=='Divorced')caseArray.push(6)
        if(req.body.gcivilstatus == 'Widow'|| req.body.bcivilstatus=='Widower')caseArray.push(7)
        if(req.body.boollivingin == 1)caseArray.push(9)
        if(req.body.boccupation == 'Military' ||req.body.goccupation =='Military')caseArray.push(9)
        //minor 
        console.log(caseArray)
        var cases=caseArray.toString()
        var updatecase = `UPDATE tbl_wedcouple set var_wedcase=? where int_eventinfoID = ?`
        db.query(updatecase, [cases,eventinfoID ], (err, results, fields) => {
            if(err) console.log(err);
        });


    }
});    

guestRouter.get('/weddingDetails/:int_eventinfoID', (req, res)=>{
    var wedSteps=`select * from tbl_wedsteps`
    db.query(wedSteps, (err, steps, fields) => {
        if (err) console.log(err);
        console.log(req.body)
        var eventinfo=`select * from tbl_eventinfo where int_eventinfoID= ? and int_userID=?`
        var step=`select int_weddingsteps from tbl_wedcouple where int_eventinfoID= ?`
            db.query(eventinfo, [req.params.int_eventinfoID, req.session.user.int_userID] ,(err, results, fields) => {
                var eventinfo= results[0];
                db.query(step, [req.params.int_eventinfoID] ,(err, results, fields) => {
                    var stepnumber= results[0]
            if (err) console.log(err);
        console.log(eventinfo)
    return res.render('guest/views/marriage/marriage1',{user: req.session.user,steps:steps, eventinfo:eventinfo, stepnumber:stepnumber })
});});});});
guestRouter.post('/weddingDetails/reservationQuery', (req, res) => {
        var queryString1 = `SELECT * from tbl_eventinfo 
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`;
            db.query(queryString1, [req.body.id], (err, results, fields) => {
                var eventdetails = results[0];
                console.log(err)
                    if (err) console.log(err);                                                 
                        console.log(err)
                        res.send({eventdetails: eventdetails, stepclicked: req.body.x})

    });
});
guestRouter.post('/weddingDetails/viewQuery',(req,res)=>{
    console.log(req.body)
    var queryString = `SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        console.log(req.body)
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            if(err) throw err
            console.log(results)
            res.send(results)
})})
guestRouter.post('/weddingDetails/paymentQuery',(req,res)=>{
    console.log(req.body)
    var queryString = `SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        console.log(req.body)
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            if(err) throw err

            var queryString2 =`SELECT * from tbl_eventinfo 
            join tbl_user on tbl_eventinfo.int_userID =  tbl_user.int_userID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            console.log(results)
            res.send({eventdetails:results[0],paymenthistory:paymenthistory, stepclicked: req.body.x})
})})})

guestRouter.post('/weddingDetails/paymenthistoryQuery',(req,res)=>{
    console.log(req.body)
    var queryString = `SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        console.log(req.body)
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            if(err) throw err

            var queryString2 =`SELECT * from tbl_eventinfo 
            join tbl_user on tbl_eventinfo.int_userID =  tbl_user.int_userID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            console.log(results)
            res.send({eventdetails:results[0],paymenthistory:paymenthistory, stepclicked: req.body.x})
})})})

guestRouter.post('/weddingDetails/canonicalQuery',(req,res)=>{
    console.log(req.body)
    var queryString = `SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
    
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            var eventdetails = results[0];
            if(err) console.log(err)
            console.log(results)

            var interviewdetails = `SELECT * FROM tbl_eventinfo 
        
            JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            join tbl_schedule on tbl_eventinfo.int_eventinfoID = tbl_schedule.int_eventinfoID
            join tbl_wedschedule on tbl_schedule.int_scheduleID = tbl_wedschedule.int_scheduleID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_wedschedule.int_weddingsteps = 4`
        
            db.query(interviewdetails,[req.body.id],(err,results,fields)=>{
                
                if(results.length==0){
                    var interview = 'null'
                }
                else{
                    var interview = results[0];
                if(err) console.log(err)
                console.log(interview)

                }
                
    
            res.send({eventdetails: eventdetails, interview:interview, stepclicked: req.body.x})
})})})

guestRouter.post('/weddingDetails/requirementsQuery',(req,res)=>{
    console.log(req.body)
    var queryString = `SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedgroom ON tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride ON tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        
        WHERE tbl_eventinfo.int_eventinfoID = ?`
    
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            var eventdetails = results[0];
            if(err) console.log(err)
            console.log(results)

            //default
        var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_requirements.var_reqstatus = ? `
        //additional
        var additional = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_requirements.var_reqstatus = ? `
            db.query(queryString2,[req.body.id, 'Approved'],(err,app,fields) => {
                if (err) console.log(err);
                db.query(additional,[req.body.id, 'To be submitted'],(err,pen,fields) => {
                    if (err) console.log(err);
                    console.log(app)
                    console.log(pen)



            res.send({eventdetails: eventdetails,apprequirements:app,penrequirements:pen, stepclicked: req.body.x})
})})})})
//===============================================================================================//
// F A C I L I T I E S 
//===============================================================================================//
    guestRouter.get('/facilities', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_facility join tbl_utilities_facility on 
        tbl_utilities_facility.int_utilitiesfacilityID=tbl_facility.int_facilityID`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);  
            for(var i = 0; i < results.length; i++){
                results[i].time_feeper= moment(results[i].time_feeper, "HH:mm:ss").format('hh'); 
                results[i].time_addper= moment(results[i].time_addper, 'HH:mm:ss').format('hh'); 
            }     
            console.log(results)
            return res.render('guest/views/facilities/index',{user: req.session.user, facilities : results });
        
    });
    });
    guestRouter.get('/facilities/query', (req, res)=>{
        var queryString = `SELECT * FROM tbl_facilityreservation where char_reservestatus = "Approved"`
            db.query(queryString,(err,results,fields) =>{
                res.send(results)
                console.log(results)
            })
    })
    guestRouter.get('/facilities/queryutilities', (req, res)=>{
        var queryString = `SELECT * FROM tbl_utilities_facility where int_facilityID = ?`
            db.query(queryString,[req.query.id],(err,results,fields) =>{
                res.send(results)
                console.log(results)
            })
    })
    guestRouter.get('/facilities/form', (req, res)=>{
        console.log(req.query.id) 
        console.log(req.body)
        var queryString= `select * from tbl_items where int_goodquantity <> '0'`
            db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                var items =results;
                console.log(items)
                var queryString1= `select * from tbl_facility where int_facilityID = ?`
                    db.query(queryString1, [req.query.id],(err, results, fields) => {
                        if (err) console.log(err);
                        // console.log()
                        var facilitydetails=results[0];

        return res.render('guest/views/facilities/form',{user: req.session.user, items:items, facilitydetails:facilitydetails})
        });
    });
    });
    guestRouter.post('/facilities/form', (req, res) => {
    
        // var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
        
            var queryString1 = `INSERT INTO tbl_facilityreservation(int_userID, int_facilityID, var_event, var_eventdesc, int_attendees, datetime_reservestart,datetime_reserveend, char_reservestatus) VALUES(?,?,?,? ,?,?,?,?)`;
                db.query(queryString1, [req.body.userID, req.body.id, req.body.eventname, req.body.eventdesc, req.body.attendees,  req.body.reservestart, req.body.reserveend, 'Pending'], (err, results, fields) => {
                    var reservationID = results;
                    console.log(err)
                        if (err) console.log(err);                                                 
                            console.log(err)
                            res.send({reservationID: reservationID.insertId})

    });
    });
    
    guestRouter.post('/facilities/upload',upload.single('image'), (req, res) => {
        var success =0
        var notsuccess =1
            console.log(req.body)
            var path = '/img/req/'+req.file.filename;
            var nowDate = new Date(); 
            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
            console.log(date)
            var queryString= `select int_serviceutilitiesID from tbl_serviceutilities where var_servicename="House/Business Blessing"`
            db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var serviceID = results[0];
                var requirementQuery = `select int_servicereqtypeID from tbl_servicereqtype where int_serviceutilitiesID = ?`
                db.query(requirementQuery, [serviceID.int_serviceutilitiesID], (err, results, fields) => {
                    if (err) console.log(err);
                    var reqq = results[0];
                    console.log(reqq)
                    var queryString7 = `INSERT INTO tbl_requirementsfacility(int_reservationID, int_servicereqtypeID, var_reqpath, datetime_reqreceived, char_reqstatus) VALUES (?,?,?,?,?);`
                    db.query(queryString7,[req.body.reservationID, reqq.int_servicereqtypeID, path,date,'Submitted'],(err, results, fields)=>{
                            if (err) console.log(err);                        
                            if (err){
                                        console.log(err)
                                        res.send({alertDesc:notsuccess})
                            }
                            else{
                                        res.send({alertDesc:success})
                            }
                        });
        });
    });});
//===============================================================================================//
// D O C U M E N T  
//===============================================================================================//
    guestRouter.get('/document', (req, res)=>{
        res.render('guest/views/document')
    });

    guestRouter.get('/document/form', (req, res)=>{
        var results = req.query
        console.log(results)
        return res.render('guest/views/forms/document',{results:results});
    });
    guestRouter.post('/document/query', (req, res)=>{
        var queryString =`SELECT tbl_baptism.var_fathername,tbl_baptism.var_mothername,tbl_relation.date_birthday,tbl_document.var_documenttype,tbl_relation.var_fname,tbl_relation.var_lname,
        tbl_eventinfo.date_eventdate
        FROM tbl_document
        JOIN tbl_documentsevents ON tbl_documentsevents.int_documentID = tbl_document.int_documentID
        JOIN tbl_eventinfo ON tbl_eventinfo.int_eventID = tbl_documentsevents.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        WHERE tbl_document.var_documenttype = ?
        AND tbl_relation.var_fname = ?
        AND tbl_relation.var_lname = ?
        OR tbl_eventinfo.date_eventdate = ?
        AND tbl_eventinfo.char_approvalstatus = "Approved"`
        db.query(queryString,[req.body.documentType,req.body.firstName,req.body.lastName,req.body.eventDate],(err,results,fields)=>{
        if (err) console.log(err);
        if(results[0] == undefined){
            console.log("WRONG INPUT")
            res.send(results[0])
        }
        else{
        console.log(req.body)
        results[0].date_eventdate = moment(results[0].date_eventdate).format('YYYY-MM-DD');
        console.log(results)
        res.send(results[0])
        }
        })
    });
    guestRouter.post('/document/queryDocument',(req,res)=>{
        var queryString = `SELECT * FROM 
        tbl_documentrequest JOIN tbl_document ON tbl_documentrequest.int_documentID = tbl_document.int_documentID
        WHERE tbl_documentrequest.var_doclastname=?
        AND tbl_documentrequest.var_docfirstname=?
        AND tbl_document.var_documenttype =?
        `
            db.query(queryString,[req.body.lastName,req.body.firstName,req.body.documentType],(err,results,fields)=>{
                if (err) console.log(err);
                res.send(results[0])
            })
    })
    guestRouter.post('/document/form',upload.single('image'), (req, res) => {
    console.log(req.file)
        var queryString1 = `select int_documentID,dbl_docuprice from tbl_document where var_documenttype= ?`
            db.query(queryString1,[req.body.documenttype], (err, results1, fields) => {
                if (err) console.log(err);
                var documentID =results1[0].int_documentID;
                var docuPrice =results1[0].dbl_docuprice;
                console.log(results1)
                console.log(req.session.user);
                var queryString2 = `INSERT INTO tbl_payment(dbl_amount,char_paymentstatus) VALUES(?,?)`
                    db.query(queryString2,[docuPrice,"Unpaid"],(err, results2, fields)=>{
                    if (err) console.log(err);
                    console.log(results2)
                    var paymentID = results2.insertId;
                    var datenow= new Date();
                    var queryString3 = `INSERT INTO tbl_documentrequest(int_userID, int_documentID, var_doclastname, var_docfirstname, text_purpose, date_docurequested,char_docustatus,int_paymentID) VALUES(?,?,?,?,?,?,?,?)`;
                        db.query(queryString3, [req.session.user.int_userID, documentID, req.body.lastname, req.body.firstname, req.body.purpose,datenow,"Pending",paymentID], (err, results3, fields) => {
                            if (err) console.log(err);
                            var requestID =results3.insertId;
                            var path = '/img/req/'+req.file.filename;
                            var nowDate = new Date(); 
                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                            var queryString7 = `INSERT INTO tbl_requirementsdocument(int_requestID,var_reqpath,datetime_reqreceived,int_servicereqtypeID,char_reqstatus) VALUES (?,?,?,?,?);`
                            db.query(queryString7,[requestID,path,nowDate,2,"Pending"],(err, results, fields)=>{
                                if (err) throw err;
                                    return res.redirect(`/guest`);
                                })
                            });
                        });    
                    });            
                    
    });
    guestRouter.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500)
        return res.render('guest/views/error/505', {title: '505: Something broke!'});
      })
    guestRouter.use(function(req, res, next) {
        res.status(404)
        return res.render('guest/views/error/404', {title: '404: File Not Found'});
    });
exports.guest = guestRouter;