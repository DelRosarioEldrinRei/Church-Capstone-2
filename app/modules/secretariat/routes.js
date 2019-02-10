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
		var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
		var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
		var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
			db.query(queryString1, (err, results, fields) => {
				if (err) console.log(err);
				var application = results[0];
				db.query(queryString2, (err, results, fields) => {
					if (err) console.log(err);
					var reservation = results[0];
					db.query(queryString3, (err, results, fields) => {
						if (err) console.log(err);
						var request = results[0];
						db.query(queryString4, (err, results, fields) => {
							if (err) console.log(err);
							var baptism = results[0];


		
				
			return res.render('secretariat/views/index',{application:application,reservation:reservation,request:request, baptism:baptism, });
		}); }); }); }); });


	secretariatRouter.get('/details', (req, res)=>{
		res.render('secretariat/views/ref/details')
	});

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
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                res.send({results:results[0],requirements:results1})
                console.log(results1)
            })
        });
    });
    secretariatRouter.post('/transaction-baptism/updateStatus',(req,res)=>{
            var queryString2 = `UPDATE tbl_payment SET char_paymentstatus =?
            WHERE int_paymentID = ?`
        db.query(queryString2,[req.body.paystatus,req.body.payid],(err,results,fields) =>{
            var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
            WHERE int_eventinfoID = ?`
            console.log(req.body)
            var eventstatus="";
            if(req.body.paystatus=="Paid" && req.body.eventstatus == "Cancelled"){
                var text="";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09123456789"
                for(i=0;i<8;i++){
                    text += possible.charAt(Math.floor(Math.random()*possible.length));
                }
                var date = new Date()
                var due_date1 = moment(date).add(7,'days')
                var due_date = moment(due_date1).format('YYYY-MM-DD')
                console.log(due_date)
                var queryString01 = `UPDATE tbl_payment set var_vouhercode = ? , date_refundissued = now(), date_refunddue =?WHERE int_paymentID = ?`
                db.query(queryString01,[text,due_date,req.body.payid],(err,results,fields)=>{
                    if(err) throw err;
                })
            }
            if(req.body.paystatus=="Paid" && req.body.reqstatus == "Approved"){
                eventstatus = "Approved"
            }
            else{
                eventstatus = req.body.eventstatus
            }
            console.log(eventstatus)
            db.query(queryString3,[eventstatus,req.body.id],(err,results,fields) =>{
                if(err) throw err
                if(eventstatus == "Approved"){
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
                                    if(results[0].var_eventname == "Special Baptism"){
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    }
                                    //- R E G U L A R  B A P T I S M
                                    else{
                                        console.log('Regular Baptism')
                                        var lastPriest = 0;
                                        var nextPriest = 0;
                                        var baptismDate;
                                        var queryDate = `SELECT date_eventdate FROM tbl_eventinfo WHERE int_eventinfoID = ?`
                                        var queryEvents = `SELECT * FROM tbl_eventinfo WHERE date_eventdate = ?`
                                        var updatePriests = `UPDATE tbl_eventinfo SET int_userpriestID = ? WHERE date_eventdate = ?`
                                        db.query(queryDate,[req.body.id],(err,results1,fields)=>{
                                            baptismDate = moment(results1[0].date_eventdate).format('YYYY-MM-DD');
                                            console.log(baptismDate)
                                            db.query(queryEvents, [baptismDate], (err, results2, fields) => {
                                                console.log(results2)
                                                if(results2[0].int_userpriestID == null){
                                                    var queryString1 = `SELECT tbl_user.int_userID ,tbl_eventinfo.date_eventdate FROM tbl_eventinfo 
                                                    JOIN tbl_services ON tbl_eventinfo.int_eventID = tbl_services.int_eventID
                                                    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
                                                    WHERE tbl_services.var_eventname = "Baptism" 
                                                    order by date_eventdate DESC`
                                                    db.query(queryString1,(err,results3,fields)=>{
                                                        console.log(results3[0])
                                                        if(results3[0] == undefined){
                                                        var queryString2 = `SELECT int_userID from tbl_user where char_usertype = "Priest"`
                                                        db.query(queryString2,(err,results4,fields)=>{ 
                                                            for(i=0;i<results.length;i++){
                                                                db.query(updatePriests,[results4[0].int_userID, baptismDate],(err,results,fields)=>{
                                                                    if(err) throw err;       
                                                                })  
                                                            }
                                                            res.send(results)
                                                        })
                                                        }
                                                            else if(results3[0].length != 0){
                                                            lastPriest = results3[0].int_userID
                                                            for(var o=0; o<results4.length; o++){
                                                                if(results4[o].int_userID == lastPriest){
                                                                    if(o == results4.length - 1 ){
                                                                        nextPriest = results4[0].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                    else{
                                                                        nextPriest = results[o+1].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                            }
                                                    })
                                                }
                                                else{
                                                    db.query(updatePriests,[results2[0].int_userpriestID, baptismDate],(err,results,fields)=>{
                                                        if(err) throw err;
                                                        res.send(results)
                                                    })
                                                }
                                            })
                                        })                                        
                                    }
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) throw err;
                    res.send(results)
                }
            }) 
        })
    })
    secretariatRouter.post('/transaction-baptism/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err;
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-baptism/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                for(i=0;i<results.length;i++){
                    if(results[i].var_reqstatus == "Approved"){
                        ctr++;
                    }
                    console.log(ctr)
                    console.log(results[0].char_paymentstatus)
                    if(ctr == results.length && results[0].char_paymentstatus == "Paid"){
                        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.eventid],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.eventid],(err,results,fields)=>{
                                console.log(results[0].int_userpriestID)
                                if(results[0].int_userpriestID == null){
                                var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                                , tbl_eventinfo.time_eventstart from tbl_user 
                                JOIN tbl_eventinfo ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID
                                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                                where tbl_services.var_eventname!="Baptism" AND tbl_eventinfo.date_eventdate =?
                                AND tbl_eventinfo.time_eventstart = ?           
                                `
                                db.query(queryString8,[results[0].date_eventdate,results[0].time_eventstart],(err,results1,fields)=>{
                                    if(results[0].var_eventname == "Special Baptism"){
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    }
                                    //- R E G U L A R  B A P T I S M
                                    else{
                                        console.log('Regular Baptism')
                                        var lastPriest = 0;
                                        var nextPriest = 0;
                                        var baptismDate;
                                        var queryDate = `SELECT date_eventdate FROM tbl_eventinfo WHERE int_eventinfoID = ?`
                                        var queryEvents = `SELECT * FROM tbl_eventinfo WHERE date_eventdate = ?`
                                        var updatePriests = `UPDATE tbl_eventinfo SET int_userpriestID = ? WHERE date_eventdate = ?`
                                        db.query(queryDate,[req.body.eventid],(err,results1,fields)=>{
                                            baptismDate = moment(results1[0].date_eventdate).format('YYYY-MM-DD');
                                            console.log(baptismDate)
                                            db.query(queryEvents, [baptismDate], (err, results2, fields) => {
                                                console.log(results2)
                                                if(results2[0].int_userpriestID == null){
                                                    var queryString1 = `SELECT tbl_user.int_userID ,tbl_eventinfo.date_eventdate FROM tbl_eventinfo 
                                                    JOIN tbl_services ON tbl_eventinfo.int_eventID = tbl_services.int_eventID
                                                    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
                                                    WHERE tbl_services.var_eventname = "Baptism" 
                                                    order by date_eventdate DESC`
                                                    db.query(queryString1,(err,results3,fields)=>{
                                                        console.log(results3[0])
                                                        if(results3[0] == undefined){
                                                        var queryString2 = `SELECT int_userID from tbl_user where char_usertype = "Priest"`
                                                        db.query(queryString2,(err,results4,fields)=>{ 
                                                            for(i=0;i<results.length;i++){
                                                                db.query(updatePriests,[results4[0].int_userID, baptismDate],(err,results,fields)=>{
                                                                    if(err) throw err;       
                                                                })  
                                                            }
                                                            res.send(results)
                                                        })
                                                        }
                                                            else if(results3[0].length != 0){
                                                            lastPriest = results3[0].int_userID
                                                            for(var o=0; o<results4.length; o++){
                                                                if(results4[o].int_userID == lastPriest){
                                                                    if(o == results4.length - 1 ){
                                                                        nextPriest = results4[0].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                    else{
                                                                        nextPriest = results[o+1].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                            }
                                                    })
                                                }
                                                else{
                                                    db.query(updatePriests,[results2[0].int_userpriestID, baptismDate],(err,results,fields)=>{
                                                        if(err) throw err;
                                                        res.send(results)
                                                    })
                                                }
                                            })
                                        })                                        
                                    }
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                    }
                    else{
                    }
                }
                
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
                    res.send(results)
                }); 
    }); 
    secretariatRouter.post('/transaction-baptism/paymentquery', (req, res)=>{
        var queryString1 =`SELECT * from tbl_eventinfo 
       
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
        JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
        JOIN tbl_voucherevents on tbl_voucherevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        where tbl_eventinfo.int_eventinfoID = ?`
        db.query(queryString1,[req.body.id1], (err, results, fields) => {
            if (err) console.log(err);
            results[0].date_issued = moment(results[0].date_issued,'YYYT-MM-DD HH:mm:ss').format('YYYY/MM/DD hh:mm a')
            res.send(results[0])
            console.log(results[0])
        });
    });


    //anointing of the sick 

    
    secretariatRouter.get('/transaction-anointing', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
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
            

            return res.render('secretariat/views/transactions/eventapp/anointing',{anointings:anointings});
       
            }); 
    });
    secretariatRouter.post('/transaction-anointing/query', (req, res)=>{
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
    secretariatRouter.post('/transaction-anointing/query/updateStatus', (req, res)=>{
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
            console.log(results)
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                res.send({results:results[0],requirements:results1})
                console.log(results1)
            })
        });
    });
    secretariatRouter.post('/transaction-anointing/updateStatus',(req,res)=>{
        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
        WHERE int_eventinfoID = ?`
            db.query(queryString3,[req.body.eventstatus,req.body.id],(err,results,fields) =>{
                if(err) throw err
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) throw err;
                    res.send(results)
                }
            }) 
    })
    secretariatRouter.post('/transaction-anointing/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err;
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-anointing/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                for(i=0;i<results.length;i++){
                    if(results[i].var_reqstatus == "Approved"){
                        ctr++;
                    }
                    console.log(ctr)
    
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.eventid],(err,results,fields)=>{
                                console.log(results[0].int_userpriestID)
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                     
                    
                }
                
            })
        })
    })
    


    //funeral service
    secretariatRouter.get('/transaction-funeralservice', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Funeral Service'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var funerals=results; 
                for(var i = 0; i < funerals.length; i++){
                    
                    funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                    funerals[i].date_eventdate= moment(funerals[i].date_eventdate).format('MM/DD/YYYY');
                    funerals[i].time_eventstart= moment(funerals[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                }             
            

            return res.render('secretariat/views/transactions/eventapp/funeralservice',{funerals:funerals});
       
            }); 
    });
    secretariatRouter.post('/transaction-funeralservice/query', (req, res)=>{
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
            console.log(results)
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                res.send({results:results[0],requirements:results1})
                console.log(results1)
            })
        });
    });
    secretariatRouter.post('/transaction-funeralservice/updateStatus',(req,res)=>{
        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus =?
        WHERE int_eventinfoID = ?`
            db.query(queryString3,[req.body.eventstatus,req.body.id],(err,results,fields) =>{
                if(err) throw err
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) throw err;
                    res.send(results)
                }
            }) 
    })
    secretariatRouter.post('/transaction-funeralservice/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err;
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-funeralservice/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                for(i=0;i<results.length;i++){
                    if(results[i].var_reqstatus == "Approved"){
                        ctr++;
                    }
                    console.log(ctr)
    
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.eventid],(err,results,fields)=>{
                                console.log(results[0].int_userpriestID)
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                     
                    
                }
                
            })
        })
    })
    
    //funeral mass
    secretariatRouter.get('/transaction-funeralmass', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        where tbl_services.var_eventname = 'Funeral Mass'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var funerals=results; 
                for(var i = 0; i < funerals.length; i++){
                    
                    funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                    funerals[i].date_eventdate= moment(funerals[i].date_eventdate).format('MM/DD/YYYY');
                    funerals[i].time_eventstart= moment(funerals[i].time_eventstart,'HH:mm:ss').format('hh:mm A'); 
                }             
            

            return res.render('secretariat/views/transactions/eventapp/funeralmass',{funerals:funerals});
       
            }); 
    });
    secretariatRouter.post('/transaction-funeralmass/query', (req, res)=>{
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
    secretariatRouter.post('/transaction-funeralmass/query/updateStatus', (req, res)=>{
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
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                res.send({results:results[0],requirements:results1})
                console.log(results1)
            })
        });
    });
    secretariatRouter.post('/transaction-funeralmass/updateStatus',(req,res)=>{
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
                if(err) throw err
                if(eventstatus == "Approved"){
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                   
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) throw err;
                    res.send(results)
                }
            }) 
        })
    })
    secretariatRouter.post('/transaction-funeralmass/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err;
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-funeralmass/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                for(i=0;i<results.length;i++){
                    if(results[i].var_reqstatus == "Approved"){
                        ctr++;
                    }
                    console.log(ctr)
                    console.log(results[0].char_paymentstatus)
                    if(ctr == results.length && results[0].char_paymentstatus == "Paid"){
                        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.eventid],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.eventid],(err,results,fields)=>{
                                console.log(results[0].int_userpriestID)
                                if(results[0].int_userpriestID == null){
                                var queryString8 = `SELECT tbl_user.int_userID, tbl_eventinfo.date_eventdate, tbl_eventinfo.int_eventinfoID
                                , tbl_eventinfo.time_eventstart from tbl_user 
                                JOIN tbl_eventinfo ON tbl_eventinfo.int_userpriestID = tbl_user.int_userID
                                JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
                                where tbl_services.var_eventname!="Baptism" AND tbl_eventinfo.date_eventdate =?
                                AND tbl_eventinfo.time_eventstart = ?           
                                `
                                db.query(queryString8,[results[0].date_eventdate,results[0].time_eventstart],(err,results1,fields)=>{
                                    if(results[0].var_eventname == "Special Baptism"){
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    }
                                    //- R E G U L A R  B A P T I S M
                                    else{
                                        console.log('Regular Baptism')
                                        var lastPriest = 0;
                                        var nextPriest = 0;
                                        var baptismDate;
                                        var queryDate = `SELECT date_eventdate FROM tbl_eventinfo WHERE int_eventinfoID = ?`
                                        var queryEvents = `SELECT * FROM tbl_eventinfo WHERE date_eventdate = ?`
                                        var updatePriests = `UPDATE tbl_eventinfo SET int_userpriestID = ? WHERE date_eventdate = ?`
                                        db.query(queryDate,[req.body.eventid],(err,results1,fields)=>{
                                            baptismDate = moment(results1[0].date_eventdate).format('YYYY-MM-DD');
                                            console.log(baptismDate)
                                            db.query(queryEvents, [baptismDate], (err, results2, fields) => {
                                                console.log(results2)
                                                if(results2[0].int_userpriestID == null){
                                                    var queryString1 = `SELECT tbl_user.int_userID ,tbl_eventinfo.date_eventdate FROM tbl_eventinfo 
                                                    JOIN tbl_services ON tbl_eventinfo.int_eventID = tbl_services.int_eventID
                                                    JOIN tbl_user ON tbl_user.int_userID = tbl_eventinfo.int_userpriestID
                                                    WHERE tbl_services.var_eventname = "Baptism" 
                                                    order by date_eventdate DESC`
                                                    db.query(queryString1,(err,results3,fields)=>{
                                                        console.log(results3[0])
                                                        if(results3[0] == undefined){
                                                        var queryString2 = `SELECT int_userID from tbl_user where char_usertype = "Priest"`
                                                        db.query(queryString2,(err,results4,fields)=>{ 
                                                            for(i=0;i<results.length;i++){
                                                                db.query(updatePriests,[results4[0].int_userID, baptismDate],(err,results,fields)=>{
                                                                    if(err) throw err;       
                                                                })  
                                                            }
                                                            res.send(results)
                                                        })
                                                        }
                                                            else if(results3[0].length != 0){
                                                            lastPriest = results3[0].int_userID
                                                            for(var o=0; o<results4.length; o++){
                                                                if(results4[o].int_userID == lastPriest){
                                                                    if(o == results4.length - 1 ){
                                                                        nextPriest = results4[0].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                    else{
                                                                        nextPriest = results[o+1].int_userID
                                                                        console.log(nextPriest)
                                                                        db.query(updatePriests,[nextPriest, baptismDate],(err,results,fields)=>{
                                                                            if(err) throw err;
                                                                            res.send(results)
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                            }
                                                    })
                                                }
                                                else{
                                                    db.query(updatePriests,[results2[0].int_userpriestID, baptismDate],(err,results,fields)=>{
                                                        if(err) throw err;
                                                        res.send(results)
                                                    })
                                                }
                                            })
                                        })                                        
                                    }
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                    }
                    else{
                    }
                }
                
            })
        })
    })


    //blessing
    secretariatRouter.get('/transaction-blessings', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
        JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
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
                JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
                JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
                join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
                where tbl_services.var_eventname = 'Funeral Mass'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var funerals1 = results;                
                            for(var i = 0; i < funerals1.length; i++){
                                
                                funerals1[i].date_birthday= moment(funerals1[i].date_birthday).format('MM/DD/YYYY');
                                funerals1[i].date_eventdate= moment(funerals1[i].date_eventdate).format('MM/DD/YYYY');
                                funerals1[i].time_eventstart= moment(funerals1[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }   
                            var queryString3 =`SELECT * FROM tbl_eventinfo 
                            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
                            JOIN tbl_requirements ON tbl_requirements.int_requirementID = tbl_requirementsinevents.int_requirementID
                            join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
                            where tbl_services.var_eventname = 'Funeral Service'`
            
                                    db.query(queryString3, (err, results, fields) => {
                                        if (err) console.log(err);
                                        var funerals2 = results;                
                                        for(var i = 0; i < funerals2.length; i++){
                                            
                                            funerals2[i].date_birthday= moment(funerals2[i].date_birthday).format('MM/DD/YYYY');
                                            funerals2[i].date_eventdate= moment(funerals2[i].date_eventdate).format('MM/DD/YYYY');
                                            funerals2[i].time_eventstart= moment(funerals2[i].time_eventstart, 'HH:mm:ss').format('hh:mm A');
                                            
                                        }   

                    var queryString4 =`SELECT * FROM tbl_houseblessing 
                    JOIN tbl_user on tbl_houseblessing.int_userID =tbl_user.int_userID
                    JOIN tbl_requirementshouse ON tbl_requirementshouse.int_houseblessID = tbl_houseblessing.int_houseblessID`

                        db.query(queryString4, (err, results, fields) => {
                            if (err) console.log(err);
                            var establishments = results;                
                            for(var i = 0; i < establishments.length; i++){
                                
                                
                                establishments[i].date_blessingdate= moment(establishments[i].date_blessingdate).format('MM/DD/YYYY');
                                establishments[i].time_blessingstart= moment(establishments[i].time_blessingstart, 'HH:mm:ss').format('hh:mm A');
                                
                            }   

                            return res.render('secretariat/views/transactions/eventapp/blessings',{anointings:anointings, funerals1:funerals1,funerals2:funerals2, establishments:establishments});
        });
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
    secretariatRouter.post('/transaction-blessing/query/updateStatus', (req, res)=>{
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
            console.log(results)
            var queryString2 = `SELECT * from tbl_requirements
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_requirementsinevents.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_requirementtype ON tbl_requirementtype.int_reqtypeID = tbl_requirements.int_reqtypeID
            WHERE tbl_eventinfo.int_eventinfoID = ?`
            db.query(queryString2,[req.body.id], (err, results1, fields) => {
                res.send({results:results[0],requirements:results1})
                console.log(results1)
            })
        });
    });
    secretariatRouter.post('/transaction-blessing/updateStatus',(req,res)=>{
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
                if(err) throw err
                if(eventstatus == "Approved"){
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                }
                else{
                    if(err) throw err;
                    res.send(results)
                }
            }) 
        })
    })
    secretariatRouter.post('/transaction-blessing/updateRequirementsReject',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Rejected" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err;
            res.send(results)
        })
    })
    secretariatRouter.post('/transaction-blessing/updateRequirements',(req,res)=>{
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved" 
        WHERE int_requirementID =? `
        db.query(queryString2,[req.body.id],(err,results,fields) =>{
            if(err) throw err
            var queryString = `SELECT * FROM tbl_requirements 
            JOIN tbl_requirementsinevents ON tbl_requirementsinevents.int_requirementID = tbl_requirements.int_requirementID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            WHERE tbl_eventinfo.int_eventinfoID =?`
            db.query(queryString,[req.body.eventid],(err,results,fields)=>{
                var ctr =0;
                for(i=0;i<results.length;i++){
                    if(results[i].var_reqstatus == "Approved"){
                        ctr++;
                    }
                    console.log(ctr)
                    console.log(results[0].char_paymentstatus)
                    if(ctr == results.length && results[0].char_paymentstatus == "Paid"){
                        var queryString3 = `UPDATE tbl_eventinfo SET char_approvalstatus = "Approved"
                        WHERE int_eventinfoID = ?`
                        db.query(queryString3,[req.body.eventid],(err,results,fields)=>{ 
                            var queryString9 = `SELECT * FROM tbl_eventinfo 
                            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
                            where int_eventinfoID = ?`
                            db.query(queryString9,[req.body.eventid],(err,results,fields)=>{
                                console.log(results[0].int_userpriestID)
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
                                                            if(err) throw err;
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
                                                                if(err) throw err;
                                                            })
                                                        }
                                                        res.send(results)
                                                })
                                            }
                                        })
                                    
                                    
                    
                                })
                                }
                                else{
                                    if(err) throw err;
                                    res.send(results)
                                }
                            })
                            // if(err) throw err;
                            // res.send(results[0])
                        })
                    }
                    else{
                    }
                }
                
            })
        })
    })
    


    secretariatRouter.get('/transaction-confirmation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
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
//==============================================================================================

    secretariatRouter.get('/transaction-marriage', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_eventinfo 
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            JOIN tbl_utilities ON tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
            JOIN tbl_wedbride on tbl_eventinfo.int_eventinfoID = tbl_wedbride.int_eventinfoID
            JOIN tbl_wedcouple on tbl_eventinfo.int_eventinfoID = tbl_wedcouple.int_eventinfoID
            JOIN tbl_wedgroom on tbl_eventinfo.int_eventinfoID = tbl_wedgroom.int_eventinfoID
            where tbl_services.var_eventname ='Marriage' order by tbl_eventinfo.int_eventinfoID`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var marriages=results;
                

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
            AND tbl_requirements.var_reqpath is not NULL`
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
        var queryString2 = `UPDATE tbl_requirements SET var_reqstatus = "Approved", datetime_reqreceived = ?
        WHERE int_requirementID =?`
        var value = req.body.id.split(',');
        db.query(queryString2,[datenow, value[0]],(err,results,fields) =>{
            if(err) throw err
            if(value[1]==0){
            var queryString3 = `select var_folderloc from tbl_wedcouple where int_eventinfoID= ?`
            db.query(queryString3,[req.body.eventinfoID],(err,results,fields) =>{
                if(err) console.log(err)
                console.log(results)
                var folderloc = results[0].var_folderloc
                // var value = results[0].var_folderloc.split(',');\

                var queryString3 = `insert into tbl_files(var_fileloc, int_requirementID) values(?,?) `
                db.query(queryString3,[folderloc, value[0]],(err,results,fields) =>{
                    if(err) console.log(err)
                    console.log(results)
                    res.send(results[0])
                 })})
                }
                else{
                    res.send(results[0])
                }
   
    })
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
            // console.log(results[0])
            res.send(results[0])
            // console.log(results[0])
        });
    });

    secretariatRouter.post('/transaction-marriage/availablepriests', (req, res)=>{
        
        var queryString1 =`SELECT * from tbl_user where char_usertype = 'Priest' 
        or char_usertype = 'Parish Priest'`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results)
            
            res.send({availablepriests:results})
            // console.log(results[0])
        });
    });

    secretariatRouter.post('/transaction-marriage/availablepriests', (req, res)=>{
        
        var queryString1 =`SELECT * from tbl_user where char_usertype = 'Priest' 
        or char_usertype = 'Parish Priest'`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results)
            
            res.send({availablepriests:results})
            // console.log(results[0])
        });
    });
    
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
            var assign = `UPDATE tbl_eventinfo SET int_userpriestID = ?
                WHERE int_eventinfoID =?`
                db.query(assign, [req.body.priestid, req.body.id], (err, results, fields) => {
                    
                    var assignname = `UPDATE tbl_wedcouple SET var_priestname = ?
                        WHERE int_eventinfoID =?`
                        db.query(assignname, [priestname, req.body.id], (err, results, fields) => {
                   
                            if(req.body.requested==1){
                                var priestrequested = `UPDATE tbl_eventinfo SET bool_priestrequested = ?
                                WHERE int_eventinfoID =?`
                                db.query(priestrequested, [req.body.requested, req.body.id], (err, results, fields) => {
                                    
                                    var priestaddrate = `select * from tbl_utilities 
                                    join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                    join tbl_payment on tbl_eventinfo.int_paymentID = tbl_eventinfo.int_paymentID
                                    where tbl_eventinfo.int_eventID = 5 and tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        var priestutilities = results[0]
                                        console.log(priestutilities)

                                        var newamount = priestutilities.dbl_amount + priestutilities.double_priestaddrate;
                                        if(req.body.requestpaid ==0){
                                            var newbalance = priestutilities.dbl_balance + priestutilities.double_priestaddrate;
                                            var newstatus = 'Unpaid'
                                        }
                                        else{
                                            var newbalance = priestutilities.dbl_balance
                                            var newstatus = 'Paid'
                                        }
                                        var priestrequested = `UPDATE tbl_payment SET dbl_amount = ?, dbl_balance =?, char_paymentstatus=?
                                            WHERE int_paymentID =?`
                                            db.query(priestrequested, [newamount, newbalance, newstatus,  priestutilities.int_paymentID], (err, results, fields) => {
                                                if (err) console.log(err);

                                                var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?)`
                                                db.query(schedtag, [req.body.priestid, req.body.id, priestutilities.date_eventdate,  priestutilities.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                    console.log(err)
                                                
                                                
                                                
                                                
                                                    
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
                            }
                            else{
                                var priestaddrate = `select * from tbl_utilities 
                                    join tbl_eventinfo on tbl_utilities.int_eventID = tbl_eventinfo.int_eventID
                                    join tbl_payment on tbl_eventinfo.int_paymentID = tbl_eventinfo.int_paymentID
                                    where tbl_eventinfo.int_eventID = 5 and tbl_eventinfo.int_eventinfoID =?`
                                    db.query(priestaddrate, [req.body.id],(err, results, fields) => {
                                        var priestutilities = results[0]
                                        console.log(priestutilities)
                                        var schedtag = `insert into tbl_schedule(int_userID, int_eventinfoID, date_sched, time_schedstart,  var_venue) values(?,?,?,?,?)`
                                        db.query(schedtag, [req.body.priestid, req.body.id, priestutilities.date_eventdate,  priestutilities.time_eventstart, 'INLPP'], (err, results, fields) => {
                                                            
                                        if (err) console.log(err);
                                        if (err){
                                            console.log(err)
                                            res.send({alertDesc:notsuccess})
                                        }
                                        else{
                                            res.send({alertDesc:success})
                                        }   
                                    })
                                    })
                            }
                })})


            // console.log(results[0])
        });
    });


    secretariatRouter.post('/transaction-marriage/getcabinets',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) throw err
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
            if(err) throw err
            res.send({compareresult:compareresult})
        })
    })

    secretariatRouter.post('/transaction-marriage/changeloc',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results1,fields) =>{
            var queryString3 = `select * from tbl_wedcouple where int_eventinfoID =?`
            db.query(queryString3,[req.body.id],(err,results,fields) =>{
            if(err) throw err
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

                var queryString5 = `UPDATE tbl_files SET var_fileloc = ?
                where var_fileloc = ?;`
                db.query(queryString5,[folderloc, req.body.prevfolderloc],(err,results,fields) =>{

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
                where tbl_schedule.int_eventinfoID = ?`
                db.query(queryString2,[req.body.id],(err,results,fields) =>{
                    if(err) console.log(err)
                    console.log(results)
                    res.send({schedules:results[0], eventdetails:eventdetails})
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
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            eventinfo=results[0];
            if (err) console.log(err);       
            console.log(results)
            var balance =eventinfo.dbl_balance-req.body.payment
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
        }); }); 
        
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

    //=======================================================================================================
    //=======================================================================================================
    // EVENTS
    //=======================================================================================================
    //=======================================================================================================

    secretariatRouter.get('/events', (req, res)=>{    
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
        var queryString2 =`SELECT * FROM tbl_specialevent`
        
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);
            for(var i = 0; i < results.length; i++){

                results[i].time_eventstart= moment(results[i].time_eventstart).format('MM/DD/YYYY h:mm a');
                results[i].time_eventend= moment(results[i].time_eventend).format('MM/DD/YYYY h:mm a');
            }
            var specialevents = results;
            db.query(newmessage, [req.session.secretariat.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.secretariat.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('secretariat/views/events',{specialevents: specialevents, messages:messages, newmessages:newmessages });
                }); });
        });     
    });

    
    secretariatRouter.post('/events/add', (req, res) => {
    var start= moment(req.body.start, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    var end= moment(req.body.end, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    
    var queryString4 = `INSERT INTO tbl_specialevent(int_userID, var_spceventname, text_eventdesc, time_eventstart, time_eventend, var_eventvenue, char_eventtype, var_approvalstatus ) VALUES(?,?, ?,?, ?,?, ?,?)`
        db.query(queryString4, [req.session.secretariat.int_userID, req.body.spceventname, req.body.eventdesc, start, end, req.body.venue, req.body.eventtype, "Approved"], (err, results, fields) => {         
            if (err) throw err;
                return res.redirect('/secretariat/events');
        });   

    });
    secretariatRouter.post('/events/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_specialevent WHERE int_specialeventID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            console.log(req.body.id1)
            return res.redirect('/secretariat/events');
        });
    });
    secretariatRouter.post('/events/query', (req, res) => {
        const queryString = `select * from tbl_specialevent WHERE int_specialeventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) throw err;
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
            if (err) throw err;
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

    secretariatRouter.get('/cancelled', (req, res)=>{
		var queryString=`SELECT * FROM tbl_eventinfo 
            JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
            
            JOIN tbl_payment ON tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID 
            where tbl_eventinfo.char_approvalstatus='Cancelled'`
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
            where tbl_eventinfo.char_approvalstatus='Done'`
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