var express = require('express');
var indexRouter = express.Router();
var authMiddleware = require('../../modules/auth/middlewares/auth');
var db = require('../../lib/database')();

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