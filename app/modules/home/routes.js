var express = require('express');
var indexRouter = express.Router();
var moment = require('moment');
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
indexRouter.post('/tempuser', (req, res) => {
  console.log(req.body)
  var queryString1 =`INSERT INTO tbl_tempuser(var_userlname,var_userfname, var_useraddress, var_usercontactnum, var_useremail) VALUES(?,?,?,?,?)`
  db.query(queryString1,[req.body.templastname, req.body.tempfirstname, req.body.tempaddress, req.body.tempcontactnumber, req.body.tempemailaddress], (err, results1, fields) => {
  if(err) console.log(err)
    console.log(results1)
    res.send({tempuser:results1});
    
  })
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
  console.log(req.body)
  var queryString1 =`SELECT * FROM tbl_serviceutilities where int_serviceutilitiesID = ? `
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
    var queryString2 =`select var_reqname from tbl_servicereqtype where int_serviceutilitiesID = ?`
    if (err) console.log(err);
    console.log(results1)
  db.query(queryString2,[req.body.id], (err, results2, fields) => {
    if (err) console.log(err);
    console.log(results2)
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
    var queryString2 =`select * from tbl_requirementtype where int_eventID = (select int_eventID from tbl_services where var_eventname='Marriage') and char_reqtype ='Default'`
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
            console.log(req.query)
            var queryString= `select * from tbl_tempuser where int_tempuserID =?`
            db.query(queryString,[req.query.id], (err, results2, fields) => {
              var user=results2[0]
            console.log(results2)

            return res.render('home/views/forms/anointing',{ID:results, user:user})
        });})
});

indexRouter.post('/anointing/form', upload.single('image'),(req, res) => {
  var success =0
  var notsuccess =1
  var queryString= `select int_eventID from tbl_services where var_eventname="Anointing of the sick"`
    console.log(req.body)
  db.query(queryString, (err, results, fields) => {
          if (err) console.log(err);
          console.log(results);
          var eventID = results[0];
          // var eventID = results[0];
         
          
      var desiredtime1= moment(req.body.desiredtime1, 'h:mm a').format('HH:mm:ss');
      var desiredtimeend= moment(req.body.desiredtimeend, 'h:mm a').format('HH:mm:ss');
      var datenow = new Date();
      var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied, var_applicationtype) VALUES(?,?,?, ?,?,?, ?,?,?)`
          db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1, desiredtime1,desiredtimeend, "Pending", "Submitted", dateNow, "No account"], (err, results, fields) => {
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
indexRouter.get('/anointing/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 
  (select int_eventID from tbl_services where var_eventname="Anointing of the sick")`
  db.query(queryString3,(err,results,fields)=>{
      console.log(results)
  res.send(results)
})
})
indexRouter.post('/anointing/query', (req, res) => {
console.log(req.body)
  var queryString1 =`SELECT * FROM tbl_tempuser where int_tempuserID = ?`
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
    console.log(results1)
      res.send({firstQuery:results1[0]});
  });

})


//==============================================================
// F U N E R A L  B L E S S I N G
//=============================================================
indexRouter.get('/funeral/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_eventID =
  (select int_eventID from tbl_services where var_eventname="Funeral Service")`
  db.query(queryString3,(err,results,fields)=>{
    if(err) console.log(err)
      console.log(results)
  res.send(results)
})
})


indexRouter.get('/funeralform', (req, res) => {

  var queryString= `select * from tbl_services where int_eventID= ?`
  db.query(queryString, [req.query.svcid],(err, results, fields) => {
      if (err) console.log(err);
      console.log(results);
      console.log(req.query)
      var queryString= `select * from tbl_tempuser where int_tempuserID =?`
      db.query(queryString,[req.query.id], (err, results2, fields) => {
        var user=results2[0]
      console.log(results2)

      return res.render('home/views/forms/funeral',{eventid:req.query.svcid, user:user})
  });})
  
});
indexRouter.post('/funeral/query', (req, res) => {

var queryString1 =`SELECT * FROM tbl_tempuser where int_tempuserID = ?`
db.query(queryString1,[req.body.id], (err, results1, fields) => {
  var queryString = `SELECT * FROM tbl_eventinfo JOIN tbl_services ON tbl_services.int_eventID = tbl_eventinfo.int_eventID
             where tbl_services.var_eventname != "Baptism"`
            db.query(queryString,(err,results,fields) =>{
                res.send({queries:results,firstQuery:results1[0]})
            })
  // res.send({firstQuery:results1[0]});
});

})

indexRouter.post('/funeral/form',upload.single('image'),(req, res) => {
  var success =0
  var notsuccess =1
  console.log(req.body)
  if (req.body.eventid== '4'){
      
      var queryString= `select int_eventID from tbl_services where var_eventname="Funeral Service"`
      db.query(queryString, (err, results, fields) => {
          if (err) console.log(err);
          var eventID = results[0];
          var desiredtime1= moment(req.body.desiredtime1, 'HH:mm A').format('HH:mm:ss');
          var desiredtimeend= moment(req.body.desiredtimeend, 'HH:mm A').format('HH:mm:ss');
          var datenow = new Date();
          var dateNow = moment(datenow,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
          var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID,date_eventdate, time_eventstart, time_eventend, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`;
          db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1,desiredtime1, desiredtimeend,"Pending", 'Submitted', dateNow], (err, results, fields) => {
              if (err) console.log(err);
              var eventinfoID= results;

          queries( eventID, eventinfoID.insertId);;});});
  }

  if(req.body.eventid =='7'){
      
      var queryString5= `select int_eventID from tbl_services where var_eventname="Funeral Mass";`
      db.query(queryString5, (err, results, fields) => {
          if (err) console.log(err);
          var eventID = results[0];  
          var desiredtime1= moment(req.body.desiredtime1, 'HH:mm A').format('HH:mm:ss');
          var desiredtimeend= moment(req.body.desiredtimeend, 'HH:mm A').format('HH:mm:ss');
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
                  var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart, time_eventend, int_paymentID, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?,?)`;
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
                      var queryString9 = `INSERT INTO tbl_voucherevents(int_eventinfoID,date_issued,date_due,int_tempuserID,var_vouchercode) VALUES(?,?,now(),?,?)`
                      db.query(queryString9,[eventinfoID.insertId,dateDue1,req.body.userID,text],(err,results,fields)=>{
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

  var queryString1 =`SELECT * FROM tbl_tempuser where int_tempuserID = ?`
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
      res.send({firstQuery:results1[0]});
  });

})
indexRouter.get('/establishment/utilities/query', (req, res)=>{
  var queryString3 = `SELECT * FROM tbl_utilities where int_eventID = 
  (select int_eventID from tbl_services where var_eventname="House Blessing")`
  db.query(queryString3,(err,results,fields)=>{
      console.log(results)
  res.send(results[0])
})
})

indexRouter.get('/establishmentform', (req, res) => {
  var queryString= `select int_eventID from tbl_services where var_eventname="House Blessing"`
        db.query(queryString, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results);
            console.log(req.query)
            var queryString= `select * from tbl_tempuser where int_tempuserID =?`
            db.query(queryString,[req.query.id], (err, results2, fields) => {
              var user=results2[0]
            console.log(results2)

            return res.render('home/views/forms/establishment',{ID:results, user:user})
            })})
  // res.render('home/views/forms/establishment')
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
                      var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart, time_eventend,char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`
                          db.query(queryString1, [req.body.userID,12, req.body.desireddate1, desiredtime1, desiredtimeend,"Pending", "Submitted", dateNow], (err, results, fields) => {
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
                          var queryString1 = `INSERT INTO tbl_eventinfo(int_tempuserID, int_eventID, date_eventdate, time_eventstart,time_eventend, char_approvalstatus, char_requirements, date_applied) VALUES(?,?,?,?,?,?,?,?)`
                          db.query(queryString1, [req.body.userID, eventID.int_eventID, req.body.desireddate1, desiredtime1,desiredtimeend, "Pending", "Submitted", dateNow], (err, results, fields) => {
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

indexRouter.get('/document/form', (req, res)=>{
  var results = req.query
  console.log(results)
  var queryString= `select * from tbl_tempuser where int_tempuserID =?`
            db.query(queryString,[req.query.id], (err, results2, fields) => {
              var user=results2[0]
            console.log(results2)
  return res.render('home/views/forms/document',{results:results, user:user});
            })
});
indexRouter.post('/document/query', (req, res)=>{
  console.log(req.body)
  var queryString =`SELECT *
  FROM tbl_document
  JOIN tbl_documentsevents ON tbl_documentsevents.int_documentID = tbl_document.int_documentID
  JOIN tbl_eventinfo ON tbl_eventinfo.int_eventID = tbl_documentsevents.int_eventID
  JOIN tbl_relation ON tbl_relation.int_eventinfoID = tbl_eventinfo.int_eventinfoID
  JOIN tbl_baptism ON tbl_baptism.int_eventinfoID = tbl_eventinfo.int_eventinfoID
  WHERE tbl_document.var_documenttype = ?
  AND tbl_relation.var_fname = ?
  AND tbl_relation.var_lname = ?
  AND tbl_relation.date_birthday = ?
  
  OR tbl_eventinfo.date_eventdate = ?
  AND tbl_eventinfo.var_eventstatus = "Done"`
  db.query(queryString,[req.body.documentType,req.body.firstName,req.body.lastName,req.body.birthday,req.body.eventDate],(err,results,fields)=>{
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
indexRouter.post('/document/queryDocument',(req,res)=>{
  var queryString = `SELECT * FROM 
  tbl_documentrequest JOIN tbl_document ON tbl_documentrequest.int_documentID = tbl_document.int_documentID
  WHERE tbl_documentrequest.var_doclastname=?
  AND tbl_documentrequest.var_docfirstname=?
  AND tbl_documentrequest.date_docbirthday=?
  AND tbl_documentrequest.int_eventinfoID = ?
  AND tbl_document.var_documenttype =?
  `
      db.query(queryString,[req.body.lastName,req.body.firstName,req.body.birthday,req.body.eventinfoID,req.body.documentType],(err,results,fields)=>{
          if (err) console.log(err);
          res.send(results[0])
      })
})
indexRouter.post('/document/form',upload.single('image'), (req, res) => {
console.log(req.file)
  var queryString1 = `select int_documentID,dbl_docuprice from tbl_document where var_documenttype= ?`
      db.query(queryString1,[req.body.documenttype], (err, results1, fields) => {
          if (err) console.log(err);
          var documentID =results1[0].int_documentID;
          var docuPrice =results1[0].dbl_docuprice;
          console.log(results1)
          console.log(req.session.user);
          var queryString2 = `INSERT INTO tbl_payment(dbl_amount,dbl_balance, char_paymentstatus) VALUES(?,?,?)`
              db.query(queryString2,[docuPrice,docuPrice,"Unpaid"],(err, results2, fields)=>{
              if (err) console.log(err);
              console.log(results2)
              var paymentID = results2.insertId;
              var datenow= new Date();
              var queryString3 = `INSERT INTO tbl_documentrequest(int_tempuserID, int_documentID, int_eventinfoID, var_doclastname, var_docfirstname,date_docbirthday, text_purpose, date_docurequested,char_docustatus,int_paymentID,var_requesttype) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;                  
              db.query(queryString3, [req.body.userID, documentID, req.body.eventinfoID, req.body.lastname, req.body.firstname,req.body.birthday, req.body.purpose,datenow,"Pending",paymentID,"No account"], (err, results3, fields) => {
                      if (err) console.log(err);
                      var requestID =results3.insertId;
                      var path = '/img/req/'+req.file.filename;
                      var nowDate = new Date(); 
                      var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
                      var queryString7 = `INSERT INTO tbl_requirementsdocument(int_requestID,var_reqpath,datetime_reqreceived,int_servicereqtypeID,char_reqstatus) VALUES (?,?,?,?,?);`
                      db.query(queryString7,[requestID,path,nowDate,2,"Pending"],(err, results, fields)=>{
                          if (err) throw err;

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
                                
                                var queryString9 = `INSERT INTO tbl_voucherevents(int_requestID,date_issued,date_due,int_tempuserID,var_vouchercode, int_eventinfoID) VALUES(?,?,?,?,?,?)`
                                db.query(queryString9,[requestID,dateNow, dateDue1,req.body.userID,text, req.body.eventinfoID],(err,results,fields)=>{
                                    if(err) throw err 
                              return res.redirect(`/index`);
                                })
                          })
                      });
                  });    
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