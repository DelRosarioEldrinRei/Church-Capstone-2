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
		var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
		// var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
		var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
		var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
			db.query(queryString1, (err, results, fields) => {
				if (err) console.log(err);
				var application = results[0];
				// db.query(queryString2, (err, results, fields) => {
				// 	if (err) console.log(err);
				// 	var reservation = results[0];
					db.query(queryString3, (err, results, fields) => {
						if (err) console.log(err);
						var request = results[0];
						db.query(queryString4, (err, results, fields) => {
							if (err) console.log(err);
                            var baptism = results[0];
                            var queryString1= `select * from tbl_user where char_usertype ='Priest' or char_usertype ='Parish Priest'`
                                    db.query(queryString1, (err, results, fields) => {
                                        if (err) console.log(err); 
                                        var priests = results


            
                console.log('Condition 4')     
                console.log(results)
                scheduleoutput= results
                // res.send({priestsschedule:results})
                return res.render('secretariat/views/index',{application:application,request:request, baptism:baptism, priests:priests, scheduleoutput:scheduleoutput});
           
        }); }); }); })
    });
    secretariatRouter.get('/all',(req,res)=>{
        var queryString1= `select * from tbl_schedule 
            join tbl_user on tbl_schedule.int_userID = tbl_user.int_userID
            join tbl_eventinfo on tbl_schedule.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_user.char_usertype=? or tbl_user.char_usertype=?`
            db.query(queryString1, ['Priest', 'Parish Priest'],(err, results, fields) => {
                for(i=0;i<results.length;i++){
                    results[i].date_eventdate = moment(results[i].date_eventdate).format('YYYY-MM-DD')
                }
                if (err) console.log(err);  
                res.send({schedules:results});
            })
    });
    secretariatRouter.post('/schedulechecking', (req, res)=>{
        // console.log(req.body.id)
        var queryString1= `select * from tbl_schedule`
        db.query(queryString1,(err, results, fields) => {
            if (err) console.log(err); 
            var details = results
            // console.log(details)
            for(i=0; i<details.length; i++){
                var datenow =moment();
                var datesched = moment(details[i].date_sched,'YYYY-MM-DD').format('YYYY-MM-DD');
                var format = 'HH:mm:ss'
                var dateNoww =new Date()
                var time = moment(datenow,format),
                time_schedend = moment(details[i].time_schedend, format);
                time_schedstart = moment(details[i].time_schedstart, format);
                var dateNow =moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                
                console.log('================================================')
                console.log(moment(datesched).isSame(dateNow))
                console.log(time.isBetween(time_schedstart, time_schedend))
                console.log(time.isBetween(time_schedstart, time_schedend))
                console.log('================================================')

                if(moment(datesched).isSame(dateNow)){
                    console.log('condition1')
                    if(time.isAfter(time_schedend)){
                        console.log('condition1-1')
                        var schedID = details[i].int_scheduleID
                        var queryString1 =`UPDATE 
                        tbl_schedule set var_schedupdate = 'Done' where int_scheduleID =?`
                        db.query(queryString1,[schedID], (err, results2, fields) => {
                            if(err) console.log(err)
                            console.log(results2)
                            console.log(schedID)
                        
                        })
                    } 
                    else if(time.isBetween(time_schedstart, time_schedend)){
                        console.log('condition1-2')
                        var schedID = details[i].int_scheduleID
                        console.log(schedID)
                    
                        var queryString1 =`UPDATE 
                        tbl_schedule set var_schedupdate = 'On going' where int_scheduleID =?`
                        db.query(queryString1,[schedID], (err, results2, fields) => {
                            if(err) console.log(err)
                            console.log(results2)
                            console.log(schedID)
                        
                        })
                    }
                    else{
                        console.log('condition1-3')
                        console.log('still incoming')
                    }
                }
                else if(i == details.length-1) res.send({details:details})
            }//for

        }); 
    });

    secretariatRouter.post('/searchvoucher', (req, res)=>{
        console.log(req.body)
        //for events lang
        var queryString2 = `select * from tbl_voucherevents 
        left join tbl_eventinfo on tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        left join tbl_documentrequest on tbl_voucherevents.int_requestID = tbl_documentrequest.int_requestID
        
        left join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        
        left join tbl_services on tbl_eventinfo.int_eventID = tbl_services.int_eventID
        left join tbl_serviceutilities on tbl_documentrequest.int_serviceutilitiesID = tbl_serviceutilities.int_serviceutilitiesID
        where tbl_voucherevents.var_vouchercode=?`
        db.query(queryString2,[req.body.vouchercode],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({details:results[0]})
        })
	});
    secretariatRouter.post('/messagesButton', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        db.query(message, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var messages = results;
            for(i=0;i<messages.length;i++){ 
                messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
            } 
            res.send({messages:messages})
        })
    })
    secretariatRouter.post('/notificationsButton', (req, res)=>{
        var message =`SELECT * from tbl_notification where int_userID= ? limit 4`
        db.query(message, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var notifications = results;
            for(i=0;i<notifications.length;i++){ 
                notifications[i].datetime_received=moment(notifications[i].datetime_received).fromNow()
            } 
            res.send({notifications:notifications})
        })
    })
    secretariatRouter.post('/getmessagecount', (req, res)=>{
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        db.query(newmessage, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            res.send({newmessage:newmessages})
        })
    })
    secretariatRouter.post('/checkeventstime', (req, res)=>{
        
        var newnotif =`SELECT * from tbl_eventinfo 
        where var_eventstatus <>'Cancelled' and char_approvalstatus<>'Cancelled' and char_approvalstatus<>'Disapproved'`
        db.query(newnotif, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);

            var allresult=results; 
            
            for(var i = 0; i < allresult.length; i++){
                var format = 'hh:mm:ss'
                var time_eventstart= moment(allresult[i].time_eventstart,'HH:mm:ss').format('HH:mm:ss'); 
                var time_eventend= moment(allresult[i].time_eventend,'HH:mm:ss').format('HH:mm:ss'); 
                var datenow =moment();
                var time = moment(datenow,format),
                  beforeTime = moment(time_eventstart, format),
                  afterTime = moment(time_eventend, format);
                  var dateNow =moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                  var datefromdb= allresult[i].date_eventdate
                if(allresult[i].char_approvalstatus=='Approved'){
                    if(moment(datefromdb).isSame(dateNow)&& allresult[i].var_eventstatus!='On Going'){
                        
                        
                        if(time.isBetween(beforeTime, afterTime)){
                            console.log('Between')
                                console.log(allresult[i])
                                var allresultss = allresult[i]
                                var ongoing =`UPDATE tbl_eventinfo SET var_eventstatus ='On Going' where int_eventinfoID =?`
                                db.query(ongoing, [allresultss.int_eventinfoID],(err, results, fields) => {
                                    if (err) console.log(err);
                                    
                                })
                                
                        }
                    }
                    if(moment(datefromdb).isSame(dateNow)&& allresult[i].var_eventstatus=='On Going'){
                        
                        console.log(time.isAfter(afterTime))
                        if(time.isAfter(afterTime)){
                            console.log('After')
                                console.log(allresult[i])
                                var allresultss = allresult[i]
                                var ongoing =`UPDATE tbl_eventinfo SET var_eventstatus ='Done' where int_eventinfoID =?`
                                db.query(ongoing, [allresultss.int_eventinfoID],(err, results, fields) => {
                                    if (err) console.log(err);
                                    
                                })
                                
                        }
                    }

                }//ifapproved

                if(allresult[i].char_approvalstatus=='Pending'){
                    if(moment(datefromdb).isSame(dateNow)){
                        if(time.isBetween(beforeTime, afterTime)){
                        var allresultss = allresult[i]
                        var datenoww =new Date();
                        
                        var cancelled =`UPDATE tbl_eventinfo SET var_eventstatus ='Cancelled' where int_eventinfoID =?`
                            db.query(cancelled, [allresultss.int_eventinfoID],(err, results, fields) => {
                                if (err) console.log(err);
                                var cancelled2 =`UPDATE tbl_eventinfo SET char_approvalstatus ='Cancelled' where int_eventinfoID =?`
                            db.query(cancelled2, [allresultss.int_eventinfoID],(err, results, fields) => {
                                if (err) console.log(err);
                                console.log('automatically cancelled')
                                var notifdesc ='An event was automatcally cancelled by the system.'
                                var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                    db.query(insertnotif,[6, notifdesc, allresultss.int_eventinfoID, datenoww], (err, results4, fields) => {
                                        if(err) console.log(err)
                            })})
                        })
                }}}
        }//for   
                 
            
        })
    })
    secretariatRouter.post('/getnotifcount', (req, res)=>{
        
        var newnotif =`SELECT count(int_notifID) as newnotif from tbl_notification where int_userID =?`
        db.query(newnotif, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newnotif = results[0];
            console.log(newnotif)
            res.send({newnotif:newnotif})
        })
    })
    secretariatRouter.get('/messages', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        
        var sentmessage =`SELECT count(int_messageID) as sentmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_receiverID where int_senderID= ? `
        var inboxs =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? `
        var sents =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_senderID= ? `
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        db.query(newmessage, [req.session.secretariat.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            
            db.query(sentmessage, [req.session.secretariat.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var sentmessages = results[0];
                console.log(sentmessages)
                
            db.query(message, [req.session.secretariat.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var messages = results;
                for(i=0;i<messages.length;i++){ 
                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                } 
                db.query(inboxs, [req.session.secretariat.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var inboxs = results;
                    for(i=0;i<inboxs.length;i++){ 
                        inboxs[i].datetime_sent=moment(inboxs[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 
                    db.query(sents, [req.session.secretariat.int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var sents = results;
                        for(i=0;i<sents.length;i++){ 
                            sents[i].datetime_sent=moment(sents[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                        } 
                    console.log(sents)
                
                return res.render('secretariat/views/messages',{newmessages:newmessages,messages:messages,sentmessages:sentmessages,inboxs:inboxs, sents:sents})
            }); }); }); }); });
    });
    secretariatRouter.post('/message', (req, res)=>{
        var queryString1= `select * from tbl_user  where int_userID=?`
        db.query(queryString1,[req.body.int_userID], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            res.send(results[0])
        }); 
    }); 
    secretariatRouter.post('/messages/query', (req, res) => {
        const queryString = `SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and int_messageID = ?`;
        db.query(queryString,[req.session.secretariat.int_userID,req.body.id], (err, results, fields) => {        
            if (err) console.log(err);
            var query= results[0]
            // console.log(query.var_messagesatus)
            var nowDate = new Date(); 
            var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
            if(query.var_messagestatus=='Delivered'){
                var queryString1 = `UPDATE tbl_message SET        
                var_messagestatus = "Seen",
                datetime_seen= "${req.body.date}"
                where int_messageID= ${req.body.id};`;
                db.query(queryString1,(err, results, fields) => {        
                    console.log(results+"   : RESULTS")
                    console.log(queryString1)
                    res.send(query)
                    // console.log(query)
                }); 

            }
            else{
                res.send(query)
                // console.log(query)

            }
            // console.log(query)
        });
    });
    secretariatRouter.post('/messages/query1', (req, res) => {
        const queryString = `SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_receiverID where int_senderID= ? and int_messageID = ?`;
        db.query(queryString,[req.session.secretariat.int_userID,req.body.id], (err, results, fields) => {        
            if (err) console.log(err);
            var query= results
            console.log(query[0])
            res.send(query[0])
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
    secretariatRouter.post('/getcabinets',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)

            res.send({cabinets:results})
        })
    })
    secretariatRouter.post('/getcabinetsanddivisions',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)
            var cabinets = results
          
            res.send({cabinets:cabinets})
        })
    })
    secretariatRouter.get('/cabinets',(req,res)=>{
        console.log(req.query)
        console.log(req.body)
        var queryString2 = `select * from tbl_filedivisions where int_cabinetID =?`
        db.query(queryString2,[req.query.id],(err,results,fields) =>{
            if(err) console.log(err)
            var cabinetid=req.query.id
            var divisions = results
            var tobepassed=[]
            var selectallfiles = `select * from tbl_files 
            join tbl_filefolders on tbl_filefolders.int_foldernumber = tbl_files.int_folderID
            left join tbl_requirements on tbl_files.int_requirementID = tbl_requirements.int_requirementID
            left join tbl_requirementtype on tbl_requirements.int_reqtypeID= tbl_requirementtype.int_reqtypeID
            left join tbl_services on tbl_requirementtype.int_eventID= tbl_services.int_eventID
            where tbl_files.int_cabinetID =?`
            db.query(selectallfiles,[req.query.id],(err,results,fields) =>{
                   // values[i]= results[i].var_fileloc.split('-')
                if(err) console.log(err)
                var files = results;
                console.log(files)
                for(var i = 0; i < files.length; i++){

                    // reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
                    files[i].datetime_reqreceived= moment(files[i].datetime_reqreceived, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY h:mm A');
                    // reservations[i].datetime_reserveend= moment(reservations[i].datetime_reserveend, 'HH:mm:ss').format('MM/DD/YYYY h:mm a');
                }
            return res.render('secretariat/views/files', {divisions:divisions, files:files, cabinetid: cabinetid })
        })
    })
    })

    secretariatRouter.get('/receipts',(req,res)=>{
        console.log(req.query)
        console.log(req.body)
        var queryString2 = `select * from tbl_paymenthistory`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)
            
                var ors = results;
                console.log(ors)
                for(var i = 0; i < ors.length; i++){

                    // reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
                    ors[i].date_paymentdate= moment(ors[i].date_paymentdate, 'YYYY-MM-DD').format('MM/DD/YYYY');
                    // reservations[i].datetime_reserveend= moment(reservations[i].datetime_reserveend, 'HH:mm:ss').format('MM/DD/YYYY h:mm a');
                }
            return res.render('secretariat/views/OR', {ors:ors})
        
    })
    })
    secretariatRouter.post('/folderdetails',(req,res)=>{
        console.log(req.body)
        // console.log(req.query)
        var values= req.body.id.split(',')
        if(values[0]==0){
            var selectallfiles = `select * from tbl_files 
            join tbl_filefolders on tbl_filefolders.int_foldernumber = tbl_files.int_folderID
            left join tbl_requirements on tbl_files.int_requirementID = tbl_requirements.int_requirementID
            left join tbl_requirementtype on tbl_requirements.int_reqtypeID= tbl_requirementtype.int_reqtypeID
            left join tbl_services on tbl_requirementtype.int_eventID= tbl_services.int_eventID
            where tbl_files.int_cabinetID =?`
            db.query(selectallfiles,[values[1]],(err,results,fields) =>{
                   // values[i]= results[i].var_fileloc.split('-')
                if(err) console.log(err)
                var files = results;
                console.log(files)
                for(var i = 0; i < files.length; i++){
                    files[i].datetime_reqreceived= moment(files[i].datetime_reqreceived, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY h:mm A')
                }
                res.send({files:files})
            })
        }
        else{

            
            console.log(values)
            var selectallfiles = `select * from tbl_files 
            join tbl_filefolders on tbl_filefolders.int_foldernumber = tbl_files.int_folderID
            left join tbl_requirements on tbl_files.int_requirementID = tbl_requirements.int_requirementID
            left join tbl_requirementtype on tbl_requirements.int_reqtypeID= tbl_requirementtype.int_reqtypeID
            left join tbl_services on tbl_requirementtype.int_eventID= tbl_services.int_eventID
            where tbl_files.int_cabinetID =? and tbl_files.int_divisionID =?`
            db.query(selectallfiles,[values[1], values[0]],(err,results,fields) =>{
                if(err) console.log(err)
                var files = results;
                console.log(files)
                for(var i = 0; i < files.length; i++){
                    files[i].datetime_reqreceived= moment(files[i].datetime_reqreceived, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY h:mm A');
                }
                res.send({files:files})
            })
        }
    })
    secretariatRouter.post('/getdivisions',(req,res)=>{
        console.log(req.body)
        var queryString2 = `select * from tbl_filedivisions where int_cabinetID =?`
        db.query(queryString2,[req.body.cabinetID],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({divisions:results})
        })
    })
    secretariatRouter.post('/getfolders',(req,res)=>{
        console.log(req.body)
        var value = req.body.location.split('-');
        var queryString2 = `select MAX(int_foldernumber) as max from tbl_filefolders where int_divisionID =? and int_cabinetID = ?`
        db.query(queryString2,[value[1],value[0]],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({folders:results[0]})
        })
    })
    secretariatRouter.post('/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err);
            var queryString2 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Disapproved", var_eventstatus='Cancelled
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.eventid],(err,results,fields) =>{
            if(err) console.log(err);
            res.send(results)
        })})
    })
    secretariatRouter.post('/getOR', (req, res)=>{
        console.log(req.body.id1)
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`
            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)
                res.send({ ornumber:results1[0]})      
    });
    });
    secretariatRouter.post('/thisweek', (req, res)=>{
        var queryString1= `select * from tbl_eventinfo
        join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
        where tbl_eventinfo.date_eventdate =? and tbl_eventinfo.int_eventID = 3`
        var date = moment().day(7).format('YYYY-MM-DD')
        
        db.query(queryString1,[date], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            res.send({results:results})
        }); 
    }); 
    secretariatRouter.post('/priests', (req, res)=>{
        console.log(req.body)
        if(req.body.generatestatus=='All Applications'){
            var queryString1= `select * from tbl_eventinfo
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
            where tbl_eventinfo.date_eventdate =? and tbl_eventinfo.int_eventID = 3`
            var date = moment().day(7).format('YYYY-MM-DD')
            
            db.query(queryString1,[date], (err, results, fields) => {
                if (err) console.log(err);       
                console.log(results)
                res.send({results:results})
            }); 
        }

        if(req.body.generatestatus=='All Approved'){
            var queryString1= `select * from tbl_eventinfo
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
            where tbl_eventinfo.date_eventdate =? and tbl_eventinfo.int_eventID = 3 
            and char_approvalstatus='Approved'`
            var date = moment().day(7).format('YYYY-MM-DD')
            
            db.query(queryString1,[date], (err, results, fields) => {
                if (err) console.log(err);       
                console.log(results)
                res.send({results:results})
            }); 
        }
        if(req.body.generatestatus=='All Paid'){
            var queryString1= `select * from tbl_eventinfo
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
            where tbl_eventinfo.date_eventdate =? and tbl_eventinfo.int_eventID = 3
             and char_paymentstatus='Paid'`
            var date = moment().day(7).format('YYYY-MM-DD')
            
            db.query(queryString1,[date], (err, results, fields) => {
                if (err) console.log(err);       
                console.log(results)
                res.send({results:results})
            }); 
        }

    })

    secretariatRouter.post('/selectedchedule', (req, res)=>{
        
        console.log(req.body)
        if(req.body.type!='All' && req.body.priestID!=0){

            var queryString1= `select * from tbl_schedule 
            join tbl_user on tbl_schedule.int_userID = tbl_user.int_userID
            join tbl_eventinfo on tbl_schedule.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_user.int_userID =? and tbl_schedule.var_scheduletype =?   `
            db.query(queryString1, [req.body.priestID, req.body.type],(err, results, fields) => {
                if (err) console.log(err); 
                console.log('Condition 1')      
                console.log(results)
                res.send({priestsschedule:results})
            }); 
        
        }
        if(req.body.type=='All' && req.body.priestID!=0){
            var queryString1= `select * from tbl_schedule 
            join tbl_user on tbl_schedule.int_userID = tbl_user.int_userID
            join tbl_eventinfo on tbl_schedule.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_user.int_userID =? `
            db.query(queryString1, [req.body.priestID],(err, results, fields) => {
                if (err) console.log(err);  
                console.log('Condition 2')           
                console.log(results)
                res.send({priestsschedule:results})
            }); 
        }
        if(req.body.type!='All' && req.body.priestID==0){
            var queryString1= `select * from tbl_schedule 
            join tbl_user on tbl_schedule.int_userID = tbl_user.int_userID
            join tbl_eventinfo on tbl_schedule.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_schedule.var_scheduletype =? and tbl_user.char_usertype=? or tbl_user.char_usertype=?  `
            db.query(queryString1, [req.body.type, 'Priest', 'Parish Priest'],(err, results, fields) => {
                if (err) console.log(err);   
                console.log('Condition 3')    
                console.log(results)
                res.send({priestsschedule:results})
            }); 
        }
        if(req.body.type=='All' && req.body.priestID==0){
            var queryString1= `select * from tbl_schedule 
            join tbl_user on tbl_schedule.int_userID = tbl_user.int_userID
            join tbl_eventinfo on tbl_schedule.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_user.char_usertype=? or tbl_user.char_usertype=?`
            db.query(queryString1, ['Priest', 'Parish Priest'],(err, results, fields) => {
                if (err) console.log(err);  
                console.log('Condition 4')     
                console.log(results)
                res.send({priestsschedule:results})
            }); 
        }



    })


//===============================================================================================//
// T R A N S A C T I O N S //
//===============================================================================================//
	secretariatRouter.get('/transaction-facilityreservation', (req, res)=>{
		var queryString1 =`SELECT * FROM tbl_facilityreservation 
		join tbl_facility on tbl_facilityreservation.int_facilityID = tbl_facility.int_facilityID 
		join tbl_user on tbl_facilityreservation.int_userID = tbl_user.int_userID
		JOIN tbl_requirementsfacility ON tbl_requirementsfacility.int_reservationID = tbl_facilityreservation.int_reservationID
        `
        
        
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
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID order by int_requestID DESC
		`
		db.query(queryString1, (err, results, fields) => {
			if (err) console.log(err);       
			var requests = results;
			// var arrays
			for(var i = 0; i < requests.length; i++){
				requests[i].date_docurequested= moment(requests[i].date_docurequested).format('MM/DD/YYYY');
			}
			return res.render('secretariat/views/transactions/docureq',{ requests : requests});
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
        console.log(req.body)
        var queryString =`SELECT * FROM tbl_documentrequest where tbl_documentrequest.int_requestID = ?`
        db.query(queryString,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]

            if(type.var_requesttype=='Online'){
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_user on tbl_user.int_userID = tbl_documentrequest.int_userID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id], (err, results, fields) => {
                    if (err) console.log(err);
                    res.send(results[0])
                    console.log(results[0])
                });
            }
            else{
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_tempuser on tbl_tempuser.int_tempuserID = tbl_documentrequest.int_tempuserID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id], (err, results, fields) => {
                    if (err) console.log(err);
                    res.send(results[0])
                    console.log(results[0])
                });
            }
		})
	});
	secretariatRouter.post('/transaction-documentrequest/update', (req, res)=>{
		console.log(req.body)
		const queryString2 = `UPDATE tbl_requirementsdocument set char_reqstatus=?
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
							var queryString6 = `INSERT INTO tbl_notification(int_userID,var_notifdesc,datetime_received) VALUES(?,?,now())`
							db.query(queryString6,[req.body.userid,'Your Document Request is to ready to release'], (err, results2, fields) => {
								var queryString7 =`INSERT INTO tbl_voucher(int_notifID,int_requestID,date_issued,date_due)
								VALUES(?,?,?,?)`
								var datenow = new Date();
								var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
								console.log(dateNow)
								var dateDue = moment(dateNow,'YYYY-MM-DD').add(7,'days');
								var dateDue1 = moment(dateDue).format('YYYY-MM-DD')
								console.log(dateDue1)
								console.log(results2)
								db.query(queryString7,[results2.insertId,req.body.docuid,dateNow,dateDue1], (err, results1, fields) => {
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
    secretariatRouter.post('/transaction-documentrequest/paymentquery', (req, res)=>{
        console.log(req.body.id1)

        var queryString =`SELECT * FROM tbl_documentrequest where int_requestID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]

            if(type.var_requesttype=='Online'){
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_user on tbl_user.int_userID = tbl_documentrequest.int_userID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id1], (err, results, fields) => {
                    if (err) console.log(err);
                    var queryString2 =`SELECT * from tbl_documentrequest 
                    join tbl_user on tbl_documentrequest.int_userID =  tbl_user.int_userID
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                    JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
                    where tbl_documentrequest.int_requestID = ?`
                    db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                        if (err) console.log(err);
                        if(results1.length==0){
                            var paymenthistory = null
                            res.send({results:results[0], paymenthistory:paymenthistory})
                        }
                        else{
                            var paymenthistory = results1
                            res.send({results:results[0], paymenthistory:paymenthistory})
                        }

                    })
                });
            }
            else{
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_tempuser on tbl_tempuser.int_tempuserID = tbl_documentrequest.int_tempuserID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id1], (err, results, fields) => {
                    if (err) console.log(err);

                    var queryString2 =`SELECT * from tbl_documentrequest 
                    join tbl_tempuser on tbl_documentrequest.int_tempuserID =  tbl_tempuser.int_tempuserID
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                    JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
                    where tbl_documentrequest.int_requestID = ?`
                    db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                        if (err) console.log(err);
                        if(results1.length==0){
                            var paymenthistory = null
                            res.send({results:results[0], paymenthistory:paymenthistory})
                        }
                        else{
                            var paymenthistory = results1
                            res.send({results:results[0], paymenthistory:paymenthistory})
                        }

                    })

                });
            }

        }); 
    });
    secretariatRouter.post('/transaction-documentrequest/updatepaymentquery', (req, res)=>{
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_documentrequest where tbl_documentrequest.int_requestID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]

            if(type.var_requesttype=='Online'){
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_user on tbl_user.int_userID = tbl_documentrequest.int_userID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id1], (err, results, fields) => {
                    if (err) console.log(err);
                    
                    
                    var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

                    db.query(queryString2,(err,results1,fields) =>{
                        if(err) console.log(err)
                        console.log(results1)
                    res.send({results:results[0], ornumber:results1[0]})
                });
                });
            }
            else{
                var queryString1 =`SELECT * FROM tbl_documentrequest 
                join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
                join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
                join tbl_servicereqtype on tbl_servicereqtype.int_servicereqtypeID = tbl_requirementsdocument.int_servicereqtypeID
                join tbl_voucherevents on tbl_documentrequest.int_requestID = tbl_voucherevents.int_requestID
                join tbl_tempuser on tbl_tempuser.int_tempuserID = tbl_documentrequest.int_tempuserID
                where tbl_documentrequest.int_requestID = ?`
                db.query(queryString1,[req.body.id1], (err, results, fields) => {
                    if (err) console.log(err);
                    
                    var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

                    db.query(queryString2,(err,results1,fields) =>{
                        if(err) console.log(err)
                        console.log(results1)
                    res.send({results:results[0], ornumber:results1[0]})
                });
            })
            }



            // console.log(results[0])
      
    });
    });

    secretariatRouter.post('/transaction-documentrequest/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log(req.body)
        // var value = req.body.id1.split(',');
        // console.log(value);
        // for(var i=0; i>value.length; i++){
            // if(value[1]=='1'){var status= 'Paid'}
            // if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ req.body.status)
        var queryString= `select * from tbl_documentrequest 
        join tbl_payment on tbl_documentrequest.int_paymentID = tbl_payment.int_paymentID
        where tbl_documentrequest.int_requestID =?`

        var queryString1 = `UPDATE tbl_payment SET char_paymentstatus = ?, datetime_paymentreceived = ?, dbl_balance=?
                where int_paymentID =  ?;`;
        
        var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            requestinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =requestinfo.dbl_balance-req.body.payment
            db.query(updateHistory,[requestinfo.int_paymentID, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                history=results[0];

            
            if(balance == 0){
                 var status = 'Paid'
                
                 var approvalUpdate = `UPDATE tbl_documentrequest SET char_docustatus = "Released", date_docureleased=?, date_docureceived=?
                 WHERE int_requestID =?`
                 db.query(approvalUpdate,[nowDate, nowDate, req.body.id1], (err, results, fields) => {
                 })
                    if (err) console.log(err); 
                
            }
            else if (balance !=0) var status = 'Incomplete'

            db.query(queryString1,[status, date, balance, requestinfo.int_paymentID], (err, results, fields) => {
                if (err) console.log(err); 
                var selectstatus =`SELECT * from tbl_documentrequest 
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID
                    WHERE tbl_documentrequest.int_requestID = ?`
                


                    db.query(selectstatus,[req.body.id1], (err, results, fields) => {
                        if (err) console.log(err);

                            if (err){
                                console.log(err)
                                res.send({alertDesc:notsuccess})
                            }
                            else{
                                res.send({alertDesc:success,balance:balance})
                            }       
                        
                    })
        }); }); }); 
        
    });

    secretariatRouter.post('/transaction-documentrequest/generatedstatus', (req, res)=>{
       var updategenerated =`update tbl_documentrequest set char_docustatus ='Generated'
       where int_requestID =?`
       db.query(updategenerated,[req.body.id1],(err,results,fields)=>{
           if(err) console.log(err)
           res.send(results[0])
       })
    });
    secretariatRouter.post('/transaction-documentrequest/tobereleasedstatus', (req, res)=>{
        var updategenerated =`update tbl_documentrequest set char_docustatus ='To be released'
        where int_requestID =?`
        db.query(updategenerated,[req.body.id1],(err,results,fields)=>{
            if(err) console.log(err)
            


            var queryString =`SELECT * FROM tbl_documentrequest where tbl_documentrequest.int_requestID = ?`
            db.query(queryString,[req.body.id1], (err, results, fields) => {
                if (err) console.log(err);
                var type = results[0]
                console.log('=============================')
                console.log(type)
                console.log('=============================')
                if(type.var_requesttype=='Online'){
                    var datenoww =new Date();
                    var notifdesc = 'The document you requested is ready to be released. Please go to the office to get the original copy.'
                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                    db.query(insertnotif,[type.int_userID, notifdesc, type.int_eventinfoID, datenoww], (err, results4, fields) => {
                        if(err) console.log(err)
                        res.send({results:'Notified'})
                    })

                }
                if(type.var_requesttype=='No account'){
                    var tempuserdetails = `select * from tbl_tempuser where int_tempuserID = ?`
                    db.query(tempuserdetails,[type.int_tempuserID], (err, results, fields) => {
                        console.log('=============================')
                        console.log(results)
                        console.log('=============================')
                        if (err) console.log(err);
                        res.send({results:results[0]})

                    })
                }



            
            })
            //notify guest! make voucher the hell dami pa self ano na
        })
     });


 
    secretariatRouter.get('/transaction-regularbaptism', (req, res)=>{        
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        where tbl_services.var_eventname ='Baptism' and tbl_eventinfo.var_eventstatus<>'Done' and tbl_eventinfo.var_eventstatus<>'Cancelled'
        order by tbl_eventinfo.int_eventinfoID DESC`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var regulars=results;
                for(var i = 0; i < regulars.length; i++){ 
                    regulars[i].date_applied= moment(regulars[i].date_applied).format('MM/DD/YYYY');  
                    regulars[i].date_birthday= moment(regulars[i].date_birthday).format('YYYY-MM-DD');
                    regulars[i].date_eventdate= moment(regulars[i].date_eventdate).format('YYYY-MM-DD');
                    regulars[i].time_eventstart= moment(regulars[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }
               

                            return res.render('secretariat/views/transactions/eventapp/regbaptism',{regulars:regulars});        }); 
         
    });
    secretariatRouter.post('/transaction-baptism/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
        }
        else{
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
        }
    })
    });
    secretariatRouter.post('/transaction-baptism/query/updateStatus', (req, res)=>{
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
            var resultss = results[0]
            console.log('------------------------------')
            console.log(results)
            console.log('------------------------------')
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }
            })
        });
    });
    secretariatRouter.post('/transaction-baptism/updateStatus',(req,res)=>{
        var queryString = `SELECT * FROM tbl_eventinfo WHERE int_eventinfoID = ?`
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            if(err) console.log(err)
            // if(results.int_userpriestID == null && req.body.paystatus == "Paid" ){
                var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
                WHERE int_paymentID = ?`
                db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                    if(err) console.log(err)
                    return res.redirect('/secretariat/transaction-baptism')
                    
                })
            // }
         
            // else if(req.body.paystatus=="Paid" && req.body.reqstatus == "Approved"){
            //     eventstatus = "Approved"
            //     var queryString3 = `UPDATE tbl_eventinfo SET char_docustatus =?
            //     WHERE int_eventinfoID = ?`
            //     db.query(queryString3,[eventstatus,req.body.id],(err,results,fields) =>{
            //         if(err) console.log(err)
            //         return res.redirect('/secretariat/transaction-baptism')
              
            //     }) 
            // }

        })
    })
    

    secretariatRouter.post('/transaction-baptism/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err);
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-baptism/updateRequirements',(req,res)=>{
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;

                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                            char_requirements ='Complete', char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,req.body.eventid)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_baptism SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    //nalagay na yung name
                                    // INSERT INFO COPY FOR OTHERS~
                                    var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    if(eventinfodetailss.var_applicationtype!='Walk-in'){
                                        var notifdesc ='Your application is approved'
                                        var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                        db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                            if(err) console.log(err)
                                        })
                                    }

                                    

                                     //FOR SCHEDULE

                                             
                                         // addschedules(eventinfodetails)
                                         var schedname = 'Baptism of '+ eventinfodetailss.var_lname +', ' + eventinfodetailss.var_fname
                                         var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                         db.query(schedtag, [priestinfo.int_userID,req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                             console.log(err) 
                                     
                                        var notifdesc ='You have been assigned to an event (Baptism)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)



                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                        })
                                    })
                                        
                                    })})
                                    })
                            })
                            })
                        
                    })
                })
            })
        })
    })
    
    secretariatRouter.post('/transaction-baptism/paymentquery', (req, res)=>{
        console.log(req.body.id1)
        console.log(req.body.id1)


        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });
    }


    else{
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });

    }
})
    });
    secretariatRouter.post('/transaction-baptism/updatepaymentquery', (req, res)=>{
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)
                res.send({results:results[0], ornumber:results1[0]})
            
                });
            });
        }
        else{
            var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)
                res.send({results:results[0], ornumber:results1[0]})
            
                });
            });
        }
    })
    });

    secretariatRouter.post('/transaction-baptism/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log(req.body)
        // var value = req.body.id1.split(',');
        // console.log(value);
        // for(var i=0; i>value.length; i++){
            // if(value[1]=='1'){var status= 'Paid'}
            // if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ req.body.status)
        var queryString= `select * from tbl_eventinfo join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_eventinfo.int_eventinfoID =?`

        var queryString1 = `UPDATE tbl_payment SET char_paymentstatus = ?, datetime_paymentreceived = ?, dbl_balance=?
                where int_paymentID =  ?;`;
        
        var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            eventinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =eventinfo.dbl_balance-req.body.payment
            db.query(updateHistory,[eventinfo.int_paymentID, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                history=results[0];

            
            if(balance == 0){
                 var status = 'Paid'
                    // INSERT INFO COPY FOR OTHERS~
                    var datenoww= new Date();
                    var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                    db.query(selecteventinfo,[req.body.id1],(err,results,fields)=>{
                    if(err) console.log(err);
                    var eventinfodetailss = results[0]
                    var notifdesc ='You have completed the payment required for the event you applied to'
                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                    db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id1, datenoww], (err, results4, fields) => {
                        if(err) console.log(err)
                    
                    })})
            }
            else if (balance !=0) {
                var status = 'Incomplete'
                // INSERT INFO COPY FOR OTHERS~
                var datenoww= new Date();
                var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                db.query(selecteventinfo,[req.body.id1],(err,results,fields)=>{
                if(err) console.log(err);
                var eventinfodetailss = results[0]
                var notifdesc =`Your payment has been received. Your remaining balance is: ${balance}`
                var insertnotif =`insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id1, datenoww], (err, results4, fields) => {
                    if(err) console.log(err)
                
                })})


            }
            db.query(queryString1,[status, date, balance, eventinfo.int_paymentID], (err, results, fields) => {
                if (err) console.log(err); 
               
                                if (err){
                                    console.log(err)
                                    res.send({alertDesc:notsuccess})
                                }
                                else{
                                    res.send({alertDesc:success, balance:balance})
                                }        
                         
                   
        }); }); }); 
        
    });





    secretariatRouter.get('/transaction-specialbaptism', (req, res)=>{        
      
        var queryString3 =`SELECT * FROM tbl_eventinfo 
            
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
            join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            where tbl_services.var_eventname ='Special Baptism'
            order by tbl_eventinfo.int_eventinfoID DESC`

                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var specials = results;                
                    for(var i = 0; i < specials.length; i++){
                        specials[i].date_applied= moment(specials[i].date_applied).format('MM/DD/YYYY');
                        specials[i].date_birthday= moment(specials[i].date_birthday).format('YYYY-MM-DD');
                        specials[i].date_eventdate= moment(specials[i].date_eventdate).format('MM/DD/YYYY');
                        specials[i].time_eventstart= moment(specials[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                        
                    }   
                        // console.log('results' + results[i])

                    return res.render('secretariat/views/transactions/eventapp/spcbaptism',{specials:specials});
        }); 

    });
    secretariatRouter.post('/transaction-spcbaptism/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
            })
        
        
        }

        else{

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
        }})
    });
    secretariatRouter.post('/transaction-spcbaptism/query/updateStatus', (req, res)=>{
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
            var resultss=results[0]
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        console.log('-----------------------')
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }
            })
        });
    });
    secretariatRouter.post('/transaction-spcbaptism/updateStatus',(req,res)=>{
        var queryString = `SELECT * FROM tbl_eventinfo WHERE int_eventinfoID = ?`
        db.query(queryString,[req.body.id],(err,results,fields)=>{
            if(err) console.log(err)
            // if(results.int_userpriestID == null && req.body.paystatus == "Paid" ){
                var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
                WHERE int_paymentID = ?`
                db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
                    if(err) console.log(err)
                    return res.redirect('/secretariat/transaction-baptism')
                    
                })
            

        })
    })
    secretariatRouter.post('/message', (req, res)=>{
        var queryString1= `select * from tbl_user  where int_userID=?`
        db.query(queryString1,[req.body.int_userID], (err, results, fields) => {
            if (err) console.log(err);       
            console.log(results)
            res.send(results[0])
        }); 
    }); 
    secretariatRouter.post('/transaction-spcbaptism/updateRequirementsReject',(req,res)=>{
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err);
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-spcbaptism/updateRequirements',(req,res)=>{
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                var queryString = `UPDATE tbl_eventinfo set
                        char_requirements ='Complete', char_approvalstatus='Approved'
                        where tbl_eventinfo.int_eventinfoID=?`
                        db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                            if(err) console.log(err)
                            console.log(results)
                              // INSERT INFO COPY FOR OTHERS~
                              var datenoww= new Date();
                              var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                              db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                              if(err) console.log(err);
                              var eventinfodetailss = results[0]
                              var notifdesc ='Your application is approved'
                              var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                              db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                  if(err) console.log(err)
                            return res.redirect('/secretariat/transaction-specialbaptism')
                        })})})
              
            })
        })
    })
    secretariatRouter.post('/transaction-spcbaptism/availablepriests', (req, res)=>{
        //auto assign, available, not available. 
        console.log(req.body)
        var getEventInfo = `SELECT * from tbl_eventinfo where int_eventinfoID = ?`
        db.query(getEventInfo, [req.body.id],(err, results, fields) => {
            if (err) console.log(err);
            var eventInfo = results[0]
            console.log(eventInfo)

        var getNext =`SELECT * from tbl_priestsequence
        join tbl_user on tbl_priestsequence.int_priestID = tbl_user.int_userID
        where tbl_priestsequence.int_eventID = 5 and tbl_priestsequence.char_seqstatus = 'Next'`
        db.query(getNext, (err, results, fields) => {
            if (err) console.log(err);
            var nextPriest = results[0]
            console.log('Next Priest')
            console.log(nextPriest)

        //check if available si next priest
        var getNextSchedule =`SELECT * from tbl_schedule where int_userID = ? and date_sched=? and time_schedstart = ?`
        db.query(getNextSchedule, [nextPriest.int_userID, eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results1, fields) => {
            if (err) console.log(err);
            var nextPriestSchedule = results1;
            console.log('----------------------------------------------------')
            console.log('Next priest schedule, kung meron')
            console.log(nextPriestSchedule)
            console.log('----------------------------------------------------')
            var allpriests =`select * from tbl_user 
            join tbl_priestsequence on tbl_user.int_userID = tbl_priestsequence.int_priestID 
            where tbl_priestsequence.int_eventid = 5`
            db.query(allpriests, [eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results1, fields) => {
                if (err) console.log(err);
                var allpriests = results1;
            
            if(nextPriestSchedule.length ==0){
                console.log('----------------------------------------------------')
                console.log('NEXT PRIEST IS AVAILABLE')
                console.log('----------------------------------------------------')
                
                res.send({availablepriests:allpriests, nextpriest: nextPriest})
            }

            if(nextPriestSchedule.length !=0){
                console.log('----------------------------------------------------')
                console.log('NEXT PRIEST IS NOT AVAILABLE, take over next sa sequence')
                console.log('----------------------------------------------------')
                //we got to do something about 'what if, di rin available si next sa next, and what if walang available 
                //so much to work on grrrr 

                var nexttonext =  `select * from tbl_user join tbl_priestsequence 
                on tbl_user.int_userID = tbl_priestsequence.int_priestID
                where tbl_priestsequence.int_seqnumber = ?`

                db.query(nexttonext, [nextPriest.int_seqnumber+1],(err, results, fields) => {
                    if (err) console.log(err);
                    var nexttonextpriest = results[0]

                    res.send({availablepriests:allpriests, nextpriest: nexttonextpriest})


                })

            }


           
        })//available, not available
            // console.log(results[0])
        });//getNextSchedule
    });//getnext
    
    });//geteventinfo

    


    });//post

    
    secretariatRouter.post('/transaction-spcbaptism/checkifpriestavailable',(req,res)=>{
        console.log(req.body)
        var value = req.body.priestID.split(',');
        var getEventDetails = `select * from tbl_eventinfo where int_eventinfoID = ?`
        db.query(getEventDetails,[value[1]],(err,results,fields) =>{
            if(err) console.log(err)
            var eventdetails = results[0]
            console.log('----------------------------------------------------')
            console.log('Event Details')
            console.log(eventdetails)
            console.log('----------------------------------------------------')


            var check =`select * from tbl_user 
            join tbl_priestsequence on tbl_user.int_userID = tbl_priestsequence.int_priestID 
            join tbl_schedule on tbl_user.int_userID = tbl_schedule.int_userID 
            where tbl_user.int_userID =? and tbl_schedule.date_sched = ? and tbl_schedule.time_schedstart = ?`
            db.query(check,[value[0],eventdetails.date_eventdate, eventdetails.time_eventstart ],(err,results,fields) =>{
                if(err) console.log(err)
                var checkresults =  results
                if(checkresults.length==0){
                    console.log('chosen priest is available')
                    var result = 0
                    res.send({result:result})
                }
                if(checkresults.length!=0){
                    console.log('chosen priest is not available')
                    var result = 1
                    res.send({result:result})
                }

            
        })})
    })
    secretariatRouter.post('/transaction-spcbaptism/assignpriest', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var value = req.body.priestid.split(',');
        console.log('VALUE')
        console.log(value)
        var queryString1 =`SELECT * from tbl_user where int_userID=?`
        db.query(queryString1, [value[0]], (err, results, fields) => {
            if (err) console.log(err);
            var priestinfo =results[0]
            console.log(priestinfo)
            var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
            var assign = `UPDATE tbl_eventinfo SET int_userpriestID = ?
                WHERE int_eventinfoID =?`
                db.query(assign, [value[0], req.body.id], (err, results, fields) => {
                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        var priest = results[0];
                    var assignname = `UPDATE tbl_baptism SET var_priestname = ?
                        WHERE int_eventinfoID =?`
                        db.query(assignname, [priestname, req.body.id], (err, results, fields) => {


                            //dito mag lagay ng lahat ng sched

                            var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    

                                    

                                     //FOR SCHEDULE

                                             
                                         // addschedules(eventinfodetails)
                                         var schedname = 'Baptism of '+ eventinfodetailss.var_lname +', ' + eventinfodetailss.var_fname
                                         var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                         db.query(schedtag, [priestinfo.int_userID,req.body.id, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                             console.log(err) 
                                     
                                        var notifdesc ='You have been assigned to an event (Baptism)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.id, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)


                            var queryString = `SELECT * FROM tbl_priestsequence`
                            db.query(queryString,(err,results,fields)=>{
                                if(err) console.log(err);
                                if(priest.int_seqnumber < results.length){
                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                    db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                        })
                                    })
                                }
                                else if(priest.int_seqnumber >= results.length){
                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                    db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                        })
                                    })
                                }
                            })
                            if(req.body.requested==1){
                                var priestrequested = `UPDATE tbl_eventinfo SET bool_priestrequested = ?
                                WHERE int_eventinfoID =?`
                                db.query(priestrequested, [req.body.requested, req.body.id], (err, results, fields) => {
                                    
                                    var priestaddrate = `select * from tbl_utilities 
                                    join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                    where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        if (err) console.log(err)
                                        var priestutilities = results[0]
                                        var paymentevent =`select * from tbl_payment 
                                        join tbl_eventinfo on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                                        where tbl_eventinfo.int_eventinfoID =?`
                                        db.query(paymentevent, [req.body.id],(err, results, fields) => {
                                            if (err) console.log(err)
                                            var paymentdetails = results[0]
                                        console.log('=================================================')
                                        console.log('UTILITIES')
                                        console.log(priestutilities)
                                        console.log('=================================================')
                                        var deadline = moment(paymentdetails.fullpaymentdeadline,'YYYY-MM-DD HH:mm:ss').format('MMMM DD, YYYY')
                                        var newamount = paymentdetails.dbl_amount + priestutilities.double_priestaddrate;
                                        
                                        if(req.body.requestpaid ==0){
                                            var newbalance = paymentdetails.dbl_balance + priestutilities.double_priestaddrate;
                                            var newstatus = 'Unpaid'
                                             // INSERT INFO COPY FOR OTHERS~
                                            var datenoww= new Date();
                                            var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                                            db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                                            if(err) console.log(err);

                                            var eventinfodetailss = results[0]
                                            console.log('=================================================')
                                            console.log('EVENT INFO DETAILS')
                                            console.log(eventinfodetailss)
                                            console.log('=================================================')
                                            if(eventinfodetailss.var_applicationtype!='Walk-in'){

                                                var notifdesc =`You have requested for a specific priest. You have to pay additional ${priestutilities.double_priestaddrate} before the deadline: ${deadline}. Thank you.`
                                                var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                                db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id, datenoww], (err, results4, fields) => {
                                                    if(err) console.log(err)
                                                    payment(newamount, newbalance, newstatus)
                                                })
                                            }
                                            else{
                                                payment(newamount, newbalance, newstatus)
                                            }
                                        })
                                            
                                        }
                                        else{
                                            var newbalance = paymentdetails.dbl_balance
                                            var newstatus = 'Paid'
                                            payment(newamount, newbalance, newstatus)
                                                    
                                        }
                                })})})
                            }
                            else{
                                var priestaddrate = `select * from tbl_utilities 
                                join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
                                join tbl_payment on tbl_eventinfo.int_paymentID = tbl_eventinfo.int_paymentID
                                where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        var priestutilities = results[0]
                                        console.log(priestutilities)
                                        
                                       // addschedules(priestutilities)
                                       //
 
                                           if (err){
                                               console.log(err)
                                               res.send({alertDesc:notsuccess})
                                           }
                                           else{
                                               res.send({alertDesc:success})
                                           }   
                                       })
                                    
                            }
                        })})})
                })})})
            // console.log(results[0])
        });
        function payment (newamount, newbalance, newstatus){
            var priestaddrate = `select * from tbl_utilities 
            join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
            where tbl_eventinfo.int_eventinfoID =?`
            db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                if (err) console.log(err)
                var priestutilities = results[0]
                
                    
                    var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                    console.log(req.body.id)
                    db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                    if(err) console.log(err);
                    var eventinfodetailss = results[0]
                    console.log('=================================================')
                    console.log('EVENT INFO DETAILS')
                    console.log(eventinfodetailss)
                    console.log('----------')
                    console.log(eventinfodetailss.int_paymentID)
                    console.log('=================================================')
                    var priestrequested = `UPDATE tbl_payment SET dbl_amount = ?, dbl_balance =?, 
                        char_paymentstatus=? WHERE int_paymentID =?`
                            db.query(priestrequested, [newamount, newbalance, newstatus,  eventinfodetailss.int_paymentID], (err, results, fields) => {
                                if (err) console.log(err);
                                // addschedules(priestutilities)

                                    if (err){
                                        console.log(err)
                                        res.send({alertDesc:notsuccess})
                                    }
                                    else{
                                        res.send({alertDesc:success})
                                    }  
                                })
        })
    })
        }
       
    });
    secretariatRouter.post('/transaction-spcbaptism/paymentquery', (req, res)=>{
        console.log(req.body.id1)
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });
    }
    else{
        
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });
    }
})
    });
    secretariatRouter.post('/transaction-spcbaptism/updatepaymentquery', (req, res)=>{
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)




            res.send({results:results[0], ornumber:results1[0]})
            // console.log(results[0])
            });
        });
        }
        else{
            var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_baptism on tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)




            res.send({results:results[0], ornumber:results1[0]})
            // console.log(results[0])
            });
        });
        }
    })
    });
    secretariatRouter.post('/transaction-spcbaptism/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log(req.body)
        // var value = req.body.id1.split(',');
        // console.log(value);
        // for(var i=0; i>value.length; i++){
            // if(value[1]=='1'){var status= 'Paid'}
            // if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ req.body.status)
        var queryString= `select * from tbl_eventinfo 
        join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_eventinfo.int_eventinfoID =?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            eventinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =eventinfo.dbl_balance-req.body.payment
            var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
        
            db.query(updateHistory,[eventinfo.int_paymentID, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                history=results[0];

            
                if(balance == 0){
                    var status = 'Paid'
                       // INSERT INFO COPY FOR OTHERS~
                       var datenoww= new Date();
                       var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                       db.query(selecteventinfo,[req.body.id1],(err,results,fields)=>{
                       if(err) console.log(err);
                       var eventinfodetailss = results[0]
                       var notifdesc ='You have completed the payment required for the event you applied to'
                       var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                       db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id1, datenoww], (err, results4, fields) => {
                           if(err) console.log(err)
                       
                       })})
               }
               else if (balance !=0) {
                   var status = 'Incomplete'
                   // INSERT INFO COPY FOR OTHERS~
                   var datenoww= new Date();
                   var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                   db.query(selecteventinfo,[req.body.id1],(err,results,fields)=>{
                   if(err) console.log(err);
                   var eventinfodetailss = results[0]
                   var notifdesc =`Your payment has been received. Your remaining balance is: ${balance}`
                   var insertnotif =`insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                   db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id1, datenoww], (err, results4, fields) => {
                       if(err) console.log(err)
                   
                   })})
   
   
               }

                var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                db.query(selecteventinfo,[req.body.id1],(err,results,fields)=>{
                if(err) console.log(err);
                var eventinfodetailss = results[0]
                var queryString1 = `UPDATE tbl_payment SET char_paymentstatus = ?, datetime_paymentreceived = ?, dbl_balance=?
                where int_paymentID =  ?;`;
                db.query(queryString1,[status, date, balance, eventinfodetailss.int_paymentID], (err, results, fields) => {
                if (err) console.log(err); 
                    if (err){
                        console.log(err)
                        res.send({alertDesc:notsuccess})
                    }
                    else{
                        res.send({alertDesc:success,balance:balance})
                    }       
                })
            })
        }); }); 
        
    });


    //anointing of the sick 
    secretariatRouter.get('/transaction-anointing', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Anointing of the sick' and 
        tbl_eventinfo.char_approvalstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Done'
        order by tbl_eventinfo.int_eventinfoID`
        
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var anointings=results; 
            
            for(var i = 0; i < anointings.length; i++){
                var datenow = moment();
                anointings[i].date_applied= moment(anointings[i].date_applied).format('MM/DD/YYYY');
                anointings[i].date_birthday= moment(anointings[i].date_birthday).format('MM/DD/YYYY');
                anointings[i].date_eventdate= moment(anointings[i].date_eventdate).format('MM/DD/YYYY');
                anointings[i].time_eventstart= moment(anointings[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                anointings[i].time_eventend= moment(anointings[i].time_eventend,'HH:mm:ss').format('hh:mm A'); 
                
                       
            }

            return res.render('secretariat/views/transactions/eventapp/anointing',{anointings:anointings});
       
            }); 
    });
    secretariatRouter.post('/transaction-anointing/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);

            if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
                console.log('No accoutn/ walk-in')
                var queryString1 =`SELECT * from tbl_eventinfo
                JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
            }
            else{
                console.log('With account')
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
            }
        })
       
    });
    secretariatRouter.post('/transaction-anointing/query/updateStatus', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            // console.log(results)
            var resultss = results[0]
            console.log('-----------------------')
            console.log(resultss)
            console.log('-----------------------')
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                console.log('-----------------------')
                console.log(results1)
                console.log('-----------------------')
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        console.log('-----------------------')
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }

                
            })
        });
    });

    secretariatRouter.post('/transaction-anointing/updateStatus',(req,res)=>{
        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
        WHERE int_eventinfoID = ?`
            db.query(queryString3,[req.body.eventstatus,req.body.id],(err,results,fields) =>{
                if(err) console.log(err)
                if(req.body.eventstatus == "Approved"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.id],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.id],(err,results,fields)=>{
                                if(results[0].int_userpriestID == null){
                                var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                                , tbl_eventinfo.time_eventstart from tbl_user 
                                JOIN tbl_eventinfo ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID
                                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                                where tbl_services.var_eventname!="Baptism" AND tbl_eventinfo.date_eventdate =?
                                AND tbl_eventinfo.time_eventstart = ?           
                                `
                                db.query(queryString8,[results[0].date_eventdate,results[0].time_eventstart],(err,results1,fields)=>{
                                    
                                    var event = results[0]
                                    var schedules = results1;
                                    console.log("YUNG ICOCOMPARE NA SCHED ")
                                    console.log(event.date_eventdate,event.time_eventstart)
                                    console.log(schedules.length)
                                        var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                        db.query(queryString10,(err,priests,fields)=>{
                                            if(schedules.length == 0){
                                                for(j=0;j<priests.length;j++){
                                                    var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID,var_notifdesc)
                                                        VALUES(${priests[j].int_userID},now(),${event.int_eventinfoID},'You have an invitation for an upcoming event1')`
                                                        db.query(queryString11,(err,results,fields)=>{
                                                            if(err) console.log(err);
                                                        })
                                                    }
                                                    res.send(results)
                                            }
                                            else{
                                                var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                                db.query(queryString10,(err,priests,fields)=>{
                                                    var availablePriests = [];
                                                    var occupiedPriests = [];
                                                for(i=0;i<priests.length;i++){
                                                    availablePriests.push(priests[i].int_userID)
                                                }
                                                for(w=0;w<schedules.length;w++){
                                                    occupiedPriests.push(schedules[w].int_userID)
                                                }
                                                function arr_diff (a1, a2) {

                                                    var a = [], diff = [];
                                                
                                                    for (var i = 0; i < a1.length; i++) {
                                                        a[a1[i]] = true;
                                                    }
                                                
                                                    for (var i = 0; i < a2.length; i++) {
                                                        if (a[a2[i]]) {
                                                            delete a[a2[i]];
                                                        } else {
                                                            a[a2[i]] = true;
                                                        }
                                                    }
                                                
                                                    for (var k in a) {
                                                        diff.push(k);
                                                    }
                                                
                                                    return diff;
                                                }
                                                var priestsNotifs = arr_diff(availablePriests,occupiedPriests)
                                                console.log(priestsNotifs[0])
                                                    for(n=0;n<priestsNotifs.length;n++){
                                                        console.log(priestsNotifs[n])
                                                        var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID)
                                                            VALUES(${priestsNotifs[n]},now(),${event.int_eventinfoID})`
                                                            db.query(queryString11,(err,results,fields)=>{
                                                                if(err) console.log(err);
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) console.log(err);
                                    res.send(results)
                                }
                            })
                            // if(err) console.log(err);
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) console.log(err);
                    res.send(results)
                }
            }) 
    })
    
    secretariatRouter.post('/transaction-anointing/updateRequirements',(req,res)=>{
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;

                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                            char_requirements ='Complete', char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,req.body.eventid)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_blessing SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    var notifdesc ='Your application is approved'
                                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                    db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                        if(err) console.log(err)

                                    

                                     //FOR SCHEDULE

                                             
                                         // addschedules(eventinfodetails)
                                         var schedname = 'Anointing of '+ eventinfodetailss.var_lname +', ' + eventinfodetailss.var_fname
                                         var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                         db.query(schedtag, [priestinfo.int_userID,req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                             console.log(err) 
                                     
                                        var notifdesc ='You have been assigned to an event (Anointing of the sick)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)

                                        



                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                        })
                                    })})
                                    })
                                })})
                            })
                            })
                        
                    })
                })
            })
        })
})
    
    //house blessing
    secretariatRouter.get('/transaction-houseblessing', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
       
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        join tbl_houseblessing on tbl_eventinfo.int_eventinfoID = tbl_houseblessing.int_eventinfoID
        join tbl_requirementsinevents on tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        join tbl_requirements on tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        where tbl_services.var_eventname = 'House Blessing' and
        tbl_eventinfo.char_approvalstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Done'
        
        order by tbl_eventinfo.int_eventinfoID DESC`
        
        
       
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var establishments=results; 
                console.log(establishments)
                for(var i = 0; i < establishments.length; i++){
                    establishments[i].date_applied= moment(establishments[i].date_applied).format('MM/DD/YYYY');
                    establishments[i].date_birthday= moment(establishments[i].date_birthday).format('MM/DD/YYYY');
                    establishments[i].date_eventdate= moment(establishments[i].date_eventdate).format('MM/DD/YYYY');
                    establishments[i].time_eventstart= moment(establishments[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                    establishments[i].time_eventend= moment(establishments[i].time_eventend,'HH:mm:ss').format('hh:mm A');
                    
                    }             
                           
            

            return res.render('secretariat/views/transactions/eventapp/establishment',{establishments:establishments});
       
            }); 
    });
    secretariatRouter.post('/transaction-houseblessing/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_houseblessing ON tbl_houseblessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id], (err, results, fields) => {
                if (err) console.log(err);
                res.send(results[0])
                console.log(results[0])
            });
        }

        else{

            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_houseblessing ON tbl_houseblessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id], (err, results, fields) => {
                if (err) console.log(err);
                res.send(results[0])
                console.log(results[0])
            });
        }
    })
    });
    secretariatRouter.post('/transaction-houseblessing/query/updateStatus', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_houseblessing ON tbl_houseblessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var resultss= results[0]
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        console.log('-----------------------')
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }
            })
        });
    });
    secretariatRouter.post('/transaction-houseblessing/updateStatus',(req,res)=>{
        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
        WHERE int_eventinfoID = ?`
            db.query(queryString3,[req.body.eventstatus,req.body.id],(err,results,fields) =>{
                if(err) console.log(err)
                if(req.body.eventstatus == "Approved"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.id],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.id],(err,results,fields)=>{
                                if(results[0].int_userpriestID == null){
                                var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                                , tbl_eventinfo.time_eventstart from tbl_user 
                                JOIN tbl_eventinfo ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID
                                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                                where tbl_services.var_eventname!="Baptism" AND tbl_eventinfo.date_eventdate =?
                                AND tbl_eventinfo.time_eventstart = ?           
                                `
                                db.query(queryString8,[results[0].date_eventdate,results[0].time_eventstart],(err,results1,fields)=>{
                                    
                                    var event = results[0]
                                    var schedules = results1;
                                    console.log("YUNG ICOCOMPARE NA SCHED ")
                                    console.log(event.date_eventdate,event.time_eventstart)
                                    console.log(schedules.length)
                                        var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                        db.query(queryString10,(err,priests,fields)=>{
                                            if(schedules.length == 0){
                                                for(j=0;j<priests.length;j++){
                                                    var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID,var_notifdesc)
                                                        VALUES(${priests[j].int_userID},now(),${event.int_eventinfoID},'You have an invitation for an upcoming event1')`
                                                        db.query(queryString11,(err,results,fields)=>{
                                                            if(err) console.log(err);
                                                        })
                                                    }
                                                    res.send(results)
                                            }
                                            else{
                                                var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                                db.query(queryString10,(err,priests,fields)=>{
                                                    var availablePriests = [];
                                                    var occupiedPriests = [];
                                                for(i=0;i<priests.length;i++){
                                                    availablePriests.push(priests[i].int_userID)
                                                }
                                                for(w=0;w<schedules.length;w++){
                                                    occupiedPriests.push(schedules[w].int_userID)
                                                }
                                                function arr_diff (a1, a2) {

                                                    var a = [], diff = [];
                                                
                                                    for (var i = 0; i < a1.length; i++) {
                                                        a[a1[i]] = true;
                                                    }
                                                
                                                    for (var i = 0; i < a2.length; i++) {
                                                        if (a[a2[i]]) {
                                                            delete a[a2[i]];
                                                        } else {
                                                            a[a2[i]] = true;
                                                        }
                                                    }
                                                
                                                    for (var k in a) {
                                                        diff.push(k);
                                                    }
                                                
                                                    return diff;
                                                }
                                                var priestsNotifs = arr_diff(availablePriests,occupiedPriests)
                                                console.log(priestsNotifs[0])
                                                    for(n=0;n<priestsNotifs.length;n++){
                                                        console.log(priestsNotifs[n])
                                                        var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID)
                                                            VALUES(${priestsNotifs[n]},now(),${event.int_eventinfoID})`
                                                            db.query(queryString11,(err,results,fields)=>{
                                                                if(err) console.log(err);
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) console.log(err);
                                    res.send(results)
                                }
                            })
                            // if(err) console.log(err);
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) console.log(err);
                    res.send(results)
                }
            }) 
    })
    
    secretariatRouter.post('/transaction-houseblessing/updateRequirements',(req,res)=>{
        if(req.body.id==null){
            var datenow= new Date();
            
                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                        db.query(queryString,["Next"],(err,results,fields)=>{
                            if(err) console.log(err)
                            console.log('NEXT PREIST SEQUENCE DETAILS')
                            var priest = results[0];
                            console.log(results[0])
                            console.log('priestID')
                            console.log(priest.int_priestID)
                            var queryString1 =`SELECT * from tbl_user where int_userID=?`
                            db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                                if (err) console.log(err);
                                console.log('NEXT PREIST INFO')
                                var priestinfo =results[0]
                                console.log(priestinfo)
                                
                                var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                                char_requirements ='Complete', char_approvalstatus='Approved'
                                where int_eventinfoID=?`
                            db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                                console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                                if(err) console.log(err);
                                console.log(priestinfo.int_userID,req.body.eventid)
    
                                // na update tas nalagay priest ID
    
                                    console.log(priestinfo)
                                    var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                    //naselect yung priest
                                    console.log(priestname)
                                    var assignname = `UPDATE tbl_houseblessing SET var_priestname = ?
                                    WHERE int_eventinfoID =?`
                                    db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                        if(err) console.log(err)
                                        console.log('results ng pag insert ng name')
                                        console.log(results)
                                        var datenoww= new Date();
                                        var selecteventinfo = `select * from tbl_eventinfo 
                                        join tbl_houseblessing on tbl_eventinfo.int_eventinfoID = tbl_houseblessing.int_eventinfoID
                                        where tbl_eventinfo.int_eventinfoID =?`
                                        db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                        if(err) console.log(err);
                                        var eventinfodetailss = results[0]
                                        var notifdesc ='Your application is approved'
                                        var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                        db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                            if(err) console.log(err)

                                        

                                        //FOR SCHEDULE

                                                
                                            // addschedules(eventinfodetails)
                                            console.log("before pumasok dun sa sched hahah")
                                            var schedname = 'House Blessing of '+ eventinfodetailss.var_owner
                                            var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                            db.query(schedtag, [priestinfo.int_userID,req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                if(err) console.log(err) 
                                                console.log(results)
                                                console.log("bakit di nalalagay sa scheduleeeeeee")
                                        
                                            var notifdesc ='You have been assigned to an event (House Blessing)'
                                            var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                            db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                            if(err) console.log(err)
    
    
    
                                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                    db.query(queryString,["Next"],(err,results,fields)=>{
                                        if(err) console.log(err)
                                        var priest = results[0];
                                            var queryString = `SELECT * FROM tbl_priestsequence`
                                            db.query(queryString,(err,results,fields)=>{
                                                if(err) console.log(err);
                                                if(priest.int_seqnumber < results.length){
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                            if(err) console.log(err)
                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                        })
                                                    })
                                                }
                                                else if(priest.int_seqnumber >= results.length){
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                            if(err) console.log(err)
                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                        })
                                                    })
                                                }
                                            })
                                        })})
                                        })
                                    })})
                                })
                                })
                            
                        })
                    })
                
        }
        else{

            var datenow= new Date();
            var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
            WHERE int_requirementID =? `
            db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
                if(err) console.log(err)
                var queryString = `SELECT * FROM tbl_requirements 
                JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
                JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                WHERE tbl_eventinfo.int_eventinfoID =?`
                db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                    var ctr =0;
    
                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                        db.query(queryString,["Next"],(err,results,fields)=>{
                            if(err) console.log(err)
                            console.log('NEXT PREIST SEQUENCE DETAILS')
                            var priest = results[0];
                            console.log(results[0])
                            console.log('priestID')
                            console.log(priest.int_priestID)
                            var queryString1 =`SELECT * from tbl_user where int_userID=?`
                            db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                                if (err) console.log(err);
                                console.log('NEXT PREIST INFO')
                                var priestinfo =results[0]
                                console.log(priestinfo)
                                
                                var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                                char_requirements ='Complete', char_approvalstatus='Approved'
                                where int_eventinfoID=?`
                            db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                                console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                                if(err) console.log(err);
                                console.log(priestinfo.int_userID,req.body.eventid)
    
                                // na update tas nalagay priest ID
    
                                    console.log(priestinfo)
                                    var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                    //naselect yung priest
                                    console.log(priestname)
                                    var assignname = `UPDATE tbl_houseblessing SET var_priestname = ?
                                    WHERE int_eventinfoID =?`
                                    db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                        if(err) console.log(err)
                                        console.log('results ng pag insert ng name')
                                        console.log(results)
                                        //nalagay na yung name
                                        // INSERT INFO COPY FOR OTHERS~
                                        var datenoww= new Date();
                                        var selecteventinfo = `select * from tbl_eventinfo 
                                        join tbl_houseblessing on tbl_eventinfo.int_eventinfoID = tbl_houseblessing.int_eventinfoID
                                        where tbl_eventinfo.int_eventinfoID =?`
                                        db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                        if(err) console.log(err);
                                        var eventinfodetailss = results[0]
                                        var notifdesc ='Your application is approved'
                                        var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                        db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                            if(err) console.log(err)

                                            console.log("before pumasok dun sa sched hahah")
                                            var schedname = 'House Blessing of '+ eventinfodetailss.var_owner
                                            var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                            db.query(schedtag, [priestinfo.int_userID,req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                if(err) console.log(err) 
                                                console.log(results)
                                                console.log("bakit di nalalagay sa scheduleeeeeee")
                                        
                                            var notifdesc ='You have been assigned to an event (House Blessing)'
                                            var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                            db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                            if(err) console.log(err)
    
    
    
                                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                    db.query(queryString,["Next"],(err,results,fields)=>{
                                        if(err) console.log(err)
                                        var priest = results[0];
                                            var queryString = `SELECT * FROM tbl_priestsequence`
                                            db.query(queryString,(err,results,fields)=>{
                                                if(err) console.log(err);
                                                if(priest.int_seqnumber < results.length){
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                            if(err) console.log(err)
                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                        })
                                                    })
                                                }
                                                else if(priest.int_seqnumber >= results.length){
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                            if(err) console.log(err)
                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                        })
                                                    })
                                                }
                                            })
                                        })})
                                    })})
                                        })
                                })
                                })
                            
                        })
                    })
                })
            })
        }
    })
    //funeral service
    secretariatRouter.get('/transaction-funeralservice', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Funeral Service'
        and tbl_eventinfo.char_approvalstatus<>'Cancelled' 
        and tbl_eventinfo.var_eventstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Done'
        order by tbl_eventinfo.int_eventinfoID DESC
        `
        
        
        
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var funerals=results; 
                for(var i = 0; i < funerals.length; i++){
                  
                    funerals[i].date_applied= moment(funerals[i].date_applied).format('MM/DD/YYYY');
                        funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                        funerals[i].date_eventdate= moment(funerals[i].date_eventdate).format('MM/DD/YYYY');
                        funerals[i].time_eventstart= moment(funerals[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                        funerals[i].time_eventend= moment(funerals[i].time_eventend,'HH:mm:ss').format('hh:mm A'); 
                        
                    }
                           
            

            return res.render('secretariat/views/transactions/eventapp/funeralservice',{funerals:funerals});
       
            }); 
    });
    secretariatRouter.post('/transaction-funeralservice/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
        }
        else{
            
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
        }
    })
    });
    secretariatRouter.post('/transaction-funeralservice/query/updateStatus', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var resultss = results[0]
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        console.log('-----------------------')
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }
            })
        });
    });
    secretariatRouter.post('/transaction-funeralservice/updateStatus',(req,res)=>{
        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
        WHERE int_eventinfoID = ?`
            db.query(queryString3,[req.body.eventstatus,req.body.id],(err,results,fields) =>{
                if(err) console.log(err)
                if(req.body.eventstatus == "Approved"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.id],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.id],(err,results,fields)=>{
                                if(results[0].int_userpriestID == null){
                                var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                                , tbl_eventinfo.time_eventstart from tbl_user 
                                JOIN tbl_eventinfo ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID
                                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                                where tbl_services.var_eventname!="Baptism" AND tbl_eventinfo.date_eventdate =?
                                AND tbl_eventinfo.time_eventstart = ?           
                                `
                                db.query(queryString8,[results[0].date_eventdate,results[0].time_eventstart],(err,results1,fields)=>{
                                    
                                    var event = results[0]
                                    var schedules = results1;
                                    console.log("YUNG ICOCOMPARE NA SCHED ")
                                    console.log(event.date_eventdate,event.time_eventstart)
                                    console.log(schedules.length)
                                        var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                        db.query(queryString10,(err,priests,fields)=>{
                                            if(schedules.length == 0){
                                                for(j=0;j<priests.length;j++){
                                                    var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID,var_notifdesc)
                                                        VALUES(${priests[j].int_userID},now(),${event.int_eventinfoID},'You have an invitation for an upcoming event1')`
                                                        db.query(queryString11,(err,results,fields)=>{
                                                            if(err) console.log(err);
                                                        })
                                                    }
                                                    res.send(results)
                                            }
                                            else{
                                                var queryString10 =`SELECT int_userID FROM tbl_user where char_usertype = "Priest"` 
                                                db.query(queryString10,(err,priests,fields)=>{
                                                    var availablePriests = [];
                                                    var occupiedPriests = [];
                                                for(i=0;i<priests.length;i++){
                                                    availablePriests.push(priests[i].int_userID)
                                                }
                                                for(w=0;w<schedules.length;w++){
                                                    occupiedPriests.push(schedules[w].int_userID)
                                                }
                                                function arr_diff (a1, a2) {

                                                    var a = [], diff = [];
                                                
                                                    for (var i = 0; i < a1.length; i++) {
                                                        a[a1[i]] = true;
                                                    }
                                                
                                                    for (var i = 0; i < a2.length; i++) {
                                                        if (a[a2[i]]) {
                                                            delete a[a2[i]];
                                                        } else {
                                                            a[a2[i]] = true;
                                                        }
                                                    }
                                                
                                                    for (var k in a) {
                                                        diff.push(k);
                                                    }
                                                
                                                    return diff;
                                                }
                                                var priestsNotifs = arr_diff(availablePriests,occupiedPriests)
                                                console.log(priestsNotifs[0])
                                                    for(n=0;n<priestsNotifs.length;n++){
                                                        console.log(priestsNotifs[n])
                                                        var queryString11 = `INSERT INTO tbl_notification(int_userID,datetime_received,int_eventinfoID)
                                                            VALUES(${priestsNotifs[n]},now(),${event.int_eventinfoID})`
                                                            db.query(queryString11,(err,results,fields)=>{
                                                                if(err) console.log(err);
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) console.log(err);
                                    res.send(results)
                                }
                            })
                            // if(err) console.log(err);
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) console.log(err);
                    res.send(results)
                }
            }) 
    })
    
    secretariatRouter.post('/transaction-funeralservice/updateRequirements',(req,res)=>{
        console.log(req.body)
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;

                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                            char_requirements ='Complete', char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,req.body.eventid)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_blessing SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    //nalagay na yung name
                                    // INSERT INFO COPY FOR OTHERS~
                                    var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    var notifdesc ='Your application is approved'
                                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                    db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                        if(err) console.log(err)

                                    

                                     //FOR SCHEDULE

                                             
                                         // addschedules(eventinfodetails)
                                         var schedname = 'Funeral of '+ eventinfodetailss.var_lname +', ' + eventinfodetailss.var_fname
                                         var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                         db.query(schedtag, [priestinfo.int_userID, req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                             console.log(err) 
                                     
                                        var notifdesc ='You have been assigned to an event (Anointing of the sick)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc, req.body.eventid, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)




                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                        })
                                    })})})})
                                    })
                            })
                            })
                        
                    })
                })
            })
        })
    })
    
    //funeral mass
    secretariatRouter.get('/transaction-funeralmass', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_services.var_eventname = 'Funeral Mass'
        and tbl_eventinfo.char_approvalstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Done'
        order by tbl_eventinfo.int_eventinfoID DESC`
       
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var funerals=results; 
                for(var i = 0; i < funerals.length; i++){
                    funerals[i].date_applied= moment(funerals[i].date_applied).format('MM/DD/YYYY');
                        funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                        funerals[i].date_eventdate= moment(funerals[i].date_eventdate).format('MM/DD/YYYY');
                        funerals[i].time_eventstart= moment(funerals[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                        funerals[i].time_eventend= moment(funerals[i].time_eventend,'HH:mm:ss').format('hh:mm A'); 
                    }           
            

            return res.render('secretariat/views/transactions/eventapp/funeralmass',{funerals:funerals});
       
            }); 
    });
    secretariatRouter.post('/transaction-funeralmass/query', (req, res)=>{
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
        
        }
        else{

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
        }
    })
    });
    secretariatRouter.post('/transaction-funeralmass/query/updateStatus', (req, res)=>{
        console.log(req.body)
        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirementtype ON tbl_requirementtype.int_eventID = tbl_services.int_eventID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
        WHERE tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var resultss=results[0]
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                if(resultss.var_applicationtype=='Walk-in' || resultss.var_applicationtype=='No account'){
                    console.log('====yes=====')
                    console.log(resultss.int_tempuserID)
                    var tempuserdetails= `select * from tbl_tempuser where int_tempuserID =?`
                    db.query(tempuserdetails,[resultss.int_tempuserID], (err, results2, fields) => {
                        var tempuser= results2[0]

                        
                        console.log('-----------------------')
                        console.log(tempuser)
                        console.log('-----------------------')
                        
                        res.send({results:resultss,requirements:results1, tempuser:tempuser})
                        console.log(results1)
                    })
                }
                else{
                    res.send({results:resultss,requirements:results1, tempuser:null})
                        console.log(results1)
                }
            })
        });
    });
    secretariatRouter.post( '/transaction-funeralmass/updateStatus',(req,res)=>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
        db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
            var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
            WHERE int_eventinfoID = ?`
            console.log(req.body)
            var eventstatus="";
            if(req.body.paystatus=="Paid" && req.body.reqstatus == "Approved"){
                eventstatus = "Approved"
            }
            else{
                eventstatus = req.body.eventstatus
            }
            console.log(eventstatus)
            db.query(queryString3,[eventstatus,req.body.id],(err,results,fields) =>{
                if(err) console.log(err)
                if(eventstatus == "Approved"){
                    var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.id],(err,results,fields)=>{ 
                        })}
                else{
                    if(err) console.log(err);
                    res.send(results)
                }
            }) 
        })
    })
    
    secretariatRouter.post('/transaction-funeralmass/updateRequirements',(req,res)=>{
        console.log(req.body)
        var datenow= new Date();
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_requirementapproval=?
        WHERE int_requirementID =? `
        db.query(queryString2,[datenow,req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;

                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                            char_requirements ='Complete', char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,req.body.eventid],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,req.body.eventid)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_blessing SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, req.body.eventid], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    //nalagay na yung name
                                    // INSERT INFO COPY FOR OTHERS~
                                    var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.eventid],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    var notifdesc ='Your application is approved'
                                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                    db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                        if(err) console.log(err)

                                    

                                     //FOR SCHEDULE

                                             
                                         // addschedules(eventinfodetails)
                                         var schedname = 'Funeral of '+ eventinfodetailss.var_lname +', ' + eventinfodetailss.var_fname
                                         var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                         db.query(schedtag, [priestinfo.int_userID,req.body.eventid, schedname,eventinfodetailss.date_eventdate,  eventinfodetailss.time_eventstart, 'INLPP'], (err, results, fields) => {
                                             console.log(err) 
                                     
                                        var notifdesc ='You have been assigned to an event (Anointing of the sick)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.eventid, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)



                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                        })
                                    })})
                                    })
                            })})})
                            })
                        
                    })
                })
            })
        
    })
    })

    secretariatRouter.post('/transaction-funeralmass/paymentquery', (req, res)=>{
        console.log(req.body.id1)


        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
            JOIN tbl_blessing on tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id1], (err, results, fields) => {
                if (err) console.log(err);
                var queryString2 =`SELECT * from tbl_eventinfo 
                
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
                where tbl_eventinfo.int_eventinfoID = ?`
                db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                    if (err) console.log(err);
                    if(results1.length==0){
                        var paymenthistory = null
                    }
                    else{
                        var paymenthistory = results1
                    }
                res.send({results:results[0], paymenthistory:paymenthistory})
                // console.log(results[0])
            }); });
        }
        else{
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
            join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
            JOIN tbl_blessing on tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id1], (err, results, fields) => {
                if (err) console.log(err);
                var queryString2 =`SELECT * from tbl_eventinfo 
                
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
                where tbl_eventinfo.int_eventinfoID = ?`
                db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                    if (err) console.log(err);
                    if(results1.length==0){
                        var paymenthistory = null
                    }
                    else{
                        var paymenthistory = results1
                    }
                res.send({results:results[0], paymenthistory:paymenthistory})
                // console.log(results[0])
            }); });
        }
    });})
    secretariatRouter.post('/transaction-funeralmass/updatepaymentquery', (req, res)=>{
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_blessing on tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)




            res.send({results:results[0], ornumber:results1[0]})
            // console.log(results[0])
        });
    });
    }
    else{
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_blessing on tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)




            res.send({results:results[0], ornumber:results1[0]})
            // console.log(results[0])
        });
    });
    }
    })
    });

    secretariatRouter.post('/transaction-funeralmass/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log(req.body)
        // var value = req.body.id1.split(',');
        // console.log(value);
        // for(var i=0; i>value.length; i++){
            // if(value[1]=='1'){var status= 'Paid'}
            // if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ req.body.status)
        var queryString= `select * from tbl_eventinfo join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_eventinfo.int_eventinfoID =?`

        var queryString1 = `UPDATE tbl_payment SET char_paymentstatus = ?, datetime_paymentreceived = ?, dbl_balance=?
                where int_paymentID =  ?;`;
        
        var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            eventinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =eventinfo.dbl_balance-req.body.payment
            db.query(updateHistory,[eventinfo.int_paymentID, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                history=results[0];

            
            if(balance == 0){
                 var status = 'Paid'
                 
                    if (err) console.log(err); 
                
            }
            else if (balance !=0)var status = 'Incomplete'
            db.query(queryString1,[status, date, balance, eventinfo.int_paymentID], (err, results, fields) => {
                if (err) console.log(err); 
                var selectstatus =`SELECT * from tbl_eventinfo 
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                    JOIN tbl_blessing ON tbl_blessing.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    WHERE tbl_eventinfo.int_eventinfoID = ?`
                
                    var approvalUpdate = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved", date_approval=?
                    WHERE int_eventinfoID =?`


                    db.query(selectstatus,[req.body.id1], (err, results, fields) => {
                        if (err) console.log(err);
                        if(results[0].char_requirements=='Complete' && results[0].char_paymentstatus=='Paid'){
                            db.query(approvalUpdate,[nowDate, req.body.id1], (err, results, fields) => {
                                if (err) console.log(err);
                                if (err){
                                    console.log(err)
                                    res.send({alertDesc:notsuccess})
                                }
                                else{
                                    res.send({alertDesc:success, balance:balance})
                                }        
                            })
                        }
                        else{
                            if (err){
                                console.log(err)
                                res.send({alertDesc:notsuccess})
                            }
                            else{
                                res.send({alertDesc:success,balance:balance})
                            }       
                        }
                    })
        }); }); }); 
        
    });



    //confirmation huwaaaat
    secretariatRouter.get('/transaction-confirmation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        JOIN tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        
        where tbl_services.var_eventname ='Confirmation'
        order by tbl_eventinfo.int_eventinfoID DESC`
        
        
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
                        })
                            
            
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
                            if(err) console.log(err)
                            return res.redirect('/secretariat/transaction-confirmation')
                        })
                    }) 
                }
                else{
                    if(err) console.log(err)
                    return res.redirect('/secretariat/transaction-confirmation')
                }
            })
    })
    secretariatRouter.post('/transaction-confirmation/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            res.send(results[0])
        })
    })
    secretariatRouter.post('/transaction-confirmation/updateRequirementStatus',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Complete" 
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            res.send(results[0])
        })
    })
//==============================================================================================

    secretariatRouter.get('/transaction-marriage', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_eventinfo 
           
            JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
            JOIN tbl_wedbride on tbl_eventinfo.int_eventinfoID = tbl_wedbride.int_eventinfoID
            JOIN tbl_wedcouple on tbl_eventinfo.int_eventinfoID = tbl_wedcouple.int_eventinfoID
            JOIN tbl_wedgroom on tbl_eventinfo.int_eventinfoID = tbl_wedgroom.int_eventinfoID
            where tbl_services.var_eventname ='Marriage' 
            and tbl_eventinfo.char_approvalstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Cancelled' and tbl_eventinfo.var_eventstatus<>'Done'
            order by tbl_eventinfo.int_eventinfoID DESC`
            
             
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var marriages=results;
                // console.log(marriages)
                

                for(var i = 0; i < marriages.length; i++){
                    console.log(marriages[i].var_priestname)
                    marriages[i].date_applied= moment(marriages[i].date_applied).format('MM/DD/YYYY');
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
    secretariatRouter.get('/walkin-marriage/utilities/query', (req, res)=>{
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
    secretariatRouter.post('/transaction-marriage/query', (req, res)=>{
        //marker 2
        console.log(req.body)
        var initial =`SELECT * from tbl_eventinfo where tbl_eventinfo.int_eventinfoID = ?`
        db.query(initial,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            console.log('---------------------')
            console.log(results)
        if(results[0].var_applicationtype=='Walk-in' || results[0].var_applicationtype=='No account'){
            var queryString1 =`SELECT * from tbl_eventinfo 
        
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
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
                AND tbl_requirements.var_reqpath is not NULL`
                db.query(queryString2,[req.body.id],(err,results1,fields) => {
                if (err) console.log(err);
                res.send({results:results[0],requirements:results1})
                console.log(results[0])
                })
            });
        }
        else{

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
                AND tbl_requirements.var_reqpath is not NULL`
                db.query(queryString2,[req.body.id],(err,results1,fields) => {
                if (err) console.log(err);
                res.send({results:results[0],requirements:results1})
                console.log(results[0])
                })
            });
        }})
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
        //default
        var queryString2 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_requirements.var_reqstatus <> ?  and tbl_requirementtype.char_reqtype ='Default'`
        //additional
        var additional = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_requirements.var_reqstatus <> ?  and tbl_requirementtype.char_reqtype ='Additional'`
        //initial 
        var queryString3 = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ? and tbl_requirements.var_reqstatus = ?`



        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var casestext=[]
            if(results[0].var_wedcase!= ''){
                var cases = results[0].var_wedcase.split(',');

                for(i=0; i<cases.length; i++){
                    var caseQuery = `SELECT var_casedesc FROM tbl_wedcases where int_wedcaseID =?`
                    db.query(caseQuery,cases[i], (err, caseresult, fields) => {
                        if (err) console.log(err);
                        
                        casestext.push(caseresult[0].var_casedesc)
                        console.log(casestext)
                    })
                    // if(i=1){
                    //     cases.push('Re')

                    // }
                }
            }
            db.query(queryString2,[req.body.id, 'Submitted'],(err,def,fields) => {
                if (err) console.log(err);
                db.query(additional,[req.body.id, 'Submitted'],(err,add,fields) => {
                    if (err) console.log(err);
                    db.query(queryString3,[req.body.id, 'Submitted'],(err,results2,fields) => {
                    if (err) console.log(err);
                   

                    res.send({results:results[0],defrequirements:def,addrequirements:add, submitted:results2,casestext:casestext })
                    // console.log({requirements:results1})
                    });
                });
            });
        });
    });
    secretariatRouter.post('/transaction-marriage/update',(req,res)=>{
        var success =0
        var notsuccess =1

        var queryString1 =`SELECT * from tbl_eventinfo 
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        WHERE tbl_eventinfo.int_eventinfoID = ?`

        var queryString2 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved", date_approval =?
        WHERE int_eventinfoID =?`
        var datenow = new Date();
        console.log(req.body)
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            if(results[0].char_requirements=='Complete' && results[0].char_paymentstatus=='Paid'){
                db.query(queryString2,[datenow, req.body.id], (err, results, fields) => {
                    if (err) console.log(err);
                    if (err){
                        console.log(err)
                        res.send({alertDesc:notsuccess})
                    }
                    else{
                        res.send({alertDesc:success})
                    }        
                })
            }
            else{
                if (err){
                    console.log(err)
                    res.send({alertDesc:notsuccess})
                }
                else{
                    res.send({alertDesc:success})
                }       
            }
        })
        

    })
    secretariatRouter.post('/transaction-marriage/updateRequirements',(req,res)=>{
        var datenow = new Date();
        console.log(req.body)
        
        var value = req.body.id.split(',');
       
            if(value[1]==0){
            var queryString3 = `select var_folderloc from tbl_wedcouple where int_eventinfoID= ?`
            db.query(queryString3,[req.body.eventinfoID],(err,resulta,fields) =>{
                if(err) console.log(err)
                console.log(resulta)
                var folderloc = resulta[0].var_folderloc
                
                var value2 = resulta[0].var_folderloc.split('-');
                var selectcabinetid= `select int_cabinetID from tbl_filecabinets where var_cabinetname =?`
                db.query(selectcabinetid,[value2[0]],(err,cabinetid,fields) =>{
                    console.log(cabinetid)
                    var selectcabinetid= `select * from tbl_filedivisions where var_divisionname =? and int_cabinetID =?`
                    db.query(selectcabinetid,[value2[1],  cabinetid[0].int_cabinetID],(err,divisionid,fields) =>{
                        
                        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", 
                        datetime_reqreceived = ?, var_reqpath=?
                        WHERE int_requirementID =?`
                        db.query(queryString2,[datenow, folderloc, value[0]],(err,resultss,fields) =>{
                            if(err) console.log(err)
                            console.log(cabinetid[0].int_cabinetID)
                            console.log(divisionid[0].int_divisionID)
                        var queryString3 = `insert into tbl_files(var_fileloc, int_requirementID,int_cabinetID, int_divisionID, int_folderID) values(?,?,?,?,?) `
                        db.query(queryString3,[folderloc,value[0], cabinetid[0].int_cabinetID,divisionid[0].int_divisionID, value2[2]],(err,results,fields) =>{
                            if(err) console.log(err)
                            console.log(results)
                            res.send(results[0])
                         })  
                    })
                })

                //marker
                })
                })
                }
                else{
                    res.send({results:0})
                }
   
    })
    secretariatRouter.post('/transaction-marriage/updateRequirementStatus',(req,res)=>{
        var queryString2 = `UPDATE tbl_eventinfo SET char_requirements = "Complete" 
        WHERE int_eventinfoID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            
        })
    })
    secretariatRouter.post('/transaction-marriage/paymentquery', (req, res)=>{
        console.log(req.body.id1)

        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
       
        
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });
    }
    else{
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
       
        
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_paymenthistory ON tbl_paymenthistory.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id1], (err, results1, fields) => {
                if (err) console.log(err);
                if(results1.length==0){
                    var paymenthistory = null
                }
                else{
                    var paymenthistory = results1
                }
            res.send({results:results[0], paymenthistory:paymenthistory})
            // console.log(results[0])
        }); });
    }
})
    });

    secretariatRouter.post('/transaction-marriage/updatepaymentquery', (req, res)=>{
        console.log(req.body.id1)
        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
        JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`

            db.query(queryString2,(err,results1,fields) =>{
                if(err) console.log(err)
                console.log(results1)




            res.send({results:results[0], ornumber:results1[0]})
            // console.log(results[0])
            });
            });
        }
        else{
            var queryString1 =`SELECT * from tbl_eventinfo 
       
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
            join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
            JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id1], (err, results, fields) => {
                if (err) console.log(err);
                var queryString2 =`select MAX(int_ORnumber) as max from tbl_paymenthistory`
    
                db.query(queryString2,(err,results1,fields) =>{
                    if(err) console.log(err)
                    console.log(results1)
    
    
    
    
                res.send({results:results[0], ornumber:results1[0]})
                // console.log(results[0])
            });
        });
        }
    })
    });

    //initial getting ng sched ni priest
    secretariatRouter.post('/transaction-marriage/availablepriests', (req, res)=>{
        //auto assign, available, not available. 
        console.log(req.body)
        var getEventInfo = `SELECT * from tbl_eventinfo where int_eventinfoID = ?`
        db.query(getEventInfo, [req.body.id],(err, results, fields) => {
            if (err) console.log(err);
            var eventInfo = results[0]
            console.log(eventInfo)

        var getNext =`SELECT * from tbl_priestsequence
        join tbl_user on tbl_priestsequence.int_priestID = tbl_user.int_userID
        where tbl_priestsequence.int_eventID = 5 and tbl_priestsequence.char_seqstatus = 'Next'`
        db.query(getNext, (err, results, fields) => {
            if (err) console.log(err);
            var nextPriest = results[0]
            console.log('Next Priest')
            console.log(nextPriest)

        //check if available si next priest
        var getNextSchedule =`SELECT * from tbl_schedule where int_userID = ? and date_sched=? and time_schedstart = ?`
        db.query(getNextSchedule, [nextPriest.int_userID, eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results1, fields) => {
            if (err) console.log(err);
            var nextPriestSchedule = results1;
            console.log('----------------------------------------------------')
            console.log('Next priest schedule, kung meron')
            console.log(nextPriestSchedule)
            console.log('----------------------------------------------------')
            var allpriests =`select * from tbl_user 
            join tbl_priestsequence on tbl_user.int_userID = tbl_priestsequence.int_priestID 
            where tbl_priestsequence.int_eventid = 5`
            db.query(allpriests, [eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results1, fields) => {
                if (err) console.log(err);
                var allpriests = results1;
            
            if(nextPriestSchedule.length ==0){
                console.log('----------------------------------------------------')
                console.log('NEXT PRIEST IS AVAILABLE')
                console.log('----------------------------------------------------')
                
                res.send({availablepriests:allpriests, nextpriest: nextPriest})
            }

            if(nextPriestSchedule.length !=0){
                console.log('----------------------------------------------------')
                console.log('NEXT PRIEST IS NOT AVAILABLE, take over next sa sequence')
                console.log('----------------------------------------------------')
                //we got to do something about 'what if, di rin available si next sa next, and what if walang available 
                //so much to work on grrrr 

                var nexttonext =  `select * from tbl_user join tbl_priestsequence 
                on tbl_user.int_userID = tbl_priestsequence.int_priestID
                where tbl_priestsequence.int_seqnumber = ?`

                db.query(nexttonext, [nextPriest.int_seqnumber+1],(err, results, fields) => {
                    if (err) console.log(err);
                    var nexttonextpriest = results[0]

                    res.send({availablepriests:allpriests, nextpriest: nexttonextpriest})


                })

            }


           
        })//available, not available
            // console.log(results[0])
        });//getNextSchedule
    });//getnext
    
    });//geteventinfo

    


    });//post

    secretariatRouter.post('/transaction-marriage/checkifpriestavailable',(req,res)=>{
        console.log(req.body)
        var value = req.body.priestID.split(',');
        var getEventDetails = `select * from tbl_eventinfo where int_eventinfoID = ?`
        db.query(getEventDetails,[value[1]],(err,results,fields) =>{
            if(err) console.log(err)
            var eventdetails = results[0]
            console.log('----------------------------------------------------')
            console.log('Event Details')
            console.log(eventdetails)
            console.log('----------------------------------------------------')


            var check =`select * from tbl_user 
            join tbl_priestsequence on tbl_user.int_userID = tbl_priestsequence.int_priestID 
            join tbl_schedule on tbl_user.int_userID = tbl_schedule.int_userID 
            where tbl_user.int_userID =? and tbl_schedule.date_sched = ? and tbl_schedule.time_schedstart = ?`
            db.query(check,[value[0],eventdetails.date_eventdate, eventdetails.time_eventstart ],(err,results,fields) =>{
                if(err) console.log(err)
                var checkresults =  results
                if(checkresults.length==0){
                    console.log('chosen priest is available')
                    var result = 0
                    res.send({result:result})
                }
                if(checkresults.length!=0){
                    console.log('chosen priest is not available')
                    var result = 1
                    res.send({result:result})
                }

            
        })})
    })

    secretariatRouter.post('/transaction-marriage/assignpriest', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var queryString1 =`SELECT * from tbl_user where int_userID=?`
        db.query(queryString1, [req.body.priestid], (err, results, fields) => {
            if (err) console.log(err);
            var priestinfo =results[0]
            console.log(priestinfo)
            var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
            var assign = `UPDATE tbl_eventinfo SET int_userpriestID = ?, char_approvalstatus = ?
                WHERE int_eventinfoID =?`
                db.query(assign, [req.body.priestid, "Approved",req.body.id], (err, results, fields) => {
                    
                    var assignname = `UPDATE tbl_wedcouple SET var_priestname = ?
                        WHERE int_eventinfoID =?`
                        db.query(assignname, [priestname, req.body.id], (err, results, fields) => {

                            var datenoww= new Date();
                                    var selecteventinfo = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                     where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                                    if(err) console.log(err);
                                    var eventinfodetailss = results[0]
                                    
                                     
                                        var notifdesc ='You have been assigned to an event (Marriage)'
                                         var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                         db.query(insertnotif,[priestinfo.int_userID, notifdesc,req.body.id, datenoww], (err, results4, fields) => {
                                         if(err) console.log(err)



                            var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                            db.query(queryString,["Next"],(err,results,fields)=>{
                                if(err) console.log(err)
                                var priest = results[0];
                            var queryString = `SELECT * FROM tbl_priestsequence`
                            db.query(queryString,(err,results,fields)=>{
                                if(err) console.log(err);
                                if(priest.int_seqnumber < results.length){
                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                    db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                        })
                                    })
                                }
                                else if(priest.int_seqnumber >= results.length){
                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                    db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                        })
                                    })
                                }
                            })
                            if(req.body.requested==1){
                                var priestrequested = `UPDATE tbl_eventinfo SET bool_priestrequested = ?
                                WHERE int_eventinfoID =?`
                                db.query(priestrequested, [req.body.requested, req.body.id], (err, results, fields) => {
                                    
                                    var priestaddrate = `select * from tbl_utilities 
                                    join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                    where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        if (err) console.log(err)
                                        var priestutilities = results[0]
                                        var paymentevent =`select * from tbl_payment 
                                        join tbl_eventinfo on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                                        where tbl_eventinfo.int_eventinfoID =?`
                                        db.query(paymentevent, [req.body.id],(err, results, fields) => {
                                            if (err) console.log(err)
                                            var paymentdetails = results[0]
                                        console.log('=================================================')
                                        console.log('UTILITIES')
                                        console.log(priestutilities)
                                        console.log('=================================================')
                                        var deadline = moment(paymentdetails.fullpaymentdeadline,'YYYY-MM-DD HH:mm:ss').format('MMMM DD, YYYY')
                                        var newamount = paymentdetails.dbl_amount + priestutilities.double_priestaddrate;
                                        
                                        if(req.body.requestpaid ==0){
                                            var newbalance = paymentdetails.dbl_balance + priestutilities.double_priestaddrate;
                                            var newstatus = 'Unpaid'
                                             // INSERT INFO COPY FOR OTHERS~
                                            var datenoww= new Date();
                                            var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                                            db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                                            if(err) console.log(err);

                                            var eventinfodetailss = results[0]
                                            console.log('=================================================')
                                            console.log('EVENT INFO DETAILS')
                                            console.log(eventinfodetailss)
                                            console.log('=================================================')
                                            if(eventinfodetailss.var_applicationtype!='Walk-in'){

                                                var notifdesc =`You have requested for a specific priest. You have to pay additional ${priestutilities.double_priestaddrate} before the deadline: ${deadline}. Thank you.`
                                                var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                                db.query(insertnotif,[eventinfodetailss.int_userID, notifdesc,req.body.id, datenoww], (err, results4, fields) => {
                                                    if(err) console.log(err)
                                                    payment(newamount, newbalance, newstatus)
                                                })
                                            }
                                            else{
                                                payment(newamount, newbalance, newstatus)
                                            }
                                        })
                                            
                                        }
                                        else{
                                            var newbalance = paymentdetails.dbl_balance
                                            var newstatus = 'Paid'
                                            payment(newamount, newbalance, newstatus)
                                                    
                                        }
                                })})})
                            }
                            else{
                                var priestaddrate = `select * from tbl_utilities 
                                join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                join tbl_wedbride on tbl_eventinfo.int_eventinfoID = tbl_wedbride.int_eventinfoID
                                join tbl_payment on tbl_eventinfo.int_paymentID = tbl_eventinfo.int_paymentID
                                where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        var priestutilities = results[0]
                                        console.log(priestutilities)
                                        
                                       addschedules(priestutilities)
                                       //
 
                                           if (err){
                                               console.log(err)
                                               res.send({alertDesc:notsuccess})
                                           }
                                           else{
                                               res.send({alertDesc:success})
                                           }   
                                       })
                                    
                            }
                })})})
            })})


            // console.log(results[0])
        });

        function payment (newamount, newbalance, newstatus){
            var priestaddrate = `select * from tbl_utilities 
            join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
            where tbl_eventinfo.int_eventinfoID =?`
            db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                if (err) console.log(err)
                var priestutilities = results[0]
                
                    
                    var selecteventinfo = `select * from tbl_eventinfo where int_eventinfoID =? `
                    console.log(req.body.id)
                    db.query(selecteventinfo,[req.body.id],(err,results,fields)=>{
                    if(err) console.log(err);
                    var eventinfodetailss = results[0]
                    console.log('=================================================')
                    console.log('EVENT INFO DETAILS')
                    console.log(eventinfodetailss)
                    console.log('----------')
                    console.log(eventinfodetailss.int_paymentID)
                    console.log('=================================================')
                    var priestrequested = `UPDATE tbl_payment SET dbl_amount = ?, dbl_balance =?, 
                        char_paymentstatus=? WHERE int_paymentID =?`
                            db.query(priestrequested, [newamount, newbalance, newstatus,  eventinfodetailss.int_paymentID], (err, results, fields) => {
                                if (err) console.log(err);
                                addschedules(priestutilities)

                                    if (err){
                                        console.log(err)
                                        res.send({alertDesc:notsuccess})
                                    }
                                    else{
                                        res.send({alertDesc:success})
                                    }  
                                })
        })
    })
        }
        function addschedules(priestutilities){

            //if confirmed and if baptised

            var schedname = 'Marriage of Mr. '+ priestutilities.var_lname +' and Ms. ' + priestutilities.var_blname
            var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
            db.query(schedtag, [req.body.priestid, req.body.id, schedname,priestutilities.date_eventdate,  priestutilities.time_eventstart, 'INLPP'], (err, results, fields) => {
                console.log(err) 
                var canonicalid = results; 
                var canonicalwedsched = `insert into tbl_wedschedule(int_scheduleID, int_weddingsteps, bool_conpriest, bool_conguest) values(?,?,?,?)`
                    db.query(canonicalwedsched, [canonicalid.insertId, 8, 0,1], (err, results, fields) => {
                    
                var schedname = 'Canonical Interview of Mr. '+ priestutilities.var_lname +' and Ms. ' + priestutilities.var_blname
                var canonicalsched = `insert into tbl_schedule(int_userID,int_eventinfoID, var_schedulename,  var_venue, date_sched, time_schedstart) values(?,?,?,?,?,?)`
                db.query(canonicalsched, [req.body.priestid,req.body.id,schedname, 'INLPP','0000-00-00', '00:00:00'], (err, results, fields) => {
                    console.log(err)   
                    var canonicalid = results;    
                    var canonicalwedsched = `insert into tbl_wedschedule(int_scheduleID, int_weddingsteps, bool_conpriest, bool_conguest) values(?,?,?,?)`
                    db.query(canonicalwedsched, [canonicalid.insertId, 4, 0,0], (err, results, fields) => {
                    

                        var schedname = 'Dry-run for the marriage of Mr. '+ priestutilities.var_lname +' and Ms. ' + priestutilities.var_blname
                        var dryrunsched = `insert into tbl_schedule(int_userID,int_eventinfoID, var_schedulename,  var_venue, date_sched, time_schedstart) values(?,?,?,?,?,?)`
                        db.query(dryrunsched, [req.body.priestid,req.body.id,schedname, 'INLPP','0000-00-00', '00:00:00'], (err, results, fields) => {
                            console.log(err)   
                            var dryrunid = results;    
                            var dryrunwedsched = `insert into tbl_wedschedule(int_scheduleID, int_weddingsteps, bool_conpriest, bool_conguest) values(?,?,?,?)`
                            db.query(dryrunwedsched, [dryrunid.insertId, 7, 0,0], (err, results, fields) => {
                            
                        if(priestutilities.bool_gbaptized==0 ||priestutilities.bool_gconfirmed==0 ||priestutilities.bool_bbaptized==0 ||priestutilities.bool_bconfirmed==0 ){
                            
                            var schedname = 'Confirmation/RCIA for the marriage of Mr. '+ priestutilities.var_lname +' and Ms. ' + priestutilities.var_blname
                            var confirmrciasched = `insert into tbl_schedule(int_userID,int_eventinfoID, var_schedulename,  var_venue, date_sched, time_schedstart) values(?,?,?,?,?,?)`
                            db.query(confirmrciasched, [req.body.priestid,req.body.id,schedname, 'INLPP','0000-00-00', '00:00:00'], (err, results, fields) => {
                                console.log(err)   
                                var confirmrciaid = results;    
                                var confirmrciawedsched = `insert into tbl_wedschedule(int_scheduleID, int_weddingsteps, bool_conpriest, bool_conguest) values(?,?,?,?)`
                                db.query(confirmrciawedsched, [confirmrciaid.insertId, 6, 0,0], (err, results, fields) => {
                                })})
                        }
                })})})})})})
        }
    });

    secretariatRouter.post('/transaction-marriage/getcabinets',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)
            var queryString3 = `select * from tbl_eventinfo
            join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString3,[req.body.id],(err,resultsd,fields) =>{
            res.send({cabinets:results, name:resultsd})
            })
        })
    })

    secretariatRouter.post('/transaction-marriage/getdivisions',(req,res)=>{
        console.log(req.body)
        var queryString2 = `select * from tbl_filedivisions where int_cabinetID =?`
        db.query(queryString2,[req.body.cabinetID],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({divisions:results})
        })
    })

    secretariatRouter.post('/transaction-marriage/getfolders',(req,res)=>{
        console.log(req.body)
        var value = req.body.location.split('-');
        var queryString2 = `select MAX(int_foldernumber) as max from tbl_filefolders where int_divisionID =? and int_cabinetID = ?`
        db.query(queryString2,[value[1],value[0]],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({folders:results[0]})
        })
    })

    secretariatRouter.post('/transaction-marriage/comparefolderloc',(req,res)=>{
        var queryString4 = `select * from tbl_filecabinets 
        join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
        where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
        db.query(queryString4,[value[1], req.body.cabinet],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            var cabdivname = results[0]
            var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname+'-'+req.body.foldernumber
            var compareresult
            if(folderloc== req.body.prevfolderloc){
                compareresult=1
            }
            else{
                compareresult=0
            }
            if(err) console.log(err)
            res.send({compareresult:compareresult})
        })
    })

    secretariatRouter.post('/transaction-marriage/changeloc',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results1,fields) =>{
            var queryString3 = `select * from tbl_wedcouple where int_eventinfoID =?`
            db.query(queryString3,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            res.send({cabinets:results1, folderloc:results[0]})
        })
    })
    })

    secretariatRouter.post('/transaction-marriage/setfolderloc',(req,res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var value = req.body.division.split('-');
        var queryString2 = `INSERT INTO tbl_filefolders(int_eventinfoID, int_cabinetID, int_divisionID,  int_foldernumber, var_foldername) VALUES(?,?,?,?,?)`
        db.query(queryString2,[req.body.eventinfoID, req.body.cabinet, value[1], req.body.foldernumber, req.body.foldername],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)

            var queryString4 = `select * from tbl_filecabinets 
            join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
            where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
            db.query(queryString4,[value[1], req.body.cabinet],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)
                var cabdivname = results[0]

            var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname+'-'+req.body.foldernumber
            var queryString3 = `UPDATE tbl_wedcouple SET var_folderloc = ?
            where int_eventinfoID =  ?;`
            db.query(queryString3,[folderloc, req.body.eventinfoID],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)

                
                        
                        if (err){
                            console.log(err)
                            res.send({alertDesc:notsuccess})
                        }
                        else{
                            res.send({alertDesc:success})
                        }        
                    
        })})})
    });

    secretariatRouter.post('/transaction-marriage/getcabinets',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)
            res.send({cabinets:results})
        })
    })

    secretariatRouter.post('/transaction-marriage/getdivisions',(req,res)=>{
        console.log(req.body)
        var queryString2 = `select * from tbl_filedivisions where int_cabinetID =?`
        db.query(queryString2,[req.body.cabinetID],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({divisions:results})
        })
    })

    secretariatRouter.post('/transaction-marriage/getfolders',(req,res)=>{
        console.log(req.body)
        var value = req.body.location.split('-');
        var queryString2 = `select MAX(int_foldernumber) as max from tbl_filefolders where int_divisionID =? and int_cabinetID = ?`
        db.query(queryString2,[value[1],value[0]],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            res.send({folders:results[0]})
        })
    })

    secretariatRouter.post('/transaction-marriage/comparefolderloc',(req,res)=>{
        var queryString4 = `select * from tbl_filecabinets 
        join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
        where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
        db.query(queryString4,[value[1], req.body.cabinet],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            var cabdivname = results[0]
            var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname+'-'+req.body.foldernumber
            var compareresult
            if(folderloc== req.body.prevfolderloc){
                compareresult=1
            }
            else{
                compareresult=0
            }
            if(err) console.log(err)
            res.send({compareresult:compareresult})
        })
    })

    secretariatRouter.post('/transaction-marriage/changeloc',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results1,fields) =>{
            var queryString3 = `select * from tbl_wedcouple where int_eventinfoID =?`
            db.query(queryString3,[req.body.id],(err,results,fields) =>{
            if(err) console.log(err)
            res.send({cabinets:results1, folderloc:results[0]})
        })
    })
    })

    secretariatRouter.post('/transaction-marriage/setfolderloc',(req,res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var value = req.body.division.split('-');
        var queryString2 = `INSERT INTO tbl_filefolders(int_eventinfoID, int_cabinetID, int_divisionID,  int_foldernumber, var_foldername) VALUES(?,?,?,?,?)`
        db.query(queryString2,[req.body.eventinfoID, req.body.cabinet, value[1], req.body.foldernumber, req.body.foldername],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)

            var queryString4 = `select * from tbl_filecabinets 
            join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
            where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
            db.query(queryString4,[value[1], req.body.cabinet],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)
                var cabdivname = results[0]

            var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname+'-'+req.body.foldernumber
            var queryString3 = `UPDATE tbl_wedcouple SET var_folderloc = ?
            where int_eventinfoID =  ?;`
            db.query(queryString3,[folderloc, req.body.eventinfoID],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)

                
                        
                        if (err){
                            console.log(err)
                            res.send({alertDesc:notsuccess})
                        }
                        else{
                            res.send({alertDesc:success})
                        }        
                    
        })})})
    })

    secretariatRouter.post('/transaction-marriage/changefolderloc',(req,res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var value = req.body.division.split('-');
        // var queryString2 = `INSERT INTO tbl_filefolders(int_eventinfoID, int_cabinetID, int_divisionID,  int_foldernumber, var_foldername) VALUES(?,?,?,?,?)`
        var queryString2 = `update tbl_filefolders set 
        int_eventinfoID =?, int_cabinetID=?, int_divisionID=?,  int_foldernumber=?`
        db.query(queryString2,[req.body.eventinfoID, req.body.cabinet, value[1], req.body.foldernumber],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)

            var queryString4 = `select * from tbl_filecabinets 
            join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
            where int_divisionID =?`
            db.query(queryString4,[value[1]],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)
                var cabdivname = results[0]

            var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname+'-'+req.body.foldernumber
            var queryString3 = `UPDATE tbl_wedcouple SET var_folderloc = ?
            where int_eventinfoID =  ?;`
            db.query(queryString3,[folderloc, req.body.eventinfoID],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)

                var queryString5 = `UPDATE tbl_files SET var_fileloc = ?, int_divisionID=?, int_cabinetID=?
                where var_fileloc = ?;`
                db.query(queryString5,[folderloc, value[1],req.body.cabinet, req.body.prevfolderloc],(err,results,fields) =>{

                if (err){
                    console.log(err)
                    res.send({alertDesc:notsuccess})
                }
                else{
                    res.send({alertDesc:success})
                }        
        })})})})
    })

    secretariatRouter.post('/transaction-marriage/schedules',(req,res)=>{
        console.log(req.body)

        var queryString =`SELECT * FROM tbl_eventinfo where int_eventinfoID = ?`
        db.query(queryString,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            var type = results[0]
        if(type.var_applicationtype=='Online'){
        
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
            JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedsteps on tbl_wedcouple.int_weddingsteps = tbl_wedsteps.int_weddingsteps
            JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id], (err, results, fields) => {
                if (err) console.log(err);
                    var eventdetails = results[0]
    
                    var queryString2 = `select * from tbl_schedule 
                    join tbl_wedschedule on tbl_schedule.int_scheduleID = tbl_wedschedule.int_scheduleID
                    join tbl_wedsteps on tbl_wedschedule.int_weddingsteps = tbl_wedsteps.int_weddingsteps
                    where int_eventinfoID = ?`
                    db.query(queryString2,[req.body.id],(err,results,fields) =>{
                        if(err) console.log(err)
                        console.log(results)
                        res.send({schedules:results, eventdetails:eventdetails})
            })})
        }
        else{
            var queryString1 =`SELECT * from tbl_eventinfo 
           
            JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
            join tbl_utilities on tbl_eventinfo.int_eventID = tbl_utilities.int_eventID
            JOIN tbl_wedgroom on tbl_wedgroom.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedbride on tbl_wedbride.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedcouple on tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_wedsteps on tbl_wedcouple.int_weddingsteps = tbl_wedsteps.int_weddingsteps
            JOIN tbl_relation on tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID   
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_voucherevents ON tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            where tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString1,[req.body.id], (err, results, fields) => {
                if (err) console.log(err);
                    var eventdetails = results[0]
    
                    var queryString2 = `select * from tbl_schedule 
                    join tbl_wedschedule on tbl_schedule.int_scheduleID = tbl_wedschedule.int_scheduleID
                    join tbl_wedsteps on tbl_wedschedule.int_weddingsteps = tbl_wedsteps.int_weddingsteps
                    where int_eventinfoID = ?`
                    db.query(queryString2,[req.body.id],(err,results,fields) =>{
                        if(err) console.log(err)
                        console.log(results)
                        res.send({schedules:results, eventdetails:eventdetails})
            })})
        }
    })
    })

    secretariatRouter.post('/transaction-marriage/updateschedules',(req,res)=>{
        console.log(req.body)
       
        
        var queryString2 = `select * from tbl_schedule 
        join tbl_wedschedule on tbl_schedule.int_scheduleID = tbl_wedschedule.int_scheduleID
        join tbl_wedsteps on tbl_wedschedule.int_weddingsteps = tbl_wedsteps.int_weddingsteps
        where tbl_schedule.int_scheduleID = ?`
        db.query(queryString2,[req.body.schedid],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)

            res.send({schedule:results[0]})     
        })
    })

    secretariatRouter.post('/transaction-marriage/updateschedulefinal',(req,res)=>{
        console.log(req.body)
        var success =0
        var notsuccess =1
       
        
        var queryString2 = `UPDATE tbl_schedule SET date_sched = ?, time_schedstart = ?
        where int_scheduleID =  ?`
        db.query(queryString2,[req.body.updatedate, req.body.updatetime, req.body.schedid],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            var queryString2 = `UPDATE tbl_wedschedule SET bool_conpriest = ?, bool_conguest = ?
            where int_scheduleID =  ?`
            db.query(queryString2,[req.body.conpriest, req.body.conguest, req.body.schedid],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)

                if (err){
                    console.log(err)
                    res.send({alertDesc:notsuccess})
                }
                else{
                    res.send({alertDesc:success})
                }    
        })})
    })

    secretariatRouter.post('/transaction-marriage/changepaymentstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // var status='';
        console.log(req.body)
        // var value = req.body.id1.split(',');
        // console.log(value);
        // for(var i=0; i>value.length; i++){
            // if(value[1]=='1'){var status= 'Paid'}
            // if(value[1]=='2'){var status= 'Unpaid'}
            // if(value[1]=='3'){var status= 'Disapproved'}
        // }

        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
        console.log('status: '+ req.body.status)
        var queryString= `select * from tbl_eventinfo join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_eventinfo.int_eventinfoID =?`

        var queryString1 = `UPDATE tbl_payment SET char_paymentstatus = ?, datetime_paymentreceived = ?, dbl_balance=?
                where int_paymentID =  ?;`;
        var updateStep = `UPDATE tbl_wedcouple SET int_weddingsteps = ?
                where int_eventinfoID =  ?;`;
        var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            eventinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =eventinfo.dbl_balance-req.body.payment
            db.query(updateHistory,[eventinfo.int_paymentID, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                history=results[0];

            
            if(balance == 0){
                 var status = 'Paid'
                 db.query(updateStep,[4, req.body.id1], (err, results, fields) => {
                    
                    if (err) console.log(err); 
                 })
            }
            else if (balance !=0)var status = 'Incomplete'
            db.query(queryString1,[status, date, balance, eventinfo.int_paymentID], (err, results, fields) => {
                if (err) console.log(err); 
                var selectstatus =`SELECT * from tbl_eventinfo 
                    JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                    JOIN tbl_wedcouple ON tbl_wedcouple.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                    WHERE tbl_eventinfo.int_eventinfoID = ?`
                
                    var approvalUpdate = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved", date_approval=?
                    WHERE int_eventinfoID =?`


                    db.query(selectstatus,[req.body.id1], (err, results, fields) => {
                        if (err) console.log(err);
                        if(results[0].char_requirements=='Complete' && results[0].char_paymentstatus=='Paid'){
                            db.query(approvalUpdate,[nowDate, req.body.id1], (err, results, fields) => {
                                if (err) console.log(err);
                                if (err){
                                    console.log(err)
                                    res.send({alertDesc:notsuccess})
                                }
                                else{
                                    res.send({alertDesc:success, balance:balance})
                                }        
                            })
                        }
                        else{
                            if (err){
                                console.log(err)
                                res.send({alertDesc:notsuccess})
                            }
                            else{
                                res.send({alertDesc:success,balance:balance})
                            }       
                        }
                    })
        }); }); }); 
        
    });

    secretariatRouter.post('/transaction-marriage/changeapprovalstatus', (req, res)=>{
        var success =0
        var notsuccess =1
        // console.log('body: ' +req.body.id1)
        // var value = req.body.id1.split(',');
        // console.log(value);
        var success =0
        var notsuccess =1
        console.log('body: ' +req.body.id1)
        console.log('status: ' +req.body.status)
        if(req.body.status=='1'){var statuss= 'Approved'}
        if(req.body.status=='2'){var statuss= 'Pending'}
        if(req.body.status=='0'){var statuss= 'Disapproved'}
        console.log('status: '+ statuss)
        
        var queryString = `UPDATE tbl_eventinfo SET        
                char_approvalstatus = ?
                where int_eventinfoID = ?;`;

        db.query(queryString,[statuss,req.body.id1], (err, results, fields) => {
            console.log('update resultss tae mo : ' +results)
            if (err){
                console.log(err)
                res.send({alertDesc:notsuccess})
            }
            else{
                res.send({alertDesc:success})
            }
        }); 
    }); 

//walk in
    secretariatRouter.post('/setfolderloc',(req,res)=>{
    var success =0
    var notsuccess =1
    console.log('KAHIT PAPANO PUMASOK NAMAN')
    console.log(req.body)
    console.log('ibigsabihin yung nasa taas yung pinapasa ?>')
        var value = req.body.division.split('-');
        var selectreqID= `select * from tbl_requirementsinevents where int_eventinfoID =?`
        db.query(selectreqID,[req.body.eventinfoID],(err,results,fields) =>{
        var requirementID = results[0]
        var queryString4 = `select * from tbl_filecabinets 
        join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
        where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
        db.query(queryString4,[value[1],req.body.cabinet],(err,results,fields) =>{
            if(err) console.log(err)
            console.log(results)
            var cabdivname = results[0]

        var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname

        var insertfile = `insert into tbl_files(var_fileloc, int_requirementID,int_divisionID, int_cabinetID) values(?,?,?,?) `
        db.query(insertfile,[folderloc,requirementID.int_requirementID, value[1],req.body.cabinet],(err,results,fields) =>{

            const queryString = `UPDATE tbl_requirements SET var_reqpath=?, var_reqstatus =? where int_requirementID =?`;
            db.query(queryString,[folderloc,'Approved',requirementID.int_requirementID],(err,results,fields) =>{
            if(err) console.log(err)
            if (err){
                console.log(err)
                res.send({alertDesc:notsuccess})
            }
            else{
                res.send({alertDesc:success})
            }
            })
        })
        })})
    })


    secretariatRouter.get('/walkin-anointing', (req, res)=>{
        return res.render('secretariat/views/walk-in/anointing');
    });
    secretariatRouter.get('/walkin-anointing/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 1`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })
    secretariatRouter.post('/walkin-anointing',(req,res)=>{
        console.log(req.body)
        var success =0
        var notsuccess =1
        //tempuserr
        var tempuser =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
        db.query(tempuser,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
        if(err) console.log(err)
        var userdetails = results1
        console.log(userdetails)
        
        var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
        db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
                console.log(req.session.secretariat.int_userID)
              
            var desiredtime1= moment(req.body.desiredtime, 'h:mm a').format('HH:mm:ss');
            var desiredend= moment(desiredtime1, 'HH:mm:ss').add(1,'h').format('HH:mm:ss')
            var desireddate= moment(req.body.desireddate, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var birthday= moment(req.body.birthday, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var nowDate = new Date(); 
            var nowDate1 = moment(nowDate).format('YYYY-MM-DD')
            var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied, var_applicationtype) VALUES(?,?,?,?, ?,?,?,?,?)`
                db.query(queryString1, [userdetails.insertId, eventID.int_eventID, desireddate, desiredtime1,desiredend ,"Approved", "Complete", nowDate1, "Walk-in"], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                        if (err) console.log(err);
                        
                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID,var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?, ?,?,?,?);`
                        db.query(queryString3, [eventinfoID.insertId, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, birthday, req.body.birthplace], (err, results, fields) => {
                            if (err) console.log(err);
                            var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails) VALUES (?,?,?)`
                            db.query(queryString4, [eventinfoID.insertId, req.body.venue, req.body.details], (err, results, fields) => {
                                if (err) console.log(err);
                                
                                if(req.body.boolfile==1){
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [1], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'Approved'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    var value = req.body.division.split('-');
                                                    var queryString4 = `select * from tbl_filecabinets 
                                                    join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
                                                    where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
                                                    db.query(queryString4,[value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        console.log(results)
                                                        var cabdivname = results[0]
                                        
                                                    var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname
                                                    
                                                    var insertfile = `insert into tbl_files(var_fileloc, int_requirementID, int_divisionID, int_cabinetID) values(?,?,?,?) `
                                                    db.query(insertfile,[folderloc,requirementID.insertId, value[1],req.body.cabinet],(err,results,fields) =>{

                                                        const queryString = `UPDATE tbl_requirements SET var_reqpath=? where int_requirementID =?`;
                                                        db.query(queryString,[folderloc,requirementID.insertId],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        priestassignment(eventinfoID.insertId)
                                                    })})})
                                        })
                                        })

                                    })
                                
                                }

                                else{
                                    
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [1], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'No file'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    priestassignment(eventinfoID.insertId)
                                   
                                })})})           
                                }
                                
                                
                                
                                
                            });
                        });
                    })
                })
            })
        function priestassignment(eventinfoID){

            var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                            char_requirements ='Complete', char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,eventinfoID],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,eventinfoID)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_blessing SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, eventinfoID], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    
                                    var datenoww= new Date();
                                    //FOR SCHEDULE

                                    var selecteventinfodetails = `select * from tbl_eventinfo 
                                    join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                    where tbl_eventinfo.int_eventinfoID =?`
                                    db.query(selecteventinfodetails, [eventinfoID],(err, results, fields) => {
                                            var eventinfodetails = results[0]
                                            console.log(eventinfodetails)
                                            
                                        // addschedules(eventinfodetails)
                                    var schedname = 'Anointing of '+ eventinfodetails.var_lname +', ' + eventinfodetails.var_fname
                                    var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                    db.query(schedtag, [priest.int_priestID,eventinfoID, schedname,eventinfodetails.date_eventdate,  eventinfodetails.time_eventstart, 'INLPP'], (err, results, fields) => {
                                        console.log(err) 
                                
                                    var notifdesc ='You have been assigned to an event (Anointing of the sick)'
                                    var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                    db.query(insertnotif,[priest.int_priestID, notifdesc,eventinfoID, datenoww], (err, results4, fields) => {
                                        if(err) console.log(err)



                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }

                                            if (err){
                                                console.log(err)
                                                res.send({alertDesc:notsuccess})
                                            }
                                            else{
                                                res.send({alertDesc:success})
                                            }
                                        })

                                        })
                                    })})
                                    })
                            })
                            })
                        
                    })
                })
        }
                
        
    })

    secretariatRouter.get('/walkin-baptism', (req, res)=>{
     return res.render('secretariat/views/walk-in/baptism');
    });
    secretariatRouter.get('/walkin-baptism/query1', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 9`
        db.query(queryString3,(err,results2,fields)=>{
        console.log(results2)
        var queryString = `SELECT * FROM tbl_eventinfo JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        where tbl_services.var_eventname != "Baptism"`
            db.query(queryString,(err,results,fields) =>{
                res.send({queries:results,utilities:results2})
            })
        })
    })
    secretariatRouter.post('/walkin-baptism/query/regular/bilang', (req, res)=>{
        req.body.eventdate = moment(req.body.eventdate).format('YYYY-MM-DD')
        var queryString = `SELECT COUNT(*)AS bilang FROM tbl_eventinfo WHERE date_eventdate = ?` 
            db.query(queryString,req.body.eventdate,(err,results,fields) =>{
                var eventdate = req.body.eventdate
                results.push(eventdate)
                console.log(results)
                res.send(results)
                
            })
    })
    secretariatRouter.get('/walkin-baptism/query/regular', (req, res)=>{
        var queryString = `SELECT * FROM tbl_eventinfo where char_approvalstatus = "Approved" GROUP BY date_eventdate` 
            db.query(queryString,(err,results,fields) =>{
                console.log(results)
                    res.send(results)
            })
    })
    secretariatRouter.post('/walkin-baptism', (req, res)=>{
    console.log(req.body)
    var success =0
    var notsuccess =1
    function queries(paymentid){
          //tempuserr
        var tempuser =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
        db.query(tempuser,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
        if(err) console.log(err)
        console.log('-------------------------------')
        console.log('TEMP USER DETAILS')
        var userdetails = results1
        console.log('-------------------------------')
        console.log(userdetails)  
        var queryString= `select int_eventID from tbl_services where var_eventname=?`
            
        db.query(queryString, [req.body.baptismtype],(err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
               
            
            var desiredtime1= moment(req.body.desiredtime, 'h:mm a').format('HH:mm:ss');
            var desiredtimeend = moment(desiredtime1,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
            var desireddate= moment(req.body.desireddate, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var birthday= moment(req.body.birthday, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var nowDate = new Date(); 
            var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied,int_paymentID,var_applicationtype) VALUES(?,?,?,?,?,?,?,?,?,?)`
                db.query(queryString1, [userdetails.insertId, eventID.int_eventID, desireddate, desiredtime1,desiredtimeend, "Approved", "Complete", nowDate, paymentid,'Walk-in'], (err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results)
                    var eventinfoID= results;
                        if (err) console.log(err);
                        
                        if(req.body.baptismtype=='Baptism') var baptype = 3
                        if(req.body.baptismtype=='Special Baptism') var baptype = 9
                        var queryString5= `select int_eventID from tbl_services where var_eventname=?`
                        db.query(queryString5,  [req.body.baptismtype],(err, results, fields) => {
                            if (err) console.log(err);
                            var eventID = results[0];  
                            var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                            var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                            var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
                            db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                                if (err) console.log(err);
                                console.log(results)
                                var fee= results[0].double_fee;
                                var otherfee= results[0].double_addrate* req.body.numofaddsponsors
                                var totalfee= fee+otherfee
                                
                                console.log(totalfee)
                                var datenow = new Date()
                                var downpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                                var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                                var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                                var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                                console.log(downpaymentdeadline)
                                console.log(fullpaymentdeadline)
                                console.log(downdateDeadline)
                                console.log(fulldateDeadline)
                            

                                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                                    var text="";
                                    for(i=0;i<8;i++)
                                    text += possible.charAt(Math.floor(Math.random()*possible.length));
                                    var queryString01 =`insert into tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode)
                                    VALUES(?,?,?,?,?)`
                                    db.query(queryString01,[eventinfoID.insertId,fulldateDeadline,datenow,6,text],(err,results,fields)=>{
                                        console.log('voucher results')
                                        console.log(results)



                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID,var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?, ?,?,?,?);`
                        db.query(queryString3, [eventinfoID.insertId, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, birthday, req.body.birthplace], (err, results, fields) => {
                            if (err) console.log(err);
                            var queryString4 =`INSERT INTO tbl_baptism(int_eventinfoID, var_parentmarriageadd, var_fathername, var_fatherbplace, var_mothername, var_motherbplace, var_contactnum) VALUES (?,?,?,?,?,?,?)`
                            db.query(queryString4, [eventinfoID.insertId, req.body.marriageaddress, req.body.fathername, req.body.fatherplace, req.body.mothername, req.body.motherplace, req.body.contactnumber], (err, results, fields) => {
                                if (err) console.log(err);
                                if(req.body.baptismtype=='Baptism') var baptype = 3
                                if(req.body.baptismtype=='Special Baptism') var baptype = 9

                                if(req.body.boolfile==1){
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    
                                    db.query(requirementQuery, [baptype], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'Approved'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    var value = req.body.division.split('-');
                                                    var queryString4 = `select * from tbl_filecabinets 
                                                    join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
                                                    where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
                                                    db.query(queryString4,[value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        console.log(results)
                                                        var cabdivname = results[0]
                                        
                                                    var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname
                                                    
                                                    var insertfile = `insert into tbl_files(var_fileloc, int_requirementID, int_divisionID, int_cabinetID) values(?,?,?,?) `
                                                    db.query(insertfile,[folderloc,requirementID.insertId,value[1],req.body.cabinet],(err,results,fields) =>{
                                                        
                                                        const queryString = `UPDATE tbl_requirements SET var_reqpath=? where int_requirementID =?`;
                                                        db.query(queryString,[folderloc,requirementID.insertId],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        sponsors(eventinfoID.insertId)
                                                    })})
                                                })
                                            })
                                        })
                                    })
                                }//if withfile
                                else{
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    
                                    db.query(requirementQuery, [baptype], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'To be submitted'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    
                                                        if(err) console.log(err)
                                                        sponsors(eventinfoID.insertId)
                                            })
                                        })
                                    })
                                }
                            })})})})})})})})
                                                    
        }

                                                    
        if(req.body.boolpaid==0){
            console.log('Not Paid')
            var queryString5= `select int_eventID from tbl_services where var_eventname=?`
            db.query(queryString5,  [req.body.baptismtype],(err, results, fields) => {
                if (err) console.log(err);
                var eventID = results[0];  
                var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
                db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results)
                    var fee= results[0].double_fee;
                    var otherfee= results[0].double_addrate* req.body.numofaddsponsors
                    var totalfee= fee+otherfee-100
                    
                    console.log(totalfee)
                    var datenow = new Date()
                    var downpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                    var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                    var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                    var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                    console.log(downpaymentdeadline)
                    console.log(fullpaymentdeadline)
                    console.log(downdateDeadline)
                    console.log(fulldateDeadline)
                    
                    var paymentInsert = `insert into tbl_payment(dbl_amount, dbl_balance, char_paymentstatus, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?)`;
                db.query(paymentInsert,[totalfee,totalfee,'Unpaid', downdateDeadline,fulldateDeadline], (err, results2, fields) => {
                    if (err) console.log(err);
                    var paymentid= results2;
                        console.log(paymentid)
                        queries(paymentid.insertId)
                        
                    })})})
        }//not paid
        if(req.body.boolpaid==1){
            console.log('Paid')
            if(req.body.baptismtype=='Baptism') var baptype = 3
            if(req.body.baptismtype=='Special Baptism') var baptype = 9
            var queryString5= `select int_eventID from tbl_services where var_eventname=?`
            db.query(queryString5,  [req.body.baptismtype],(err, results, fields) => {
                if (err) console.log(err);
                var eventID = results[0];  
                var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
                db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                    if (err) console.log(err);
                    console.log(results)
                    var fee= results[0].double_fee;
                    var otherfee= results[0].double_addrate* req.body.numofaddsponsors
                    var totalfee= fee+otherfee
                    
                    console.log(totalfee)
                    var datenow = new Date()
                    var downpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                    var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                    var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                    var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                    console.log(downpaymentdeadline)
                    console.log(fullpaymentdeadline)
                    console.log(downdateDeadline)
                    console.log(fulldateDeadline)
                



                    if(req.body.payment == totalfee){
                        var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus,datetime_paymentreceived, dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?.?,?)`;
                        db.query(paymentInsert,[totalfee,'Paid',datenow, '0', downdateDeadline,fulldateDeadline], (err, results, fields) => {
                            if (err) console.log(err);
                            var paymentid= results;
                            console.log(paymentid)
                        queries(paymentid.insertId)
                        })
                    }
                    else{
                        var balance = totalfee - req.body.payment
                        var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus, datetime_paymentreceived, dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?,?)`;
                        db.query(paymentInsert,[totalfee,'Unpaid',datenow, balance, downdateDeadline,fulldateDeadline], (err, results, fields) => {
                            if (err) console.log(err);
                            var paymentid= results;
                            console.log(paymentid)
                            var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
                            db.query(updateHistory,[paymentid.insertId, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                                history=results[0];

                                queries(paymentid.insertId)
                        })
                    })
                    }//else
                    })})
            
        }//paid
        
        function sponsors(eventinfoID){
            var i;
            
                var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                db.query(queryString5, [eventinfoID, req.body.firstsponsor], (err, results, fields) => {
                    var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                    db.query(queryString5, [eventinfoID, req.body.secondsponsor], (err, results, fields) => {
                    if(err) console.log(err);
                    priestassignment(eventinfoID)
              
                });})
            
        } 
        function priestassignment(eventinfoID){
            var selecteventinfodetails = `select * from tbl_eventinfo 
                                   join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                   where tbl_eventinfo.int_eventinfoID =?`
                                       db.query(selecteventinfodetails, [eventinfoID],(err, results, fields) => {
                                           var eventinfodetails = results[0]
                                           console.log(eventinfodetails)
            if(eventinfodetails.int_eventID==3){
                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                    db.query(queryString,["Next"],(err,results,fields)=>{
                        if(err) console.log(err)
                        console.log('NEXT PREIST SEQUENCE DETAILS')
                        var priest = results[0];
                        console.log(results[0])
                        console.log('priestID')
                        console.log(priest.int_priestID)
                        var queryString1 =`SELECT * from tbl_user where int_userID=?`
                        db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                            if (err) console.log(err);
                            console.log('NEXT PREIST INFO')
                            var priestinfo =results[0]
                            console.log(priestinfo)
                            
                            var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                             char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[priestinfo.int_userID,eventinfoID],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            console.log(priestinfo.int_userID,eventinfoID)

                            // na update tas nalagay priest ID

                                console.log(priestinfo)
                                var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                //naselect yung priest
                                console.log(priestname)
                                var assignname = `UPDATE tbl_baptism SET var_priestname = ?
                                WHERE int_eventinfoID =?`
                                db.query(assignname, [priestname, eventinfoID], (err, results, fields) => {
                                    if(err) console.log(err)
                                    console.log('results ng pag insert ng name')
                                    console.log(results)
                                    //nalagay na yung name
                                    // INSERT INFO COPY FOR OTHERS~
                                   //FOR SCHEDULE

                                   
                                           var datenoww= new Date();
                                           

                                               // addschedules(eventinfodetails)
                                               var schedname = 'Baptism '+ eventinfodetails.var_lname +', ' + eventinfodetails.var_fname
                                               var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                               db.query(schedtag, [priest.int_priestID,eventinfoID, schedname,eventinfodetails.date_eventdate,  eventinfodetails.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                   console.log(err) 
                                           
                                           var notifdesc ='You have been assigned to an event (Baptism)'
                                           var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                           db.query(insertnotif,[priest.int_priestID, notifdesc,eventinfoID, datenoww], (err, results4, fields) => {
                                               if(err) console.log(err)
                                           })})
                                           
                                           
                                           
                                        

                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                db.query(queryString,["Next"],(err,results,fields)=>{
                                    if(err) console.log(err)
                                    var priest = results[0];
                                        var queryString = `SELECT * FROM tbl_priestsequence`
                                        db.query(queryString,(err,results,fields)=>{
                                            if(err) console.log(err);
                                            if(priest.int_seqnumber < results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }
                                            else if(priest.int_seqnumber >= results.length){
                                                var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                    db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        // return res.redirect('/secretariat/transaction-regularbaptism')
                                                    })
                                                })
                                            }

                                            if (err){
                                                console.log(err)
                                                res.send({alertDesc:notsuccess})
                                            }
                                            else{
                                                res.send({alertDesc:success})
                                            }


                                        })
                                   
                                    })
                                })
                                })
                            })})
                                }
                        else{
                            var queryString = `UPDATE tbl_eventinfo SET 
                           char_approvalstatus='Approved'
                            where int_eventinfoID=?`
                        db.query(queryString,[eventinfoID],(err,results,fields)=>{
                            console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                            if(err) console.log(err);
                            if (err){
                                console.log(err)
                                res.send({alertDesc:notsuccess})
                            }
                            else{
                                res.send({alertDesc:success})
                            }
                        })
                        }
                    })
                
        }
    })
   
    secretariatRouter.get('/walkin-funeralblessing', (req, res)=>{
         res.render('secretariat/views/walk-in/funeralblessing');
    });
    secretariatRouter.get('/walkin-funeral/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 4`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })
    secretariatRouter.post('/walkin-funeralblessing/query', (req, res) => {
        var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
            db.query(queryString1,[req.body.id], (err, results1, fields) => {
                // res.send({firstQuery:results1[0]});
                var queryString = `SELECT * FROM tbl_eventinfo JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                 where tbl_services.var_eventname != "Baptism"`
                db.query(queryString,(err,results,fields) =>{
                    res.send({queries:results,firstQuery:results1[0]})
                })
            })
            });
    secretariatRouter.get('/walkin-funeralblessing/query/checksched', (req, res) => {
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
    secretariatRouter.post('/walkin-funeralblessing/query/checksched2', (req, res) => {
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
    secretariatRouter.post('/walkin-funeralblessing', (req, res)=>{
      
        console.log(req.body)
        var success =0
        var notsuccess =1
       function queries(paymentid){
        var queryString= `select int_eventID from tbl_services where var_eventname=?`
         //tempuserr
         var tempuser =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
         db.query(tempuser,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
         if(err) console.log(err)
         var userdetails = results1
         console.log(userdetails)
        db.query(queryString, [req.body.funeraltype],(err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
                console.log(req.session.secretariat.int_userID)
            
            var desiredtime1= moment(req.body.desiredtime, 'h:mm a').format('HH:mm:ss');
            var desireddate= moment(req.body.desireddate, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var birthday= moment(req.body.birthday, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var nowDate = new Date(); 
            console.log(desireddate)
            var desireddateend = moment(desiredtime1,'HH:mm:ss').add(1,'h').format('HH:mm:ss')
            var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate,time_eventend,time_eventstart, char_approvalstatus, char_requirements, date_applied, var_applicationtype, int_paymentID) VALUES(?,?,?,?,?, ?,?,?,?,?)`
                db.query(queryString1, [userdetails.insertId, eventID.int_eventID ,desireddate,desireddateend, desiredtime1, "Approved", "Complete", nowDate,"Walk-in", paymentid], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                        if (err) console.log(err);

                        if(req.body.funeraltype=="Funeral Mass"){

                            var queryString5= `select int_eventID from tbl_services where var_eventname='Funeral Mass'`
                            db.query(queryString5,  (err, results, fields) => {
                                if (err) console.log(err);
                                var eventID = results[0];  
                                var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                                var desiredtimeend= moment(req.body.desiredtimeend, 'hh:mm A').format('HH:mm:ss');
                                var paymentQuery= `select * from tbl_utilities where int_eventID = ?`
                                db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                                    if (err) console.log(err);
                                    console.log(results)
                                    var fee= results[0].double_fee;
                                    var otherfee= results[0].double_addrate* req.body.numofaddsponsors
                                    var totalfee= fee+otherfee
                                    
                                    console.log(totalfee)
                                    var datenow = new Date()
                                    var downpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                                    var fullpaymentdeadline = moment(datenow).add(results[0].int_fullpaymentdays,'days')
                                    var downdateDeadline = moment(downpaymentdeadline).format('YYYY-MM-DD')
                                    var fulldateDeadline = moment(fullpaymentdeadline).format('YYYY-MM-DD')
                                    console.log(downpaymentdeadline)
                                    console.log(fullpaymentdeadline)
                                    console.log(downdateDeadline)
                                    console.log(fulldateDeadline)
                                

                                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                                        var text="";
                                        for(i=0;i<8;i++)
                                        text += possible.charAt(Math.floor(Math.random()*possible.length));
                                        var queryString01 =`insert into tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode)
                                        VALUES(?,?,?,?,?)`
                                        db.query(queryString01,[eventinfoID.insertId,fulldateDeadline,datenow,6,text],(err,results,fields)=>{
                                            console.log('voucher results')
                                            console.log(results)

                                        })})})
                        }
                        
                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID,var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?, ?,?,?,?);`
                        db.query(queryString3, [eventinfoID.insertId, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, birthday, req.body.birthplace], (err, results, fields) => {
                            if (err) console.log(err);
                            var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails) VALUES (?,?,?)`
                            db.query(queryString4, [eventinfoID.insertId, req.body.venue, req.body.details], (err, results, fields) => {
                                if (err) console.log(err);
                                if(req.body.funeraltype=='Funeral Service') var funeraltype = 3
                                if(req.body.funeraltype=='Funeral Mass') var funeraltype = 7

                                if(req.body.boolfile==1){
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [funeraltype], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'Approved'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    var value = req.body.division.split('-');
                                                    var queryString4 = `select * from tbl_filecabinets 
                                                    join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
                                                    where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
                                                    db.query(queryString4,[value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        console.log(results)
                                                        var cabdivname = results[0]
                                        
                                                    var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname
                                                    
                                                    var insertfile = `insert into tbl_files(var_fileloc, int_requirementID, int_divisionID, int_cabinetID) values(?,?,?,?) `
                                                    db.query(insertfile,[folderloc,requirementID.insertId,value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        //if funeral mass insert sa payment
                                                        priestassignment(eventinfoID.insertId)
                                                }) }) }) }) }) 
                                }

                                else{
                                    if(req.body.funeraltype=='Funeral Service') var funeraltype = 3
                                    if(req.body.funeraltype=='Funeral Mass') var funeraltype = 7
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [funeraltype], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'To be submitted'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                    
                                                    priestassignment(eventinfoID.insertId)

                                })})})
                                            
                                }

                }) }) }) })})
       }
       

        if(req.body.funeraltype=='Funeral Mass'){
            
            
            if(req.body.boolpaid==0){
                console.log('Not Paid')
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
                        
                            queries(paymentid.insertId)
                        })})})
            }
            if(req.body.boolpaid==1){
                console.log('Paid')
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
                            var nowDate = new Date(); 
                        if(req.body.payment == amount.double_fee){
                            var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus,datetime_paymentreceived, dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?.?,?)`;
                            db.query(paymentInsert,[amount.double_fee,'Paid',datenow, '0', downdateDeadline,fulldateDeadline], (err, results, fields) => {
                                if (err) console.log(err);
                                var paymentid= results;
                                console.log(paymentid)
                            
                                queries(paymentid.insertId)
                            })
                        }
                        else{
                            var balance = amount.double_fee 
                            var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus, datetime_paymentreceived, dbl_balance, date_downpaymentdeadline, date_fullpaymentdeadline) values(?,?,?,?,?,?)`;
                            db.query(paymentInsert,[amount.double_fee,'Unpaid',datenow, balance, downdateDeadline,fulldateDeadline], (err, results, fields) => {
                                if (err) console.log(err);
                                var paymentid= results;
                                console.log(paymentid)
                                // var updateHistory = `insert into tbl_paymenthistory(int_paymentID, date_paymentdate, var_paidby, dbl_paymentamount, dbl_remainingbalance) values(?,?,?,?,?) `
                                // db.query(updateHistory,[paymentid.insertId, req.body.paymentdate, req.body.payer, req.body.payment, balance], (err, results, fields) => {
                                //     history=results[0];

                                queries(paymentid.insertId)
                            })
                        // })
                        }//else
                        })})
                
            }
        
        }//funeral mass

        else{
            queries(null)
        }
        function priestassignment(eventinfoID){

                                var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                        db.query(queryString,["Next"],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            console.log('NEXT PREIST SEQUENCE DETAILS')
                                            var priest = results[0];
                                            console.log(results[0])
                                            console.log('priestID')
                                            console.log(priest.int_priestID)
                                            var queryString1 =`SELECT * from tbl_user where int_userID=?`
                                            db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                                                if (err) console.log(err);
                                                console.log('NEXT PREIST INFO')
                                                var priestinfo =results[0]
                                                console.log(priestinfo)
                                                
                                                var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                                                char_requirements ='Complete', char_approvalstatus='Approved'
                                                where int_eventinfoID=?`
                                            db.query(queryString,[priestinfo.int_userID,eventinfoID],(err,results,fields)=>{
                                                console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                                                if(err) console.log(err);
                                                console.log(priestinfo.int_userID,eventinfoID)
                    
                                                // na update tas nalagay priest ID
                    
                                                    console.log(priestinfo)
                                                    var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                                    //naselect yung priest
                                                    console.log(priestname)
                                                    var assignname = `UPDATE tbl_blessing SET var_priestname = ?
                                                    WHERE int_eventinfoID =?`
                                                    db.query(assignname, [priestname, eventinfoID], (err, results, fields) => {
                                                        if(err) console.log(err)
                                                        console.log('results ng pag insert ng name')
                                                        console.log(results)
                                                        //FOR SCHEDULE
                                                        var datenoww= new Date();
                                                            var selecteventinfodetails = `select * from tbl_eventinfo 
                                                            join tbl_relation on tbl_eventinfo.int_eventinfoID = tbl_relation.int_eventinfoID
                                                            where tbl_eventinfo.int_eventinfoID =?`
                                                                db.query(selecteventinfodetails, [eventinfoID],(err, results, fields) => {
                                                                    var eventinfodetails = results[0]
                                                                    console.log(eventinfodetails)
                                                                    
                                                                // addschedules(eventinfodetails)
                                                                var schedname = 'Funeral Blessing '+ eventinfodetails.var_lname +', ' + eventinfodetails.var_fname
                                                                var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                                                db.query(schedtag, [priest.int_priestID,eventinfoID, schedname,eventinfodetails.date_eventdate,  eventinfodetails.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                                    console.log(err) 
                                                            
                                                            var notifdesc ='You have been assigned to an event (Funeral Blessing)'
                                                            var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                                            db.query(insertnotif,[priest.int_priestID, notifdesc,eventinfoID, datenoww], (err, results4, fields) => {
                                                                if(err) console.log(err)
                    
                    
                    
                                                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                                    db.query(queryString,["Next"],(err,results,fields)=>{
                                                        if(err) console.log(err)
                                                        var priest = results[0];
                                                            var queryString = `SELECT * FROM tbl_priestsequence`
                                                            db.query(queryString,(err,results,fields)=>{
                                                                if(err) console.log(err);
                                                                if(priest.int_seqnumber < results.length){
                                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                                    db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                                            if(err) console.log(err)
                                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                                        })
                                                                    })
                                                                }
                                                                else if(priest.int_seqnumber >= results.length){
                                                                    var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                                    db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                                        db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                                            if(err) console.log(err)
                                                                            // return res.redirect('/secretariat/transaction-regularbaptism')
                                                                        })
                                                                    })
                                                                }
                    
                                                                if (err){
                                                                    console.log(err)
                                                                    res.send({alertDesc:notsuccess})
                                                                }
                                                                else{
                                                                    res.send({alertDesc:success})
                                                                }
                    
                    
                                                            })
                                                        })})
                                                    })
                                                        })
                                                })
                                                })
                                            
                                        })
                                    })
        }
 

    });

    secretariatRouter.get('/walkin-houseblessing', (req, res)=>{
        return res.render('secretariat/views/walk-in/houseblessing');
    });
    secretariatRouter.get('/walkin-establishment/utilities/query', (req, res)=>{
        var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 12`
        db.query(queryString3,(err,results,fields)=>{
            console.log(results)
        res.send(results)
    })
    })
    secretariatRouter.post('/walkin-houseblessing', (req, res)=>{
        console.log(req.body)
        var success =0
        var notsuccess =1
        //tempuserr
        var tempuser =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
        db.query(tempuser,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
        if(err) console.log(err)
        var userdetails = results1
        console.log(userdetails)
        var queryString= `select int_eventID from tbl_services where var_eventname="House Blessing"`
            
        db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                console.log(results);
                var eventID = results[0];
                console.log(req.session.secretariat.int_userID)
              
            var desiredtime1= moment(req.body.desiredtime, 'h:mm a').format('HH:mm:ss');
            var desireddate= moment(req.body.desireddate, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var birthday= moment(req.body.birthday, 'mm/dd/yyyy').format('YYYY-MM-DD');
            var nowDate = new Date(); 
            var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart, char_approvalstatus, char_requirements, date_applied, var_applicationtype) VALUES(?,?,?, ?,?,?,?,?)`
                db.query(queryString1, [userdetails.insertId, eventID.int_eventID, desireddate, desiredtime1, "Approved", "Complete", nowDate,'Walk-in'], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                        if (err) console.log(err);
                        
                            var queryString3 = `INSERT INTO tbl_houseblessing(int_eventinfoID,var_owner, var_estloc, var_ownercontactnum, var_owneremailadd) VALUES(?,?,?,?,?);`
                            db.query(queryString3, [eventinfoID.insertId, req.body.owner, req.body.estloc, req.body.contactnumber, req.body.emailaddress], (err, results, fields) => {
                             if (err) console.log(err);
                                
                                if(req.body.boolfile==1){
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [12], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'Approved'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    var value = req.body.division.split('-');
                                                    var queryString4 = `select * from tbl_filecabinets 
                                                    join tbl_filedivisions on tbl_filecabinets.int_cabinetID = tbl_filedivisions.int_cabinetID
                                                    where int_divisionID =? and tbl_filecabinets.int_cabinetID=?`
                                                    db.query(queryString4,[value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        console.log(results)
                                                        var cabdivname = results[0]
                                        
                                                    var folderloc =cabdivname.var_cabinetname +'-'+cabdivname.var_divisionname
                                                    
                                                    var insertfile = `insert into tbl_files(var_fileloc, int_requirementID,int_divisionID, int_cabinetID) values(?,?,?,?) `
                                                    db.query(insertfile,[folderloc,requirementID.insertId,value[1],req.body.cabinet],(err,results,fields) =>{
                                                        if(err) console.log(err)
                                                        priestassignment(eventinfoID.insertId)
                                                    })})
                                        })
                                        })

                                    })
                                
                                }

                                else{
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                    db.query(requirementQuery, [12], (err, results, fields) => {
                                        if (err) console.log(err);
                                        var reqq = results[0];

                                            var nowDate = new Date(); 
                                            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
                                            var queryString7 = `INSERT INTO tbl_requirements(int_reqtypeID, datetime_reqreceived, var_reqstatus) VALUES (?,?,?);`
                                            db.query(queryString7,[reqq.int_reqtypeID,date, 'No File'],(err, results, fields)=>{    
                                                if (err) console.log(err);
                                                var requirementID = results;
                                                var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{
                                                    console.log(results[0])
                                                    priestassignment(eventinfoID.insertId)
                                })})})   
                                   
                                            
                                }
                                
                                
                                
                                
                            
                        });
                    })})
                })
        
                function priestassignment(eventinfoID){

                    var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                            db.query(queryString,["Next"],(err,results,fields)=>{
                                if(err) console.log(err)
                                console.log('NEXT PREIST SEQUENCE DETAILS')
                                var priest = results[0];
                                console.log(results[0])
                                console.log('priestID')
                                console.log(priest.int_priestID)
                                var queryString1 =`SELECT * from tbl_user where int_userID=?`
                                db.query(queryString1, [priest.int_priestID], (err, results, fields) => {
                                    if (err) console.log(err);
                                    console.log('NEXT PREIST INFO')
                                    var priestinfo =results[0]
                                    console.log(priestinfo)
                                    
                                    var queryString = `UPDATE tbl_eventinfo SET int_userpriestID =? , 
                                    char_requirements ='Complete', char_approvalstatus='Approved'
                                    where int_eventinfoID=?`
                                db.query(queryString,[priestinfo.int_userID,eventinfoID],(err,results,fields)=>{
                                    console.log('PAG LAGAY NG PRIEST ID AND UPDATE KEME ')
                                    if(err) console.log(err);
                                    console.log(priestinfo.int_userID,eventinfoID)
        
                                    // na update tas nalagay priest ID
        
                                        console.log(priestinfo)
                                        var priestname = priestinfo.var_userlname +', '+ priestinfo.var_userfname
                                        //naselect yung priest
                                        console.log(priestname)
                                        var assignname = `UPDATE tbl_houseblessing SET var_priestname = ?
                                        WHERE int_eventinfoID =?`
                                        db.query(assignname, [priestname, eventinfoID], (err, results, fields) => {
                                            if(err) console.log(err)
                                            console.log('results ng pag insert ng name')
                                            console.log(results)
                                            //FOR SCHEDULE
                                            var datenoww= new Date();
                                            var selecteventinfodetails = `select * from tbl_eventinfo 
                                            join tbl_houseblessing on tbl_eventinfo.int_eventinfoID = tbl_houseblessing.int_eventinfoID
                                            where tbl_eventinfo.int_eventinfoID =?`
                                                db.query(selecteventinfodetails, [eventinfoID],(err, results, fields) => {
                                                    var eventinfodetails = results[0]
                                                    console.log(eventinfodetails)
                                                    
                                                // addschedules(eventinfodetails)
                                                var schedname = 'Funeral Blessing '+ eventinfodetails.var_lname +', ' + eventinfodetails.var_fname
                                                var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, var_schedulename, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?,?)`
                                                db.query(schedtag, [priest.int_priestID,eventinfoID, schedname,eventinfodetails.date_eventdate,  eventinfodetails.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                    console.log(err) 
                                            
                                            var notifdesc ='You have been assigned to an event (HOuse Blessing)'
                                            var insertnotif = `insert into tbl_notification(int_userID, var_notifdesc, int_eventinfoID, datetime_received) values(?,?,?,?)`
                                            db.query(insertnotif,[priest.int_priestID, notifdesc,eventinfoID, datenoww], (err, results4, fields) => {
                                                if(err) console.log(err)
    
        
        
        
                                        var queryString = `SELECT * FROM tbl_priestsequence WHERE char_seqstatus=?`
                                        db.query(queryString,["Next"],(err,results,fields)=>{
                                            if(err) console.log(err)
                                            var priest = results[0];
                                                var queryString = `SELECT * FROM tbl_priestsequence`
                                                db.query(queryString,(err,results,fields)=>{
                                                    if(err) console.log(err);
                                                    if(priest.int_seqnumber < results.length){
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Next",priest.int_seqnumber+1],(err,results,fields)=>{
                                                            var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                            db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                                if(err) console.log(err)
                                                                // return res.redirect('/secretariat/transaction-regularbaptism')
                                                            })
                                                        })
                                                    }
                                                    else if(priest.int_seqnumber >= results.length){
                                                        var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                        db.query(queryString,["Next",priest.int_seqnumber-(results.length - 1)],(err,results,fields)=>{
                                                            var queryString = `UPDATE tbl_priestsequence SET char_seqstatus = ? WHERE int_seqnumber = ?`
                                                            db.query(queryString,["Nope",priest.int_seqnumber],(err,results,fields)=>{
                                                                if(err) console.log(err)
                                                                // return res.redirect('/secretariat/transaction-regularbaptism')
                                                            })
                                                        })
                                                    }
        
                                                    if (err){
                                                        console.log(err)
                                                        res.send({alertDesc:notsuccess})
                                                    }
                                                    else{
                                                        res.send({alertDesc:success})
                                                    }
        
        
                                                })
                                            })})
                                            })
                                    })})
                                    })
                                
                            })
                        })
                }
        
    });
    
    secretariatRouter.get('/walkin-marriage', (req, res)=>{
        return res.render('secretariat/views/walk-in/marriage');
    });

    secretariatRouter.post('/walkin-marriage', (req, res)=>{
        //main query

    var success =0
    var notsuccess =1

    var text="";
    console.log(req.body)
    var caseArray =[]
     //tempuserr50
     var tempuser =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
     db.query(tempuser,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
     if(err) console.log(err)
     var userdetails = results1
     console.log(userdetails)
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
                var otherfee= results[0].double_addrate* req.body.numofaddsponsors
                var totalfee= fee+otherfee
                var downamount = (fee+otherfee)/2
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
                var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID , date_eventdate, time_eventstart,time_eventend, char_approvalstatus, int_paymentID, char_requirements, date_applied, var_applicationtype) VALUES(?,?,?,?,?,?,?,?,?,?)`;
                db.query(queryString1, [userdetails.insertId, eventID.int_eventID, req.body.eventDate, req.body.timeStart,req.body.timeEnd2,"Pending", paymentid.insertId, "Incomplete", datenow, 'Walk-in'], (err, results, fields) => {
                    if (err) console.log(err);
                    var eventinfoID= results;
                    // console.log(eventinfoID.insertId)
                    
                    
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                    for(i=0;i<8;i++)
                    text += possible.charAt(Math.floor(Math.random()*possible.length));
                    var queryString01 =`insert into tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_userID,var_vouchercode)
                    VALUES(?,?,?,?,?)`
                    db.query(queryString01,[eventinfoID.insertId,fulldateDeadline,datenow,6,text],(err,results,fields)=>{
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

                                    if(req.body.gcivilstatus == 'Married' && req.body.bcivilstatus == 'Married'){
                                        var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married, date_cprevweddate, var_cprevwedplace,int_weddingsteps) VALUES(?,?,?,?,?, ?);`
                                        db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, 1, req.body.cprevweddingdate, req.body.cprevweddingplace,3], (err, results, fields) => {
                                            if (err) console.log(err);                                                    
                                            
                                            groombapconChecking(eventinfoID.insertId);
                                            defaultReq(eventinfoID.insertId);
                                            sponsors(eventinfoID.insertId);
                                            
                                        });
                                    }
                                else{
                                    var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married,int_weddingsteps) VALUES(?,?,?,?);`
                                        db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, 0, 3], (err, results, fields) => {
                                            if (err) console.log(err);
                                            groombapconChecking(eventinfoID.insertId);
                                            defaultReq(eventinfoID.insertId);
                                            sponsors(eventinfoID.insertId);
                                            
                                        });
                                    }      
                                });});})});});});});})
    });

        function groombapconChecking(eventinfoID){
        var gcurrparish;
        console.log('NAKAPASOK AKO SA GROOOOOOM')
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
                        db.query(queryString4, [eventinfoID, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, req.body.gbapdate, req.body.gbapplace, req.body.gconfirmed, req.body.gcondate, req.body.gconplace],(err, results, fields) => {if (err) console.log(err);bridebapconChecking(eventinfoID);
                            });
                }
                else if(req.body.gconfirmed=='0'){
                    var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, date_gbapdate, var_gbapplace, bool_gconfirmed) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?);`
                        db.query(queryString4 , [eventinfoID, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, req.body.gbapdate, req.body.gbapplace, '0'],(err, results, fields) => {
                            if (err) console.log(err);
                           
                            });
                }
            }
            else if(req.body.gbaptized=='0'){
                
                var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, bool_gconfirmed) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?);`
                    db.query(queryString4 , [eventinfoID, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, gcurrparish,req.body.gbaptized, '0'],(err, results, fields) => {if (err) console.log(err);bridebapconChecking(eventinfoID);
                        });
                
            }
        }//catholic
        else if(req.body.greligion!='Catholic'){
            var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?);`
                db.query(queryString4 , [eventinfoID, req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace],(err, results, fields) => {
                    if (err) console.log(err);
                   
                    });
        }
    }
    function bridebapconChecking(eventinfoID){
        var bcurrparish;
        console.log('NAKAPASOK AKO SA GROOOOOOM')
        if(req.body.breligion=='Catholic'){
             
            if(req.body.bbaptized == '1'){
                if(req.body.bconfirmed=='1'){
                    var queryString5 = `INSERT INTO tbl_wedbride( int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized, date_bbapdate, var_bbapplace, bool_bconfirmed, date_bcondate, var_bconplace) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,?, ?);`
                        db.query(queryString5 , [eventinfoID, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, req.body.bbapdate, req.body.bbapplace, req.body.bconfirmed, req.body.bcondate, req.body.bconplace],(err, results, fields) => {
                        if (err) console.log(err);
                        });
                }
                else if(req.body.bconfirmed=='0'){
                    var queryString5 = `INSERT INTO tbl_wedbride( int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized,date_bbapdate,  var_bbapplace, bool_bconfirmed) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?,?,?);`
                        db.query(queryString5 , [eventinfoID, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, req.body.bbapdate, req.body.bbapplace, '0'],(err, results, fields) => {
                            if (err) console.log(err);
                        });
                }
            }
            else if(req.body.bbaptized=='0'){
                var queryString5 = `INSERT INTO tbl_wedbride(int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized, bool_bconfirmed) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?);`
                db.query(queryString5 , [eventinfoID, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, bcurrparish,req.body.bbaptized, '0'],(err, results, fields) => {
                    if (err) console.log(err);
                });
            }
        }//catholic
        else if(req.body.breligion!='Catholic'){
            var queryString5 = `INSERT INTO tbl_wedbride(int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?);`
            db.query(queryString5 , [eventinfoID, req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace],(err, results, fields) => {
                if (err) console.log(err);
            });
        }

    }

    function defaultReq(eventinfoID){
        //IDAGDAG DITO YUNG APAT NA PINAPASA ONLINE             
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

            db.query(requirement, [13,'To be submitted'], (err, results1, fields) => {
            var requirementID = results1;
            db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      

            db.query(requirement, [46,'To be submitted'], (err, results1, fields) => {
            var requirementID = results1;
            db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      

            db.query(requirement, [45,'To be submitted'], (err, results1, fields) => {
            var requirementID = results1;
            db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      

            db.query(requirement, [14,'To be submitted'], (err, results1, fields) => {
            var requirementID = results1;
            db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      

            additionalReq(eventinfoID)
            });});});});});});
        })})})})})})})})
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




        
        function sponsors(eventinfoID){
            var i;
            
                var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                db.query(queryString5, [eventinfoID, req.body.firstsponsor], (err, results, fields) => {
                    var queryString5= `INSERT INTO tbl_sponsors(int_eventinfoID, var_sponsorname) VALUES (?,?);`
                    db.query(queryString5, [eventinfoID, req.body.secondsponsor], (err, results, fields) => {
                    if(err) console.log(err);
                    if (err){
                        console.log(err)
                        res.send({alertDesc:notsuccess})
                    }
                    else{
                        res.send({alertDesc:success})
                    }
              
                });})
            
        }

    })

    //=======================================================================================================
    //=======================================================================================================
    // EVENTS
    //=======================================================================================================
    //=======================================================================================================

    secretariatRouter.get('/events', (req, res)=>{    
        
        
       
        var queryString2 =`SELECT * FROM tbl_specialevent`
        
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);
            for(var i = 0; i < results.length; i++){

                results[i].time_eventstart= moment(results[i].time_eventstart).format('MM/DD/YYYY h:mm a');
                results[i].time_eventend= moment(results[i].time_eventend).format('MM/DD/YYYY h:mm a');
            }
            var specialevents = results;
           
               

                    return res.render('secretariat/views/events',{specialevents: specialevents });
              
        });     
    });

    
    secretariatRouter.post('/events/add', (req, res) => {
    var start= moment(req.body.start, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    var end= moment(req.body.end, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    
    var queryString4 = `INSERT INTO tbl_specialevent(int_userID, var_spceventname, text_eventdesc, time_eventstart, time_eventend, var_eventvenue, char_eventtype, var_approvalstatus ) VALUES(?,?, ?,?, ?,?, ?,?)`
        db.query(queryString4, [req.session.secretariat.int_userID, req.body.spceventname, req.body.eventdesc, start, end, req.body.venue, req.body.eventtype, "Approved"], (err, results, fields) => {         
            if (err) console.log(err);
                return res.redirect('/secretariat/events');
        });   

    });
    secretariatRouter.post('/events/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_specialevent WHERE int_specialeventID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) console.log(err);
            console.log(req.body.id1)
            return res.redirect('/secretariat/events');
        });
    });
    secretariatRouter.post('/events/query', (req, res) => {
        const queryString = `select * from tbl_specialevent WHERE int_specialeventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) console.log(err);
        res.send(results[0])
        console.log(results[0])
        });
    });
    secretariatRouter.post('/events/edit', (req, res) => {
        console.log(req.body)
        var start= moment(req.body.starttime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        var end= moment(req.body.endtime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        const queryString = `UPDATE tbl_specialevent SET  var_spceventname=?, text_eventdesc=?, time_eventstart=?, time_eventend=?, var_eventvenue=?, char_eventtype=? WHERE int_specialeventID=?`;
        db.query(queryString,[req.body.eventname,req.body.eventdesc,start,end,req.body.venue,req.body.eventtype,req.body.id1], (err, results, fields) => {        
            if (err) console.log(err);
            return res.redirect('/secretariat/events');   
        })
    })
    //=======================================================================================================
    //=======================================================================================================
 


















    secretariatRouter.get('/mass', (req, res)=>{
        
        
		var queryString=`SELECT * FROM tbl_mass`
            db.query(queryString, (err, results, fields) => {
                for(var i = 0; i < results.length; i++){
                    results[i].date_massdate= moment(results[i].date_massdate).format('MM/DD/YYYY');
                    results[i].time_massstart= moment(results[i].time_massstart, 'HH:mm:ss').format('hh:mm A'); 
                    results[i].time_massend= moment(results[i].time_massend, 'HH:mm:ss').format('hh:mm A'); 
                    results[i].time_massduration= moment(results[i].time_massduration, 'HH:mm:ss').format('hh:mm'); 
                }
                return res.render('secretariat/views/mass', {masss:results});
            })
      
    });


        secretariatRouter.post('/mass/add', (req, res) => {
        var start= moment(req.body.start, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
        
        
        var queryString4 = `INSERT INTO tbl_mass(
            time_massstart, 
            time_massduration, 
            var_massvenue, 
            char_masstype) VALUES(?,"01:00:00", ?,?)`
            db.query(queryString4, [start, req.body.duration, req.body.massvenue, req.body.masstype], (err, results, fields) => {         
                if (err) console.log(err);
                    return res.redirect('/secretariat/mass');
            });   
    
        });
        secretariatRouter.post('/mass/delete', (req, res) => {
            const queryString = `DELETE FROM tbl_mass WHERE int_massID= ?`;
            db.query(queryString,[req.body.id1], (err, results, fields) => {        
                if (err) console.log(err);
                console.log(req.body.id1)
                return res.redirect('/secretariat/mass');
            });
        });
        secretariatRouter.post('/mass/query', (req, res) => {
            const queryString = `select * from tbl_mass WHERE int_massID = ?`;
            db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
            });
        });
        secretariatRouter.post('/mass/edit', (req, res) => {
            console.log(req.body)
            var start= moment(req.body.starttime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
            const queryString = `UPDATE tbl_mass SET  time_massstart=?,var_massvenue=?, char_masstype=? WHERE int_massID=?`;
            db.query(queryString,[start,req.body.massvenue,req.body.masstype,req.body.id1], (err, results, fields) => {        
                if (err) console.log(err);
                return res.redirect('/secretariat/mass');   
            })
        })

    secretariatRouter.get('/cancelled', (req, res)=>{
        
      
        var queryString=`SELECT * FROM tbl_eventinfo 
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID 
            where tbl_eventinfo.char_approvalstatus='Cancelled' and tbl_eventinfo.var_eventstatus='Cancelled'`
            db.query(queryString, (err, results, fields) => {
                for(var i = 0; i < results.length; i++){
                    results[i].date_applied= moment(results[i].date_applied).format('MM/DD/YYYY');
                    results[i].date_approval= moment(results[i].date_approval).format('MM/DD/YYYY');
                    results[i].date_eventdate= moment(results[i].date_eventdate).format('MM/DD/YYYY');
                    results[i].time_eventstart= moment(results[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }
                return res.render('secretariat/views/cancelled', {cancels:results});
           
        })
    });
    secretariatRouter.get('/records', (req, res)=>{
       
        
            
            var queryString =`SELECT * FROM tbl_eventinfo 
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID 
            where tbl_eventinfo.var_eventstatus='Done' and tbl_eventinfo.char_approvalstatus='Approved'`
            db.query(queryString, (err, results, fields) => {
                for(var i = 0; i < results.length; i++){
                    results[i].date_applied= moment(results[i].date_applied).format('MM/DD/YYYY');
                    results[i].date_approval= moment(results[i].date_approval).format('MM/DD/YYYY');
                    results[i].date_eventdate= moment(results[i].date_eventdate).format('MM/DD/YYYY');
                    results[i].time_eventstart= moment(results[i].time_eventstart, 'HH:mm:ss').format('hh:mm A'); 
                }
                return res.render('secretariat/views/records', {records:results});
            })
        
                
	});



	secretariatRouter.get('/newpriestaccount', (req, res)=>{
        
        
        return res.render('secretariat/views/createaccount', {});
       
	});


	secretariatRouter.post('/newpriestaccount', (req, res)=>{
		var queryString = `INSERT INTO tbl_user(var_userlname, var_userfname, var_usermname, char_usergender, var_useraddress, var_usercontactnum, var_username, var_useremail, var_password, char_usertype) VALUES(?,?,?,?,?,?,?,?,?,?)`;
		db.query(queryString, [req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.contactnumber, req.body.username, req.body.email, req.body.createpassword, "Priest"], (err, results, fields) => {
			if (err) console.log(err);
			
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