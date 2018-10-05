var express = require('express');
var adminRouter = express.Router();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();
var multer = require('multer');
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
adminRouter.use(authMiddleware.adminAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
    adminRouter.get('/', (req, res)=>{
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
            return res.render('admin/views/index',{ application:application,reservation:reservation,request:request});
        }); }); });
    });
    adminRouter.get('/details', (req, res)=>{
        res.render('admin/views/ref/details')
    });
//===============================================================================================//
// M A I N T E N A N C E //
//===============================================================================================//
//EVENTS
//=======================================================
    adminRouter.get('/maintenance-events', (req, res)=>{    
        var queryString2 =`SELECT * FROM tbl_specialevent`
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);
            for(var i = 0; i < results.length; i++){

                results[i].time_eventstart= moment(results[i].time_eventstart).format('MM/DD/YYYY h:mm a');
                results[i].time_eventend= moment(results[i].time_eventend).format('MM/DD/YYYY h:mm a');
            }
            return res.render('admin/views/maintenance/events',{specialevents: results });
        });     
    });
    adminRouter.post('/maintenance-events/add', (req, res) => {
    var start= moment(req.body.start, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    var end= moment(req.body.end, 'MM/DD/YYYY h:mm a').format('YYYY-MM-DD HH:mm:ss');
    
    var queryString4 = `INSERT INTO tbl_specialevent(int_userID, var_spceventname, text_eventdesc, time_eventstart, time_eventend, var_eventvenue, char_eventtype, var_approvalstatus ) VALUES(?,?, ?,?, ?,?, ?,?)`
        db.query(queryString4, [req.session.admin.int_userID, req.body.spceventname, req.body.eventdesc, start, end, req.body.venue, req.body.eventtype, "Approved"], (err, results, fields) => {         
            if (err) throw err;
                return res.redirect('/admin/maintenance-events');
        });   

    });
    adminRouter.post('/maintenance-events/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_specialevent WHERE int_specialeventID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            console.log(req.body.id1)
            return res.redirect('/admin/maintenance-events');
        });
    });
    adminRouter.post('/maintenance-events/query', (req, res) => {
        const queryString = `select * from tbl_specialevent WHERE int_specialeventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) throw err;
        res.send(results[0])
        console.log(results[0])
        });
    });
    adminRouter.post('/maintenance-events/edit', (req, res) => {
        console.log(req.body)
        var start= moment(req.body.starttime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        var end= moment(req.body.endtime, 'YYYY-MM-DD h:mm a').format('YYYY-MM-DD HH:mm:ss');
        const queryString = `UPDATE tbl_specialevent SET  var_spceventname=?, text_eventdesc=?, time_eventstart=?, time_eventend=?, var_eventvenue=?, char_eventtype=? WHERE int_specialeventID=?`;
        db.query(queryString,[req.body.eventname,req.body.eventdesc,start,end,req.body.venue,req.body.eventtype,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-events');   
        })
    })
//=======================================================
//SERVICES
//=======================================================
    adminRouter.get('/maintenance-services', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_services where char_type = "Sacrament"`
        db.query(queryString1, (err, results1, fields) => {
            if (err) console.log(err)  
            var queryString2 =`SELECT * FROM tbl_services where char_type = "Special Service"`
            db.query(queryString2, (err, results2, fields) => {
                if (err) console.log(err);      
            return res.render('admin/views/maintenance/services',{ sacraments : results1, services:results2 });    
        }); });
    });
    adminRouter.post('/maintenance-services/add', (req, res) => {
        var queryString= `INSERT INTO tbl_services(
            var_eventname,
            var_eventdesc, 
            char_type,
            bool_isDeleted
            ) VALUES(?,?,?,0);`  
            db.query(queryString, [req.body.eventname,req.body.eventdesc,req.body.event_type], (err, results, fields) => {
                if (err) throw err;
                    return res.redirect('/admin/maintenance-services');
            });            
        });
    adminRouter.post('/maintenance-services/delete', (req, res) => {
        const queryString = `UPDATE tbl_services SET bool_isDeleted = 1`;
        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-services');
        });
    });
    adminRouter.post('/maintenance-services/edit', (req, res) => {
        const queryString = `UPDATE tbl_services SET var_eventname = ?,var_eventdesc = ?, char_type = ?, char_status =? WHERE int_eventID= ?`; 
        db.query(queryString,[req.body.eventname,req.body.eventdesc,req.body.eventtype,req.body.status,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-services');
        });
    });
    adminRouter.post('/maintenance-services/query', (req, res) => {
        var queryString = `SELECT * FROM tbl_services 
        WHERE int_eventID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])   
        });
    });
//=======================================================
//PRIESTS
//=======================================================
adminRouter.get('/maintenance-priests', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_user where char_usertype = "Priest"`
    db.query(queryString1, (err, results1, fields) => {
        if (err) console.log(err)  
         
        return res.render('admin/views/maintenance/priest',{ priests : results1});    
    }); 
});
adminRouter.post('/maintenance-priests/add', (req, res) => {
    var queryString= `INSERT INTO tbl_user( var_userlname, var_userfname, var_usermname, char_usergender, var_useraddress, var_usercontactnum, var_username, var_useremail, var_password, char_usertype, var_userstatus)
     VALUES(?,?,?,?,?, ?,?,?,?,?,?);`  
        db.query(queryString, [req.body.var_userlname, req.body.var_userfname, req.body.var_usermname, "Male", req.body.var_useraddress, req.body.var_usercontactnum, req.body.var_username, req.body.var_useremail, req.body.var_password, "Priest", "Unconfirmed"], (err, results, fields) => {
            if (err) throw err;
                return res.redirect('/admin/maintenance-priests');
        });            
});
adminRouter.post('/maintenance-priest/status', (req, res) => {
    const queryString = `UPDATE tbl_user SET var_userstatus = Transfered`;
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/admin/maintenance-priests');
    });
});
adminRouter.post('/maintenance-priests/edit', (req, res) => {
    const queryString = `UPDATE tbl_user SET var_userlname = ?, var_userfname = ?, var_usermname = ?, var_usercontactnum = ?, var_useremail = ?, var_useraddress = ?, var_username = ?, var_password = ? WHERE int_userID= ?`; 
    db.query(queryString,[req.body.var_userlname, req.body.var_userfname, req.body.var_usermname, req.body.var_usercontactnum, req.body.var_useremail, req.body.var_useraddress, req.body.var_username, req.body.var_password,req.body.id1], (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/admin/maintenance-priests');
    });
});
adminRouter.post('/maintenance-priests/query', (req, res) => {
    var queryString = `SELECT * FROM tbl_user WHERE int_userID = ?`;
    db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) throw err;
        res.send(results[0])
        console.log(results[0])   
    });
});
adminRouter.post('/maintenance-priests/delete', (req, res) => {
    const queryString = `DELETE FROM tbl_user WHERE int_userID= ?`;
    db.query(queryString,[req.body.id1], (err, results, fields) => {        
        if (err) throw err;
        return res.redirect('/admin/maintenance-priests');
    });
});
adminRouter.post('/maintenance-priests/changestatus', (req, res)=>{
    var success =0
    var notsuccess =1
    console.log(req.body.id1)
    var queryString1 = `UPDATE tbl_user SET        
            var_userstatus = "${req.body.userstatus}"
            where int_userID= ${req.body.id1};`;
    db.query(queryString1, (err, results, fields) => {
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
//=======================================================
//FACILITY
//=======================================================
    adminRouter.get('/maintenance-facilities', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_facility join tbl_utilities_facility on 
        tbl_utilities_facility.int_utilitiesfacilityID=tbl_facility.int_facilityID`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);  
            for(var i = 0; i < results.length; i++){
                results[i].time_feeper= moment(results[i].time_feeper, "HH:mm:ss").format('hh'); 
                results[i].time_addper= moment(results[i].time_addper, 'HH:mm:ss').format('hh'); 
            }     
           
            console.log(results)
            return res.render('admin/views/maintenance/facilities',{ facilities : results });
        });     
    });
    adminRouter.post('/maintenance-facilities/add', (req, res) => {
        var success =0
        var notsuccess =1
        console.log(req.body)
        var queryString= `INSERT INTO tbl_facility( var_facilityname, var_facilitydesc) VALUES(?,?);`  
        var queryString1= `INSERT INTO tbl_utilities_facility(int_facilityID,int_reservationmaxdays,int_reservationmindays,int_requirementsdays,var_availabledays,time_availablestart,time_availableend,bool_withpayment,double_fee,time_feeper,double_addrate,time_addper,int_maxpax,var_facilitysize,int_downpaymentdays,int_fullpaymentdays,bool_refundable,int_refundpercent,int_refunddays,char_facilitystatus)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`  
            db.query(queryString,[req.body.var_facilityname,req.body.var_facilitydesc], (err, results, fields) => {
                    console.log(results)
                    var facilitydetails = results;
                    var availabledays=[];
                    if(req.body.sun==1){availabledays.push(0)}
                    if(req.body.mon==1){availabledays.push(1)}
                    if(req.body.tues==1){availabledays.push(2)}
                    if(req.body.wed==1){availabledays.push(3)}
                    if(req.body.thurs==1){availabledays.push(4)}
                    if(req.body.fri==1){availabledays.push(5)}
                    if(req.body.sat==1){availabledays.push(6)}
                    console.log(availabledays)
                    var days = availabledays.toString();
                db.query(queryString1,[facilitydetails.insertId, req.body.int_reservationmaxdays, req.body.int_reservationmindays, req.body.int_requirementsdays, days, req.body.time_availablestart, req.body.time_availableend, req.body.bool_withpayment, req.body.double_fee, req.body.time_feeper, req.body.double_addrate, req.body.time_addper, req.body.int_maxpax, req.body.var_facilitysize, req.body.int_downpaymentdays, req.body.int_fullpaymentdays, req.body.bool_refundable, req.body.int_refundpercent, req.body.int_refunddays, 'Can be reserved'], (err, results, fields) => {
                        res.send({facilityid:facilitydetails.insertId})
                });});            
    });
    adminRouter.post('/maintenance-facilities/delete', (req, res) => {
        var success =0
        var notsuccess =1
        const queryString = `DELETE FROM tbl_utilities_facility WHERE int_facilityID= ?`;
        const queryString1 = `DELETE FROM tbl_facility WHERE int_facilityID= ?`;
        db.query(queryString,[req.body.id1], (err, results, fields) => {
            db.query(queryString1,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            // return res.redirect('/admin/maintenance-facilities');
            if (err){
                console.log(err)
                res.send({alertDesc:notsuccess})
            }
            else{
                res.send({alertDesc:success})
                console.log(results)
            }
        });});
    });
    adminRouter.get('/maintenance-facilities/update', (req, res)=>{
        console.log("==========================================")
        console.log("View details (req.query.id): "+req.query.id) 
        console.log("==========================================")
        var utilitiesID = parseInt(req.query.id)
        var queryString1 =`SELECT * FROM tbl_facility join tbl_utilities_facility on 
        tbl_utilities_facility.int_utilitiesfacilityID=tbl_facility.int_facilityID where tbl_facility.int_facilityID=?`
        db.query(queryString1,[utilitiesID], (err, results, fields) => {
            if (err) console.log(err);       
            var facilities = results[0];
            console.log("==========================================")
            console.log("Results set: "+JSON.stringify(facilities))
            console.log("==========================================")
            var sun=0; var mon=0; var tues=0; var wed=0; var thurs=0; var fri=0; var sat=0;
            if(facilities.var_availabledays!=null){
                var days = facilities.var_availabledays.split(',');
                console.log(days)
                for(i=0; i<days.length; i++){
                    if(days[i]==0){sun=1;}
                    if(days[i]==1){mon=1;}
                    if(days[i]==2){tues=1;}
                    if(days[i]==3){wed=1;}
                    if(days[i]==4){thurs=1;}
                    if(days[i]==5){fri=1;}
                    if(days[i]==6){sat=1;}
                }
            }
            if(facilities.time_availablestart!=null)facilities.time_availablestart= moment(facilities.time_availablestart,'HH:mm:ss').format('hh:mm A'); 
            if(facilities.time_availableend!=null)facilities.time_availableend= moment(facilities.time_availableend,'HH:mm:ss').format('hh:mm A'); 
            facilities.time_feeper= moment(facilities.time_feeper,'HH:mm:ss').format('hh'); 
            facilities.time_addper= moment(facilities.time_addper,'HH:mm:ss').format('hh'); 
            console.log(facilities)
            return res.render('admin/views/maintenance/editfacility',{ facilities : facilities, mon:mon, sun:sun, tues:tues, wed:wed, thurs:thurs, fri:fri, sat:sat, sun:sun});
            
        }); 
    });
    adminRouter.post('/maintenance-facilities/changestatus', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body.id1)
        var queryString1 = `UPDATE tbl_utilities_facility SET        
                char_facilitystatus = "${req.body.facilitystatus}"
                where int_utilitiesfacilityID= ${req.body.id1};`;
        db.query(queryString1, (err, results, fields) => {
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
    adminRouter.post('/maintenance-facilities/upload', upload.single('image'), (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body.id1)
        var path = '/img/req/'+req.file.filename;
        var queryString1 = `UPDATE tbl_facility SET        
                var_facilitypicpath =?
                where int_facilityID= ${req.body.int_facilityID};`;
        db.query(queryString1, [path],(err, results, fields) => {
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
    adminRouter.post('/maintenance-facilities/update', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        console.log(req.body.int_utilitiesfacilityID);  
        var availabledays=[];
        if(req.body.sun==1){availabledays.push(0)}
        if(req.body.mon==1){availabledays.push(1)}
        if(req.body.tues==1){availabledays.push(2)}
        if(req.body.wed==1){availabledays.push(3)}
        if(req.body.thurs==1){availabledays.push(4)}
        if(req.body.fri==1){availabledays.push(5)}
        if(req.body.sat==1){availabledays.push(6)}
        console.log(availabledays)
        var days = availabledays.toString();
        console.log(days)
        var queryString1 = `UPDATE tbl_utilities_facility SET        
                int_reservationmaxdays='${req.body.int_reservationmaxdays}',
                int_reservationmindays='${req.body.int_reservationmindays}',
                int_requirementsdays='${req.body.int_requirementsdays}',
                
                time_availablestart='${req.body.time_availablestart}',
                time_availableend='${req.body.time_availableend}',
                bool_withpayment='${req.body.bool_withpayment}',
                double_fee='${req.body.double_fee}',
                time_feeper='${req.body.time_feeper}',
                double_addrate='${req.body.double_addrate}',
                time_addper='${req.body.time_addper}',
                int_maxpax='${req.body.int_maxpax}',
                var_facilitysize='${req.body.var_facilitysize}',
                int_downpaymentdays='${req.body.int_downpaymentdays}',
                int_fullpaymentdays='${req.body.int_fullpaymentdays}',
                bool_refundable='${req.body.bool_refundable}',
                int_refundpercent='${req.body.int_refundpercent}',
                int_refunddays='${req.body.int_refunddays}',
                var_availabledays='${days}',
                char_facilitystatus='${req.body.char_facilitystatus}'
                
                where int_utilitiesfacilityID= ?`;
        var queryString = `UPDATE tbl_facility SET        
                var_facilityname='${req.body.var_facilityname}',
                var_facilitydesc='${req.body.var_facilitydesc}'
                
                where int_facilityID= ?`;
        db.query(queryString, [req.body.int_facilityID], (err, results, fields) => {
            if (err) console.log(err);
            db.query(queryString1, [req.body.int_utilitiesfacilityID], (err, results, fields) => {
                if (err) console.log(err);              
            console.log(availabledays)
            if (err){
                console.log(err)
                res.send({alertDesc:notsuccess})
            }
            else{
                res.send({alertDesc:success})
                console.log(results)
            }
        }); }); 
    });
   
//=======================================================
//MINISTRIES/ORG
//=======================================================
    adminRouter.get('/maintenance-ministries', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_ministry`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);       
            return res.render('admin/views/maintenance/ministries',{ ministries : results });
        });     
    });
    adminRouter.post('/maintenance-ministries/addministry', (req, res) => {
    
        var queryString= `INSERT INTO tbl_ministry(var_ministryname,var_ministrydesc) VALUES(?,?);`  
            db.query(queryString,  [req.body.ministryname,req.body.ministrydesc], (err, results, fields) => {
                if (err) throw err;
                    return res.redirect('/admin/maintenance-ministries');
            });            
    });
    adminRouter.post('/maintenance-ministries/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_ministry
        WHERE int_ministryID= ?`;
        
        db.query(queryString,[req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-ministries');
            
        });
    });
    adminRouter.post('/maintenance-ministries/query', (req, res) => {
        
        var queryString = `SELECT * FROM tbl_ministry 
        WHERE int_ministryID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0])
        });
    });
    adminRouter.post('/maintenance-ministries/edit', (req, res) => {
        const queryString = `UPDATE tbl_ministry SET var_ministryname =?,var_ministrydesc=?
        WHERE int_ministryID= ?`;
        
        db.query(queryString,[req.body.ministryname,req.body.ministrydesc,req.body.id1], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-ministries');
            
        });
    });
//=======================================================
//REQUIREMENTS 
//=======================================================
    adminRouter.get('/maintenance-service-requirements', (req, res)=>{
        var queryString1 =`SELECT * FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID where tbl_services.var_eventname<>'Marriage' order by tbl_services.var_eventname`
        db.query(queryString1, (err, results1, fields) => {
            var queryString2 =`SELECT * FROM tbl_services`
            db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);       
            return res.render('admin/views/maintenance/requirements/eventrequirements',{ requirements:results1,services:results2 });
            });
        });     
    });
    adminRouter.post('/maintenance-service-requirements/add', (req, res) => {
        var queryString=`INSERT INTO tbl_requirementtype(var_reqname,var_reqdesc,char_reqmode,char_reqtype,int_eventID) 
        VALUES(?,?,?,?,?)`  
            db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.reqmode,req.body.reqtype,req.body.id], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-service-requirements');
            });            
    });
    adminRouter.post('/maintenance-service-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_requirementtype
        WHERE int_reqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-service-requirements');
            
        });
    });
    adminRouter.post('/maintenance-service-requirements/query', (req, res) => {
        const queryString1 = `SELECT tbl_requirementtype.*,tbl_services.var_eventname FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID
        WHERE int_reqtypeID = ?`;
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            const queryString2 = `SELECT int_eventID,var_eventname from tbl_services`;
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            res.send({requirementtype:results1[0],services:results2})
            console.log(results1[0])
            console.log(results2)
            });
        });
    });
    adminRouter.post('/maintenance-services-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_requirementtype SET var_reqname =?, var_reqdesc= ?, char_reqmode=?,char_reqtype=?,int_eventID=?
        WHERE int_reqtypeID= ?`;
        db.query(queryString,[req.body.reqname, req.body.reqdesc,req.body.reqmode,req.body.reqtype,req.body.eventID,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facilities');
            
        });
    });

    // Documents Requirements
    adminRouter.get('/maintenance-document-requirements', (req, res)=>{
            var queryString =`SELECT * FROM tbl_docureqtype`
            db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);       
            return res.render('admin/views/maintenance/requirements/docurequirements',{requirements:results});
            });
    });
    adminRouter.post('/maintenance-document-requirements/add', (req, res) => {
        var queryString=`INSERT INTO tbl_docureqtype(var_reqname,var_reqdesc) 
        VALUES(?,?)`  
            db.query(queryString,[req.body.reqname,req.body.reqdesc], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-document-requirements');
            });            
    });
    adminRouter.post('/maintenance-document-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_docureqtype
        WHERE int_docureqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-document-requirements');
            
        });
    });
    adminRouter.post('/maintenance-document-requirements/query', (req, res) => {
        const queryString = `SELECT * from tbl_docureqtype
        WHERE int_docureqtypeID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results)
            });
    });
    adminRouter.post('/maintenance-document-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_docureqtype SET var_reqname =?, var_reqdesc= ?
        WHERE int_docureqtypeID= ?`;
        db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-document-requirements');
            
        });
    });

    // Facility Reservation Requirements
    adminRouter.get('/maintenance-facility-requirements', (req, res)=>{
        var queryString =`SELECT * FROM tbl_facilityreqtype`
        db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);       
        return res.render('admin/views/maintenance/requirements/facilityrequirements',{requirements:results});
        });
    });
    adminRouter.post('/maintenance-facility-requirements/add', (req, res) => {
        var queryString=`INSERT INTO tbl_facilityreqtype(var_reqname,var_reqdesc) 
        VALUES(?,?)`  
            db.query(queryString,[req.body.reqname,req.body.reqdesc], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-facility-requirements');
            }); 
    });
    adminRouter.post('/maintenance-facility-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_facilityreqtype
        WHERE int_facilityreqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facility-requirements');
            
        });
    });
    adminRouter.post('/maintenance-facility-requirements/query', (req, res) => {
        const queryString = `SELECT * from tbl_facilityreqtype
        WHERE int_facilityreqtypeID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results)
            });
    });
    adminRouter.post('/maintenance-facility-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_facilityreqtype SET var_reqname =?, var_reqdesc= ?
        WHERE int_facilityreqtypeID= ?`;
        db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facility-requirements');    
        });
    });
//=======================================================
// ITEM MONITORING
//=======================================================

    adminRouter.get('/maintenance-items', (req, res)=>{
        var queryString =`SELECT * FROM tbl_items`
        db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        return res.render('admin/views/maintenance/item',{items:results});
        });
    });
    adminRouter.post('/maintenance-items/add', (req, res) => {
        var queryString1=`INSERT INTO tbl_items(var_itemname,var_itemdesc,int_goodquantity,int_damagedquantity) 
        VALUES(?,?,?,?)`  
        db.query(queryString1,[req.body.reqname,req.body.reqdesc,req.body.good,0], (err, results, fields) => {
                if (err) console.log(err);
                return res.redirect('/admin/maintenance-items');
            }); 
    });
    adminRouter.post('/maintenance-items/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_items
        WHERE int_itemID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-items');
            
        });
    });
    adminRouter.post('/maintenance-items/query', (req, res) => {
        const queryString = `SELECT * from tbl_items
        WHERE int_itemID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results[0].int_goodquantity)
            });
    });
    adminRouter.post('/maintenance-items/addItems', (req, res) => {
        const queryString1 = `SELECT int_goodquantity from tbl_items
        WHERE int_itemID = ?`;
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            console.log(results1[0].int_goodquantity)
            sum = eval(req.body.total) + eval(results1[0].int_goodquantity)
            console.log("sum: " + sum)
            const queryString2 = `UPDATE tbl_items SET int_goodquantity =?
            WHERE int_itemID =?`;
            db.query(queryString2,[sum,req.body.id], (err, results2, fields) => { 
            if (err) throw err;
            return res.redirect('/admin/maintenance-items');
            });
        });
    });
    adminRouter.post('/maintenance-items/edit', (req, res) => {
        const queryString = `UPDATE tbl_items SET var_itemname =?, var_itemdesc= ?,int_goodquantity=?,int_damagedquantity=?
        WHERE int_itemID= ?`;
        db.query(queryString,[req.body.itemname,req.body.itemdesc,req.body.good,req.body.damaged,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-items');    
        });
    });

//===============================================================================================//
// U T I L I T I E S //
//===============================================================================================//
adminRouter.post('/utilities-services/query', (req, res) => {
    var queryString1 =`SELECT * FROM tbl_utilities join tbl_services on tbl_utilities.int_eventID= tbl_services.int_eventID where tbl_utilities.int_utilitiesID = ?`    
    db.query(queryString1,[req.body.id], (err, results1, fields) => {
        res.send({firstQuery:results1[0]});
    }); 
})
adminRouter.get('/utilities-services', (req, res)=>{
    var queryString2 =`SELECT * FROM tbl_utilities join tbl_services on tbl_utilities.int_eventID= tbl_services.int_eventID and tbl_utilities.int_eventID is not null`    
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);       
            var services= results
            
            for(var i = 0; i < services.length; i++){
                services[i].time_availablestart= moment(services[i].time_availablestart,'HH:mm:ss').format('hh:mm A'); 
                services[i].time_availableend= moment(services[i].time_availableend,'HH:mm:ss').format('hh:mm A'); 
            }
        return res.render('admin/views/utilities/services/index',{ services : services});
    }); 
}); 
adminRouter.get('/utilities-specialservices', (req, res)=>{
    
    var queryString2 =`SELECT * FROM tbl_utilities join tbl_serviceutilities on tbl_utilities.int_serviceutilitiesID= tbl_serviceutilities.int_serviceutilitiesID where tbl_utilities.int_serviceutilitiesID is not null`
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);       
            var services= results
            // console.log(results)
            for(var i = 0; i < services.length; i++){
                    services[i].time_availablestart= moment(services[i].time_availablestart,'HH:mm:ss').format('hh:mm A'); 
                    services[i].time_availableend= moment(services[i].time_availableend,'HH:mm:ss').format('hh:mm A'); 
            }
        return res.render('admin/views/utilities/specialservices/index',{ services : services});
    }); 
}); 
//===============================================================================================//
//S E R V I C E S 
//======================================================
adminRouter.post('/utilities-services/viewdetails/query', (req, res) => {
    var queryString = `SELECT * FROM tbl_utilities
    join tbl_serviceutilities on tbl_utilities.int_serviceutilitiesID =tbl_serviceutilities.int_serviceutilitiesID
    WHERE int_utilitiesID = ?`;
    db.query(queryString,[req.body.id], (err, results, fields) => {        
        if (err) throw err;
        res.send(results[0])
        console.log(results[0])   
    });
});
adminRouter.get('/utilities-services/viewdetails', (req, res)=>{
    console.log("==========================================")
    console.log("View details (req.query.id): "+req.query.id) 
    console.log("==========================================")
    var utilitiesID = parseInt(req.query.id)
    var queryString1 =`SELECT * FROM tbl_utilities join tbl_services on 
    tbl_services.int_eventID=tbl_utilities.int_eventID where tbl_utilities.int_utilitiesID=?`
    db.query(queryString1,[utilitiesID], (err, results, fields) => {
        if (err) console.log(err);       
        var services = results[0];
        console.log("==========================================")
        console.log("Results set: "+JSON.stringify(services))
        console.log("==========================================")
        
        var days = services.var_availabledays.split(',');
        console.log(days)
        var sun=0; var mon=0; var tues=0; var wed=0; var thurs=0; var fri=0; var sat=0;
        for(i=0; i<days.length; i++){
            if(days[i]==0){sun=1;}
            if(days[i]==1){mon=1;}
            if(days[i]==2){tues=1;}
            if(days[i]==3){wed=1;}
            if(days[i]==4){thurs=1;}
            if(days[i]==5){fri=1;}
            if(days[i]==6){sat=1;}
        }

        services.time_duration= moment(services.time_duration,'HH:mm:ss').format('hh:mm'); 
        services.time_defaulttime= moment(services.time_defaulttime,'HH:mm:ss').format('hh:mm A'); 
        services.time_availablestart= moment(services.time_availablestart,'HH:mm:ss').format('hh:mm A'); 
        services.time_availableend= moment(services.time_availableend,'HH:mm:ss').format('hh:mm A'); 

        return res.render('admin/views/utilities/services/editservice',{ services : services, mon:mon, sun:sun, tues:tues, wed:wed, thurs:thurs, fri:fri, sat:sat, sun:sun});
    }); 
});
adminRouter.get('/utilities-specialservices/viewdetails', (req, res)=>{
    console.log("==========================================")
    console.log("View details (req.query.id): "+req.query.id) 
    console.log("==========================================")
    var utilitiesID = parseInt(req.query.id)
    var queryString1 =`SELECT * FROM tbl_utilities join tbl_serviceutilities on 
    tbl_serviceutilities.int_serviceutilitiesID=tbl_utilities.int_serviceutilitiesID where tbl_utilities.int_utilitiesID=?`
    db.query(queryString1,[utilitiesID], (err, results, fields) => {
        if (err) console.log(err);       
        var services = results[0];
        console.log("==========================================")
        console.log("Results set: "+JSON.stringify(services))
        console.log("==========================================")
        var sun=0; var mon=0; var tues=0; var wed=0; var thurs=0; var fri=0; var sat=0;
        if(services.var_availabledays!=null){
            var days = services.var_availabledays.split(',');
            console.log(days)
            for(i=0; i<days.length; i++){
                if(days[i]==0){sun=1;}
                if(days[i]==1){mon=1;}
                if(days[i]==2){tues=1;}
                if(days[i]==3){wed=1;}
                if(days[i]==4){thurs=1;}
                if(days[i]==5){fri=1;}
                if(days[i]==6){sat=1;}
            }
        }
        if(services.time_duration!=null) services.time_duration= moment(services.time_duration,'HH:mm:ss').format('hh:mm'); 
        if(services.time_defaulttime!=null)services.time_defaulttime= moment(services.time_defaulttime,'HH:mm:ss').format('hh:mm A'); 
        if(services.time_availablestart!=null)services.time_availablestart= moment(services.time_availablestart,'HH:mm:ss').format('hh:mm A'); 
        if(services.time_availableend!=null)services.time_availableend= moment(services.time_availableend,'HH:mm:ss').format('hh:mm A'); 
        
        return res.render('admin/views/utilities/specialservices/editspecialservice',{ services : services, mon:mon, sun:sun, tues:tues, wed:wed, thurs:thurs, fri:fri, sat:sat, sun:sun});
        
    }); 
});
adminRouter.post('/utilities-services/viewdetails', (req, res)=>{
    var success =0
    var notsuccess =1
    console.log(req.body)
    console.log(req.body.int_utilitiesID);  
    var availabledays=[];
    if(req.body.sun==1){availabledays.push(0)}
    if(req.body.mon==1){availabledays.push(1)}
    if(req.body.tues==1){availabledays.push(2)}
    if(req.body.wed==1){availabledays.push(3)}
    if(req.body.thurs==1){availabledays.push(4)}
    if(req.body.fri==1){availabledays.push(5)}
    if(req.body.sat==1){availabledays.push(6)}
    console.log(availabledays)
    var days = availabledays.toString();
    console.log(days)
    var queryString1 = `UPDATE tbl_utilities SET        
            int_reservationmaxdays='${req.body.int_reservationmaxdays}',
            int_reservationmindays='${req.body.int_reservationmindays}',
            int_requirementsdays='${req.body.int_requirementsdays}',
            time_duration='${req.body.time_duration}',
            time_availablestart='${req.body.time_availablestart}',
            time_availableend='${req.body.time_availableend}',
            bool_withpayment='${req.body.bool_withpayment}',
            double_fee='${req.body.double_fee}',
            double_addrate='${req.body.double_addrate}',
            int_downpaymentdays='${req.body.int_downpaymentdays}',
            int_fullpaymentdays='${req.body.int_fullpaymentdays}',
            bool_refundable='${req.body.bool_refundable}',
            int_refundpercent='${req.body.int_refundpercent}',
            bool_withageconstraints='${req.body.bool_withageconstraints}',
            int_agemin='${req.body.int_agemin}',
            int_agemax='${req.body.int_agemax}',
            var_availabledays='${days}',
            char_servicestatus='${req.body.char_servicestatus}'
            
            where int_utilitiesID= ?`;

    db.query(queryString1, [req.body.int_utilitiesID], (err, results, fields) => {
        if (err) console.log(err);       
        console.log(availabledays)
        if (err){
            console.log(err)
            res.send({alertDesc:notsuccess})
        }
        else{
            res.send({alertDesc:success})
            console.log(results)
        }
    }); 
});
adminRouter.post('/utilities-specialservices/changestatus', (req, res)=>{
    var success =0
    var notsuccess =1
    console.log(req.body.id1)
    var queryString1 = `UPDATE tbl_utilities SET        
            char_servicestatus = "${req.body.servicestatus}"
            where int_utilitiesID= ${req.body.id1};`;
    db.query(queryString1, (err, results, fields) => {
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
//=======================================================
//C L I E N T ' S  I N F O
//=======================================================
adminRouter.get('/utilities-clients-info', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_utilities_client`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var clients = results[0];
        return res.render('admin/views/utilities/client',{ clients : clients });
    }); 
});

adminRouter.post('/utilities-clients-info/query', (req, res)=>{
    var queryString1 =`SELECT * FROM tbl_utilities_client where int_clientID =?`
    db.query(queryString1,[req.body.id], (err, results1, fields) => {
        res.send({firstQuery:results1[0]});
    });
});

adminRouter.post('/utilities-clients-info', (req, res)=>{
    var success =0
    var notsuccess =1
    
    var queryString1 = `UPDATE tbl_utilities_client SET        
            var_clientname = "${req.body.parishname}",
            var_clientlocation = "${req.body.parishlocation}",
            var_clienttelephone = "${req.body.telephonenumber}",
            var_clientmobile = "${req.body.mobilenumber}",
            var_clientemail = "${req.body.emailaddress}"
            where int_clientID= ${req.body.clientID};`;
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var clients = results[0];
        if (err){
            console.log(err)
            res.send({alertDesc:notsuccess})
        }
        else{
            res.send({alertDesc:success})
        }
    }); 
    
});




//===============================================================================================//
    adminRouter.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500)
        return res.render('admin/views/error/505', {title: '505: Something broke!'});
      })
    adminRouter.use(function(req, res, next) {
        res.status(404)
        return res.render('admin/views/error/404', {title: '404: File Not Found'});
    });

exports.admin = adminRouter;