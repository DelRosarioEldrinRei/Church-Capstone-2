var express = require('express');
var indexRouter = express.Router();
var authMiddleware = require('../../modules/auth/middlewares/auth');
var db = require('../../lib/database')();

indexRouter.use(authMiddleware.noAuthed)
indexRouter.get('/', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_services where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage' or var_eventname = 'Facility Reservation' or var_eventname = 'Document Request' or var_eventname = 'Establishment Blessing'  or var_eventname = 'Anointing of the sick' or var_eventname='Confirmation'`
  db.query(queryString1, (err, results, fields) => {
    var events =results;
      if (err) console.log(err);
      return res.render('home/views/index',{ events : events });
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

indexRouter.get('/services', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_services `
  db.query(queryString1, (err, results, fields) => {
    if (err) console.log(err);
    res.render('home/views/services',{ events : results });
  });
});

indexRouter.get('/store', (req, res) => {

    res.render('home/views/index1', req.query);
});


indexRouter.route('/document')
.get(authMiddleware.noAuthed, (req, res) => {
    res.render('home/views/document', req.query);
})


exports.index = indexRouter;