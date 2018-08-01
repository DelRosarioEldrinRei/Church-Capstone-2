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
        var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
        var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
            db.query(queryString2, (err, results, fields) => {
                if (err) console.log(err);
                var reservation = results[0];
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                
            return res.render('secretariat/views/index',{ application : application, reservation : reservation, request : request});
        }); }); });

    });
    secretariatRouter.get('/details', (req, res)=>{
        res.render('secretariat/views/ref/details')
    });
//===============================================================================================//
// M A I N T E N A N C E //
//===============================================================================================//
//EVENTS
//=======================================================
    secretariatRouter.get('/maintenance-events', (req, res)=>{    
        var queryString2 =`SELECT * FROM tbl_specialevent`
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);
            for(var i = 0; i < results.length; i++){

                results[i].time_eventstart= moment(results[i].time_eventstart).format('MM/DD/YYYY h:mm a');
                results[i].time_eventend= moment(results[i].time_eventend).format('MM/DD/YYYY h:mm a');
            }
            return res.render('secretariat/views/maintenance/events',{specialevents: results });
        });     
    });

        secretariatRouter.post('/maintenance-events/add', (req, res) => {
        var start= moment(req.body.start, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
        var end= moment(req.body.end, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
        
        var queryString4 = `INSERT INTO tbl_specialevent(int_userID, var_spceventname, text_eventdesc, time_eventstart, time_eventend, var_eventvenue, char_eventtype, var_approvalstatus ) VALUES(?,?, ?,?, ?,?, ?,?)`
            db.query(queryString4, [req.session.secretariat.int_userID, req.body.spceventname, req.body.eventdesc, start, end, req.body.venue, req.body.eventtype, "Approved"], (err, results, fields) => {         
                if (err) throw err;
                    return res.redirect('/secretariat/maintenance-events');
            });   

        });

    secretariatRouter.post('/maintenance-events/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_specialevent WHERE int_specialeventID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            console.log(req.body.id1)
            return res.redirect('/secretariat/maintenance-events');
        });
    });


    // secretariatRouter.post('/maintenance-events/cancel/:int_specialeventID', (req, res) => {
    //     const queryString = `UPDATE tbl_specialevent SET var_approvalstatus = "Cancelled"
    //     WHERE int_specialeventID= ${req.params.int_specialeventID}`; 
        
    //     db.query(queryString, (err, results, fields) => {        
    //         if (err) throw err;
    //         return res.redirect('/secretariat/maintenance-events');
            
    //     });
    // });
    secretariatRouter.post('/maintenance-events/query', (req, res) => {
        const queryString = `select * from tbl_specialevent WHERE int_specialeventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) throw err;
        res.send(results[0])
        console.log(results[0])
        });
    });
    secretariatRouter.post('/maintenance-events/edit', (req, res) => {
        console.log(req.body)
        var start= moment(req.body.starttime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        var end= moment(req.body.endtime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        const queryString = `UPDATE tbl_specialevent SET  var_spceventname=?, text_eventdesc=?, time_eventstart=?, time_eventend=?, var_eventvenue=?, char_eventtype=? WHERE int_specialeventID=?`;
        db.query(queryString,[req.body.eventname,req.body.eventdesc,start,end,req.body.venue,req.body.eventtype,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-events');   
        })
    })
//=======================================================
//SERVICES
//=======================================================
    secretariatRouter.get('/maintenance-services', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_services where char_type = "Sacrament"`
        db.query(queryString1, (err, results1, fields) => {
            if (err) console.log(err)  
            var queryString2 =`SELECT * FROM tbl_services where char_type = "Special Service"`
            db.query(queryString2, (err, results2, fields) => {
                if (err) console.log(err);      
            return res.render('secretariat/views/maintenance/services',{ sacraments : results1, services:results2 });    
        }); });
    });

    secretariatRouter.post('/maintenance-services/add', (req, res) => {
        var queryString= `INSERT INTO tbl_event(
            var_eventname,
            var_eventdesc, 
            char_type
            ) VALUES(?,?,?);`  
            db.query(queryString, [req.body.eventname,req.body.eventdesc,req.body.event_type], (err, results, fields) => {
                if (err) throw err;
                    return res.redirect('/secretariat/maintenance-services');
            });            
        });

        
    secretariatRouter.post('/maintenance-services/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_services WHERE int_eventID=?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-services');
        });
    });


    secretariatRouter.post('/maintenance-services/edit', (req, res) => {
        const queryString = `UPDATE tbl_services SET var_eventname = ?,var_eventdesc = ?, char_type = ? WHERE int_eventID= ?`; 
        db.query(queryString,[req.body.eventname,req.body.eventdesc,req.body.eventtype,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-services');
        });
    });
    secretariatRouter.post('/maintenance-services/query', (req, res) => {
        var queryString = `SELECT * FROM tbl_services 
        WHERE int_eventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])   
        });
    });
//=======================================================
//FACILITY
//=======================================================
    secretariatRouter.get('/maintenance-facilities', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_facility`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);       
            return res.render('secretariat/views/maintenance/facilities',{ facilities : results });
        });     
    });


    secretariatRouter.post('/maintenance-facilities/addfacility', (req, res) => {
    
        var queryString= `INSERT INTO tbl_facility(var_facilityname, var_facilitydesc) VALUES(?,?);`  
            db.query(queryString,  [req.body.facilityname, req.body.facilitydesc], (err, results, fields) => {
                if (err) throw err;
                    return res.redirect('/secretariat/maintenance-facilities');
            });            
        });
    secretariatRouter.post('/maintenance-facilities/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_facility WHERE int_facilityID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-facilities');
            
        });
    });

    secretariatRouter.post('/maintenance-facilities/query', (req, res) => {
        const queryString = `SELECT * FROM tbl_facility WHERE int_facilityID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])
        });
    });

    secretariatRouter.post('/maintenance-facilities/edit', (req, res) => {
        const queryString = `UPDATE tbl_facility SET var_facilityname =?, var_facilitydesc= ?
        WHERE int_facilityID= ?`;
        db.query(queryString,[req.body.facilityname, req.body.facilitydesc,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-facilities');
            
        });
    });
//=======================================================
//MINISTRIES/ORG
//=======================================================
    secretariatRouter.get('/maintenance-ministries', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_ministry`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);       
            return res.render('secretariat/views/maintenance/ministries',{ ministries : results });
        });     
    });


    secretariatRouter.post('/maintenance-ministries/addministry', (req, res) => {
    
        var queryString= `INSERT INTO tbl_ministry(var_ministryname,var_ministrydesc) VALUES(?,?);`  
            db.query(queryString,  [req.body.ministryname,req.body.ministrydesc], (err, results, fields) => {
                if (err) throw err;
                    return res.redirect('/secretariat/maintenance-ministries');
            });            
        });
    secretariatRouter.post('/maintenance-ministries/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_ministry
        WHERE int_ministryID= ?`;
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-ministries');
            
        });
    });

    secretariatRouter.post('/maintenance-ministries/query', (req, res) => {
        
        var queryString = `SELECT * FROM tbl_ministry 
        WHERE int_ministryID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])
        });
    });

    secretariatRouter.post('/maintenance-ministries/edit', (req, res) => {
        const queryString = `UPDATE tbl_ministry SET var_ministryname =?,var_ministrydesc=?
        WHERE int_ministryID= ?`;
        
        db.query(queryString,[req.body.ministryname,req.body.ministrydesc,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/secretariat/maintenance-ministries');
            
        });
    });
//=======================================================
//REQUIREMENTS 
//=======================================================
    
    //non-wedding requirements
        secretariatRouter.get('/maintenance-nonwedrequirements', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Anointing of the sick")`
            var queryString2 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Baptism")`
            var queryString3 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Confirmation")`
            var queryString4 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Funeral Mass=" or var_eventname= "Funeral Service" )`
            // var queryString5 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Marriage")`
            var queryString6 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Establishment Blessing")`
            var queryString8 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="First Communion")`
            var queryString9 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Facility Reservation")`
            var queryString10 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Document Request")`
            var queryString11 =`SELECT var_eventname FROM tbl_services ORDER BY var_eventname`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err); 
                var anointings = results;
                db.query(queryString2, (err, results, fields) => {
                    if (err) console.log(err); 
                    var baptisms = results;
                    db.query(queryString3, (err, results, fields) => {
                        if (err) console.log(err); 
                        var confirmations = results;
                        db.query(queryString4, (err, results, fields) => {
                            if (err) console.log(err); 
                            var funerals = results;
                            // db.query(queryString5, (err, results, fields) => {
                            //     if (err) console.log(err); 
                            //     var marriages = results;
                                db.query(queryString6, (err, results, fields) => {
                                    if (err) console.log(err);
                                    var establishments = results; 
                                        db.query(queryString8, (err, results, fields) => {
                                            if (err) console.log(err);
                                            var eucharists = results;       
                                            db.query(queryString9, (err, results, fields) => {
                                                if (err) console.log(err);
                                                var reservations = results;       
                                                db.query(queryString10, (err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var requests = results; 
                                                    db.query(queryString11, (err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var services = results;       
                                                        console.log(services)
                return res.render('secretariat/views/maintenance/nonwedrequirements',{ anointings : anointings,baptisms : baptisms,confirmations : confirmations,funerals : funerals, establishments : establishments,eucharists : eucharists,reservations : reservations,requests: requests, services:services});
            }); }); }); }); }); }); }); }); }); 
            // });     
        });
        
        secretariatRouter.post('/maintenance-nonwedrequirements/add', (req, res) => {
            var queryString= `select int_eventID from tbl_services where var_eventname = ?`
            db.query(queryString, [req.body.eventname], (err, results, fields) => {
                if (err) throw err;
                    var eventid = results[0];
                    console.log(eventid)
                    var queryString1= `INSERT INTO tbl_requirementtype(int_eventID, var_reqname, var_reqdesc) VALUES(?,?,?);`  
                    db.query(queryString1,  [eventid.int_eventID, req.body.reqname, req.body.reqdesc], (err, results, fields) => {
                        if (err) throw err;
                        return res.redirect('/secretariat/maintenance-nonwedrequirements');
                    });
                });            
            });

            secretariatRouter.post('/maintenance-nonwedrequirements/delete', (req, res) => {
                const queryString = `DELETE FROM tbl_requirementtype
                WHERE int_reqtypeID= ${req.params.int_reqtypeID}`;
                
                db.query(queryString, (err, results, fields) => {        
                    if (err) throw err;
                    return res.redirect('/secretariat/maintenance-requirements');
                    
                });
            });

            secretariatRouter.post('/maintenance-nonwedrequirements/edit', (req, res) => {
                var queryString= `select int_eventID from tbl_services where var_eventname = ?`
                db.query(queryString,  [req.body.eventname], (err, results, fields) => {
                    if (err) throw err;
                        var eventid = results[0];
                        console.log(eventid);
                        const queryString1 = `UPDATE tbl_requirementtype SET int_eventID=?, var_reqname =?, var_reqdesc= ?
                        WHERE int_reqtypeID= ${req.params.int_reqtypeID}`;
                    
                        db.query(queryString1,[eventid.int_eventID, req.body.reqname, req.body.reqdesc], (err, results, fields) => {        
                            if (err) throw err;
                            return res.redirect('/secretariat/maintenance-requirements');
                        });    
                });
            });
            
        
    //wedding requirements
        secretariatRouter.get('/maintenance-wedrequirements', (req, res)=>{
            var queryString5 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Marriage") AND char_reqtype = "Civil"`
                db.query(queryString5, (err, results, fields) => {
                    if (err) console.log(err); 
                    var civils = results;
                    var queryString6 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Marriage") AND char_reqtype = "Church"`
                        db.query(queryString6, (err, results, fields) => {
                            if (err) console.log(err); 
                            var churches = results;
                            var queryString7 =`SELECT * FROM tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname ="Marriage") AND char_reqtype = "Chancery"`
                            db.query(queryString7, (err, results, fields) => {
                                if (err) console.log(err); 
                                var chanceries = results;
                return res.render('secretariat/views/maintenance/wedrequirements',{ civils : civils, churches: churches, chanceries: chanceries});
            }); 
            });     
        });     
        });

        secretariatRouter.post('/maintenance-wedrequirements/add', (req, res) => {
            var queryString= `select int_eventID from tbl_services where var_eventname = ?`
            db.query(queryString, ["Marriage"], (err, results, fields) => {
                if (err) throw err;
                    var eventid = results[0];
                    console.log(eventid)
                    var queryString1= `INSERT INTO tbl_requirementtype(int_eventID, var_reqname, var_reqdesc, char_reqmode, var_case, char_reqtype) VALUES(?,?,?,?,?,?);`  
                    db.query(queryString1,  [eventid.int_eventID, req.body.reqname, req.body.reqdesc, req.body.reqmode, req.body.case,  req.body.reqtype ], (err, results, fields) => {
                        if (err) throw err;
                        return res.redirect('/secretariat/maintenance-wedrequirements');
                    });
                });            
        });

        secretariatRouter.post('/maintenance-wedrequirements/delete', (req, res) => {
            const queryString = `DELETE FROM tbl_requirementtype
            WHERE int_reqtypeID= ?`;
            
            db.query(queryString,[req.body.id1], (err, results, fields) => {        
                if (err) throw err;
                return res.redirect('/secretariat/maintenance-wedrequirements');
                
            });
        });
        
        secretariatRouter.post('/maintenance-wedrequirements/query', (req, res) => {

            const queryString = `select * from tbl_requirementtype WHERE int_reqtypeID = ?`;
            db.query(queryString,[req.body.id2], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])
            });
        });
        
        secretariatRouter.post('/maintenance-wedrequirements/edit', (req, res) => {
            var queryString= `select int_eventID from tbl_services where var_eventname = ?`
            db.query(queryString,  [req.body.eventname], (err, results, fields) => {
                if (err) throw err;
                    var eventid = results[0];
                    console.log(eventid);
                    const queryString1 = `UPDATE tbl_requirementtype SET int_eventID=?, var_reqname =?, var_reqdesc= ?
                    WHERE int_reqtypeID=?`;
                
                    db.query(queryString1,[eventid.int_eventID, req.body.reqname, req.body.reqdesc,req.body.id1], (err, results, fields) => {        
                        if (err) throw err;
                        return res.redirect('/secretariat/maintenance-wedrequirements');
                    });    
            });
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

                reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
                reservations[i].time_reservestart= moment(reservations[i].time_reservestart, 'HH:mm:ss').format('h:mm a');
                reservations[i].time_reserveend= moment(reservations[i].time_reserveend, 'HH:mm:ss').format('h:mm a');
            }
            if (err) console.log(err);       
            return res.render('secretariat/views/transactions/facilityres',{ reservations : reservations });
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

            
            return res.render('secretariat/views/transactions/docureq',{ requests : requests });
        }); 
        
    });
    secretariatRouter.post('/transaction-documentrequest/query', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_documentrequest 
        join tbl_document on tbl_documentrequest.int_documentID = tbl_document.int_documentID
        where int_requestID = ?`
        db.query(queryString1,[req.body.id], (err, results, fields) => {
            if (err) console.log(err);
            res.send(results[0])
            console.log(results[0])
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
        join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        
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
    secretariatRouter.get('/transaction-blessings', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
        
        where tbl_services.var_eventname ='Anointings of the sick'`

            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var anointings=results;
                for(var i = 0; i < anointings.length; i++){
                    
                    anointings[i].date_birthday= moment(anointings[i].date_birthday).format('MM/DD/YYYY');
                    anointings[i].date_desireddate1= moment(anointings[i].date_desireddate1).format('MM/DD/YYYY');
                    anointings[i].time_desiredtime1= moment(anointings[i].time_desiredtime1,'HH:mm:ss').format('hh:mm A'); 
                    anointings[i].date_desireddate2= moment(anointings[i].date_desireddate2).format('MM/DD/YYYY');
                    anointings[i].time_desiredtime2= moment(anointings[i].time_desiredtime2,'HH:mm:ss').format('hh:mm A'); 
                }             
            
                var queryString3 =`SELECT * FROM tbl_eventinfo 
                    JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
                    JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
                    JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
                    JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
                    join tbl_blessing on tbl_eventinfo.int_eventinfoID = tbl_blessing.int_eventinfoID
                    
                    where tbl_services.var_eventname ='Funeral Service' OR tbl_services.var_eventname ='Funeral Mass'`

                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var funerals = results;                
                            for(var i = 0; i < funerals.length; i++){
                                
                                funerals[i].date_birthday= moment(funerals[i].date_birthday).format('MM/DD/YYYY');
                                funerals[i].date_desireddate1= moment(funerals[i].date_desireddate1).format('MM/DD/YYYY');
                                funerals[i].time_desiredtime1= moment(funerals[i].time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                                funerals[i].date_desireddate2= moment(funerals[i].date_desireddate2).format('MM/DD/YYYY');
                                funerals[i].time_desiredtime2= moment(funerals[i].time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                                
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
    secretariatRouter.get('/transaction-confirmation', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_eventinfo 
        JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
        JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        join tbl_baptism on tbl_eventinfo.int_eventinfoID = tbl_baptism.int_eventinfoID
        
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
                            if (err) console.log(err);
                            var specials = results;                
                            for(var i = 0; i < specials.length; i++){
                                
                                specials[i].date_birthday= moment(specials[i].date_birthday).format('MM/DD/YYYY');
                                specials[i].date_desireddate= moment(specials[i].date_desireddate).format('MM/DD/YYYY');
                                specials[i].time_desiredtime= moment(specials[i].time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                                
                            }   
                                // console.log('results' + results[i])

                            return res.render('secretariat/views/transactions/eventapp/confirmation',{regulars:regulars, specials:specials});
            }); 
        }); 
    });
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