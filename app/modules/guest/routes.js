    var express = require('express');
    var guestRouter = express.Router();
    var moment = require('moment');
    var authMiddleware = require('../auth/middlewares/auth');
    var db = require('../../lib/database')();
    var multer = require('multer');
    var swal = require('sweetalert2')
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
            var queryString1 =`SELECT * FROM tbl_services where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage' or var_eventname = 'Facility Reservation' or var_eventname = 'Document Request' or var_eventname = 'Establishment Blessing' or var_eventname='Anointing of the sick'`
            db.query(queryString1, (err, results, fields) => {
              var events =results;
                if (err) console.log(err);
                return res.render('guest/views/index',{ events : events });
            });
        });
        
        guestRouter.get('/', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_services where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage' or var_eventname = 'Facility Reservation' or var_eventname = 'Document Request' or var_eventname = 'Establishment Blessing' or var_eventname = 'Anointing of the sick'`
            db.query(queryString1, (err, results, fields) => {
              var events =results;
                if (err) console.log(err);
                return res.render('guest/views/index',{ events : events });
            });
        });
        guestRouter.post('/query', (req, res) => {
            
            var queryString1 =`SELECT * FROM tbl_services where int_eventID = ? `
            db.query(queryString1,[req.body.id], (err, results1, fields) => {
                req.session.eventId = req.body.id
                var queryString2 =`select var_reqname from tbl_requirementtype where int_eventID = ?`
            
            db.query(queryString2,[req.body.id], (err, results2, fields) => {
            if (err) console.log(err);
            res.send({firstQuery:results1[0],secondQuery:results2});
            });
            });
        
        })
        guestRouter.get('/service', (req, res)=>{
            console.log(req.session)
            var queryString =`select var_eventname from tbl_services where int_eventID =${req.session.eventId}`
            db.query(queryString, (err, results, fields) => {
                if (err) console.log(err);
                var services = results[0];
                if(services.var_eventname== 'Baptism'){ 
                    var queryString1= `SELECT int_agemax, int_agemin, double_fee FROM tbl_utilities where int_eventID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
                    db.query(queryString1, (err, results1, fields) => {
                        var queryString2= `SELECT time_availabletime FROM tbl_utilities_availabletime where int_serviceID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
                        db.query(queryString2, (err, results2, fields) => {
                            for(i=0;i<results2.length;i++){
                            results2[i].time_availabletime = moment(results2[i].time_availabletime,'HH:mm:ss').format('hh:mm A');
                            }
                            if (err) throw err;
                        console.log(results2);
                    return res.render('guest/views/forms/baptism',{user: req.session.user, agelimits: results1,times:results2})
                        });    
                    });
                ;}
                else if(services.var_eventname== 'Funeral Service'){ return res.render('guest/views/forms/funeral',{user: req.session.user})}
                else if(services.var_eventname== 'Marriage'){ return res.render('guest/views/forms/marriage',{user: req.session.user});}
                else if(services.var_eventname== 'Confirmation'){ return res.render('guest/views/forms/confirmation',{user: req.session.user});}
                else if(services.var_eventname== 'Document Request'){ return res.render('guest/views/forms/document',{user: req.session.user});}
                else if(services.var_eventname== 'Facility Reservation'){ return res.render('guest/views/facilities/index',{user: req.session.user});}
                else if(services.var_eventname== 'Anointing of the sick'){ return res.render('guest/views/forms/anointing',{user: req.session.user});}
                else if(services.var_eventname== 'Establishment Blessing'){ return res.render('guest/views/forms/establishment',{user: req.session.user});}
                else{ return res.redirect('/guest')}
            });
        });
    
        // guestRouter.get('/allservices',(req,res)=>{
        //     var queryString1 =`SELECT * FROM tbl_services where char_status = 'Enabled' and var_eventname <> 'First Communion'or var_eventname <> 'Funeral Service order by char_type' `
        //     db.query(queryString1, (err, results, fields) => {
        //       var events =results;
        //         if (err) console.log(err);
        //         return res.render('guest/views/index',{ events : events });
        //     });
    
        // })
        guestRouter.get('/schedule', (req, res)=>{res.render('guest/views/schedule2') });
        guestRouter.get('/entourage', (req, res)=>{res.render('guest/views/entourage') });
        guestRouter.get('/parishevents', (req, res)=>{res.render('guest/views/parishevents1') });
        guestRouter.get('/parishevents/details', (req, res)=>{res.render('guest/views/parishdetails') });
        guestRouter.get('/parishservices', (req, res)=>{res.render('guest/views/parishservices') });
        guestRouter.get('/weddingorg', (req, res)=>{res.render('guest/views/forms/weddingorg') });
        guestRouter.get('/weddingorg/items', (req, res)=>{res.render('guest/views/forms/weddingorg1') });
        guestRouter.get('/voucher', (req, res)=>{res.render('guest/views/voucher/facility') });
        
    //===============================================================================================//
    // R E S E R V A T I O N //
    //===============================================================================================//
        guestRouter.get('/reservation', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_eventinfo 
            JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID 
            WHERE tbl_eventinfo.int_userID = ?`
            db.query(queryString1, [req.session.user.int_userID], (err, results, fields) => {
                if (err) console.log(err);
            
                return res.render('guest/views/reservations/reservations',{ reservations : results });
            });
    
        });
        guestRouter.get('/reservation/:int_eventinfoID', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_eventinfo 
            JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            WHERE tbl_eventinfo.int_eventinfoID = ${req.params.int_eventinfoID}`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var details = results[0];
                
    
                if(details.var_eventname == 'Anointing of the sick' || details.var_eventname == 'Funeral Service' || details.var_eventname =='Funeral Mass'){
                    var queryString2 =`SELECT * from tbl_relation 
                    join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString2, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var bday = moment(moredetails.date_birthday).format('MM-DD-YYYY');
                        var desireddate1= moment(moredetails.date_desireddate1).format('MM-DD-YYYY');
                        var desireddate2= moment(moredetails.date_desireddate2).format('MM-DD-YYYY');
                        var desiredtime1= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime2= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=bday;
                        moredetails.date_desireddate1=desireddate1;
                        moredetails.date_desireddate2=desireddate2;
                        moredetails.time_desiredtime1=desiredtime1;
                        moredetails.time_desiredtime2=desiredtime2;
                        res.render('guest/views/reservations/anointingdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
                
                if(details.var_eventname == 'Establishment Blessing'){
                    var queryString4 =`select * from tbl_houseblessing where int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var desireddate3= moment(moredetails.date_desireddate1).format('MM-DD-YYYY');
                        var desireddate4= moment(moredetails.date_desireddate2).format('MM-DD-YYYY');
                        var desiredtime3= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime4= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_desireddate1=desireddate3;
                        moredetails.date_desireddate2=desireddate4;
                        moredetails.time_desiredtime1=desiredtime3;
                        moredetails.time_desiredtime2=desiredtime4;
                        res.render('guest/views/reservations/establishmentdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
                // ey fix this
                if(details.var_eventname == 'Baptism' || details.var_eventname =='Confirmation' || details.var_eventname == 'RCIA'){
                    var queryString3 =`SELECT * from tbl_relation 
                    join tbl_baptism on tbl_relation.int_eventinfoID = tbl_baptism.int_eventinfoID
                    join tbl_sponsors on tbl_relation.int_eventinfoID = tbl_sponsors.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
    
                    db.query(queryString3, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];                
                        var bday = moment(moredetails.date_birthday).format('MM-DD-YYYY');
                        var desireddate= moment(moredetails.date_desireddate).format('MM-DD-YYYY');   
                        var desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=bday;
                        moredetails.date_desireddate=desireddate;
                        moredetails.time_desiredtime=desiredtime;
                        console.log(details, moredetails)
                        res.render('guest/views/reservations/baptismdetails',{ details : details, moredetails:moredetails, user: req.session.user});                
                    });
    
                        }
                        
                if(details.var_eventname == 'Marriage'){
                    var queryString3 =`SELECT * from tbl_relation 
                    join tbl_wedgroom on tbl_relation.int_eventinfoID = tbl_wedgroom.int_eventinfoID
                    join tbl_wedbride on tbl_relation.int_eventinfoID = tbl_wedbride.int_eventinfoID
                    join tbl_wedcouple on tbl_relation.int_eventinfoID = tbl_wedcouple.int_eventinfoID
                    join tbl_sponsors on tbl_relation.int_eventinfoID = tbl_sponsors.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString3, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];                
                        var groombday = moment(moredetails.date_birthday).format('MM-DD-YYYY');
                        var bridebday = moment(moredetails.date_bbirthday).format('MM-DD-YYYY');
                        var groombapdate = moment(moredetails.date_gbapdate).format('MM-DD-YYYY');
                        var groomcondate = moment(moredetails.date_gcondate).format('MM-DD-YYYY');
                        var bridebapdate = moment(moredetails.date_bbapdate).format('MM-DD-YYYY');
                        var bridecondate = moment(moredetails.date_bcondate).format('MM-DD-YYYY');
                        var desireddate= moment(moredetails.date_desireddate).format('MM-DD-YYYY');   
                        var desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=groombday;
                        moredetails.date_bbirthday=bridebday;
                        moredetails.date_gbapdate=groombapdate;
                        moredetails.date_gcondate=groomcondate;
                        moredetails.date_bbapdate=bridebapdate;
                        moredetails.date_bcondate=bridecondate;
                        moredetails.date_desireddate=desireddate;
                        moredetails.time_desiredtime=desiredtime;
                        console.log(details, moredetails)
                        res.render('guest/views/reservations/marriagedetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });       
                }
                
    
    
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
            return res.render('guest/views/reservations/notification',{ notifications: results });
        });

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
        return res.render('guest/views/voucher/facility',{results:results});
        })
    });
    // ---------------------------------------------------------------------------------------------------------
    // E  D  I  T    D  E  T  A  I  L  S 
    // ---------------------------------------------------------------------------------------------------------
        guestRouter.get('/reservation/:int_eventinfoID/edit', (req, res)=>{
            var queryString1 =`SELECT * FROM tbl_eventinfo 
            JOIN tbl_eventapplication ON tbl_eventinfo.int_eventinfoID = tbl_eventapplication.int_eventinfoID 
            JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
            WHERE tbl_eventinfo.int_eventinfoID = ${req.params.int_eventinfoID}`
            db.query(queryString1, (err, results, fields) => {
                if (err) console.log(err);
                var details = results[0];        
    
                if(details.var_eventname == 'Anointing of the sick'){
                    var queryString2 =`SELECT * from tbl_relation 
                    join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString2, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var bday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                        var desireddate1= moment(moredetails.date_desireddate1).format('YYYY-MM-DD');
                        var desireddate2= moment(moredetails.date_desireddate2).format('YYYY-MM-DD');
                        var desiredtime1= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime2= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=bday;
                        moredetails.date_desireddate1=desireddate1;
                        moredetails.date_desireddate2=desireddate2;
                        moredetails.time_desiredtime1=desiredtime1;
                        moredetails.time_desiredtime2=desiredtime2;
                        res.render('guest/views/reservations/editanointingdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
    
                if(details.var_eventname == 'Funeral Mass' ||details.var_eventname == 'Funeral Service' ){
                    var queryString2 =`SELECT * from tbl_relation 
                    join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString2, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var bday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                        var desireddate1= moment(moredetails.date_desireddate1).format('YYYY-MM-DD');
                        var desireddate2= moment(moredetails.date_desireddate2).format('YYYY-MM-DD');
                        var desiredtime1= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime2= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=bday;
                        moredetails.date_desireddate1=desireddate1;
                        moredetails.date_desireddate2=desireddate2;
                        moredetails.time_desiredtime1=desiredtime1;
                        moredetails.time_desiredtime2=desiredtime2;
                        res.render('guest/views/reservations/editfuneraldetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
    
                
                if(details.var_eventname == 'Baptism' || details.var_eventname == 'Confirmation' ||details.var_eventname == 'RCIA' ){
                    var queryString2 =`SELECT * from tbl_relation 
                    join tbl_blessing on tbl_relation.int_eventinfoID = tbl_blessing.int_eventinfoID 
                    join tbl_baptism on tbl_relation.int_eventinfoID = tbl_baptism.int_eventinfoID
                    join tbl_sponsors on tbl_relation.int_eventinfoID = tbl_sponsors.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString2, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var bday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                        var desireddate1= moment(moredetails.date_desireddate1).format('YYYY-MM-DD');
                        var desireddate2= moment(moredetails.date_desireddate2).format('YYYY-MM-DD');
                        var desiredtime1= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime2= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=bday;
                        moredetails.date_desireddate1=desireddate1;
                        moredetails.date_desireddate2=desireddate2;
                        moredetails.time_desiredtime1=desiredtime1;
                        moredetails.time_desiredtime2=desiredtime2;
                        res.render('guest/views/reservations/editbaptismdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
                
                if(details.var_eventname == 'Marriage'){
                    var queryString3 =`SELECT * from tbl_relation 
                    join tbl_wedgroom on tbl_relation.int_eventinfoID = tbl_wedgroom.int_eventinfoID
                    join tbl_wedbride on tbl_relation.int_eventinfoID = tbl_wedbride.int_eventinfoID
                    join tbl_wedcouple on tbl_relation.int_eventinfoID = tbl_wedcouple.int_eventinfoID
                    join tbl_sponsors on tbl_relation.int_eventinfoID = tbl_sponsors.int_eventinfoID 
                    where tbl_relation.int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString3, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];                
                        var groombday = moment(moredetails.date_birthday).format('YYYY-MM-DD');
                        var bridebday = moment(moredetails.date_bbirthday).format('YYYY-MM-DD');
                        var groombapdate = moment(moredetails.date_gbapdate).format('YYYY-MM-DD');
                        var groomcondate = moment(moredetails.date_gcondate).format('YYYY-MM-DD');
                        var bridebapdate = moment(moredetails.date_bbapdate).format('YYYY-MM-DD');
                        var bridecondate = moment(moredetails.date_bcondate).format('YYYY-MM-DD');
                        var desireddate= moment(moredetails.date_desireddate).format('YYYY-MM-DD');   
                        var desiredtime= moment(moredetails.time_desiredtime, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_birthday=groombday;
                        moredetails.date_bbirthday=bridebday;
                        moredetails.date_gbapdate=groombapdate;
                        moredetails.date_gcondate=groomcondate;
                        moredetails.date_bbapdate=bridebapdate;
                        moredetails.date_bcondate=bridecondate;
                        moredetails.date_desireddate=desireddate;
                        moredetails.time_desiredtime=desiredtime;
                        console.log(details, moredetails)
                        res.render('guest/views/reservations/editmarriagedetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });       
                }
                
                if(details.var_eventname == 'Establishment Blessing'){
                    var queryString4 =`select * from tbl_houseblessing where int_eventinfoID = ${req.params.int_eventinfoID}`
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var moredetails = results[0];
                        console.log(details, moredetails)
                        var desireddate3= moment(moredetails.date_desireddate1).format('YYYY-MM-DD');
                        var desireddate4= moment(moredetails.date_desireddate2).format('YYYY-MM-DD');
                        var desiredtime3= moment(moredetails.time_desiredtime1, 'HH:mm:ss').format('hh:mm A');
                        var desiredtime4= moment.utc(moredetails.time_desiredtime2, 'HH:mm:ss').format('hh:mm A');
                        moredetails.date_desireddate1=desireddate3;
                        moredetails.date_desireddate2=desireddate4;
                        moredetails.time_desiredtime1=desiredtime3;
                        moredetails.time_desiredtime2=desiredtime4;
                        res.render('guest/views/reservations/establishmentdetails',{ details : details, moredetails:moredetails, user: req.session.user});
                    });
                }
            });
        });
        guestRouter.post('/reservation/:int_eventinfoID/edit', (req, res) => {
    
            if(req.body.eventname == 'Anointing of the sick'){
                console.log('SIMULAN NA ANG PAG EDIT')
            
            // DAMI PANG AAYUSIN SA EDIT, YUNG MAY SCRIPT NA KASAMA AAAAAAAAAAA
                if(req.body.venue == 'sameaddress') var venue= req.body.address;
                if(req.body.venue == 'hospital') var venue= req.body.hospitalname;
                if(req.body.venue == 'other') var venue= req.body.othervenue;
                
                const queryString = `UPDATE tbl_relation SET        
                var_relation = "${req.body.relation}",
                var_lname = "${req.body.lastname}",
                var_fname = "${req.body.firstname}",
                var_mname = "${req.body.middlename}",
                char_gender = "${req.body.gender}",
                var_address = "${req.body.address}",
                date_birthday = "${req.body.birthday}",
                var_birthplace = "${req.body.birthplace}"
                where int_eventinfoID= ${req.params.int_eventinfoID});`;
                
                const queryString1 = `UPDATE tbl_blessing SET        
                    var_blessingvenue = ${venue},
                    var_blessingdetails = "${req.body.details}",
                    date_desireddate1 = "${req.body.desireddate1}",
                    date_desireddate2 = "${req.body.desireddate2}",
                    date_desiredtime1 = "${req.body.desiredtime1}",
                    date_desiredtime2 = "${req.body.desiredtime2}"
                    where int_eventinfoID= ${req.params.int_eventinfoID});`;
                db.query(queryString,  (err, results, fields) => {
                    if (err) console.log(err);
                    
                    db.query(queryString1, (err, results, fields) => {
                        if (err) console.log(err);
                        return res.redirect(`/guest/reservation/${req.params.int_eventinfoID}`);
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
    //==============================================================
    // E V E N T S  I N F O
    //==============================================================
        guestRouter.get('/marriageinfo', (req, res)=>{
            res.render('guest/views/events/marriage')
        });
    
    //==============================================================
    //E V E N T S  F O R M S                                      
    //==============================================================
    
    //==============================================================
    // A N O I N T I N G
    //==============================================================
        guestRouter.get('/anointing/form', (req, res)=>{
            res.render('guest/views/forms/anointing',{user: req.session.user})
        });
        guestRouter.post('/anointing/form', upload.single('image'),(req, res) => {
            var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    console.log(results);
                    var eventID = results[0];
                    // var eventID = results[0];
                    console.log(req.session.user);
                    
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;
                        if(req.body.venue == 'sameaddress') var venue= req.body.address;
                        if(req.body.venue == 'hospital') var venue= req.body.hospitalname;
                        if(req.body.venue == 'other') var venue= req.body.othervenue;
                        var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus) VALUES(?,?)`;        
                        db.query(queryString2,[eventinfoID.insertId, "Pending"], (err, results, fields) => {
                            if (err) throw err;
                            
                            var desiredtime1= moment(req.body.desiredtime1, 'hh:mm A').format('HH:mm:ss');
                            var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                            db.query(queryString3, [eventinfoID.insertId, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                if (err) throw err;
                                var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails, date_desireddate, time_desiredtime) VALUES (?,?,?,?,?)`
                                db.query(queryString4, [eventinfoID.insertId, venue, req.body.details, req.body.desireddate1, desiredtime1], (err, results, fields) => {
                                    
                                    var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                        db.query(requirementQuery, [eventID.int_eventID], (err, results, fields) => {
                                            if (err) throw err;
                                            var reqq = results[0];
                                        
                                        // console.log('looooob'+reqid)
                                        var path = '/img/req/'+req.file.filename;
                                        var nowDate = new Date(); 
                                        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                                        var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                        db.query(queryString7,[path,date,reqq.int_reqtypeID, 'Submitted'],(err, results, fields)=>{    
                                            if (err) throw err;
                                            var requirementID = results;
                                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                            db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{    
                                            return res.redirect(`/guest`);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });    
                });            
                
            });
    
    //==============================================================
    // B A P T I S M
    //==============================================================
        guestRouter.get('/baptism/form', (req, res)=>{
            var queryString1= `SELECT int_agemax, int_agemin, double_fee FROM tbl_utilities where int_eventID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
            db.query(queryString1, (err, results1, fields) => {
                var queryString2= `SELECT time_availabletime FROM tbl_utilities_availabletime where int_serviceID=(SELECT int_eventID from tbl_services where var_eventname ="Baptism")`
                db.query(queryString2, (err, results2, fields) => {
                    for(i=0;i<results2.length;i++){
                    results2[i].time_availabletime = moment(results2[i].time_availabletime,'HH:mm:ss').format('hh:mm A');
                    }
                    if (err) throw err;
                console.log(results2);
            return res.render('guest/views/forms/baptism',{user: req.session.user, agelimits: results1,times:results2})
                });    
            });
        });
    
        guestRouter.post('/baptism/form',upload.single('image'), (req, res) => { 
        console.log(req.file)
        console.log(req.body)
        
        if (req.body.baptismtype == 'Regular'){
            var desireddate= moment(req.body.regdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            var queryString= `select int_eventID from tbl_services where var_eventname="Baptism";`  
            db.query(queryString, (err, results, fields) => {
                if (err) throw err;
                var eventID = results[0];
            
                var defaulttimeQuery =`select time_defaulttime from tbl_defaulttime where int_eventID= ?`
                db.query(defaulttimeQuery,[eventID.int_eventID], (err, results, fields) => {
                    if (err) throw err;
                    var desired = results[0];
                    var desiredtime=desired.time_defaulttime;
                    console.log(desiredtime)
                    queries(eventID.int_eventID, desiredtime, desireddate);
                });
            });
            }
        if (req.body.baptismtype == 'Special'){
            console.log(req.body)
            var desireddate= moment(req.body.spcdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            var desiredtime= moment(req.body.desiredtime,'HH:mm').format('HH:mm:ss');
            
            var queryString= `select int_eventID from tbl_services where var_eventname="Special Baptism";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    // console.log(results);
                    var eventID = results[0];
                    // console.log(req.session.user);
                    queries(eventID.int_eventID, desiredtime, desireddate);
                });
            }
            
            function queries(eventid, dtime, ddate){    
                console.log(desireddate)
                console.log(desiredtime)
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventid], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;       
                            
                        var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
                        db.query(paymentQuery,[eventid], (err, results, fields) => {
                            if (err) throw err;
                            var amount= results[0];
                            
                            var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus) values(?,?)`;
                            db.query(paymentInsert,[amount.double_fee,'Unpaid'], (err, results, fields) => {
                                if (err) throw err;
                                var paymentid= results;

                                var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus, int_paymentID) VALUES(?,?,?)`;        
                                db.query(queryString2,[eventinfoID.insertId, "Pending", paymentid.insertId], (err, results, fields) => {
                                    if (err) throw err;
            
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
                                            var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                                db.query(queryString7,[path,date,reqq.int_reqtypeID,"Submitted"],(err, results2, fields)=>{
                                                    var queryString8 = `INSERT INTO tbl_requirementsinevents(int_requirementID,int_eventinfoID) VALUES (?,?)`
                                                    db.query(queryString8,[results2.insertId,eventinfoID.insertId],(err, results, fields)=>{
                                                        if (err) throw err;
                                                        var queryString4 = `INSERT INTO tbl_baptism(int_eventinfoID, var_parentmarriageadd, var_fatherbplace, var_motherbplace, var_fathername, var_mothername, var_contactnum, date_desireddate, time_desiredtime) VALUES(?,?,?, ?,?,? ,?,?,?);`
                                                        console.log(dtime)
                                                        db.query(queryString4 , [eventinfoID.insertId, req.body.marriageaddress, req.body.fatherbirthplace, req.body.motherbirthplace, req.body.fathername, req.body.mothername, req.body.contactnumber, ddate,dtime], (err, results, fields) => {
                                                            if (err) throw err;
                                                            sponsors(eventinfoID.insertId);
                                                            return res.redirect(`/guest`);
                                                    })
                                                })
                                            })
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
    //  C O N F I R M A T I O N
    //==============================================================
        guestRouter.get('/confirmation/form', (req, res)=>{
            res.render('guest/views/forms/confirmation',{user: req.session.user})
        });
    
        var requirements = upload.fields([{name:'birthCertificate',maxCount:1},{name:'baptismalCertificate',maxCount:1}]);
        guestRouter.post('/confirmation/form',requirements ,(req, res) => {
       
            var birthday= moment(req.body.birthday, 'MM/DD/YYYY').format('YYYY-MM-DD')
            console.log(req.file)
            console.log(req.body)
            
            if (req.body.baptismtype == 'Regular'){
                var desireddate= moment(req.body.regdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
                var queryString= `select int_eventID from tbl_services where var_eventname="Confirmation";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    var eventID = results[0];
                
                    var defaulttimeQuery =`select time_defaulttime from tbl_defaulttime where int_eventID= ?`
                    db.query(defaulttimeQuery,[eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var desired = results[0];
                        var desiredtime=desired.time_defaulttime;
                        console.log(desiredtime)
                        queries(eventID.int_eventID, desiredtime, desireddate);
                    });
                });
            }            
    
            if (req.body.baptismtype == 'Special'){
                var desireddate= moment(req.body.spcdesireddate, 'YYYY/MM/DD').format('YYYY-MM-DD');
                var desiredtime= moment(req.body.desiredtime).format('HH:mm:ss');
                
                var queryString= `select int_eventID from tbl_services where var_eventname="Special Confirmation";`  
                    db.query(queryString, (err, results, fields) => {
                        if (err) throw err;
                        // console.log(results);
                        var eventID = results[0];
                        // console.log(req.session.user);
                        queries(eventID.int_eventID, desiredtime, desireddate);
                    });
                }            
                
            
                function queries(eventid, dtime, ddate){
                    console.log(desireddate)
                    console.log(desiredtime)
                    var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                        db.query(queryString1, [req.body.userID, eventid], (err, results, fields) => {
                            if (err) throw err;
                            var eventinfoID= results;       
                                
                            var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
                            db.query(paymentQuery,[eventid], (err, results, fields) => {
                                if (err) throw err;
                                var amount= results[0];
                                
                                var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus) values(?,?)`;
                                db.query(paymentInsert,[amount.double_fee,'Unpaid'], (err, results, fields) => {
                                    if (err) throw err;
                                    var paymentid= results;
    
                                    var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus, int_paymentID) VALUES(?,?,?)`;        
                                    db.query(queryString2,[eventinfoID.insertId, "Pending", paymentid.insertId], (err, results, fields) => {
                                        if (err) throw err;
                
                                        var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                                        db.query(queryString3, [eventinfoID.insertId, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                            if (err) throw err;
                                            var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                            db.query(requirementQuery, [eventid], (err, results, fields) => {
                                                if (err) throw err;
                                                var reqq = results;


                                                var pathBirthc = '/img/' + req.files.birthCertificate[0].filename;
                                                var nowDate = new Date(); 
                                                var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                                                var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                                db.query(queryString7,[pathBirthc,date,1,'Submitted'],(err, results, fields)=>{
                                                    var pathBaptc = '/img/'+req.files.baptismalCertificate[0].filename;
                                                    var nowDate1 = new Date(); 
                                                    var date1 = nowDate1.getFullYear()+'/'+(nowDate1.getMonth()+1)+'/'+nowDate1.getDate(); 
                                                    var queryString8 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                                    db.query(queryString8,[pathBaptc,date1,2,'Submitted'],(err, results, fields)=>{  
                                                        
                                                var queryString4 = `INSERT INTO tbl_baptism(int_eventinfoID, var_parentmarriageadd, var_fatherbplace, var_motherbplace, var_fathername, var_mothername, var_contactnum, date_desireddate, time_desiredtime) VALUES(?,?,?, ?,?,? ,?,?,?);`
                                                db.query(queryString4 , [eventinfoID.insertId, req.body.marriageaddress, req.body.fatherbirthplace, req.body.motherbirthplace, req.body.fathername, req.body.mothername, req.body.contactnumber, ddate, dtime], (err, results, fields) => {
                                                    if (err) throw err;
                                                    sponsors(eventinfoID.insertId);
                                                    return res.redirect(`/guest`);
                                                })
                                            })
                                            
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
        guestRouter.get('/establishment/form', (req, res)=>{
            res.render('guest/views/forms/establishment',{user: req.session.user});
        });
    
        guestRouter.post('/establishment/form',upload.single('image'), (req, res) => {
            
            var queryString= `select int_eventID from tbl_services where var_eventname="Establishment Blessing";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    console.log(results);
                    var eventID = results[0];
                    console.log(req.session.user);
                    
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;
                        
                        var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus) VALUES(?,?)`;        
                        db.query(queryString2,[eventinfoID.insertId, "Pending"], (err, results, fields) => {
                            if (err) throw err;
                            if(req.body.establishment=='ourhome'){
                                var queryString3 = `INSERT INTO tbl_houseblessing(int_eventinfoID, var_owner, var_estloc, var_ownercontactnum, var_owneremailadd, date_desireddate, time_desiredtime) VALUES(?,?,?,?,?,?,?);`
                                db.query(queryString3, [eventinfoID.insertId, req.body.owner, req.body.location, req.body.contactnumber, req.body.email, req.body.desireddate1, req.body.desiredtime1], (err, results, fields) => {
                                    if (err) throw err;                         
                                    return res.redirect(`/guest`);                            
                                });
                            }
                            if(req.body.establishment=='other'){
                                
                                var path = '/img/req/'+req.file.filename;
                                var nowDate = new Date(); 
                                var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                                var requirementQuery = `select int_reqtypeID from tbl_requirementtype where int_eventID = ?`
                                db.query(requirementQuery, [eventID.int_eventID], (err, results, fields) => {
                                    if (err) throw err;
                                    var reqq = results[0];
                                    
                                    var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID, var_reqstatus) VALUES (?,?,?,?);`
                                    db.query(queryString7,[path,date,reqq.int_reqtypeID,'Submitted'],(err, results, fields)=>{
                                        var requirementID = results;
                                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent,[requirementID.insertId, eventinfoID.insertId],(err, results, fields)=>{    
                                        
                                        var queryString3 = `INSERT INTO tbl_houseblessing(int_eventinfoID, var_owner, var_estloc, var_ownercontactnum, var_owneremailadd, date_desireddate, time_desiredtime) VALUES(?,?,?,?,?,?,?);`
                                        db.query(queryString3, [eventinfoID.insertId, req.body.owner1, req.body.location1, req.body.contactnumber1, req.body.email1, req.body.desireddate1, req.body.desiredtime1], (err, results, fields) => {
                                            if (err) throw err;                        
                                                return res.redirect(`/guest`);                            
                                        });
                                    });
                                    });
                                });    
                            }

                });            
            }); 
    
        }); 
    });
    //==============================================================
    // F U N E R A L  B L E S S I N G
    //==============================================================
        guestRouter.get('/funeral/form', (req, res)=>{
            res.render('guest/views/forms/funeral',{user: req.session.user})
        });
        // var requirements = upload.fields([{name:'birthCertificate',maxCount:1});
        guestRouter.post('/funeral/form',upload.single('image'),(req, res) => {
            if (req.body.venue== 'sameaddress'){
                var venue = req.body.address;
                var queryString= `select int_eventID from tbl_services where var_eventname="Funeral Service";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    var eventID = results[0];
                    var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;
                        var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus) VALUES(?,?)`;        
                        db.query(queryString2,[eventinfoID.insertId, "Pending"], (err, results, fields) => {
                            if (err) throw err;

                    queries(venue, eventID.int_eventID, eventinfoID.insertId);
                });});});
            }
    
            if(req.body.venue =='INLPP'){
                var venue = 'Ina ng Lupang Pangako Parish';
                var queryString5= `select int_eventID from tbl_services where var_eventname="Funeral Mass";`  
                db.query(queryString5, (err, results, fields) => {
                    if (err) throw err;
                    var eventID = results[0];
                    var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;       
                            
                        var paymentQuery= `select double_fee from tbl_utilities where int_eventID = ?`
                        db.query(paymentQuery,[eventID.int_eventID], (err, results, fields) => {
                            if (err) throw err;
                            var amount= results[0];
                            
                            var paymentInsert = `insert into tbl_payment(dbl_amount, char_paymentstatus) values(?,?)`;
                            db.query(paymentInsert,[amount.double_fee,'Unpaid'], (err, results, fields) => {
                                if (err) throw err;
                                var paymentid= results;

                                var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus, int_paymentID) VALUES(?,?,?)`;        
                                db.query(queryString2,[eventinfoID.insertId, "Pending", paymentid.insertId], (err, results, fields) => {
                                    if (err) throw err;
            
                    queries(venue, eventID.int_eventID, eventinfoID.insertId);
                });});});});});    
            }
            if(req.body.venue == 'other'){
                var venue = req.body.othervenue;
                var queryString6= `select int_eventID from tbl_services where var_eventname="Funeral Service";`  
                db.query(queryString6, (err, results, fields) => {
                    if (err) throw err;
                    var eventID = results[0];
                    var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.body.userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;
                        var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus) VALUES(?,?)`;        
                        db.query(queryString2,[eventinfoID.insertId, "Pending"], (err, results, fields) => {
                            if (err) throw err;

                    queries(venue, eventID.int_eventID, eventinfo.insertId);
                });});});
            }
    
            function queries(venue,evenid, eventinfoid){
                req.body.image =req.file.filename
                console.log(req.body.image)
                          var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_relation, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?,?);`
                            db.query(queryString3, [eventinfoid, req.body.relation, req.body.lastname, req.body.firstname, req.body.middlename, req.body.gender, req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                if (err) throw err;
                                var queryString4 =`INSERT INTO tbl_blessing(int_eventinfoID, var_blessingvenue, var_blessingdetails, date_desireddate1, date_desireddate2, time_desiredtime1, time_desiredtime2) VALUES (?,?,?,?,?,?,?)`
                                db.query(queryString4, [eventinfoid, venue, req.body.details, req.body.desireddate1, req.body.desireddate2, req.body.desiredtime1, req.body.desiredtime2], (err, results, fields) => {
                                    var pathBirthc = '/img/' + req.file.filename;
                                    var nowDate = new Date(); 
                                    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
                                    var queryString7 = `INSERT INTO tbl_requirements(var_reqpath,date_reqreceived,int_reqtypeID) VALUES (?,?,?);`
                                    db.query(queryString7,[pathBirthc,date,1],(err, results, fields)=>{    
                                        // var pathDeathc = '/img/'+req.files.deathCertificate[0].filename;
                                        // var nowDate1 = new Date(); 
                                        // var date1 = nowDate1.getFullYear()+'/'+(nowDate1.getMonth()+1)+'/'+nowDate1.getDate(); 
                                        // var queryString8 = `INSERT INTO tbl_requirements(int_eventinfoID,var_reqpath,date_reqreceived,int_reqtypeID) VALUES (?,?,?,?);`
                                        // db.query(queryString8,[eventinfoID.insertId,pathDeathc,date,3],(err, results, fields)=>{   
                                        if (err) throw err;
                                        var requirementID = results;
                                        var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent,[requirementID.insertId, eventinfoid],(err, results, fields)=>{    
                                        
                                        return res.redirect(`/guest`);
                                        });
                                    });
                                });
                            });

            }
    
                            
                });
        // });
    //==============================================================
    // M A R R I A G E
    //============================================================== 
        guestRouter.get('/marriage/form', (req, res)=>{
            res.render('guest/views/forms/marriage',{user: req.session.user})
        });
        guestRouter.get('/marriagedetails', (req, res)=>{                
            var queryString1 =`SELECT * FROM tbl_wedsteps`
            db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var steps= results;
            console.log(steps)
            var queryString2 =`select * from tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname='Marriage')`
            db.query(queryString2, (err, results, fields) => {
                if (err) console.log(err);
                var requirements= results;
                var queryString3 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
                db.query(queryString3, (err, results, fields) => {
                var desc =results;
                
                var queryString4 =`SELECT var_eventdesc FROM tbl_services where var_eventname = 'Marriage'`
                db.query(queryString4, (err, results, fields) => {
                var events =results;
                
            
        
                return res.render('guest/views/forms/marriagedetails', {steps: steps, requirements: requirements, description:desc, events: events});
             }); }); }); });});
        
           
        guestRouter.get('/marriage1/form', (req, res)=>{
            var wedSteps=`select * from tbl_weddingsteps`
            db.query(wedSteps, (err, results, fields) => {
                if (err) console.log(err);
                var requirements= results;
            return res.render('guest/views/forms/marriage1',{user: req.session.user})
        });});
        guestRouter.post('/marriage/form', (req, res) => {
            console.log(req.body)
            var queryString= `select int_eventID from tbl_services where var_eventname="Marriage";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    console.log(results);
                    var eventID = results[0];
                    console.log(req.session.user);
                    
                var queryString1 = `INSERT INTO tbl_eventinfo(int_userID, int_eventID) VALUES(?,?)`;
                    db.query(queryString1, [req.session.user.int_userID, eventID.int_eventID], (err, results, fields) => {
                        if (err) throw err;
                        var eventinfoID= results;
                        var queryString2 = `INSERT INTO tbl_eventapplication(int_eventinfoID, char_approvalstatus) VALUES(?,?)`;        
                        db.query(queryString2,[eventinfoID.insertId, "Pending"], (err, results, fields) => {
                            if (err) throw err;
                            var queryString3 = `INSERT INTO tbl_relation(int_eventinfoID, var_lname, var_fname, var_mname, char_gender, var_address, date_birthday, var_birthplace) VALUES(?,?,?,?,?,?,?,?);`
                                    db.query(queryString3, [eventinfoID.insertId, req.body.lastname, req.body.firstname, req.body.middlename,'Male', req.body.address, req.body.birthday, req.body.birthplace], (err, results, fields) => {
                                        if (err) throw err;

                                if (err) throw err;
                                var queryString4 = `INSERT INTO tbl_wedgroom( int_eventinfoID, var_gnationality, var_gcivilstatus, var_greligion, var_goccupation, var_gfathername, var_gfatherreligion, var_gfatherbplace, var_gmothername, var_gmotherreligion, var_gmotherbplace, var_gcurrparish, bool_gbaptized, date_gbapdate, var_gbapplace, bool_gconfirmed, date_gcondate, var_gconplace ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
                                db.query(queryString4 , [eventinfoID.insertId,  req.body.gnationality, req.body.gcivilstatus, req.body.greligion, req.body.goccupation, req.body.gfathername, req.body.gfatherreligion, req.body.gfatherbplace, req.body.gmothername, req.body.gmotherreligion, req.body.gmotherbplace, req.body.gcurrentparish, req.body.gbaptized, req.body.gbapdate, req.body.gbapplace, req.body.gconfirmed, req.body.gcondate, req.body.gconplace],(err, results, fields) => {
                                    if (err) throw err;
                                        var queryString5 = `INSERT INTO tbl_wedbride( int_eventinfoID, var_blname, var_bfname, var_bmname, char_bgender, var_baddress, date_bbirthday, var_bbirthplace, var_bnationality, var_bcivilstatus, var_breligion, var_boccupation, bool_bpregnant, var_bfathername, var_bfatherbplace, var_bfatherreligion, var_bmothername, var_bmotherbplace, var_bmotherreligion, var_bcurrparish, bool_bbaptized,date_bbapdate, var_bbapplace, bool_bconfirmed, date_bcondate, var_bconplace) VALUES(?,?,?,?,? ,?,?,?,?,?, ?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,?, ?);`
                                            db.query(queryString5 , [eventinfoID.insertId,  req.body.blastname, req.body.bfirstname, req.body.bmiddlename, "Female", req.body.baddress, req.body.bbirthday, req.body.bbirthplace, req.body.bnationality, req.body.bcivilstatus, req.body.breligion, req.body.boccupation, req.body.boolpregnant, req.body.bfathername, req.body.bfatherreligion, req.body.bfatherbplace, req.body.bmothername, req.body.bmotherreligion, req.body.bmotherbplace, req.body.bcurrentparish, req.body.bbaptized, req.body.bbapdate, req.body.bbapplace, req.body.bconfirmed, req.body.bcondate, req.body.bconplace],(err, results, fields) => {
                                        if (err) throw err;
                                    
                                        if(req.body.boolmarried == 1){
                                            var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married, date_cprevweddate, var_cprevwedplace, date_desireddate, time_desiredtime) VALUES(?,?,?, ?,?,? ,?);`
                                                db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, req.body.boolmarried, req.body.cprevweddingdate, req.body.cprevweddingplace, req.body.desireddate, req.body.desiredtime], (err, results, fields) => {
                                                    if (err) throw err;                                                    
                                                    sponsors(eventinfoID.insertId);
                                                    //hard coded list of requirements for renewal of vows
                                                    
                                                    defaultReq(eventinfoID.insertId);
                                                    sponsors(eventinfoID.insertId);
                                                    return res.redirect(`/guest/marriage1/form`);
                                                });
                                            }
                                        if(req.body.boolmarried == 0){
                                            var queryString4 = `INSERT INTO tbl_wedcouple(int_eventinfoID, bool_livingin, bool_married, date_desireddate, time_desiredtime) VALUES(?,?,?,?,?);`
                                                db.query(queryString4 , [eventinfoID.insertId, req.body.boollivingin, req.body.boolmarried, req.body.desireddate, req.body.desiredtime], (err, results, fields) => {
                                                    if (err) throw err;
                                                    defaultReq(eventinfoID.insertId);
                                                    sponsors(eventinfoID.insertId);
                                                    return res.redirect(`/guest/marriage1/form `);
                                                });
                                            }      
                                });});});});});});
            
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
                var groomBap = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(groomBap, [15, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID13 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID13.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                var groomCon = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(groomCon, [16, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID14 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID14.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                var brideBap = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(brideBap, [17, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID15 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID15.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                var brideCon = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(brideCon, [18, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID16 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID16.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                
                var license = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(license, [23, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID17 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID17.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                
                var contract = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(contract, [24, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID18 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID18.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                
                var cenomar = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(cenomar, [25, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID19 = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID19.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                                
                                additionalReq(eventinfoID)
                    });});});});});});});});});});});});});});
            }

            function additionalReq(eventinfoID){
                if(req.body.boolmarried == 1){
                    var reqMarried = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqMarried, [37, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                            var reqevent=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                    });});
                }

                if(req.body.boolpregnant==1|| req.body.breligion != 'Catholic' || req.body.greligion !='Catholic'){
                    var reqPregnant = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqPregnant, [26, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                            var reqevent1=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent1,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                    });});
                }

                if(req.body.gnationality != 'Filipino' || req.body.bnationality != 'Filipino'){
                    var reqNationality = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqNationality, [27, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                            var reqevent2=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent2,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                    });});
                }

                if(req.body.greligion !='Catholic' && req.body.greligion != 'No religion'){
                        var reqReligion = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                        db.query(reqReligion, [29, 'To be submitted'], (err, results, fields) => {
                            if(err) throw err;
                            var requirementID = results;
                            var reqevent3=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent3,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                    });});
                }

                if(req.body.gcivilstatus == 'Divorced'|| req.body.bcivilstatus=='Divorced'){
                    var reqDivorced1 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqDivorced1, [33, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                            var reqevent4=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent4,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                                var reqDivorced2 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                                db.query(reqDivorced2, [34, 'To be submitted'], (err, results, fields) => {
                                    if(err) throw err;
                                    var requirementID1 = results;
                                        var reqevent11=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                        db.query(reqevent11,[requirementID1.insertId, eventinfoID],(err, results, fields)=>{          
                                            if(err) throw err;
                                        var reqDivorced3 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                                        db.query(reqDivorced3, [35, 'To be submitted'], (err, results, fields) => {
                                            if(err) throw err;
                                            var requirementID2 = results;
                                            var reqevent5=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                            db.query(reqevent5,[requirementID2.insertId, eventinfoID],(err, results, fields)=>{      
                                                if(err) throw err;
                                                var reqDivorced4 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                                                db.query(reqDivorced4, [36, 'To be submitted'], (err, results, fields) => {
                                                    if(err) throw err;
                                                    var requirementID3 = results;
                                                    var reqevent6=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                                    db.query(reqevent6,[requirementID3.insertId, eventinfoID],(err, results, fields)=>{      
                                                        if(err) throw err;
                                                    });});});});});});});});
                }

                if(req.body.gcivilstatus == 'Widow'|| req.body.bcivilstatus=='Widower'){
                    var reqWidow1 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqWidow1, [38, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                        var reqevent7=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                        db.query(reqevent7,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                            if(err) throw err;
                            var reqWidow2 = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                            db.query(reqWidow2, [39, 'To be submitted'], (err, results, fields) => {
                                if(err) throw err;
                                var requirementID1 = results;
                                var reqevent8=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                                db.query(reqevent8,[requirementID1.insertId, eventinfoID],(err, results, fields)=>{      
                                    if(err) throw err;
                            });});});});
                }

                if(req.body.boollivingin == 1){
                    var reqLivein = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqLivein, [30, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                            var reqevent9=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                            db.query(reqevent9,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                                if(err) throw err;
                            });
                    });
                }

                if(req.body.boccupation == 'Military' ||req.body.goccupation =='Military'){
                    var reqMilitary = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqMilitary, [40, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                        var reqevent10=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                        db.query(reqevent10,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                            if(err) throw err;
                        });});
                }

                if(req.body.breligion == 'No religion' ||req.body.greligion =='No religion'){
                    var reqMilitary = `insert into tbl_requirements(int_reqtypeID, var_reqstatus) values(?,?)`
                    db.query(reqMilitary, [31, 'To be submitted'], (err, results, fields) => {
                        if(err) throw err;
                        var requirementID = results;
                        var reqevent12=`INSERT INTO tbl_requirementsinevents(int_requirementID, int_eventinfoID) values (?,?)`
                        db.query(reqevent12,[requirementID.insertId, eventinfoID],(err, results, fields)=>{      
                            if(err) throw err;
                        });});
                }
            }
        });
    //===============================================================================================//
    // F A C I L I T I E S 
    //===============================================================================================//
        guestRouter.get('/facilities', (req, res)=>{
            res.render('guest/views/facilities/index')
        });
    
        guestRouter.get('/facilities/secondfloor', (req, res)=>{
            res.render('guest/views/facilities/secondfloor')
        });
    
        guestRouter.get('/facilities/secondfloor/form', (req, res)=>{
            res.render('guest/views/forms/secondfloor',{user: req.session.user})
        });
    
        guestRouter.post('/facilities/secondfloor/form',upload.single('image'), (req, res) => {
        
            var queryString= `select int_facilityID from tbl_facility where var_facilityname="Bro. Roqueto 2nd floor";`  
                db.query(queryString, (err, results, fields) => {
                    if (err) throw err;
                    console.log(results);
                    req.session.user.facilityID =results[0];
                    console.log(req.session.user);
                    
                var queryString1 = `INSERT INTO tbl_facilityreservation(int_userID, int_facilityID, var_event, date_reservedate,time_reservestart, time_reserveend, char_reservestatus) VALUES(?,?,?,?,?,?,?)`;
                    db.query(queryString1, [req.session.user.int_userID, req.session.user.facilityID.int_facilityID, req.body.event, req.body.desireddate, req.body.starttime, req.body.endtime, 'Pending'], (err, results, fields) => {
                        var path = '/img/req/'+req.file.filename;
                        var nowDate = new Date(); 
                        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                        var queryString7 = `INSERT INTO tbl_requirements(int_reservationID,var_reqpath,date_reqreceived,int_reqtypeID) VALUES (?,?,?,?);`
                        db.query(queryString7,[req.session.user.facilityID.int_facilityID,path,date,4],(err, results, fields)=>{    
                        if (err) throw err;
                        return res.redirect(`/guest`);
                        });
                    });    
                });            
            });
        // });
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
            tbl_eventinfo.date_approveddate
            FROM tbl_document
            JOIN tbl_documentsevents ON tbl_documentsevents.int_documentID = tbl_document.int_documentID
            JOIN tbl_eventinfo ON tbl_eventinfo.int_eventID = tbl_documentsevents.int_eventID
            JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
            WHERE tbl_document.var_documenttype = ?
            AND tbl_relation.var_fname = ?
            AND tbl_relation.var_lname = ?
            and tbl_eventinfo.date_approveddate = ?`
            db.query(queryString,[req.body.documentType,req.body.firstName,req.body.lastName,req.body.eventDate],(err,results,fields)=>{
            if (err) throw err;
            if(results[0] == undefined){
                console.log("WRONG INPUT")
                res.send(results[0])
            }
            else{
            console.log(req.body)
            results[0].date_approveddate = moment(results[0].date_approveddate).format('YYYY-MM-DD');
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
                    if (err) throw err;
                    res.send(results[0])
                })
            })
        guestRouter.post('/document/form',upload.single('image'), (req, res) => {
        console.log(req.file)
            var queryString1 = `select int_documentID,dbl_docuprice from tbl_document where var_documenttype= ?`  
                db.query(queryString1,[req.body.documenttype], (err, results1, fields) => {
                    if (err) throw err;
                    var documentID =results1[0].int_documentID;
                    var docuPrice =results1[0].dbl_docuprice;
                    console.log(results1)
                    console.log(req.session.user);
                    var queryString2 = `INSERT INTO tbl_payment(dbl_amount,char_paymentstatus) VALUES(?,?)`
                        db.query(queryString2,[docuPrice,"Unpaid"],(err, results2, fields)=>{
                        if (err) throw err;
                        console.log(results2)
                        var paymentID = results2.insertId;
                        var datenow= new Date();
                        var queryString3 = `INSERT INTO tbl_documentrequest(int_userID, int_documentID, var_doclastname, var_docfirstname, text_purpose, date_docurequested,char_docustatus,date_doceventdate,int_paymentID) VALUES(?,?,?,?,?,?,?,?,?)`;
                            db.query(queryString3, [req.session.user.int_userID, documentID, req.body.lastname, req.body.firstname, req.body.purpose,datenow,"Pending",req.body.eventDate,paymentID], (err, results3, fields) => {
                                if (err) throw err;
                                var requestID =results3.insertId;
                                var path = '/img/req/'+req.file.filename;
                                var nowDate = new Date(); 
                                var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                                var queryString7 = `INSERT INTO tbl_requirementsdocument(int_requestID,var_reqpath,date_reqreceived,int_docureqtypeID,bool_reqstatus) VALUES (?,?,?,?,?);`
                                db.query(queryString7,[requestID,path,date,1,"Pending"],(err, results, fields)=>{     
                                    if (err) throw err;
                                        return res.redirect(`/guest`);
                                    })
                                });
                            });    
                        });            
                        
                    });
    //===============================================================================================================
    exports.guest = guestRouter;    