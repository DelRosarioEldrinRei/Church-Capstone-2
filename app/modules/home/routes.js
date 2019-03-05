var express = require('express');
var indexRouter = express.Router();
var authMiddleware = require('../../modules/auth/middlewares/auth');
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

indexRouter.use(authMiddleware.noAuthed)
indexRouter.get('/', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_services where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage'  or var_eventname = 'Anointing of the sick'`
  db.query(queryString1, (err, results, fields) => {
    var events =results;
    
    var queryString1 =`SELECT * FROM tbl_utilities join tbl_serviceutilities where tbl_utilities.int_serviceutilitiesID= tbl_serviceutilities.int_serviceutilitiesID and tbl_utilities.char_servicestatus = 'Enabled'`
      db.query(queryString1, (err, results, fields) => {
        var services =results;
        if (err) console.log(err);
        return res.render('home/views/index',{ events : events, services: services });
  });
});

})
indexRouter.post('/query', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_services where int_eventID = ? `
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
    var queryString2 =`select var_reqname from tbl_requirementtype where int_eventID = ?`
    
  db.query(queryString2,[req.body.id], (err, results2, fields) => {
    if (err) console.log(err);
    res.send({firstQuery:results1[0],secondQuery:results2});
    });
  })
})

indexRouter.post('/baptismdesc', (req, res) => {
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

indexRouter.post('/blessingrequest', (req, res) => {

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
indexRouter.post('/queryservice', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_serviceutilities where int_serviceutilitiesID = ? `
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
    var queryString2 =`select var_reqname from tbl_servicereqtype where int_serviceutilitiesID = ?`
    
  db.query(queryString2,[req.body.id], (err, results2, fields) => {
    if (err) console.log(err);
    res.send({firstQuery:results1[0],secondQuery:results2});
    });
  })
})

indexRouter.get('/marriagedetails', (req, res) => {
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
        
  

      return res.render('home/views/marriage1', {steps: steps, requirements: requirements, description:desc, events: events});
    });
    });
  });
  });
});

indexRouter.get('/schedule', (req, res) => {

  res.render('home/views/schedule', req.query);
});
indexRouter.get('/facilities', (req, res) => {

  res.render('home/views/facilities', req.query);
});

indexRouter.get('/services', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_services where var_eventname = "Anointing of the sick" or var_eventname = "Funeral Service" or var_eventname = "Baptism" var_eventname = "Marriage" order by char_type`
  db.query(queryString1, (err, results1, fields) => {
    
    if (err) console.log(err);
    res.render('home/views/services',{ events : results1 });
  });
});


indexRouter.route('/document')
.get(authMiddleware.noAuthed, (req, res) => {
    res.render('home/views/document', req.query);
})

//================================================================
//forms
//================================================================
indexRouter.get('/anointingform', (req, res) => {
  var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results);
            return res.render('home/views/forms/anointing',{ID:results})
        });
});
indexRouter.get('/anointing/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = (select int_eventID from tbl_services where var_eventname="Anointing of the sick")`
  db.query(queryString3,(err,results,fields)=>{
      console.log(results)
  res.send(results)
})
})
indexRouter.post('/anointing/query', (req, res) => {

  var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
      res.send({firstQuery:results1[0]});
  });

})

//==============================================================
// F U N E R A L  B L E S S I N G
//=============================================================
indexRouter.get('/funeral/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = ${req.session.eventId}`
  db.query(queryString3,(err,results,fields)=>{
      console.log(results)
  res.send(results)
})
})


indexRouter.get('/funeralform', (req, res) => {
  res.render('home/views/forms/funeral')
});
indexRouter.post('/funeral/query', (req, res) => {

var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
db.query(queryString1,[req.body.id], (err, results1, fields) => {
  res.send({firstQuery:results1[0]});
});

})

indexRouter.post('/funeral/form',upload.single('image'),(req, res) => {
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


//==============================================================
//E S T A B L I S H M E N T  B L E S S I N G
//==============================================================
indexRouter.post('/establishment/query', (req, res) => {

  var queryString1 =`SELECT * FROM tbl_user where int_userID = ?`
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
      res.send({firstQuery:results1[0]});
  });

})
indexRouter.get('/establishment/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_serviceutilitiesID = ${req.session.eventId}`
  db.query(queryString3,(err,results,fields)=>{
      console.log(results)
  res.send(results)
})
})

indexRouter.get('/establishmentform', (req, res) => {
  res.render('home/views/forms/establishment')
});


indexRouter.post('/establishment/form',upload.single('image'), (req, res) => {
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
                          if (err) console.log(err);                         
                          if (err){
                              console.log(err)
                              res.send({alertDesc:notsuccess})
                          }
                          else{
                              res.send({alertDesc:success})
                          }                         
                      });})
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

































indexRouter.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  return res.render('home/views/error/505', {title: '505: Something broke!'});
})
indexRouter.use(function(req, res, next) {
  res.status(404)
  return res.render('home/views/error/404', {title: '404: File Not Found'});
});
exports.index = indexRouter;