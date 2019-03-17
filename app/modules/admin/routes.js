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
            var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
            var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
            var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
            var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
            var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
            var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism') || int_eventID=(select int_eventID from tbl_services where var_eventname='Special Baptism')`
                db.query(queryString1, (err, results, fields) => {
                    if (err) console.log(err);
                    var application = results[0];
                    
                        db.query(queryString3, (err, results, fields) => {
                            if (err) console.log(err);
                            var request = results[0];
                            db.query(queryString4, (err, results, fields) => {
                                if (err) console.log(err);
                                var baptism = results[0];
                                db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var newmessages = results[0];
                                    console.log(newmessages)
                                    db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var messages = results;
                                        for(i=0;i<messages.length;i++){ 
                                            messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                        } 
                    //line graph
                    var anointingCount=[];
                    var baptismCount=[];
                    var specialbaptismCount=[];
                    var funeralmassCount=[];
                    var funeralserviceCount=[];
                    var marriageCount=[];
                    
                    var docuCount=[];
                    var houseCount=[];
                    //pie charts
                    //line graphs queries
                    var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
                    var facility =`select count(int_reservationID) as countt from tbl_facilityreservation where month(datetime_reservestart) =?`
                    var docu =`select count(int_requestID) as countt from tbl_documentrequest where month(date_docurequested) =?`
                    var house =`select count(int_houseblessID) as countt from tbl_houseblessing where month(date_blessingdate) =?`

                    db.query(event,['Anointing of the sick', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january = results[0]
                        anointingCount.push(january.countt)
                        db.query(event,['Anointing of the sick', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february = results[0]
                            anointingCount.push(february.countt)
                            db.query(event,['Anointing of the sick', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march = results[0]
                                anointingCount.push(march.countt)
                                db.query(event,['Anointing of the sick', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april = results[0]
                                    anointingCount.push(april.countt)
                                    db.query(event,['Anointing of the sick', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may = results[0]
                                        anointingCount.push(may.countt)
                                        db.query(event,['Anointing of the sick', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june = results[0]
                                            anointingCount.push(june.countt)
                                            db.query(event,['Anointing of the sick', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july = results[0]
                                                anointingCount.push(july.countt)
                                                db.query(event,['Anointing of the sick', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august = results[0]
                                                    anointingCount.push(august.countt)
                                                    db.query(event,['Anointing of the sick', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september = results[0]
                                                        anointingCount.push(september.countt)
                                                        db.query(event,['Anointing of the sick', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october = results[0]
                                                            anointingCount.push(october.countt)
                                                            db.query(event,['Anointing of the sick', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november = results[0]
                                                                anointingCount.push(november.countt)
                                                                db.query(event,['Anointing of the sick', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december = results[0]
                                                                    anointingCount.push(december.countt)
                                                                    console.log(anointingCount)
                     db.query(event,['Baptism', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january1 = results[0]
                        baptismCount.push(january1.countt)
                        db.query(event,['Baptism', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february1 = results[0]
                            baptismCount.push(february1.countt)
                            db.query(event,['Baptism', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march1 = results[0]
                                baptismCount.push(march1.countt)
                                db.query(event,['Baptism', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april1 = results[0]
                                    baptismCount.push(april1.countt)
                                    db.query(event,['Baptism', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may1 = results[0]
                                        baptismCount.push(may1.countt)
                                        db.query(event,['Baptism', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june1 = results[0]
                                            baptismCount.push(june1.countt)
                                            db.query(event,['Baptism', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july1 = results[0]
                                                baptismCount.push(july1.countt)
                                                db.query(event,['Baptism', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august1 = results[0]
                                                    baptismCount.push(august1.countt)
                                                    db.query(event,['Baptism', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september1 = results[0]
                                                        baptismCount.push(september1.countt)
                                                        db.query(event,['Baptism', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october1 = results[0]
                                                            baptismCount.push(october1.countt)
                                                            db.query(event,['Baptism', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november1 = results[0]
                                                                baptismCount.push(november1.countt)
                                                                db.query(event,['Baptism', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december1 = results[0]
                                                                    baptismCount.push(december1.countt)
                                                                    console.log(baptismCount)
                    db.query(event,['Special Baptism', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january2 = results[0]
                        specialbaptismCount.push(january2.countt)
                        db.query(event,['Special Baptism', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february2 = results[0]
                            specialbaptismCount.push(february2.countt)
                            db.query(event,['Special Baptism', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march2 = results[0]
                                specialbaptismCount.push(march2.countt)
                                db.query(event,['Special Baptism', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april2 = results[0]
                                    specialbaptismCount.push(april2.countt)
                                    db.query(event,['Special Baptism', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may2 = results[0]
                                        specialbaptismCount.push(may2.countt)
                                        db.query(event,['Special Baptism', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june2 = results[0]
                                            specialbaptismCount.push(june2.countt)
                                            db.query(event,['Special Baptism', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july2 = results[0]
                                                specialbaptismCount.push(july2.countt)
                                                db.query(event,['Special Baptism', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august2 = results[0]
                                                    specialbaptismCount.push(august2.countt)
                                                    db.query(event,['Special Baptism', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september2 = results[0]
                                                        specialbaptismCount.push(september2.countt)
                                                        db.query(event,['Special Baptism', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october2 = results[0]
                                                            specialbaptismCount.push(october2.countt)
                                                            db.query(event,['Special Baptism', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november2 = results[0]
                                                                specialbaptismCount.push(november2.countt)
                                                                db.query(event,['Special Baptism', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december2 = results[0]
                                                                    specialbaptismCount.push(december2.countt)
                                                                    console.log(specialbaptismCount)
                    db.query(event,['Funeral Mass', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january3 = results[0]
                        funeralmassCount.push(january3.countt)
                        db.query(event,['Funeral Mass', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february3 = results[0]
                            funeralmassCount.push(february3.countt)
                            db.query(event,['Funeral Mass', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march3 = results[0]
                                funeralmassCount.push(march3.countt)
                                db.query(event,['Funeral Mass', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april3 = results[0]
                                    funeralmassCount.push(april3.countt)
                                    db.query(event,['Funeral Mass', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may3 = results[0]
                                        funeralmassCount.push(may3.countt)
                                        db.query(event,['Funeral Mass', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june3 = results[0]
                                            funeralmassCount.push(june3.countt)
                                            db.query(event,['Funeral Mass', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july3 = results[0]
                                                funeralmassCount.push(july3.countt)
                                                db.query(event,['Funeral Mass', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august3 = results[0]
                                                    funeralmassCount.push(august3.countt)
                                                    db.query(event,['Funeral Mass', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september3 = results[0]
                                                        funeralmassCount.push(september3.countt)
                                                        db.query(event,['Funeral Mass', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october3 = results[0]
                                                            funeralmassCount.push(october3.countt)
                                                            db.query(event,['Funeral Mass', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november3 = results[0]
                                                                funeralmassCount.push(november3.countt)
                                                                db.query(event,['Funeral Mass', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december3 = results[0]
                                                                    funeralmassCount.push(december3.countt)
                                                                    console.log(funeralmassCount)
                    db.query(event,['Funeral Service', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january4 = results[0]
                        funeralserviceCount.push(january4.countt)
                        db.query(event,['Funeral Service', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february4 = results[0]
                            funeralserviceCount.push(february4.countt)
                            db.query(event,['Funeral Service', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march4 = results[0]
                                funeralserviceCount.push(march4.countt)
                                db.query(event,['Funeral Service', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april4 = results[0]
                                    funeralserviceCount.push(april4.countt)
                                    db.query(event,['Funeral Service', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may4 = results[0]
                                        funeralserviceCount.push(may4.countt)
                                        db.query(event,['Funeral Service', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june4 = results[0]
                                            funeralserviceCount.push(june4.countt)
                                            db.query(event,['Funeral Service', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july4 = results[0]
                                                funeralserviceCount.push(july4.countt)
                                                db.query(event,['Funeral Service', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august4 = results[0]
                                                    funeralserviceCount.push(august4.countt)
                                                    db.query(event,['Funeral Service', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september4 = results[0]
                                                        funeralserviceCount.push(september4.countt)
                                                        db.query(event,['Funeral Service', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october4 = results[0]
                                                            funeralserviceCount.push(october4.countt)
                                                            db.query(event,['Funeral Service', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november4 = results[0]
                                                                funeralserviceCount.push(november4.countt)
                                                                db.query(event,['Funeral Service', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december4 = results[0]
                                                                    funeralserviceCount.push(december4.countt)
                                                                    console.log(funeralserviceCount)
                    db.query(event,['Marriage', 1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january5 = results[0]
                        marriageCount.push(january5.countt)
                        db.query(event,['Marriage', 2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february5 = results[0]
                            marriageCount.push(february5.countt)
                            db.query(event,['Marriage', 3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march5 = results[0]
                                marriageCount.push(march5.countt)
                                db.query(event,['Marriage', 4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april5 = results[0]
                                    marriageCount.push(april5.countt)
                                    db.query(event,['Marriage', 5],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may5 = results[0]
                                        marriageCount.push(may5.countt)
                                        db.query(event,['Marriage', 6],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june5 = results[0]
                                            marriageCount.push(june5.countt)
                                            db.query(event,['Marriage', 7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july5 = results[0]
                                                marriageCount.push(july5.countt)
                                                db.query(event,['Marriage', 8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august5 = results[0]
                                                    marriageCount.push(august5.countt)
                                                    db.query(event,['Marriage', 9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september5 = results[0]
                                                        marriageCount.push(september5.countt)
                                                        db.query(event,['Marriage', 10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october5 = results[0]
                                                            marriageCount.push(october5.countt)
                                                            db.query(event,['Marriage', 11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november5 = results[0]
                                                                marriageCount.push(november5.countt)
                                                                db.query(event,['Marriage', 12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december5 = results[0]
                                                                    marriageCount.push(december5.countt)
                                                                    console.log(marriageCount)       
                   
                    db.query(docu,[1],(err, results, fields) => {
                        if (err) console.log(err);
                        var january7 = results[0]
                        docuCount.push(january7.countt)
                        db.query(docu,[2],(err, results, fields) => {
                            if (err) console.log(err);
                            var february7 = results[0]
                            docuCount.push(february7.countt)
                            db.query(docu,[3],(err, results, fields) => {
                                if (err) console.log(err);
                                var march7 = results[0]
                                docuCount.push(march7.countt)
                                db.query(docu,[4],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var april7 = results[0]
                                    docuCount.push(april7.countt)
                                    db.query(docu,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var may7 = results[0]
                                        docuCount.push(may7.countt)
                                        db.query(docu,[7],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var june7 = results[0]
                                            docuCount.push(june7.countt)
                                            db.query(docu,[7],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var july7 = results[0]
                                                docuCount.push(july7.countt)
                                                db.query(docu,[8],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var august7 = results[0]
                                                    docuCount.push(august7.countt)
                                                    db.query(docu,[9],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var september7 = results[0]
                                                        docuCount.push(september7.countt)
                                                        db.query(docu,[10],(err, results, fields) => {
                                                            if (err) console.log(err);
                                                            var october7 = results[0]
                                                            docuCount.push(october7.countt)
                                                            db.query(docu,[11],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                var november7 = results[0]
                                                                docuCount.push(november7.countt)
                                                                db.query(docu,[12],(err, results, fields) => {
                                                                if (err) console.log(err);
                                                                    var december7 = results[0]
                                                                    docuCount.push(december7.countt)
                                                                    console.log(docuCount)
                    
                            // res.send(resulta)
                            return res.render('admin/views/index',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                                anointingCount:anointingCount,baptismCount:baptismCount, specialbaptismCount:specialbaptismCount, funeralmassCount:funeralmassCount, funeralserviceCount:funeralserviceCount, marriageCount:marriageCount,
                            docuCount:docuCount, houseCount:houseCount
                                                    }); }); }); }); }); }); }); }); }); }); }); });     //anointing           
                                                }); }); }); }); }); }); }); }); }); }); }); }); //reg bap
                                            }); }); }); }); }); }); }); }); }); }); }); });  // spc bap
                                        }); }); }); }); }); }); }); }); }); }); }); });  //funeral mass
                                    }); }); }); }); }); }); }); }); }); }); }); }); //funeral service
                                }); }); }); }); }); }); }); }); }); }); }); }); //marriage
                            }); }); }); }); }); }); }); }); }); }); }); }); //facility
                        // }); }); }); }); }); }); }); }); }); }); }); }); //document
                    
        
        
        
             }); }); }); }); });//upto message
        }); 
        
    });
    adminRouter.get('/messages', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        var sentmessage =`SELECT count(int_messageID) as sentmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_receiverID where int_senderID= ? `
        var inboxs =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? `
        var sents =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_senderID= ? `
        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            db.query(sentmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var sentmessages = results[0];
                console.log(sentmessages)
                
            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var messages = results;
                for(i=0;i<messages.length;i++){ 
                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                } 
                db.query(inboxs, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var inboxs = results;
                    for(i=0;i<inboxs.length;i++){ 
                        inboxs[i].datetime_sent=moment(inboxs[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 
                    db.query(sents, [req.session.admin.int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var sents = results;
                        for(i=0;i<sents.length;i++){ 
                            sents[i].datetime_sent=moment(sents[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                        } 
                    console.log(sents)
                
                return res.render('admin/views/messages',{messages:messages, newmessages:newmessages,sentmessages:sentmessages,inboxs:inboxs, sents:sents})
            }); }); }); }); });
    });

    adminRouter.post('/messages/query', (req, res) => {
        const queryString = `SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and int_messageID = ?`;
        db.query(queryString,[req.session.admin.int_userID,req.body.id], (err, results, fields) => {        
            if (err) throw err;
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
    adminRouter.post('/messages/query1', (req, res) => {
        const queryString = `SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_receiverID where int_senderID= ? and int_messageID = ?`;
        db.query(queryString,[req.session.admin.int_userID,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            var query= results
            console.log(query[0])
            res.send(query[0])
        });
    });
    
    adminRouter.post('/message/send', (req, res)=>{
        var success =0
        var notsuccess =1
        console.log(req.body)
        var nowDate = new Date(); 
            var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate() +" "+ nowDate.getHours() +":" + nowDate.getMinutes() +":" +nowDate.getSeconds(); 
            
        var queryString3= `INSERT INTO tbl_message(int_senderID, int_receiverID, var_subject, text_message,datetime_sent) VALUES(?,?,?,?,?);`;
        
                db.query(queryString3,[req.session.admin.int_userID, req.body.int_receiverID, req.body.var_subject, req.body.text_message,date], (err, results, fields) => {
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
//===============================================================================================//
// M A I N T E N A N C E //
//===============================================================================================//
//EVENTS
//=======================================================
    adminRouter.get('/maintenance-events', (req, res)=>{    
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
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/events',{specialevents: specialevents, messages:messages, newmessages:newmessages });
                }); });
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
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
        var queryString1 =`SELECT * FROM tbl_services where char_type = "Sacrament"`
        db.query(queryString1, (err, results1, fields) => {
            if (err) console.log(err)  
            var queryString2 =`SELECT * FROM tbl_services where char_type = "Special Service"`
            db.query(queryString2, (err, results2, fields) => {
                if (err) console.log(err);  
                db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var newmessages = results[0];
                    console.log(newmessages)
                    db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var messages = results;
                        for(i=0;i<messages.length;i++){ 
                            messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                        } 
    
                        return res.render('admin/views/maintenance/services',{ sacraments : results1, services:results2 , messages:messages, newmessages:newmessages});    
                    }); });    
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
    adminRouter.post('/folderdetails',(req,res)=>{
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
    adminRouter.post('/getcabinets',(req,res)=>{
        var queryString2 = `select * from tbl_filecabinets`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)

            res.send({cabinets:results})
        })
    })
    adminRouter.get('/receipts',(req,res)=>{
        console.log(req.query)
        console.log(req.body)
        var queryString2 = `select * from tbl_paymenthistory`
        db.query(queryString2,(err,results,fields) =>{
            if(err) console.log(err)
            var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
            var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
            
                var ors = results;
                console.log(ors)
                for(var i = 0; i < ors.length; i++){

                    // reservations[i].date_reservedate= moment(reservations[i].date_reservedate).format('MM/DD/YYYY');
                    ors[i].date_paymentdate= moment(ors[i].date_paymentdate, 'YYYY-MM-DD').format('MM/DD/YYYY');
                    // reservations[i].datetime_reserveend= moment(reservations[i].datetime_reserveend, 'HH:mm:ss').format('MM/DD/YYYY h:mm a');
                }
                db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var newmessages = results[0];
                    console.log(newmessages)
                    db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var messages = results;
                        for(i=0;i<messages.length;i++){ 
                            messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                        } 
            return res.render('admin/views/queries/OR', {ors:ors,  messages:messages, newmessages:newmessages })
                    })})
    })
    })
    adminRouter.get('/cabinets',(req,res)=>{
        console.log(req.query)
        console.log(req.body)

        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
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
                db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var newmessages = results[0];
                    console.log(newmessages)
                    db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var messages = results;
                        for(i=0;i<messages.length;i++){ 
                            messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                        } 
                        return res.render('admin/views/queries/files', {divisions:divisions, files:files, cabinetid: cabinetid, messages:messages, newmessages:newmessages  })
                    })})
        })
    })
    })
//=======================================================
//PRIESTS
//=======================================================
    adminRouter.get('/maintenance-priests', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
            var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
            
        var queryString1 =`SELECT * FROM tbl_user where char_usertype = "Priest"`
        db.query(queryString1, (err, results1, fields) => {
            if (err) console.log(err)  
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/priest',{ priests : results1, messages:messages, newmessages:newmessages});    
                }); });
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
//REQUIREMENTS 
//=============================== ========================
    adminRouter.get('/maintenance-service-requirements', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
        var queryString1 =`SELECT * FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID where tbl_services.var_eventname<>'Marriage' order by tbl_services.var_eventname`
        db.query(queryString1, (err, results1, fields) => {
            var queryString2 =`SELECT * FROM tbl_services`
            db.query(queryString2, (err, results2, fields) => {
            if (err) console.log(err);       
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/requirements/eventrequirements',{ requirements:results1,services:results2 , messages:messages, newmessages:newmessages});
                }); });
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
        const queryString1 = `SELECT * FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID
        WHERE int_reqtypeID = ?`;
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            const queryString2 = `SELECT * from tbl_services`;
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            res.send({requirementtype:results1[0],services:results2})
            console.log(results1[0])
            // console.log(results2)
            });
        });
    });
    adminRouter.post('/maintenance-service-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_requirementtype SET var_reqname =?, var_reqdesc= ?, char_reqmode=?,char_reqtype=?,int_eventID=?
        WHERE int_reqtypeID= ?`;
        db.query(queryString,[req.body.reqname, req.body.reqdesc,req.body.reqmode,req.body.reqtype,req.body.eventID,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facilities');
            
        });
    });


    adminRouter.get('/maintenance-marriage-requirements', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
        var queryString1 =`SELECT * FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID where tbl_services.var_eventname='Marriage' order by tbl_requirementtype.var_reqname`
        db.query(queryString1, (err, results1, fields) => {
           
            if (err) console.log(err);    
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/requirements/wedrequirements',{ requirements:results1, messages:messages, newmessages:newmessages});
                }); });   
            
        });     
    });
    adminRouter.post('/maintenance-marriage-requirements/add', (req, res) => {
        var queryString=`INSERT INTO tbl_requirementtype(var_reqname,var_reqdesc,char_reqmode,char_reqtype,int_eventID) 
        VALUES(?,?,?,?,?)`  
            db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.reqmode,req.body.reqtype,5], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-marriage-requirements');
            });            
    });
    adminRouter.post('/maintenance-marriage-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_requirementtype
        WHERE int_reqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-marriage-requirements');
            
        });
    });
    adminRouter.post('/maintenance-marriage-requirements/query', (req, res) => {
        const queryString1 = `SELECT * FROM tbl_requirementtype 
        JOIN tbl_services ON tbl_services.int_eventID = tbl_requirementtype.int_eventID
        WHERE int_reqtypeID = ?`;
        db.query(queryString1,[req.body.id], (err, results1, fields) => {
            const queryString2 = `SELECT * from tbl_services`;
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            res.send({requirementtype:results1[0],services:results2})
            console.log(results1[0])
            // console.log(results2)
            });
        });
    });
    adminRouter.post('/maintenance-marriage-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_requirementtype SET var_reqname =?, var_reqdesc= ?, char_reqmode=?,char_reqtype=?,int_eventID=?
        WHERE int_reqtypeID= ?`;
        db.query(queryString,[req.body.reqname, req.body.reqdesc,req.body.reqmode,req.body.reqtype,5,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facilities');
            
        });
    });

    // Documents Requirements
    adminRouter.get('/maintenance-document-requirements', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
            var queryString =`SELECT * FROM tbl_servicereqtype join tbl_serviceutilities 
            on tbl_servicereqtype.int_serviceutilitiesID=tbl_serviceutilities.int_serviceutilitiesID
            where tbl_serviceutilities.var_servicename='Document Request'`
            db.query(queryString, (err, results1, fields) => {
            if (err) console.log(err);    
               
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/requirements/docurequirements',{requirements:results1, messages:messages, newmessages:newmessages});
                }); });
            });
    });
    adminRouter.post('/maintenance-document-requirements/add', (req, res) => {
        var queryString1=`select * from tbl_serviceutilities where var_servicename='Document Request'`
        var queryString=`INSERT INTO tbl_servicereqtype(int_serviceutilitiesID, var_reqname,var_reqdesc) 
        VALUES(?,?,?)`  
        db.query(queryString1,[req.body.reqname,req.body.reqdesc], (err, results, fields) => {    
            var id= results[0];
            console.log(id)
        db.query(queryString,[id.int_serviceutilitiesID, req.body.reqname,req.body.reqdesc], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-document-requirements');
            });            
    });
    });
    adminRouter.post('/maintenance-document-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_servicereqtype
        WHERE int_servicereqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-document-requirements');
            
        });
    });
    adminRouter.post('/maintenance-document-requirements/query', (req, res) => {
        const queryString = `SELECT * from tbl_servicereqtype
        WHERE int_servicereqtypeID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results)
            });
    });
    adminRouter.post('/maintenance-document-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_servicereqtype SET var_reqname =?, var_reqdesc= ?
        WHERE int_servicereqtypeID= ?`;
        db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-document-requirements');
            
        });
    });

    // Facility Reservation Requirements
    adminRouter.get('/maintenance-facility-requirements', (req, res)=>{
        var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
        var queryString =`SELECT * FROM tbl_servicereqtype join tbl_serviceutilities 
            on tbl_servicereqtype.int_serviceutilitiesID=tbl_serviceutilities.int_serviceutilitiesID
            where tbl_serviceutilities.var_servicename='Facility Reservation'`
            db.query(queryString, (err, results1, fields) => {
            if (err) console.log(err);        
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/maintenance/requirements/facilityrequirements',{requirements:results1, messages:messages, newmessages:newmessages});
                }); }); 
        });
    });
    adminRouter.post('/maintenance-facility-requirements/add', (req, res) => {
        var queryString1=`select * from tbl_serviceutilities where var_servicename='Facility Reservation'`
        var queryString=`INSERT INTO tbl_servicereqtype(int_serviceutilitiesID, var_reqname,var_reqdesc) 
        VALUES(?,?,?)`  
        db.query(queryString1,[req.body.reqname,req.body.reqdesc], (err, results, fields) => {    
            var id= results[0];
            console.log(id)
        db.query(queryString,[id.int_serviceutilitiesID, req.body.reqname,req.body.reqdesc], (err, results, fields) => {
                if (err) console.log(err);
                    return res.redirect('/admin/maintenance-facility-requirements');
            }); }); 
    });
    adminRouter.post('/maintenance-facility-requirements/delete', (req, res) => {
        const queryString = `DELETE FROM tbl_servicereqtype
        WHERE int_servicereqtypeID= ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
         
            return res.redirect('/admin/maintenance-facility-requirements');
            
        });
    });
    adminRouter.post('/maintenance-facility-requirements/query', (req, res) => {
        const queryString = `SELECT * from tbl_servicereqtype
        WHERE int_servicereqtypeID = ?`;
        db.query(queryString,[req.body.id], (err, results, fields) => {        
            if (err) throw err;
            res.send(results[0])
            console.log(results)
            });
    });
    adminRouter.post('/maintenance-facility-requirements/edit', (req, res) => {
        const queryString = `UPDATE tbl_servicereqtype SET var_reqname =?, var_reqdesc= ?
        WHERE int_servicereqtypeID= ?`;
        db.query(queryString,[req.body.reqname,req.body.reqdesc,req.body.id], (err, results, fields) => {        
            if (err) throw err;
            return res.redirect('/admin/maintenance-facility-requirements');    
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
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString2 =`SELECT * FROM tbl_utilities join tbl_services on tbl_utilities.int_eventID= tbl_services.int_eventID and tbl_utilities.int_eventID is not null`    
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);       
            var services= results
            
            for(var i = 0; i < services.length; i++){
                services[i].time_availablestart= moment(services[i].time_availablestart,'HH:mm:ss').format('hh:mm A'); 
                services[i].time_availableend= moment(services[i].time_availableend,'HH:mm:ss').format('hh:mm A'); 
            }
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/utilities/services/index',{ services : services, messages:messages, newmessages:newmessages});
                }); });
    }); 
}); 
adminRouter.get('/utilities-specialservices', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    
    var queryString2 =`SELECT * FROM tbl_utilities join tbl_serviceutilities on tbl_utilities.int_serviceutilitiesID= tbl_serviceutilities.int_serviceutilitiesID where tbl_utilities.int_serviceutilitiesID is not null`
        db.query(queryString2, (err, results, fields) => {
            if (err) console.log(err);       
            var services= results
            // console.log(results)
            for(var i = 0; i < services.length; i++){
                    services[i].time_availablestart= moment(services[i].time_availablestart,'HH:mm:ss').format('hh:mm A'); 
                    services[i].time_availableend= moment(services[i].time_availableend,'HH:mm:ss').format('hh:mm A'); 
            }
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/utilities/specialservices/index',{ services : services, messages:messages, newmessages:newmessages});
                }); });
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
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
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
        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var messages = results;
                for(i=0;i<messages.length;i++){ 
                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                } 

                return res.render('admin/views/utilities/services/editservice',{ services : services, mon:mon, sun:sun, tues:tues, wed:wed, thurs:thurs, fri:fri, sat:sat, sun:sun, messages:messages, newmessages:newmessages});
            }); });
    }); 
});
adminRouter.get('/utilities-specialservices/viewdetails', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
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
        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var messages = results;
                for(i=0;i<messages.length;i++){ 
                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                } 

                return res.render('admin/views/utilities/specialservices/editspecialservice',{ services : services, mon:mon, sun:sun, tues:tues, wed:wed, thurs:thurs, fri:fri, sat:sat, sun:sun, messages:messages, newmessages:newmessages});
            }); });
        
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
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * FROM tbl_utilities_client`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var clients = results[0];
        
        clients.time_officeopen=moment(clients.time_officeopen, 'HH:mm:ss').format('hh:mm A')
        clients.time_officeclose=moment(clients.time_officeclose, 'HH:mm:ss').format('hh:mm A')
        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var newmessages = results[0];
            console.log(newmessages)
            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var messages = results;
                for(i=0;i<messages.length;i++){ 
                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                } 

                return res.render('admin/views/utilities/client',{ clients : clients , messages:messages, newmessages:newmessages});
            }); });
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


//=======================================================
//R E P O R T S
//=======================================================
adminRouter.get('/reports-anointing', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
          
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
        var anointingCount=[];
        var anointingCountyear=[];
        var anointingpieapproval=[];
        var anointingrequirement=[];

        var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
        var years =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and year(date_eventdate) =?`
        var eventpieapprovalquery =`select count(int_eventinfoID) as countt from tbl_eventinfo 
        where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
        and char_approvalstatus=?`
        var eventpierequirementquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
        join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
        join tbl_requirements on tbl_requirementsinevents.int_requirementID =tbl_requirements.int_requirementID
        where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
        and tbl_requirements.var_reqstatus=?`
        var eventpiepaymentquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
        join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
        where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
        and tbl_payment.char_paymentstatus=?`


        db.query(eventpieapprovalquery,['Anointing of the sick', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending1 = results[0]
            anointingpieapproval.push(pending1.countt)
            db.query(eventpieapprovalquery,['Anointing of the sick', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved1 = results[0]
                anointingpieapproval.push(approved1.countt)
                db.query(eventpieapprovalquery,['Anointing of the sick', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved1 = results[0]
                    anointingpieapproval.push(disapproved1.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Anointing of the sick', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted1 = results[0]
                        anointingrequirement.push(submitted1.countt)
                        db.query(eventpierequirementquery,['Anointing of the sick', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd1 = results[0]
                            anointingrequirement.push(approvedd1.countt)
                            db.query(eventpierequirementquery,['Anointing of the sick', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected1 = results[0]
                                anointingrequirement.push(rejected1.countt)
        db.query(event,['Anointing of the sick', 1],(err, results, fields) => {
            if (err) console.log(err);
            var january = results[0]
            anointingCount.push(january.countt)
            db.query(event,['Anointing of the sick', 2],(err, results, fields) => {
                if (err) console.log(err);
                var february = results[0]
                anointingCount.push(february.countt)
                db.query(event,['Anointing of the sick', 3],(err, results, fields) => {
                    if (err) console.log(err);
                    var march = results[0]
                    anointingCount.push(march.countt)
                    db.query(event,['Anointing of the sick', 4],(err, results, fields) => {
                        if (err) console.log(err);
                        var april = results[0]
                        anointingCount.push(april.countt)
                        db.query(event,['Anointing of the sick', 5],(err, results, fields) => {
                            if (err) console.log(err);
                            var may = results[0]
                            anointingCount.push(may.countt)
                            db.query(event,['Anointing of the sick', 6],(err, results, fields) => {
                                if (err) console.log(err);
                                var june = results[0]
                                anointingCount.push(june.countt)
                                db.query(event,['Anointing of the sick', 7],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var july = results[0]
                                    anointingCount.push(july.countt)
                                    db.query(event,['Anointing of the sick', 8],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var august = results[0]
                                        anointingCount.push(august.countt)
                                        db.query(event,['Anointing of the sick', 9],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var september = results[0]
                                            anointingCount.push(september.countt)
                                            db.query(event,['Anointing of the sick', 10],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var october = results[0]
                                                anointingCount.push(october.countt)
                                                db.query(event,['Anointing of the sick', 11],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var november = results[0]
                                                    anointingCount.push(november.countt)
                                                    db.query(event,['Anointing of the sick', 12],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                        var december = results[0]
                                                        anointingCount.push(december.countt)
                                                        console.log(anointingCount)
        db.query(years,['Anointing of the sick', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            anointingCountyear.push(ten.countt)
            db.query(years,['Anointing of the sick', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                anointingCountyear.push(eleven.countt)
                db.query(years,['Anointing of the sick', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    anointingCountyear.push(twelve.countt)
                    db.query(years,['Anointing of the sick', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        anointingCountyear.push(thirteen.countt)
                        db.query(years,['Anointing of the sick', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            anointingCountyear.push(fourteen.countt)
                            db.query(years,['Anointing of the sick', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                anointingCountyear.push(fifteen.countt)
                                db.query(years,['Anointing of the sick', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    anointingCountyear.push(sixteen.countt)
                                    db.query(years,['Anointing of the sick', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        anointingCountyear.push(seventeen.countt)
                                        db.query(years,['Anointing of the sick', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            anointingCountyear.push(eighteen.countt)

                                            console.log(anointingCountyear)
                    return res.render('admin/views/reports/services/anointing',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                        anointingCount:anointingCount,
                        anointingCountyear:anointingCountyear,
                    anointingpieapproval:anointingpieapproval,
                    anointingrequirement:anointingrequirement})
                                                    

    }); }); }); }); }); });  //anointing
}); }); }); }); }); }); }); }); }); //year 
}); }); }); }); }); }); }); }); }); }); });     //anointing           
    }); }); }); }); }); });//upto message
});
adminRouter.get('/reports-baptism', (req, res)=>{

    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
    var years =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and year(date_eventdate) =?`
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    // var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
           
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
            
            var baptismCount=[];
            var specialbaptismCount=[];
            var baptismCountyear=[];
            var specialbaptismCountyear=[];
            
            //pie charts
            //BAPTISM
            var baptismpieapproval=[];
            var baptismpierequirement=[];
            var baptismpiepayment=[];
            
            
            //SPECIAL BAPTISM
            var spcbaptismpieapproval=[];
            var spcbaptismrequirement=[];
            var spcbaptismpiepayment=[];
            
            
            //line graphs queries
            var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
           
            //pie charts queries
            var eventpieapprovalquery =`select count(int_eventinfoID) as countt from tbl_eventinfo 
            where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and char_approvalstatus=?`
            var eventpierequirementquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            join tbl_requirements on tbl_requirementsinevents.int_requirementID =tbl_requirements.int_requirementID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_requirements.var_reqstatus=?`
            var eventpiepaymentquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_payment.char_paymentstatus=?`

          

        db.query(eventpieapprovalquery,['Baptism', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending2 = results[0]
            baptismpieapproval.push(pending2.countt)
            db.query(eventpieapprovalquery,['Baptism', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved2 = results[0]
                baptismpieapproval.push(approved2.countt)
                db.query(eventpieapprovalquery,['Baptism', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved2 = results[0]
                    baptismpieapproval.push(disapproved2.countt)
                        //requirement
                        db.query(eventpierequirementquery,['Baptism', "Submitted"],(err, results, fields) => {
                            if (err) console.log(err);
                            var submitted2 = results[0]
                            baptismpierequirement.push(submitted2.countt)
                            db.query(eventpierequirementquery,['Baptism', "Approved"],(err, results, fields) => {
                                if (err) console.log(err);
                                var approvedd2 = results[0]
                                baptismpierequirement.push(approvedd2.countt)
                                db.query(eventpierequirementquery,['Baptism', "Rejected"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var rejected2 = results[0]
                                    baptismpierequirement.push(rejected2.countt)
                                    //payment
                                    db.query(eventpiepaymentquery,['Baptism', "Paid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var paid2 = results[0]
                                        baptismpiepayment.push(paid2.countt)
                                        db.query(eventpiepaymentquery,['Baptism', "Unpaid"],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var unpaid2 = results[0]
                                            baptismpiepayment.push(unpaid2.countt)
        db.query(eventpieapprovalquery,['Special Baptism', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending3 = results[0]
            spcbaptismpieapproval.push(pending3.countt)
            db.query(eventpieapprovalquery,['Special Baptism', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved3 = results[0]
                spcbaptismpieapproval.push(approved3.countt)
                db.query(eventpieapprovalquery,['Special Baptism', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved3 = results[0]
                    spcbaptismpieapproval.push(disapproved3.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Special Baptism', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted3 = results[0]
                        spcbaptismrequirement.push(submitted3.countt)
                        db.query(eventpierequirementquery,['Special Baptism', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd3 = results[0]
                            spcbaptismrequirement.push(approvedd3.countt)
                            db.query(eventpierequirementquery,['Special Baptism', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected3 = results[0]
                                spcbaptismrequirement.push(rejected3.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Special Baptism', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid3 = results[0]
                                    spcbaptismpiepayment.push(paid3.countt)
                                    db.query(eventpiepaymentquery,['Special Baptism', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid3 = results[0]
                                        spcbaptismpiepayment.push(unpaid3.countt)
        
             db.query(event,['Baptism', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january1 = results[0]
                baptismCount.push(january1.countt)
                db.query(event,['Baptism', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february1 = results[0]
                    baptismCount.push(february1.countt)
                    db.query(event,['Baptism', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march1 = results[0]
                        baptismCount.push(march1.countt)
                        db.query(event,['Baptism', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april1 = results[0]
                            baptismCount.push(april1.countt)
                            db.query(event,['Baptism', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may1 = results[0]
                                baptismCount.push(may1.countt)
                                db.query(event,['Baptism', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june1 = results[0]
                                    baptismCount.push(june1.countt)
                                    db.query(event,['Baptism', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july1 = results[0]
                                        baptismCount.push(july1.countt)
                                        db.query(event,['Baptism', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august1 = results[0]
                                            baptismCount.push(august1.countt)
                                            db.query(event,['Baptism', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september1 = results[0]
                                                baptismCount.push(september1.countt)
                                                db.query(event,['Baptism', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october1 = results[0]
                                                    baptismCount.push(october1.countt)
                                                    db.query(event,['Baptism', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november1 = results[0]
                                                        baptismCount.push(november1.countt)
                                                        db.query(event,['Baptism', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december1 = results[0]
                                                            baptismCount.push(december1.countt)
                                                            console.log(baptismCount)
            db.query(event,['Special Baptism', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january2 = results[0]
                specialbaptismCount.push(january2.countt)
                db.query(event,['Special Baptism', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february2 = results[0]
                    specialbaptismCount.push(february2.countt)
                    db.query(event,['Special Baptism', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march2 = results[0]
                        specialbaptismCount.push(march2.countt)
                        db.query(event,['Special Baptism', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april2 = results[0]
                            specialbaptismCount.push(april2.countt)
                            db.query(event,['Special Baptism', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may2 = results[0]
                                specialbaptismCount.push(may2.countt)
                                db.query(event,['Special Baptism', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june2 = results[0]
                                    specialbaptismCount.push(june2.countt)
                                    db.query(event,['Special Baptism', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july2 = results[0]
                                        specialbaptismCount.push(july2.countt)
                                           db.query(event,['Special Baptism', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august2 = results[0]
                                            specialbaptismCount.push(august2.countt)
                                            db.query(event,['Special Baptism', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september2 = results[0]
                                                specialbaptismCount.push(september2.countt)
                                                db.query(event,['Special Baptism', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october2 = results[0]
                                                    specialbaptismCount.push(october2.countt)
                                                    db.query(event,['Special Baptism', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november2 = results[0]
                                                        specialbaptismCount.push(november2.countt)
                                                        db.query(event,['Special Baptism', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december2 = results[0]
                                                            specialbaptismCount.push(december2.countt)
                                                            console.log(specialbaptismCount)
        db.query(years,['Baptism', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            baptismCountyear.push(ten.countt)
            db.query(years,['Baptism', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                baptismCountyear.push(eleven.countt)
                db.query(years,['Baptism', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    baptismCountyear.push(twelve.countt)
                    db.query(years,['Baptism', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        baptismCountyear.push(thirteen.countt)
                        db.query(years,['Baptism', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            baptismCountyear.push(fourteen.countt)
                            db.query(years,['Baptism', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                baptismCountyear.push(fifteen.countt)
                                db.query(years,['Baptism', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    baptismCountyear.push(sixteen.countt)
                                    db.query(years,['Baptism', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        baptismCountyear.push(seventeen.countt)
                                        db.query(years,['Baptism', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            baptismCountyear.push(eighteen.countt)

                                            console.log(baptismCountyear)
        db.query(years,['Special Baptism', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            specialbaptismCountyear.push(ten.countt)
            db.query(years,['Special Baptism', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                specialbaptismCountyear.push(eleven.countt)
                db.query(years,['Special Baptism', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    specialbaptismCountyear.push(twelve.countt)
                    db.query(years,['Special Baptism', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        specialbaptismCountyear.push(thirteen.countt)
                        db.query(years,['Special Baptism', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            specialbaptismCountyear.push(fourteen.countt)
                            db.query(years,['Special Baptism', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                specialbaptismCountyear.push(fifteen.countt)
                                db.query(years,['Special Baptism', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    specialbaptismCountyear.push(sixteen.countt)
                                    db.query(years,['Special Baptism', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        specialbaptismCountyear.push(seventeen.countt)
                                        db.query(years,['Special Baptism', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            specialbaptismCountyear.push(eighteen.countt)

                                            console.log(specialbaptismCountyear)
                    // res.send(resulta)
                    return res.render('admin/views/reports/services/baptism',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                    baptismCount:baptismCount, baptismCountyear:baptismCountyear, 
                    specialbaptismCount:specialbaptismCount, specialbaptismCountyear:specialbaptismCountyear,
                    baptismpieapproval:baptismpieapproval,
                    baptismpierequirement:baptismpierequirement,
                    baptismpiepayment:baptismpiepayment,
                    
                    //SPECIAL BAPTISM
                    spcbaptismpieapproval:spcbaptismpieapproval,
                    spcbaptismrequirement:spcbaptismrequirement,
                    spcbaptismpiepayment:spcbaptismpiepayment,
                    
                
                });
                


}); }); }); }); }); }); }); }); //regbap
}); }); }); }); }); }); }); }); //spc bap
}); }); }); }); }); }); }); }); }); //year
}); }); }); }); }); }); }); }); }); //year
}); }); }); }); }); }); }); }); }); }); }); }); //reg bap
}); }); }); }); }); }); }); }); }); }); }); });  // spc bap
                                


    }); }); }); }); }); //upto message

})
adminRouter.get('/reports-funeral', (req, res)=>{

    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    // var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
           
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
           
            var funeralmassCount=[];
            var funeralserviceCount=[];
            var funeralmassCountyear=[];
            var funeralserviceCountyear=[];
            //pie charts
           
            //FUNERAL MASS
            var funeralmasspieapproval=[];
            var funeralmassrequirement=[];
            var funeralmasspiepayment=[];
            
            //FUNERAL SERVICE
            var funeralservicepieapproval=[];
            var funeralservicerequirement=[];
            
            //line graphs queries
            var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
            var years =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and year(date_eventdate) =?`
            //pie charts queries
            var eventpieapprovalquery =`select count(int_eventinfoID) as countt from tbl_eventinfo 
            where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and char_approvalstatus=?`
            var eventpierequirementquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            join tbl_requirements on tbl_requirementsinevents.int_requirementID =tbl_requirements.int_requirementID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_requirements.var_reqstatus=?`
            var eventpiepaymentquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_payment.char_paymentstatus=?`


        db.query(eventpieapprovalquery,['Funeral Mass', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending4 = results[0]
            funeralmasspieapproval.push(pending4.countt)
            db.query(eventpieapprovalquery,['Funeral Mass', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved4 = results[0]
                funeralmasspieapproval.push(approved4.countt)
                db.query(eventpieapprovalquery,['Funeral Mass', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved4 = results[0]
                    funeralmasspieapproval.push(disapproved4.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Funeral Mass', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted4 = results[0]
                        funeralmassrequirement.push(submitted4.countt)
                        db.query(eventpierequirementquery,['Funeral Mass', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd4 = results[0]
                            funeralmassrequirement.push(approvedd4.countt)
                            db.query(eventpierequirementquery,['Funeral Mass', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected4 = results[0]
                                funeralmassrequirement.push(rejected4.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Funeral Mass', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid4 = results[0]
                                    funeralmasspiepayment.push(paid4.countt)
                                    db.query(eventpiepaymentquery,['Funeral Mass', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid4 = results[0]
                                        funeralmasspiepayment.push(unpaid4.countt)
        db.query(eventpieapprovalquery,['Funeral Service', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending5 = results[0]
            funeralservicepieapproval.push(pending5.countt)
            db.query(eventpieapprovalquery,['Funeral Service', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved5 = results[0]
                funeralservicepieapproval.push(approved5.countt)
                db.query(eventpieapprovalquery,['Funeral Service', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved5 = results[0]
                    funeralservicepieapproval.push(disapproved5.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Funeral Service', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted5 = results[0]
                        funeralservicerequirement.push(submitted5.countt)
                        db.query(eventpierequirementquery,['Funeral Service', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd5 = results[0]
                            funeralservicerequirement.push(approvedd5.countt)
                            db.query(eventpierequirementquery,['Funeral Service', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected5 = results[0]
                                funeralservicerequirement.push(rejected5.countt)
              
      
            db.query(event,['Funeral Mass', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january3 = results[0]
                funeralmassCount.push(january3.countt)
                db.query(event,['Funeral Mass', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february3 = results[0]
                    funeralmassCount.push(february3.countt)
                    db.query(event,['Funeral Mass', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march3 = results[0]
                        funeralmassCount.push(march3.countt)
                        db.query(event,['Funeral Mass', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april3 = results[0]
                            funeralmassCount.push(april3.countt)
                            db.query(event,['Funeral Mass', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may3 = results[0]
                                funeralmassCount.push(may3.countt)
                                db.query(event,['Funeral Mass', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june3 = results[0]
                                    funeralmassCount.push(june3.countt)
                                    db.query(event,['Funeral Mass', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july3 = results[0]
                                        funeralmassCount.push(july3.countt)
                                        db.query(event,['Funeral Mass', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august3 = results[0]
                                            funeralmassCount.push(august3.countt)
                                            db.query(event,['Funeral Mass', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september3 = results[0]
                                                funeralmassCount.push(september3.countt)
                                                db.query(event,['Funeral Mass', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october3 = results[0]
                                                    funeralmassCount.push(october3.countt)
                                                    db.query(event,['Funeral Mass', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november3 = results[0]
                                                        funeralmassCount.push(november3.countt)
                                                        db.query(event,['Funeral Mass', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december3 = results[0]
                                                            funeralmassCount.push(december3.countt)
                                                            console.log(funeralmassCount)
            db.query(event,['Funeral Service', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january4 = results[0]
                funeralserviceCount.push(january4.countt)
                db.query(event,['Funeral Service', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february4 = results[0]
                    funeralserviceCount.push(february4.countt)
                    db.query(event,['Funeral Service', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march4 = results[0]
                        funeralserviceCount.push(march4.countt)
                        db.query(event,['Funeral Service', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april4 = results[0]
                            funeralserviceCount.push(april4.countt)
                            db.query(event,['Funeral Service', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may4 = results[0]
                                funeralserviceCount.push(may4.countt)
                                db.query(event,['Funeral Service', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june4 = results[0]
                                    funeralserviceCount.push(june4.countt)
                                    db.query(event,['Funeral Service', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july4 = results[0]
                                        funeralserviceCount.push(july4.countt)
                                        db.query(event,['Funeral Service', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august4 = results[0]
                                            funeralserviceCount.push(august4.countt)
                                            db.query(event,['Funeral Service', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september4 = results[0]
                                                funeralserviceCount.push(september4.countt)
                                                db.query(event,['Funeral Service', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october4 = results[0]
                                                    funeralserviceCount.push(october4.countt)
                                                    db.query(event,['Funeral Service', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november4 = results[0]
                                                        funeralserviceCount.push(november4.countt)
                                                        db.query(event,['Funeral Service', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december4 = results[0]
                                                            funeralserviceCount.push(december4.countt)
                                                            console.log(funeralserviceCount)
        db.query(years,['Funeral Mass', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            funeralmassCountyear.push(ten.countt)
            db.query(years,['Funeral Mass', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                funeralmassCountyear.push(eleven.countt)
                db.query(years,['Funeral Mass', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    funeralmassCountyear.push(twelve.countt)
                    db.query(years,['Funeral Mass', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        funeralmassCountyear.push(thirteen.countt)
                        db.query(years,['Funeral Mass', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            funeralmassCountyear.push(fourteen.countt)
                            db.query(years,['Funeral Mass', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                funeralmassCountyear.push(fifteen.countt)
                                db.query(years,['Funeral Mass', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    funeralmassCountyear.push(sixteen.countt)
                                    db.query(years,['Funeral Mass', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        funeralmassCountyear.push(seventeen.countt)
                                        db.query(years,['Funeral Mass', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            funeralmassCountyear.push(eighteen.countt)

                                            console.log(funeralmassCountyear)
         db.query(years,['Funeral Service', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            funeralserviceCountyear.push(ten.countt)
            db.query(years,['Funeral Service', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                funeralserviceCountyear.push(eleven.countt)
                db.query(years,['Funeral Service', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    funeralserviceCountyear.push(twelve.countt)
                    db.query(years,['Funeral Service', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        funeralserviceCountyear.push(thirteen.countt)
                        db.query(years,['Funeral Service', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            funeralserviceCountyear.push(fourteen.countt)
                            db.query(years,['Funeral Service', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                funeralserviceCountyear.push(fifteen.countt)
                                db.query(years,['Funeral Service', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    funeralserviceCountyear.push(sixteen.countt)
                                    db.query(years,['Funeral Service', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        funeralserviceCountyear.push(seventeen.countt)
                                        db.query(years,['Funeral Service', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            funeralserviceCountyear.push(eighteen.countt)

                                            console.log(funeralserviceCountyear)
                    // res.send(resulta)
                    return res.render('admin/views/reports/services/funeral',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                         funeralmassCount:funeralmassCount, funeralserviceCount:funeralserviceCount,
                         funeralmassCountyear:funeralmassCountyear, funeralserviceCountyear:funeralserviceCountyear,
                    
                    //FUNERAL MASS
                    funeralmasspieapproval:funeralmasspieapproval,
                    funeralmassrequirement:funeralmassrequirement,
                    funeralmasspiepayment:funeralmasspiepayment,
                    
                    //FUNERAL SERVICE
                    funeralservicepieapproval:funeralservicepieapproval,
                    funeralservicerequirement:funeralservicerequirement
                    
                
                });
                


}); }); }); }); }); }); }); }); //funeral mass
}); }); }); }); }); }); }); }); }); 
}); }); }); }); }); }); }); }); }); 
}); }); }); }); }); }); //funeral service


                                }); }); }); }); }); }); }); }); }); }); }); });  //funeral mass
                            }); }); }); }); }); }); }); }); }); }); }); }); //funeral service
                        



    }); }); }); }); }); //upto message
})
adminRouter.get('/reports-marriage', (req, res)=>{
    
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
    
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
            
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
            var marriageCount=[];
            var marriageCountyear=[];
            //MARRIAGE
            var marriagepieapproval=[];
            var marriagerequirement=[];
            var marriagepiepayment=[];
            
            //line graphs queries
            var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
            var years =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and year(date_eventdate) =?`
            //pie charts queries
            var eventpieapprovalquery =`select count(int_eventinfoID) as countt from tbl_eventinfo 
            where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and char_approvalstatus=?`
            var eventpierequirementquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            join tbl_requirements on tbl_requirementsinevents.int_requirementID =tbl_requirements.int_requirementID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_requirements.var_reqstatus=?`
            var eventpiepaymentquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_payment.char_paymentstatus=?`


        db.query(eventpieapprovalquery,['Marriage', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending6 = results[0]
            marriagepieapproval.push(pending6.countt)
            db.query(eventpieapprovalquery,['Marriage', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved6 = results[0]
                marriagepieapproval.push(approved6.countt)
                db.query(eventpieapprovalquery,['Marriage', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved6 = results[0]
                    marriagepieapproval.push(disapproved6.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Marriage', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted6 = results[0]
                        marriagerequirement.push(submitted6.countt)
                        db.query(eventpierequirementquery,['Marriage', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd6 = results[0]
                            marriagerequirement.push(approvedd6.countt)
                            db.query(eventpierequirementquery,['Marriage', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected6 = results[0]
                                marriagerequirement.push(rejected6.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Marriage', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid6 = results[0]
                                    marriagepiepayment.push(paid6.countt)
                                    db.query(eventpiepaymentquery,['Marriage', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid6 = results[0]
                                        marriagepiepayment.push(unpaid6.countt)
        
            db.query(event,['Marriage', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january5 = results[0]
                marriageCount.push(january5.countt)
                db.query(event,['Marriage', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february5 = results[0]
                    marriageCount.push(february5.countt)
                    db.query(event,['Marriage', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march5 = results[0]
                        marriageCount.push(march5.countt)
                        db.query(event,['Marriage', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april5 = results[0]
                            marriageCount.push(april5.countt)
                            db.query(event,['Marriage', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may5 = results[0]
                                marriageCount.push(may5.countt)
                                db.query(event,['Marriage', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june5 = results[0]
                                    marriageCount.push(june5.countt)
                                    db.query(event,['Marriage', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july5 = results[0]
                                        marriageCount.push(july5.countt)
                                        db.query(event,['Marriage', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august5 = results[0]
                                            marriageCount.push(august5.countt)
                                            db.query(event,['Marriage', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september5 = results[0]
                                                marriageCount.push(september5.countt)
                                                db.query(event,['Marriage', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october5 = results[0]
                                                    marriageCount.push(october5.countt)
                                                    db.query(event,['Marriage', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november5 = results[0]
                                                        marriageCount.push(november5.countt)
                                                        db.query(event,['Marriage', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december5 = results[0]
                                                            marriageCount.push(december5.countt)
                                                            console.log(marriageCount)       
            db.query(years,['Marriage', 2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            marriageCountyear.push(ten.countt)
            db.query(years,['Marriage', 2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                marriageCountyear.push(eleven.countt)
                db.query(years,['Marriage', 2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    marriageCountyear.push(twelve.countt)
                    db.query(years,['Marriage', 2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        marriageCountyear.push(thirteen.countt)
                        db.query(years,['Marriage', 2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            marriageCountyear.push(fourteen.countt)
                            db.query(years,['Marriage', 2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                marriageCountyear.push(fifteen.countt)
                                db.query(years,['Marriage', 2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    marriageCountyear.push(sixteen.countt)
                                    db.query(years,['Marriage', 2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        marriageCountyear.push(seventeen.countt)
                                        db.query(years,['Marriage', 2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            marriageCountyear.push(eighteen.countt)

                                            console.log(marriageCountyear)
                    // res.send(resulta)
                    return res.render('admin/views/reports/services/marriage',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                        marriageCount:marriageCount,
                        marriageCountyear:marriageCountyear,
                    
                    //MARRIAGE
                    marriagepieapproval:marriagepieapproval,
                    marriagerequirement:marriagerequirement,
                    marriagepiepayment:marriagepiepayment,
                    
                
                

}); }); }); }); }); }); }); }); //marriage
}); }); }); }); }); }); }); }); }); //year 
                        }); }); }); }); }); }); }); }); }); }); }); }); //marriage
                   


    }); }); }); }); }); });//upto message
})
adminRouter.get('/reports-facilityreservation', (req, res)=>{

    
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
           
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
          
            var facilityCount=[];
            var facilityCountyear=[];
           
            //FACILITY RESERVATION
            var facilitypieapproval=[];
            var facilityrequirement=[];
            var facilitypiepayment=[];
            
            //line graphs queries
            var facility =`select count(int_reservationID) as countt from tbl_facilityreservation where month(datetime_reservestart) =?`
            var years =`select count(int_reservationID) as countt from tbl_facilityreservation where year(datetime_reservestart) =?`
            
            var facilitypieapprovalquery =`select count(int_reservationID) as countt from tbl_facilityreservation 
            where char_reservestatus=?`
            var facilitypierequirementquery =`select count(tbl_facilityreservation.int_reservationID) as countt from tbl_facilityreservation 
            join tbl_requirementsfacility on tbl_facilityreservation.int_reservationID = tbl_requirementsfacility.int_reservationID
            where tbl_requirementsfacility.char_reqstatus=?`
            var facilitypiepaymentquery =`select count(tbl_facilityreservation.int_reservationID) as countt from tbl_facilityreservation 
            join tbl_payment on tbl_facilityreservation.int_paymentID = tbl_payment.int_paymentID
            where tbl_payment.char_paymentstatus=?`
            

        db.query(facilitypieapprovalquery,["Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending8 = results[0]
            facilitypieapproval.push(pending8.countt)
            db.query(facilitypieapprovalquery,["Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved8 = results[0]
                facilitypieapproval.push(approved8.countt)
                db.query(facilitypieapprovalquery,["Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved8 = results[0]
                    facilitypieapproval.push(disapproved8.countt)
                    //requirement
                    db.query(facilitypierequirementquery,[ "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted8 = results[0]
                        facilityrequirement.push(submitted8.countt)
                        db.query(facilitypierequirementquery,[ "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd8 = results[0]
                            facilityrequirement.push(approvedd8.countt)
                            db.query(facilitypierequirementquery,[ "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected8 = results[0]
                                facilityrequirement.push(rejected8.countt)
                                //payment
                                db.query(facilitypiepaymentquery,[ "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid8 = results[0]
                                    facilitypiepayment.push(paid8.countt)
                                    db.query(facilitypiepaymentquery,[ "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid8 = results[0]
                                        facilitypiepayment.push(unpaid8.countt)
            
            db.query(facility,[1],(err, results, fields) => {
                if (err) console.log(err);
                var january6 = results[0]
                facilityCount.push(january6.countt)
                db.query(facility,[2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february6 = results[0]
                    facilityCount.push(february6.countt)
                    db.query(facility,[3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march6 = results[0]
                        facilityCount.push(march6.countt)
                        db.query(facility,[4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april6 = results[0]
                            facilityCount.push(april6.countt)
                            db.query(facility,[5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may6 = results[0]
                                facilityCount.push(may6.countt)
                                db.query(facility,[6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june6 = results[0]
                                    facilityCount.push(june6.countt)
                                    db.query(facility,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july6 = results[0]
                                        facilityCount.push(july6.countt)
                                        db.query(facility,[8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august6 = results[0]
                                            facilityCount.push(august6.countt)
                                            db.query(facility,[9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september6 = results[0]
                                                facilityCount.push(september6.countt)
                                                db.query(facility,[10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october6 = results[0]
                                                    facilityCount.push(october6.countt)
                                                    db.query(facility,[11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november6 = results[0]
                                                        facilityCount.push(november6.countt)
                                                        db.query(facility,[12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december6 = results[0]
                                                            facilityCount.push(december6.countt)
                                                            console.log(facilityCount)
        db.query(years,[2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            facilityCountyear.push(ten.countt)
            db.query(years,[2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                facilityCountyear.push(eleven.countt)
                db.query(years,[2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    facilityCountyear.push(twelve.countt)
                    db.query(years,[2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        facilityCountyear.push(thirteen.countt)
                        db.query(years,[2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            facilityCountyear.push(fourteen.countt)
                            db.query(years,[2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                facilityCountyear.push(fifteen.countt)
                                db.query(years,[2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    facilityCountyear.push(sixteen.countt)
                                    db.query(years,[2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        facilityCountyear.push(seventeen.countt)
                                        db.query(years,[2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            facilityCountyear.push(eighteen.countt)

                                            console.log(facilityCountyear)
            
                    // res.send(resulta)
                    return res.render('admin/views/reports/specialservices/facility',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                        
                    facilityCount:facilityCount, 
                    facilityCountyear:facilityCountyear, 
                    
                    //FACILITY RESERVATION
                    facilitypieapproval:facilitypieapproval,
                    facilityrequirement:facilityrequirement,
                    facilitypiepayment:facilitypiepayment,
                    
                
                
                
}); }); }); }); }); }); }); }); //facility
}); }); }); }); }); }); }); });});
                    }); }); }); }); }); }); }); }); }); }); }); }); //facility
              


    }); }); }); }); }); });//upto message

})
adminRouter.get('/reports-documentrequest', (req, res)=>{


    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
            
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
            
            var docuCount=[];
            var docuCountyear=[];
            
            
            //DOCUMENT
            var docupieapproval=[];
            var docurequirement=[];
            var docupiepayment=[];
           
            //line graphs queries
            var docu =`select count(int_requestID) as countt from tbl_documentrequest where month(date_docurequested) =?`
            var years =`select count(int_requestID) as countt from tbl_documentrequest where year(date_docurequested) =?`
            
            //pie charts queries
            var docupieapprovalquery =`select count(int_requestID) as countt from tbl_documentrequest
            where char_docustatus=?`
            var docupierequirementquery =`select count(tbl_documentrequest.int_requestID) as countt from tbl_documentrequest 
            join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
            where tbl_requirementsdocument.char_reqstatus=?`
            var docupiepaymentquery =`select count(tbl_documentrequest.int_requestID) as countt from tbl_documentrequest 
            join tbl_payment on tbl_documentrequest.int_paymentID = tbl_payment.int_paymentID
            where tbl_payment.char_paymentstatus=?`

        db.query(docupieapprovalquery,["Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending7 = results[0]
            docupieapproval.push(pending7.countt)
            db.query(docupieapprovalquery,["Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved7 = results[0]
                docupieapproval.push(approved7.countt)
                db.query(docupieapprovalquery,["Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved7 = results[0]
                    docupieapproval.push(disapproved7.countt)
                    //requirement
                    db.query(docupierequirementquery,[ "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted7 = results[0]
                        docurequirement.push(submitted7.countt)
                        db.query(docupierequirementquery,[ "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd7 = results[0]
                            docurequirement.push(approvedd7.countt)
                            db.query(docupierequirementquery,[ "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected7 = results[0]
                                docurequirement.push(rejected7.countt)
                                //payment
                                db.query(docupiepaymentquery,[ "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid7 = results[0]
                                    docupiepayment.push(paid7.countt)
                                    db.query(docupiepaymentquery,[ "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid7 = results[0]
                                        docupiepayment.push(unpaid7.countt)
      
            db.query(docu,[1],(err, results, fields) => {
                if (err) console.log(err);
                var january7 = results[0]
                docuCount.push(january7.countt)
                db.query(docu,[2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february7 = results[0]
                    docuCount.push(february7.countt)
                    db.query(docu,[3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march7 = results[0]
                        docuCount.push(march7.countt)
                        db.query(docu,[4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april7 = results[0]
                            docuCount.push(april7.countt)
                            db.query(docu,[7],(err, results, fields) => {
                                if (err) console.log(err);
                                var may7 = results[0]
                                docuCount.push(may7.countt)
                                db.query(docu,[7],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june7 = results[0]
                                    docuCount.push(june7.countt)
                                    db.query(docu,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july7 = results[0]
                                        docuCount.push(july7.countt)
                                        db.query(docu,[8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august7 = results[0]
                                            docuCount.push(august7.countt)
                                            db.query(docu,[9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september7 = results[0]
                                                docuCount.push(september7.countt)
                                                db.query(docu,[10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october7 = results[0]
                                                    docuCount.push(october7.countt)
                                                    db.query(docu,[11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november7 = results[0]
                                                        docuCount.push(november7.countt)
                                                        db.query(docu,[12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december7 = results[0]
                                                            docuCount.push(december7.countt)
                                                            console.log(docuCount)
            
        db.query(years,[2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            docuCountyear.push(ten.countt)
            db.query(years,[2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                docuCountyear.push(eleven.countt)
                db.query(years,[2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    docuCountyear.push(twelve.countt)
                    db.query(years,[2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        docuCountyear.push(thirteen.countt)
                        db.query(years,[2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            docuCountyear.push(fourteen.countt)
                            db.query(years,[2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                docuCountyear.push(fifteen.countt)
                                db.query(years,[2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    docuCountyear.push(sixteen.countt)
                                    db.query(years,[2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        docuCountyear.push(seventeen.countt)
                                        db.query(years,[2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            docuCountyear.push(eighteen.countt)

                                            console.log(docuCountyear)
                    return res.render('admin/views/reports/specialservices/document',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                    docuCount:docuCount, 
                    docuCountyear:docuCountyear, 
                    docupieapproval:docupieapproval,
                    docurequirement:docurequirement,
                    docupiepayment:docupiepayment,
                    
                
                
                });
                
}); }); }); }); }); }); }); }); //docu
}); }); }); }); }); }); }); }); }); 

                }); }); }); }); }); }); }); }); }); }); });  //document
          



    }); }); }); }); }); });//upto message
})
adminRouter.get('/reports-houseblessing', (req, res)=>{

    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    var queryString2 =`SELECT count(int_reservationID) as reservationcount from tbl_facilityreservation`
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
            
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
           
            var houseCount=[];
            var houseCountyear=[];
            
            // HOUSE
            var housepieapproval=[];
            var houserequirement=[];
            var house =`select count(int_houseblessID) as countt from tbl_houseblessing where month(date_blessingdate) =?`
            var years =`select count(int_houseblessID) as countt from tbl_houseblessing where year(date_blessingdate) =?`
            
            var housepieapprovalquery =`select count(int_houseblessID) as countt from tbl_houseblessing 
            where char_approvalstatus=?`
            var housepierequirementquery =`select count(tbl_houseblessing.int_houseblessID) as countt from tbl_houseblessing 
            join tbl_requirementshouse on tbl_houseblessing.int_houseblessID = tbl_requirementshouse.int_houseblessID
            where tbl_requirementshouse.var_reqstatus=?`
            var housepiepaymentquery =`select count(tbl_houseblessing.int_houseblessID) as countt from tbl_houseblessing 
            join tbl_payment on tbl_houseblessing.int_paymentID = tbl_payment.int_paymentID
            where tbl_payment.char_paymentstatus=?`

        db.query(housepieapprovalquery,["Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending9 = results[0]
            housepieapproval.push(pending9.countt)
            db.query(housepieapprovalquery,["Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved9 = results[0]
                housepieapproval.push(approved9.countt)
                db.query(housepieapprovalquery,["Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved9 = results[0]
                    housepieapproval.push(disapproved9.countt)
                    //requirement
                    db.query(housepierequirementquery,[ "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted9 = results[0]
                        houserequirement.push(submitted9.countt)
                        db.query(housepierequirementquery,[ "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd9 = results[0]
                            houserequirement.push(approvedd9.countt)
                            db.query(housepierequirementquery,[ "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected9 = results[0]
                                houserequirement.push(rejected9.countt)
                               

            db.query(house,[1],(err, results, fields) => {
                if (err) console.log(err);
                var january7 = results[0]
                houseCount.push(january7.countt)
                db.query(house,[2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february7 = results[0]
                    houseCount.push(february7.countt)
                    db.query(house,[3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march7 = results[0]
                        houseCount.push(march7.countt)
                        db.query(house,[4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april7 = results[0]
                            houseCount.push(april7.countt)
                            db.query(house,[7],(err, results, fields) => {
                                if (err) console.log(err);
                                var may7 = results[0]
                                houseCount.push(may7.countt)
                                db.query(house,[7],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june7 = results[0]
                                    houseCount.push(june7.countt)
                                    db.query(house,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july7 = results[0]
                                        houseCount.push(july7.countt)
                                        db.query(house,[8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august7 = results[0]
                                            houseCount.push(august7.countt)
                                            db.query(house,[9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september7 = results[0]
                                                houseCount.push(september7.countt)
                                                db.query(house,[10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october7 = results[0]
                                                    houseCount.push(october7.countt)
                                                    db.query(house,[11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november7 = results[0]
                                                        houseCount.push(november7.countt)
                                                        db.query(house,[12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december7 = results[0]
                                                            houseCount.push(december7.countt)
                                                            console.log(houseCount)
        db.query(years,[2010],(err, results, fields) => {
            if (err) console.log(err);
            var ten = results[0]
            houseCountyear.push(ten.countt)
            db.query(years,[2011],(err, results, fields) => {
                if (err) console.log(err);
                var  eleven= results[0]
                houseCountyear.push(eleven.countt)
                db.query(years,[2012],(err, results, fields) => {
                    if (err) console.log(err);
                    var twelve = results[0]
                    houseCountyear.push(twelve.countt)
                    db.query(years,[2013],(err, results, fields) => {
                        if (err) console.log(err);
                        var thirteen = results[0]
                        houseCountyear.push(thirteen.countt)
                        db.query(years,[2014],(err, results, fields) => {
                            if (err) console.log(err);
                            var fourteen = results[0]
                            houseCountyear.push(fourteen.countt)
                            db.query(years,[2015],(err, results, fields) => {
                                if (err) console.log(err);
                                var fifteen = results[0]
                                houseCountyear.push(fifteen.countt)
                                db.query(years,[2016],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var sixteen = results[0]
                                    houseCountyear.push(sixteen.countt)
                                    db.query(years,[2017],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var seventeen = results[0]
                                        houseCountyear.push(seventeen.countt)
                                        db.query(years,[2018],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var eighteen = results[0]
                                            houseCountyear.push(eighteen.countt)

                                            console.log(houseCountyear)
                    return res.render('admin/views/reports/specialservices/house',{ application:application,request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                      houseCount:houseCount,
                    
                    housepieapproval:housepieapproval,
                    houserequirement:houserequirement
                
                

}); }); }); }); }); }); //houseblessing
            }); }); }); }); }); }); }); }); }); }); }); }); 
        }); }); }); }); }); }); }); }); });//house 



    }); }); }); }); }); });//upto message
})
adminRouter.get('/reports', (req, res)=>{

    
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT count(int_eventinfoID) as applicationcount from tbl_eventinfo where int_eventID<>(select int_eventID from tbl_services where var_eventname='Baptism')`
    
    var queryString3 =`SELECT count(int_requestID) as requestcount from tbl_documentrequest`
    var queryString4 =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo where int_eventID=(select int_eventID from tbl_services where var_eventname='Baptism')`
        db.query(queryString1, (err, results, fields) => {
            if (err) console.log(err);
            var application = results[0];
         
                db.query(queryString3, (err, results, fields) => {
                    if (err) console.log(err);
                    var request = results[0];
                    db.query(queryString4, (err, results, fields) => {
                        if (err) console.log(err);
                        var baptism = results[0];
                        db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                            if (err) console.log(err);
                            var newmessages = results[0];
                            console.log(newmessages)
                            db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                                if (err) console.log(err);
                                var messages = results;
                                for(i=0;i<messages.length;i++){ 
                                    messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                                } 
            //line graph
            var anointingCount=[];
            var baptismCount=[];
            var specialbaptismCount=[];
            var funeralmassCount=[];
            var funeralserviceCount=[];
            var marriageCount=[];
           
            var docuCount=[];
            var houseCount=[];
            //pie charts
            //BAPTISM
            var baptismpieapproval=[];
            var baptismpierequirement=[];
            var baptismpiepayment=[];
            
            
            //SPECIAL BAPTISM
            var spcbaptismpieapproval=[];
            var spcbaptismrequirement=[];
            var spcbaptismpiepayment=[];
            
            //FUNERAL MASS
            var funeralmasspieapproval=[];
            var funeralmassrequirement=[];
            var funeralmasspiepayment=[];
            
            //MARRIAGE
            var marriagepieapproval=[];
            var marriagerequirement=[];
            var marriagepiepayment=[];
            
          
            //DOCUMENT
            var docupieapproval=[];
            var docurequirement=[];
            var docupiepayment=[];
            
            //FUNERAL SERVICE
            var funeralservicepieapproval=[];
            var funeralservicerequirement=[];
            
            // HOUSE
            var housepieapproval=[];
            var houserequirement=[];
            //ANOINTING
            var anointingpieapproval=[];
            var anointingrequirement=[];
            
            //line graphs queries
            var event =`select count(int_eventinfoID) as countt from tbl_eventinfo where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) and month(date_eventdate) =?`
            var facility =`select count(int_reservationID) as countt from tbl_facilityreservation where month(datetime_reservestart) =?`
            var docu =`select count(int_requestID) as countt from tbl_documentrequest where month(date_docurequested) =?`
            var house =`select count(int_houseblessID) as countt from tbl_houseblessing where month(date_blessingdate) =?`
            
            //pie charts queries
            var eventpieapprovalquery =`select count(int_eventinfoID) as countt from tbl_eventinfo 
            where int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and char_approvalstatus=?`
            var eventpierequirementquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_requirementsinevents on tbl_eventinfo.int_eventinfoID = tbl_requirementsinevents.int_eventinfoID
            join tbl_requirements on tbl_requirementsinevents.int_requirementID =tbl_requirements.int_requirementID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_requirements.var_reqstatus=?`
            var eventpiepaymentquery =`select count(tbl_eventinfo.int_eventinfoID) as countt from tbl_eventinfo 
            join tbl_payment on tbl_eventinfo.int_paymentID = tbl_payment.int_paymentID
            where tbl_eventinfo.int_eventID = (select int_eventID from tbl_services where var_eventname = ?) 
            and tbl_payment.char_paymentstatus=?`

            var docupieapprovalquery =`select count(int_requestID) as countt from tbl_documentrequest
            where char_docustatus=?`
            var docupierequirementquery =`select count(tbl_documentrequest.int_requestID) as countt from tbl_documentrequest 
            join tbl_requirementsdocument on tbl_documentrequest.int_requestID = tbl_requirementsdocument.int_requestID
            where tbl_requirementsdocument.char_reqstatus=?`
            var docupiepaymentquery =`select count(tbl_documentrequest.int_requestID) as countt from tbl_documentrequest 
            join tbl_payment on tbl_documentrequest.int_paymentID = tbl_payment.int_paymentID
            where tbl_payment.char_paymentstatus=?`

           
            var housepieapprovalquery =`select count(int_houseblessID) as countt from tbl_houseblessing 
            where char_approvalstatus=?`
            var housepierequirementquery =`select count(tbl_houseblessing.int_houseblessID) as countt from tbl_houseblessing 
            join tbl_requirementshouse on tbl_houseblessing.int_houseblessID = tbl_requirementshouse.int_houseblessID
            where tbl_requirementshouse.var_reqstatus=?`
            var housepiepaymentquery =`select count(tbl_houseblessing.int_houseblessID) as countt from tbl_houseblessing 
            join tbl_payment on tbl_houseblessing.int_paymentID = tbl_payment.int_paymentID
            where tbl_payment.char_paymentstatus=?`

        db.query(eventpieapprovalquery,['Anointing of the sick', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending1 = results[0]
            anointingpieapproval.push(pending1.countt)
            db.query(eventpieapprovalquery,['Anointing of the sick', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved1 = results[0]
                anointingpieapproval.push(approved1.countt)
                db.query(eventpieapprovalquery,['Anointing of the sick', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved1 = results[0]
                    anointingpieapproval.push(disapproved1.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Anointing of the sick', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted1 = results[0]
                        anointingrequirement.push(submitted1.countt)
                        db.query(eventpierequirementquery,['Anointing of the sick', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd1 = results[0]
                            anointingrequirement.push(approvedd1.countt)
                            db.query(eventpierequirementquery,['Anointing of the sick', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected1 = results[0]
                                anointingrequirement.push(rejected1.countt)
        db.query(eventpieapprovalquery,['Baptism', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending2 = results[0]
            baptismpieapproval.push(pending2.countt)
            db.query(eventpieapprovalquery,['Baptism', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved2 = results[0]
                baptismpieapproval.push(approved2.countt)
                db.query(eventpieapprovalquery,['Baptism', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved2 = results[0]
                    baptismpieapproval.push(disapproved2.countt)
                        //requirement
                        db.query(eventpierequirementquery,['Baptism', "Submitted"],(err, results, fields) => {
                            if (err) console.log(err);
                            var submitted2 = results[0]
                            baptismpierequirement.push(submitted2.countt)
                            db.query(eventpierequirementquery,['Baptism', "Approved"],(err, results, fields) => {
                                if (err) console.log(err);
                                var approvedd2 = results[0]
                                baptismpierequirement.push(approvedd2.countt)
                                db.query(eventpierequirementquery,['Baptism', "Rejected"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var rejected2 = results[0]
                                    baptismpierequirement.push(rejected2.countt)
                                    //payment
                                    db.query(eventpiepaymentquery,['Baptism', "Paid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var paid2 = results[0]
                                        baptismpiepayment.push(paid2.countt)
                                        db.query(eventpiepaymentquery,['Baptism', "Unpaid"],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var unpaid2 = results[0]
                                            baptismpiepayment.push(unpaid2.countt)
        db.query(eventpieapprovalquery,['Special Baptism', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending3 = results[0]
            spcbaptismpieapproval.push(pending3.countt)
            db.query(eventpieapprovalquery,['Special Baptism', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved3 = results[0]
                spcbaptismpieapproval.push(approved3.countt)
                db.query(eventpieapprovalquery,['Special Baptism', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved3 = results[0]
                    spcbaptismpieapproval.push(disapproved3.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Special Baptism', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted3 = results[0]
                        spcbaptismrequirement.push(submitted3.countt)
                        db.query(eventpierequirementquery,['Special Baptism', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd3 = results[0]
                            spcbaptismrequirement.push(approvedd3.countt)
                            db.query(eventpierequirementquery,['Special Baptism', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected3 = results[0]
                                spcbaptismrequirement.push(rejected3.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Special Baptism', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid3 = results[0]
                                    spcbaptismpiepayment.push(paid3.countt)
                                    db.query(eventpiepaymentquery,['Special Baptism', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid3 = results[0]
                                        spcbaptismpiepayment.push(unpaid3.countt)
        db.query(eventpieapprovalquery,['Funeral Mass', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending4 = results[0]
            funeralmasspieapproval.push(pending4.countt)
            db.query(eventpieapprovalquery,['Funeral Mass', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved4 = results[0]
                funeralmasspieapproval.push(approved4.countt)
                db.query(eventpieapprovalquery,['Funeral Mass', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved4 = results[0]
                    funeralmasspieapproval.push(disapproved4.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Funeral Mass', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted4 = results[0]
                        funeralmassrequirement.push(submitted4.countt)
                        db.query(eventpierequirementquery,['Funeral Mass', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd4 = results[0]
                            funeralmassrequirement.push(approvedd4.countt)
                            db.query(eventpierequirementquery,['Funeral Mass', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected4 = results[0]
                                funeralmassrequirement.push(rejected4.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Funeral Mass', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid4 = results[0]
                                    funeralmasspiepayment.push(paid4.countt)
                                    db.query(eventpiepaymentquery,['Funeral Mass', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid4 = results[0]
                                        funeralmasspiepayment.push(unpaid4.countt)
        db.query(eventpieapprovalquery,['Funeral Service', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending5 = results[0]
            funeralservicepieapproval.push(pending5.countt)
            db.query(eventpieapprovalquery,['Funeral Service', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved5 = results[0]
                funeralservicepieapproval.push(approved5.countt)
                db.query(eventpieapprovalquery,['Funeral Service', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved5 = results[0]
                    funeralservicepieapproval.push(disapproved5.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Funeral Service', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted5 = results[0]
                        funeralservicerequirement.push(submitted5.countt)
                        db.query(eventpierequirementquery,['Funeral Service', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd5 = results[0]
                            funeralservicerequirement.push(approvedd5.countt)
                            db.query(eventpierequirementquery,['Funeral Service', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected5 = results[0]
                                funeralservicerequirement.push(rejected5.countt)
                                
        db.query(eventpieapprovalquery,['Marriage', "Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending6 = results[0]
            marriagepieapproval.push(pending6.countt)
            db.query(eventpieapprovalquery,['Marriage', "Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved6 = results[0]
                marriagepieapproval.push(approved6.countt)
                db.query(eventpieapprovalquery,['Marriage', "Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved6 = results[0]
                    marriagepieapproval.push(disapproved6.countt)
                    //requirement
                    db.query(eventpierequirementquery,['Marriage', "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted6 = results[0]
                        marriagerequirement.push(submitted6.countt)
                        db.query(eventpierequirementquery,['Marriage', "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd6 = results[0]
                            marriagerequirement.push(approvedd6.countt)
                            db.query(eventpierequirementquery,['Marriage', "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected6 = results[0]
                                marriagerequirement.push(rejected6.countt)
                                //payment
                                db.query(eventpiepaymentquery,['Marriage', "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid6 = results[0]
                                    marriagepiepayment.push(paid6.countt)
                                    db.query(eventpiepaymentquery,['Marriage', "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid6 = results[0]
                                        marriagepiepayment.push(unpaid6.countt)
        db.query(docupieapprovalquery,["Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending7 = results[0]
            docupieapproval.push(pending7.countt)
            db.query(docupieapprovalquery,["Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved7 = results[0]
                docupieapproval.push(approved7.countt)
                db.query(docupieapprovalquery,["Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved7 = results[0]
                    docupieapproval.push(disapproved7.countt)
                    //requirement
                    db.query(docupierequirementquery,[ "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted7 = results[0]
                        docurequirement.push(submitted7.countt)
                        db.query(docupierequirementquery,[ "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd7 = results[0]
                            docurequirement.push(approvedd7.countt)
                            db.query(docupierequirementquery,[ "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected7 = results[0]
                                docurequirement.push(rejected7.countt)
                                //payment
                                db.query(docupiepaymentquery,[ "Paid"],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var paid7 = results[0]
                                    docupiepayment.push(paid7.countt)
                                    db.query(docupiepaymentquery,[ "Unpaid"],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var unpaid7 = results[0]
                                        docupiepayment.push(unpaid7.countt)
      
        db.query(housepieapprovalquery,["Pending"],(err, results, fields) => {
            if (err) console.log(err);
            var pending9 = results[0]
            housepieapproval.push(pending9.countt)
            db.query(housepieapprovalquery,["Approved"],(err, results, fields) => {
                if (err) console.log(err);
                var approved9 = results[0]
                housepieapproval.push(approved9.countt)
                db.query(housepieapprovalquery,["Disapproved"],(err, results, fields) => {
                    if (err) console.log(err);
                    var disapproved9 = results[0]
                    housepieapproval.push(disapproved9.countt)
                    //requirement
                    db.query(housepierequirementquery,[ "Submitted"],(err, results, fields) => {
                        if (err) console.log(err);
                        var submitted9 = results[0]
                        houserequirement.push(submitted9.countt)
                        db.query(housepierequirementquery,[ "Approved"],(err, results, fields) => {
                            if (err) console.log(err);
                            var approvedd9 = results[0]
                            houserequirement.push(approvedd9.countt)
                            db.query(housepierequirementquery,[ "Rejected"],(err, results, fields) => {
                                if (err) console.log(err);
                                var rejected9 = results[0]
                                houserequirement.push(rejected9.countt)
                               







            db.query(event,['Anointing of the sick', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january = results[0]
                anointingCount.push(january.countt)
                db.query(event,['Anointing of the sick', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february = results[0]
                    anointingCount.push(february.countt)
                    db.query(event,['Anointing of the sick', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march = results[0]
                        anointingCount.push(march.countt)
                        db.query(event,['Anointing of the sick', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april = results[0]
                            anointingCount.push(april.countt)
                            db.query(event,['Anointing of the sick', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may = results[0]
                                anointingCount.push(may.countt)
                                db.query(event,['Anointing of the sick', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june = results[0]
                                    anointingCount.push(june.countt)
                                    db.query(event,['Anointing of the sick', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july = results[0]
                                        anointingCount.push(july.countt)
                                        db.query(event,['Anointing of the sick', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august = results[0]
                                            anointingCount.push(august.countt)
                                            db.query(event,['Anointing of the sick', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september = results[0]
                                                anointingCount.push(september.countt)
                                                db.query(event,['Anointing of the sick', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october = results[0]
                                                    anointingCount.push(october.countt)
                                                    db.query(event,['Anointing of the sick', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november = results[0]
                                                        anointingCount.push(november.countt)
                                                        db.query(event,['Anointing of the sick', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december = results[0]
                                                            anointingCount.push(december.countt)
                                                            console.log(anointingCount)
             db.query(event,['Baptism', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january1 = results[0]
                baptismCount.push(january1.countt)
                db.query(event,['Baptism', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february1 = results[0]
                    baptismCount.push(february1.countt)
                    db.query(event,['Baptism', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march1 = results[0]
                        baptismCount.push(march1.countt)
                        db.query(event,['Baptism', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april1 = results[0]
                            baptismCount.push(april1.countt)
                            db.query(event,['Baptism', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may1 = results[0]
                                baptismCount.push(may1.countt)
                                db.query(event,['Baptism', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june1 = results[0]
                                    baptismCount.push(june1.countt)
                                    db.query(event,['Baptism', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july1 = results[0]
                                        baptismCount.push(july1.countt)
                                        db.query(event,['Baptism', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august1 = results[0]
                                            baptismCount.push(august1.countt)
                                            db.query(event,['Baptism', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september1 = results[0]
                                                baptismCount.push(september1.countt)
                                                db.query(event,['Baptism', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october1 = results[0]
                                                    baptismCount.push(october1.countt)
                                                    db.query(event,['Baptism', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november1 = results[0]
                                                        baptismCount.push(november1.countt)
                                                        db.query(event,['Baptism', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december1 = results[0]
                                                            baptismCount.push(december1.countt)
                                                            console.log(baptismCount)
            db.query(event,['Special Baptism', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january2 = results[0]
                specialbaptismCount.push(january2.countt)
                db.query(event,['Special Baptism', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february2 = results[0]
                    specialbaptismCount.push(february2.countt)
                    db.query(event,['Special Baptism', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march2 = results[0]
                        specialbaptismCount.push(march2.countt)
                        db.query(event,['Special Baptism', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april2 = results[0]
                            specialbaptismCount.push(april2.countt)
                            db.query(event,['Special Baptism', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may2 = results[0]
                                specialbaptismCount.push(may2.countt)
                                db.query(event,['Special Baptism', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june2 = results[0]
                                    specialbaptismCount.push(june2.countt)
                                    db.query(event,['Special Baptism', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july2 = results[0]
                                        specialbaptismCount.push(july2.countt)
                                        db.query(event,['Special Baptism', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august2 = results[0]
                                            specialbaptismCount.push(august2.countt)
                                            db.query(event,['Special Baptism', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september2 = results[0]
                                                specialbaptismCount.push(september2.countt)
                                                db.query(event,['Special Baptism', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october2 = results[0]
                                                    specialbaptismCount.push(october2.countt)
                                                    db.query(event,['Special Baptism', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november2 = results[0]
                                                        specialbaptismCount.push(november2.countt)
                                                        db.query(event,['Special Baptism', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december2 = results[0]
                                                            specialbaptismCount.push(december2.countt)
                                                            console.log(specialbaptismCount)
            db.query(event,['Funeral Mass', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january3 = results[0]
                funeralmassCount.push(january3.countt)
                db.query(event,['Funeral Mass', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february3 = results[0]
                    funeralmassCount.push(february3.countt)
                    db.query(event,['Funeral Mass', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march3 = results[0]
                        funeralmassCount.push(march3.countt)
                        db.query(event,['Funeral Mass', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april3 = results[0]
                            funeralmassCount.push(april3.countt)
                            db.query(event,['Funeral Mass', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may3 = results[0]
                                funeralmassCount.push(may3.countt)
                                db.query(event,['Funeral Mass', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june3 = results[0]
                                    funeralmassCount.push(june3.countt)
                                    db.query(event,['Funeral Mass', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july3 = results[0]
                                        funeralmassCount.push(july3.countt)
                                        db.query(event,['Funeral Mass', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august3 = results[0]
                                            funeralmassCount.push(august3.countt)
                                            db.query(event,['Funeral Mass', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september3 = results[0]
                                                funeralmassCount.push(september3.countt)
                                                db.query(event,['Funeral Mass', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october3 = results[0]
                                                    funeralmassCount.push(october3.countt)
                                                    db.query(event,['Funeral Mass', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november3 = results[0]
                                                        funeralmassCount.push(november3.countt)
                                                        db.query(event,['Funeral Mass', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december3 = results[0]
                                                            funeralmassCount.push(december3.countt)
                                                            console.log(funeralmassCount)
            db.query(event,['Funeral Service', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january4 = results[0]
                funeralserviceCount.push(january4.countt)
                db.query(event,['Funeral Service', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february4 = results[0]
                    funeralserviceCount.push(february4.countt)
                    db.query(event,['Funeral Service', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march4 = results[0]
                        funeralserviceCount.push(march4.countt)
                        db.query(event,['Funeral Service', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april4 = results[0]
                            funeralserviceCount.push(april4.countt)
                            db.query(event,['Funeral Service', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may4 = results[0]
                                funeralserviceCount.push(may4.countt)
                                db.query(event,['Funeral Service', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june4 = results[0]
                                    funeralserviceCount.push(june4.countt)
                                    db.query(event,['Funeral Service', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july4 = results[0]
                                        funeralserviceCount.push(july4.countt)
                                        db.query(event,['Funeral Service', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august4 = results[0]
                                            funeralserviceCount.push(august4.countt)
                                            db.query(event,['Funeral Service', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september4 = results[0]
                                                funeralserviceCount.push(september4.countt)
                                                db.query(event,['Funeral Service', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october4 = results[0]
                                                    funeralserviceCount.push(october4.countt)
                                                    db.query(event,['Funeral Service', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november4 = results[0]
                                                        funeralserviceCount.push(november4.countt)
                                                        db.query(event,['Funeral Service', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december4 = results[0]
                                                            funeralserviceCount.push(december4.countt)
                                                            console.log(funeralserviceCount)
            db.query(event,['Marriage', 1],(err, results, fields) => {
                if (err) console.log(err);
                var january5 = results[0]
                marriageCount.push(january5.countt)
                db.query(event,['Marriage', 2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february5 = results[0]
                    marriageCount.push(february5.countt)
                    db.query(event,['Marriage', 3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march5 = results[0]
                        marriageCount.push(march5.countt)
                        db.query(event,['Marriage', 4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april5 = results[0]
                            marriageCount.push(april5.countt)
                            db.query(event,['Marriage', 5],(err, results, fields) => {
                                if (err) console.log(err);
                                var may5 = results[0]
                                marriageCount.push(may5.countt)
                                db.query(event,['Marriage', 6],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june5 = results[0]
                                    marriageCount.push(june5.countt)
                                    db.query(event,['Marriage', 7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july5 = results[0]
                                        marriageCount.push(july5.countt)
                                        db.query(event,['Marriage', 8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august5 = results[0]
                                            marriageCount.push(august5.countt)
                                            db.query(event,['Marriage', 9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september5 = results[0]
                                                marriageCount.push(september5.countt)
                                                db.query(event,['Marriage', 10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october5 = results[0]
                                                    marriageCount.push(october5.countt)
                                                    db.query(event,['Marriage', 11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november5 = results[0]
                                                        marriageCount.push(november5.countt)
                                                        db.query(event,['Marriage', 12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december5 = results[0]
                                                            marriageCount.push(december5.countt)
                                                            console.log(marriageCount)       
          
            db.query(docu,[1],(err, results, fields) => {
                if (err) console.log(err);
                var january7 = results[0]
                docuCount.push(january7.countt)
                db.query(docu,[2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february7 = results[0]
                    docuCount.push(february7.countt)
                    db.query(docu,[3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march7 = results[0]
                        docuCount.push(march7.countt)
                        db.query(docu,[4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april7 = results[0]
                            docuCount.push(april7.countt)
                            db.query(docu,[7],(err, results, fields) => {
                                if (err) console.log(err);
                                var may7 = results[0]
                                docuCount.push(may7.countt)
                                db.query(docu,[7],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june7 = results[0]
                                    docuCount.push(june7.countt)
                                    db.query(docu,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july7 = results[0]
                                        docuCount.push(july7.countt)
                                        db.query(docu,[8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august7 = results[0]
                                            docuCount.push(august7.countt)
                                            db.query(docu,[9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september7 = results[0]
                                                docuCount.push(september7.countt)
                                                db.query(docu,[10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october7 = results[0]
                                                    docuCount.push(october7.countt)
                                                    db.query(docu,[11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november7 = results[0]
                                                        docuCount.push(november7.countt)
                                                        db.query(docu,[12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december7 = results[0]
                                                            docuCount.push(december7.countt)
                                                            console.log(docuCount)
            db.query(house,[1],(err, results, fields) => {
                if (err) console.log(err);
                var january7 = results[0]
                houseCount.push(january7.countt)
                db.query(house,[2],(err, results, fields) => {
                    if (err) console.log(err);
                    var february7 = results[0]
                    houseCount.push(february7.countt)
                    db.query(house,[3],(err, results, fields) => {
                        if (err) console.log(err);
                        var march7 = results[0]
                        houseCount.push(march7.countt)
                        db.query(house,[4],(err, results, fields) => {
                            if (err) console.log(err);
                            var april7 = results[0]
                            houseCount.push(april7.countt)
                            db.query(house,[7],(err, results, fields) => {
                                if (err) console.log(err);
                                var may7 = results[0]
                                houseCount.push(may7.countt)
                                db.query(house,[7],(err, results, fields) => {
                                    if (err) console.log(err);
                                    var june7 = results[0]
                                    houseCount.push(june7.countt)
                                    db.query(house,[7],(err, results, fields) => {
                                        if (err) console.log(err);
                                        var july7 = results[0]
                                        houseCount.push(july7.countt)
                                        db.query(house,[8],(err, results, fields) => {
                                            if (err) console.log(err);
                                            var august7 = results[0]
                                            houseCount.push(august7.countt)
                                            db.query(house,[9],(err, results, fields) => {
                                                if (err) console.log(err);
                                                var september7 = results[0]
                                                houseCount.push(september7.countt)
                                                db.query(house,[10],(err, results, fields) => {
                                                    if (err) console.log(err);
                                                    var october7 = results[0]
                                                    houseCount.push(october7.countt)
                                                    db.query(house,[11],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                        var november7 = results[0]
                                                        houseCount.push(november7.countt)
                                                        db.query(house,[12],(err, results, fields) => {
                                                        if (err) console.log(err);
                                                            var december7 = results[0]
                                                            houseCount.push(december7.countt)
                                                            console.log(houseCount)
                    // res.send(resulta)
                    return res.render('admin/views/reports/index',{ application:applicationrequest, request:request, baptism:baptism, messages:messages, newmessages:newmessages, 
                        anointingCount:anointingCount,baptismCount:baptismCount, specialbaptismCount:specialbaptismCount, funeralmassCount:funeralmassCount, funeralserviceCount:funeralserviceCount, marriageCount:marriageCount,
                    docuCount:docuCount, houseCount:houseCount,
                    baptismpieapproval:baptismpieapproval,
                    baptismpierequirement:baptismpierequirement,
                    baptismpiepayment:baptismpiepayment,
                    
                    //SPECIAL BAPTISM
                    spcbaptismpieapproval:spcbaptismpieapproval,
                    spcbaptismrequirement:spcbaptismrequirement,
                    spcbaptismpiepayment:spcbaptismpiepayment,
                    
                    //FUNERAL MASS
                    funeralmasspieapproval:funeralmasspieapproval,
                    funeralmassrequirement:funeralmassrequirement,
                    funeralmasspiepayment:funeralmasspiepayment,
                    
                    //MARRIAGE
                    marriagepieapproval:marriagepieapproval,
                    marriagerequirement:marriagerequirement,
                    marriagepiepayment:marriagepiepayment,
                    
                    
                    //DOCUMENT
                    docupieapproval:docupieapproval,
                    docurequirement:docurequirement,
                    docupiepayment:docupiepayment,
                    
                    //FUNERAL SERVICE
                    funeralservicepieapproval:funeralservicepieapproval,
                    funeralservicerequirement:funeralservicerequirement,
                    
                    // HOUSE
                    housepieapproval:housepieapproval,
                    houserequirement:houserequirement,
                    //ANOINTING
                    anointingpieapproval:anointingpieapproval,
                    anointingrequirement:anointingrequirement
                
                
                
                });
                


}); }); }); }); }); }); }); }); //funeral mass
}); }); }); }); }); }); }); }); //marriage
}); }); }); }); }); }); }); }); //regbap
}); }); }); }); }); }); }); }); //spc bap

}); }); }); }); }); }); }); }); //docu
}); }); }); }); }); });  //anointing
}); }); }); }); }); }); //funeral service
}); }); }); }); }); }); //houseblessing








                                            }); }); }); }); }); }); }); }); }); }); }); });     //anointing           
                                        }); }); }); }); }); }); }); }); }); }); }); }); //reg bap
                                    }); }); }); }); }); }); }); }); }); }); }); });  // spc bap
                                }); }); }); }); }); }); }); }); }); }); }); });  //funeral mass
                            }); }); }); }); }); }); }); }); }); }); }); }); //funeral service
                        }); }); }); }); }); }); }); }); }); }); }); }); //marriage
                    
                }); }); }); }); }); }); }); }); }); }); }); }); //document
            }); }); }); }); }); }); }); }); }); }); }); }); //house 



    }); }); }); }); }); 
});//upto message


adminRouter.get('/reports-allreports', (req, res)=>{
    //count ng lahat ng applications
    // sum ng payments received within specific time

    // for this month 


    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
     
    // COUNT NG MGA NANGYARI NGAYONG BUWAN
    var baptismcount =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismcount =`SELECT count(int_eventinfoID) as specialbaptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var anointingcount =`SELECT count(int_eventinfoID) as anointingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var funeralmasscount =`SELECT count(int_eventinfoID) as funeralmasscount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var funeralservicecount =`SELECT count(int_eventinfoID) as funeralservicecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var marriagecount =`SELECT count(int_eventinfoID) as marriagecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var houseblessingcount =`SELECT count(int_eventinfoID) as houseblessingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    //=============================================================================================================================

    //COUNT NG MGA APPLICATION NGAYONG BUWAN
    var baptismappcount =`SELECT count(int_eventinfoID) as baptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismappcount =`SELECT count(int_eventinfoID) as specialbaptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var anointingappcount =`SELECT count(int_eventinfoID) as anointingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var funeralmassappcount =`SELECT count(int_eventinfoID) as funeralmassappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var funeralserviceappcount =`SELECT count(int_eventinfoID) as funeralserviceappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var marriageappcount =`SELECT count(int_eventinfoID) as marriageappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`
    
    var houseblessingappcount =`SELECT count(int_eventinfoID) as houseblessingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`


    //=============================================================================================================================

    // COLLECTION NAMAN 
    var baptismcollection =`SELECT sum(dbl_paymentamount) as baptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismcollection =`SELECT sum(dbl_paymentamount) as specialbaptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    
    var funeralmasscollection =`SELECT sum(dbl_paymentamount) as funeralmasscollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`
    
    
    var marriagecollection =`SELECT sum(dbl_paymentamount) as marriagecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`
    
    var anointingcollection = 0
    var funeralservicecollection =0
    var houseblessingcollection =0


    //=============================================================================================================================
    //document request

    // LAHAT NG REQUEST NGAYONG BUWAN
    var docureqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
    join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
    where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docurequested) = MONTH(CURRENT_TIMESTAMP)`

     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqreqcount =`SELECT count(int_requestID) as docureqreqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docureleased) = MONTH(CURRENT_TIMESTAMP)`
    
     // LAHAT NG collection ngayong buwan
     var docureqcollection =`SELECT sum(dbl_paymentamount) as docureqcollection from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docureleased) = MONTH(CURRENT_TIMESTAMP)`
 
    db.query(baptismcount, (err, baptismcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcount, (err, specialbaptismcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingcount, (err, anointingcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscount, (err, funeralmasscountt, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecount, (err, funeralservicecountt, fields) => {
    if (err) console.log(err);
    db.query(marriagecount, (err, marriagecountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcount, (err, houseblessingcountt, fields) => {
    if (err) console.log(err);

    
    db.query(baptismappcount, (err, baptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismappcount, (err, specialbaptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingappcount, (err, anointingappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmassappcount, (err, funeralmassappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralserviceappcount, (err, funeralserviceappcountt, fields) => {
    if (err) console.log(err);
    db.query(marriageappcount, (err, marriageappcountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingappcount, (err, houseblessingappcountt, fields) => {
    if (err) console.log(err);

    db.query(baptismcollection, (err, baptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcollection, (err, specialbaptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(anointingcollection, (err, anointingcollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscollection, (err, funeralmasscollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecollection, (err, funeralservicecollectionn, fields) => {
    if (err) console.log(err);
    db.query(marriagecollection, (err, marriagecollectionn, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcollection, (err, houseblessingcollectionn, fields) => {
    if (err) console.log(err);


    db.query(docureqcount, (err, docureqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqreqcount, (err, docureqreqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqcollection, (err, docureqcollectionn, fields) => {
    if (err) console.log(err);
    

    db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
        if (err) console.log(err);
        var newmessages = results[0];
        console.log(newmessages)
        db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var messages = results;
            for(i=0;i<messages.length;i++){ 
                messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
            } 
                

     return res.render('admin/views/reports/allreports',{ 
         baptismcount : baptismcountt[0], 
         specialbaptismcount:specialbaptismcountt[0],
         anointingcount:anointingcountt[0],
         funeralmasscount:funeralmasscountt[0],
         funeralservicecount:funeralservicecountt[0],
         marriagecount:marriagecountt[0],
         houseblessingcount:houseblessingcountt[0],

         baptismappcount : baptismappcountt[0], 
         specialbaptismappcount:specialbaptismappcountt[0],
         anointingappcount:anointingappcountt[0],
         funeralmassappcount:funeralmassappcountt[0],
         funeralserviceappcount:funeralserviceappcountt[0],
         marriageappcount:marriageappcountt[0],
         houseblessingappcount:houseblessingappcountt[0],

         baptismcollection : baptismcollectionn[0], 
         specialbaptismcollection:specialbaptismcollectionn[0],
         anointingcollection:anointingcollectionn,
         funeralmasscollection:funeralmasscollectionn[0],
         funeralservicecollection:funeralservicecollectionn,
         marriagecollection:marriagecollectionn[0],
         houseblessingcollection:houseblessingcollectionn,

         docureqcount:docureqcountt[0],
         docureqreqcount:docureqreqcountt[0],
         docureqcollection:docureqcollectionn[0],
         messages:messages, newmessages:newmessages
        
        });

        
})})})})})})})
})})})})})})})
})})})})})})})
    })})})
})})
})

adminRouter.post('/reports-allreports', (req, res)=>{
    //count ng lahat ng applications
    // sum ng payments received within specific time

    // for this month 


    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
     
    // COUNT NG MGA NANGYARI NGAYONG BUWAN
    var baptismcount =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismcount =`SELECT count(int_eventinfoID) as specialbaptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var anointingcount =`SELECT count(int_eventinfoID) as anointingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var funeralmasscount =`SELECT count(int_eventinfoID) as funeralmasscount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var funeralservicecount =`SELECT count(int_eventinfoID) as funeralservicecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var marriagecount =`SELECT count(int_eventinfoID) as marriagecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var houseblessingcount =`SELECT count(int_eventinfoID) as houseblessingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    //=============================================================================================================================

    //COUNT NG MGA APPLICATION NGAYONG BUWAN
    var baptismappcount =`SELECT count(int_eventinfoID) as baptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismappcount =`SELECT count(int_eventinfoID) as specialbaptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var anointingappcount =`SELECT count(int_eventinfoID) as anointingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var funeralmassappcount =`SELECT count(int_eventinfoID) as funeralmassappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var funeralserviceappcount =`SELECT count(int_eventinfoID) as funeralserviceappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`

    var marriageappcount =`SELECT count(int_eventinfoID) as marriageappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`
    
    var houseblessingappcount =`SELECT count(int_eventinfoID) as houseblessingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and MONTH(tbl_eventinfo.date_applied) = MONTH(CURRENT_TIMESTAMP)`


    //=============================================================================================================================

    // COLLECTION NAMAN 
    var baptismcollection =`SELECT sum(dbl_paymentamount) as baptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var specialbaptismcollection =`SELECT sum(dbl_paymentamount) as specialbaptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Special Baptism' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    
    var funeralmasscollection =`SELECT sum(dbl_paymentamount) as funeralmasscollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Mass' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`
    
    
    var marriagecollection =`SELECT sum(dbl_paymentamount) as marriagecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Marriage' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`
    
    var anointingcollection = `SELECT sum(dbl_paymentamount) as anointingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Anointing of the sick' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var funeralservicecollection =`SELECT sum(dbl_paymentamount) as funeralservicecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Service' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`

    var houseblessingcollection =`SELECT sum(dbl_paymentamount) as houseblessingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'House Blessing' and MONTH(tbl_eventinfo.date_eventdate) = MONTH(CURRENT_TIMESTAMP)`


    //=============================================================================================================================
    //document request

    // LAHAT NG REQUEST NGAYONG BUWAN
    var docureqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
    join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
    where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docurequested) = MONTH(CURRENT_TIMESTAMP)`

     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqreqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docureleased) = MONTH(CURRENT_TIMESTAMP)`
    
     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqcollection =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and MONTH(tbl_documentrequest.date_docureleased) = MONTH(CURRENT_TIMESTAMP)`
 
    db.query(baptismcount, (err, baptismcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcount, (err, specialbaptismcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingcount, (err, anointingcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscount, (err, funeralmasscountt, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecount, (err, funeralservicecountt, fields) => {
    if (err) console.log(err);
    db.query(marriagecount, (err, marriagecountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcount, (err, houseblessingcountt, fields) => {
    if (err) console.log(err);

    
    db.query(baptismappcount, (err, baptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismappcount, (err, specialbaptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingappcount, (err, anointingappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmassappcount, (err, funeralmassappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralserviceappcount, (err, funeralserviceappcountt, fields) => {
    if (err) console.log(err);
    db.query(marriageappcount, (err, marriageappcountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingappcount, (err, houseblessingappcountt, fields) => {
    if (err) console.log(err);

    db.query(baptismcollection, (err, baptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcollection, (err, specialbaptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(anointingcollection, (err, anointingcollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscollection, (err, funeralmasscollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecollection, (err, funeralservicecollectionn, fields) => {
    if (err) console.log(err);
    db.query(marriagecollection, (err, marriagecollectionn, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcollection, (err, houseblessingcollectionn, fields) => {
    if (err) console.log(err);


    db.query(docureqcount, (err, docureqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqreqcount, (err, docureqreqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqcollection, (err, docureqcollectionn, fields) => {
    if (err) console.log(err);
    

    db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
        if (err) console.log(err);
        var newmessages = results[0];
        console.log(newmessages)
        db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var messages = results;
            for(i=0;i<messages.length;i++){ 
                messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
            } 
                

     res.send({ 
         baptismcount : baptismcountt[0], 
         specialbaptismcount:specialbaptismcountt[0],
         anointingcount:anointingcountt[0],
         funeralmasscount:funeralmasscountt[0],
         funeralservicecount:funeralservicecountt[0],
         marriagecount:marriagecountt[0],
         houseblessingcount:houseblessingcountt[0],

         baptismappcount : baptismappcountt[0], 
         specialbaptismappcount:specialbaptismappcountt[0],
         anointingappcount:anointingappcountt[0],
         funeralmassappcount:funeralmassappcountt[0],
         funeralserviceappcount:funeralserviceappcountt[0],
         marriageappcount:marriageappcountt[0],
         houseblessingappcount:houseblessingappcountt[0],

         baptismcollection : baptismcollectionn[0], 
         specialbaptismcollection:specialbaptismcollectionn[0],
         anointingcollection:anointingcollectionn,
         funeralmasscollection:funeralmasscollectionn[0],
         funeralservicecollection:funeralservicecollectionn,
         marriagecollection:marriagecollectionn[0],
         houseblessingcollection:houseblessingcollectionn,

         docureqcount:docureqcountt[0],
         docureqreqcount:docureqreqcountt[0],
         docureqcollection:docureqcollectionn[0],
         messages:messages, newmessages:newmessages
        
        });

        
})})})})})})})
})})})})})})})
})})})})})})})
    })})})
})})
})



adminRouter.post('/reports-weekreports', (req, res)=>{
    //count ng lahat ng applications
    // sum ng payments received within specific time

    // for this month 


    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
     
    // COUNT NG MGA NANGYARI NGAYONG BUWAN
    var baptismcount =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var specialbaptismcount =`SELECT count(int_eventinfoID) as specialbaptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var anointingcount =`SELECT count(int_eventinfoID) as anointingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var funeralmasscount =`SELECT count(int_eventinfoID) as funeralmasscount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var funeralservicecount =`SELECT count(int_eventinfoID) as funeralservicecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var marriagecount =`SELECT count(int_eventinfoID) as marriagecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var houseblessingcount =`SELECT count(int_eventinfoID) as houseblessingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    //=============================================================================================================================

    //COUNT NG MGA APPLICATION NGAYONG BUWAN
    var baptismappcount =`SELECT count(int_eventinfoID) as baptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`

    var specialbaptismappcount =`SELECT count(int_eventinfoID) as specialbaptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`

    var anointingappcount =`SELECT count(int_eventinfoID) as anointingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`

    var funeralmassappcount =`SELECT count(int_eventinfoID) as funeralmassappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`

    var funeralserviceappcount =`SELECT count(int_eventinfoID) as funeralserviceappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`

    var marriageappcount =`SELECT count(int_eventinfoID) as marriageappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`
    
    var houseblessingappcount =`SELECT count(int_eventinfoID) as houseblessingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and WEEK(tbl_eventinfo.date_applied) = WEEK(CURRENT_TIMESTAMP)`


    //=============================================================================================================================

    // COLLECTION NAMAN 
    var baptismcollection =`SELECT sum(dbl_paymentamount) as baptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Baptism' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var specialbaptismcollection =`SELECT sum(dbl_paymentamount) as specialbaptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Special Baptism' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    
    var funeralmasscollection =`SELECT sum(dbl_paymentamount) as funeralmasscollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Mass' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`
    
    
    var marriagecollection =`SELECT sum(dbl_paymentamount) as marriagecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Marriage' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`
    
    var anointingcollection = `SELECT sum(dbl_paymentamount) as anointingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Anointing of the sick' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var funeralservicecollection =`SELECT sum(dbl_paymentamount) as funeralservicecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Service' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`

    var houseblessingcollection =`SELECT sum(dbl_paymentamount) as houseblessingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'House Blessing' and WEEK(tbl_eventinfo.date_eventdate) = WEEK(CURRENT_TIMESTAMP)`


    //=============================================================================================================================
    //document request

    // LAHAT NG REQUEST NGAYONG BUWAN
    var docureqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
    join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
    where tbl_serviceutilities.var_servicename = 'Document Request' and WEEK(tbl_documentrequest.date_docurequested) = WEEK(CURRENT_TIMESTAMP)`

     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqreqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and WEEK(tbl_documentrequest.date_docureleased) = WEEK(CURRENT_TIMESTAMP)`
    
     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqcollection =`SELECT sum(dbl_paymentamount) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and WEEK(tbl_documentrequest.date_docureleased) = WEEK(CURRENT_TIMESTAMP)`
 
    db.query(baptismcount, (err, baptismcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcount, (err, specialbaptismcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingcount, (err, anointingcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscount, (err, funeralmasscountt, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecount, (err, funeralservicecountt, fields) => {
    if (err) console.log(err);
    db.query(marriagecount, (err, marriagecountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcount, (err, houseblessingcountt, fields) => {
    if (err) console.log(err);

    
    db.query(baptismappcount, (err, baptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismappcount, (err, specialbaptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingappcount, (err, anointingappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmassappcount, (err, funeralmassappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralserviceappcount, (err, funeralserviceappcountt, fields) => {
    if (err) console.log(err);
    db.query(marriageappcount, (err, marriageappcountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingappcount, (err, houseblessingappcountt, fields) => {
    if (err) console.log(err);

    db.query(baptismcollection, (err, baptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcollection, (err, specialbaptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(anointingcollection, (err, anointingcollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscollection, (err, funeralmasscollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecollection, (err, funeralservicecollectionn, fields) => {
    if (err) console.log(err);
    db.query(marriagecollection, (err, marriagecollectionn, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcollection, (err, houseblessingcollectionn, fields) => {
    if (err) console.log(err);


    db.query(docureqcount, (err, docureqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqreqcount, (err, docureqreqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqcollection, (err, docureqcollectionn, fields) => {
    if (err) console.log(err);
    

    db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
        if (err) console.log(err);
        var newmessages = results[0];
        console.log(newmessages)
        db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var messages = results;
            for(i=0;i<messages.length;i++){ 
                messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
            } 
                

     res.send({ 
         baptismcount : baptismcountt[0], 
         specialbaptismcount:specialbaptismcountt[0],
         anointingcount:anointingcountt[0],
         funeralmasscount:funeralmasscountt[0],
         funeralservicecount:funeralservicecountt[0],
         marriagecount:marriagecountt[0],
         houseblessingcount:houseblessingcountt[0],

         baptismappcount : baptismappcountt[0], 
         specialbaptismappcount:specialbaptismappcountt[0],
         anointingappcount:anointingappcountt[0],
         funeralmassappcount:funeralmassappcountt[0],
         funeralserviceappcount:funeralserviceappcountt[0],
         marriageappcount:marriageappcountt[0],
         houseblessingappcount:houseblessingappcountt[0],

         baptismcollection : baptismcollectionn[0], 
         specialbaptismcollection:specialbaptismcollectionn[0],
         anointingcollection:anointingcollectionn,
         funeralmasscollection:funeralmasscollectionn[0],
         funeralservicecollection:funeralservicecollectionn,
         marriagecollection:marriagecollectionn[0],
         houseblessingcollection:houseblessingcollectionn,

         docureqcount:docureqcountt[0],
         docureqreqcount:docureqreqcountt[0],
         docureqcollection:docureqcollectionn[0],
         messages:messages, newmessages:newmessages
        
        });

        
})})})})})})})
})})})})})})})
})})})})})})})
    })})})
})})
})



adminRouter.post('/reports-dayreports', (req, res)=>{
    //count ng lahat ng applications
    // sum ng payments received within specific time

    // for this month 

    var datenow = new Date();
    var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
    console.log(dateNow)
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
    var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
     
    // COUNT NG MGA NANGYARI NGAYONG BUWAN
    var baptismcount =`SELECT count(int_eventinfoID) as baptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and tbl_eventinfo.date_eventdate=?`

    var specialbaptismcount =`SELECT count(int_eventinfoID) as specialbaptismcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and tbl_eventinfo.date_eventdate=?`

    var anointingcount =`SELECT count(int_eventinfoID) as anointingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and tbl_eventinfo.date_eventdate=?`

    var funeralmasscount =`SELECT count(int_eventinfoID) as funeralmasscount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and tbl_eventinfo.date_eventdate=?`

    var funeralservicecount =`SELECT count(int_eventinfoID) as funeralservicecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and tbl_eventinfo.date_eventdate=?`

    var marriagecount =`SELECT count(int_eventinfoID) as marriagecount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and tbl_eventinfo.date_eventdate=?`

    var houseblessingcount =`SELECT count(int_eventinfoID) as houseblessingcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and tbl_eventinfo.date_eventdate=?`

    //=============================================================================================================================

    //COUNT NG MGA APPLICATION NGAYONG BUWAN
    var baptismappcount =`SELECT count(int_eventinfoID) as baptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Baptism' and tbl_eventinfo.date_applied=?`

    var specialbaptismappcount =`SELECT count(int_eventinfoID) as specialbaptismappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Special Baptism' and tbl_eventinfo.date_applied=?`

    var anointingappcount =`SELECT count(int_eventinfoID) as anointingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Anointing of the sick' and tbl_eventinfo.date_applied=?`

    var funeralmassappcount =`SELECT count(int_eventinfoID) as funeralmassappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Mass' and tbl_eventinfo.date_applied=?`

    var funeralserviceappcount =`SELECT count(int_eventinfoID) as funeralserviceappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Funeral Service' and tbl_eventinfo.date_applied=?`

    var marriageappcount =`SELECT count(int_eventinfoID) as marriageappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'Marriage' and tbl_eventinfo.date_applied=?`
    
    var houseblessingappcount =`SELECT count(int_eventinfoID) as houseblessingappcount from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    where tbl_services.var_eventname = 'House Blessing' and tbl_eventinfo.date_applied=?`


    //=============================================================================================================================

    // COLLECTION NAMAN 
    var baptismcollection =`SELECT sum(dbl_paymentamount) as baptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Baptism' and tbl_eventinfo.date_eventdate=?`

    var specialbaptismcollection =`SELECT sum(dbl_paymentamount) as specialbaptismcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Special Baptism' and tbl_eventinfo.date_eventdate=?`

    
    var funeralmasscollection =`SELECT sum(dbl_paymentamount) as funeralmasscollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Mass' and tbl_eventinfo.date_eventdate=?`
    
    
    var marriagecollection =`SELECT sum(dbl_paymentamount) as marriagecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Marriage' and tbl_eventinfo.date_eventdate=?`
    
    var anointingcollection = `SELECT sum(dbl_paymentamount) as anointingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Anointing of the sick' and tbl_eventinfo.date_eventdate=?`

    var funeralservicecollection =`SELECT sum(dbl_paymentamount) as funeralservicecollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'Funeral Service' and tbl_eventinfo.date_eventdate=?`

    var houseblessingcollection =`SELECT sum(dbl_paymentamount) as houseblessingcollection from tbl_eventinfo 
    join tbl_services on tbl_services.int_eventID = tbl_eventinfo.int_eventID 
    join tbl_payment on tbl_payment.int_paymentID = tbl_eventinfo.int_paymentID 
    join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_paymenthistory.int_paymentID 
    where tbl_services.var_eventname = 'House Blessing' and tbl_eventinfo.date_eventdate=?`


    //=============================================================================================================================
    //document request

    // LAHAT NG REQUEST NGAYONG BUWAN
    
    var docureqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
    join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
    where tbl_serviceutilities.var_servicename = 'Document Request' and tbl_documentrequest.date_docurequested=?`

     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqreqcount =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and tbl_documentrequest.date_docureleased=?`
    
     // LAHAT NG NARELEASE NGAYONG BUWAN
     var docureqcollection =`SELECT count(int_requestID) as docureqcount from tbl_documentrequest 
     join tbl_serviceutilities on tbl_serviceutilities.int_serviceutilitiesID = tbl_documentrequest.int_serviceutilitiesID 
     join tbl_payment on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     join tbl_paymenthistory on tbl_payment.int_paymentID = tbl_documentrequest.int_paymentID 
     where tbl_serviceutilities.var_servicename = 'Document Request' and tbl_documentrequest.date_docureleased=?`
 
    db.query(baptismcount, [dateNow],(err, baptismcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcount, [dateNow],(err, specialbaptismcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingcount, [dateNow],(err, anointingcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscount, [dateNow],(err, funeralmasscountt, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecount, [dateNow],(err, funeralservicecountt, fields) => {
    if (err) console.log(err);
    db.query(marriagecount, [dateNow],(err, marriagecountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcount, [dateNow],(err, houseblessingcountt, fields) => {
    if (err) console.log(err);

    
    db.query(baptismappcount, [dateNow],(err, baptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismappcount, [dateNow],(err, specialbaptismappcountt, fields) => {
    if (err) console.log(err);
    db.query(anointingappcount, [dateNow],(err, anointingappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralmassappcount, [dateNow],(err, funeralmassappcountt, fields) => {
    if (err) console.log(err);
    db.query(funeralserviceappcount, [dateNow],(err, funeralserviceappcountt, fields) => {
    if (err) console.log(err);
    db.query(marriageappcount, [dateNow],(err, marriageappcountt, fields) => {
    if (err) console.log(err);
    db.query(houseblessingappcount, [dateNow],(err, houseblessingappcountt, fields) => {
    if (err) console.log(err);

    db.query(baptismcollection, [dateNow],(err, baptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(specialbaptismcollection, [dateNow],(err, specialbaptismcollectionn, fields) => {
    if (err) console.log(err);
    db.query(anointingcollection, [dateNow],(err, anointingcollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralmasscollection, [dateNow],(err, funeralmasscollectionn, fields) => {
    if (err) console.log(err);
    db.query(funeralservicecollection, [dateNow],(err, funeralservicecollectionn, fields) => {
    if (err) console.log(err);
    db.query(marriagecollection, [dateNow],(err, marriagecollectionn, fields) => {
    if (err) console.log(err);
    db.query(houseblessingcollection, [dateNow],(err, houseblessingcollectionn, fields) => {
    if (err) console.log(err);


    db.query(docureqcount, [dateNow],(err, docureqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqreqcount, [dateNow],(err, docureqreqcountt, fields) => {
    if (err) console.log(err);
    db.query(docureqcollection, [dateNow],(err, docureqcollectionn, fields) => {
    if (err) console.log(err);
    

    db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
        if (err) console.log(err);
        var newmessages = results[0];
        console.log(newmessages)
        db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
            if (err) console.log(err);
            var messages = results;
            for(i=0;i<messages.length;i++){ 
                messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
            } 
                

     res.send({ 
         baptismcount : baptismcountt[0], 
         specialbaptismcount:specialbaptismcountt[0],
         anointingcount:anointingcountt[0],
         funeralmasscount:funeralmasscountt[0],
         funeralservicecount:funeralservicecountt[0],
         marriagecount:marriagecountt[0],
         houseblessingcount:houseblessingcountt[0],

         baptismappcount : baptismappcountt[0], 
         specialbaptismappcount:specialbaptismappcountt[0],
         anointingappcount:anointingappcountt[0],
         funeralmassappcount:funeralmassappcountt[0],
         funeralserviceappcount:funeralserviceappcountt[0],
         marriageappcount:marriageappcountt[0],
         houseblessingappcount:houseblessingappcountt[0],

         baptismcollection : baptismcollectionn[0], 
         specialbaptismcollection:specialbaptismcollectionn[0],
         anointingcollection:anointingcollectionn,
         funeralmasscollection:funeralmasscollectionn[0],
         funeralservicecollection:funeralservicecollectionn,
         marriagecollection:marriagecollectionn[0],
         houseblessingcollection:houseblessingcollectionn,

         docureqcount:docureqcountt[0],
         docureqreqcount:docureqreqcountt[0],
         docureqcollection:docureqcollectionn[0],
         messages:messages, newmessages:newmessages
        
        });

        
})})})})})})})
})})})})})})})
})})})})})})})
    })})})
})})
})


//=======================================================
//Q U E R I E S
//=======================================================
adminRouter.get('/queries-services', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * FROM tbl_eventinfo
    left JOIN tbl_user on tbl_eventinfo.int_userID =tbl_user.int_userID
    left JOIN tbl_tempuser on tbl_eventinfo.int_tempuserID =tbl_tempuser.int_tempuserID
        JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID  
        JOIN tbl_relation on tbl_eventinfo.int_eventinfoID =tbl_relation.int_eventinfoID
        order by tbl_services.var_eventname
        `
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_eventdate=moment(queries[i].date_eventdate).format('MM/DD/YYYY')
            queries[i].time_eventstart=moment(queries[i].time_eventstart, 'HH:mm:ss').format('hh:mm A')
            }    
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/services/services',{ queries : queries, messages:messages, newmessages:newmessages});
                }); }); 
}); 
});

adminRouter.get('/queries-documentrequest', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * FROM tbl_documentrequest
        left JOIN tbl_user on tbl_documentrequest.int_userID =tbl_user.int_userID
        left JOIN tbl_tempuser on tbl_documentrequest.int_tempuserID =tbl_tempuser.int_tempuserID
        JOIN tbl_document on tbl_documentrequest.int_documentID =tbl_document.int_documentID
        order by tbl_documentrequest.int_requestID
        `
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_docurequested=moment(queries[i].date_docurequested).format('MM/DD/YYYY')
            if(queries[i].date_docureleased==null){
                queries[i].date_docureleased="Not yet released"
            }
            else if(queries[i].date_docureleased!=null){
                queries[i].date_docureleased=moment(queries[i].date_docureleased).format('MM/DD/YYYY')
            }
            if(queries[i].date_docureceived==null){
                queries[i].date_docureceived='Not yet received'
            }
            else if(queries[i].date_docureceived!=null){
                queries[i].date_docureceived=moment(queries[i].date_docureceived).format('MM/DD/YYYY')
            }
            }     
            console.log(queries)
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/specialservices/document',{ queries : queries, messages:messages, newmessages:newmessages});
                }); });
}); 
});
adminRouter.get('/queries-houseblessing', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * FROM tbl_houseblessing
        left JOIN tbl_user on tbl_houseblessing.int_userID =tbl_user.int_userID
        left JOIN tbl_tempuser on tbl_houseblessing.int_tempuserID =tbl_tempuser.int_tempuserID
        order by tbl_houseblessing.int_houseblessID
        `
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_blessingdate=moment(queries[i].date_blessingdate).format('MM/DD/YYYY')
            queries[i].time_blessingstart=moment(queries[i].time_blessingstart, 'HH:mm:ss').format('hh:mm A')
            
            }     
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/specialservices/establishment',{ queries : queries, messages:messages, newmessages:newmessages});
                }); });
}); 
});
adminRouter.get('/queries-guests', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * from tbl_user where char_usertype='Guest'
        order by var_userlname
        `
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_eventdate=moment(queries[i].date_eventdate).format('MM/DD/YYYY')
            queries[i].time_eventstart=moment(queries[i].time_eventstart, 'HH:mm:ss').format('hh:mm A')
            }    
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/users/guests',{ queries : queries, messages:messages, newmessages:newmessages});
                }); }); 
}); 
});
adminRouter.get('/queries-priests', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * from tbl_user where char_usertype='Priest' order by var_userlname`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_eventdate=moment(queries[i].date_eventdate).format('MM/DD/YYYY')
            queries[i].time_eventstart=moment(queries[i].time_eventstart, 'HH:mm:ss').format('hh:mm A')
            }    
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/users/priests',{ queries : queries, messages:messages, newmessages:newmessages});
                }); }); 
}); 
});
adminRouter.get('/queries-tempusers', (req, res)=>{
    var message =`SELECT * from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? limit 4`
        var newmessage =`SELECT count(int_messageID) as newmessage from tbl_message join tbl_user on tbl_user.int_userID = tbl_message.int_senderID where int_receiverID= ? and var_messagestatus = 'Delivered'`
        
    var queryString1 =`SELECT * from tbl_tempuser order by var_userlname`
    db.query(queryString1, (err, results, fields) => {
        if (err) console.log(err);       
        var queries = results;
        for(i=0;i<queries.length;i++){ 
            queries[i].date_eventdate=moment(queries[i].date_eventdate).format('MM/DD/YYYY')
            queries[i].time_eventstart=moment(queries[i].time_eventstart, 'HH:mm:ss').format('hh:mm A')
            }    
            db.query(newmessage, [req.session.admin.int_userID],(err, results, fields) => {
                if (err) console.log(err);
                var newmessages = results[0];
                console.log(newmessages)
                db.query(message, [req.session.admin.int_userID],(err, results, fields) => {
                    if (err) console.log(err);
                    var messages = results;
                    for(i=0;i<messages.length;i++){ 
                        messages[i].datetime_sent=moment(messages[i].datetime_sent).format('MM/DD/YYYY hh:mm A')
                    } 

                    return res.render('admin/views/queries/users/tempuser',{ queries : queries, messages:messages, newmessages:newmessages});
                }); }); 
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