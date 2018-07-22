var express = require('express');
var indexRouter = express.Router();
var authMiddleware = require('../../modules/auth/middlewares/auth');
var db = require('../../lib/database')();

indexRouter.use(authMiddleware.noAuthed)
indexRouter.get('/', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_event where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage' or var_eventname = 'Facility Reservation' or var_eventname = 'Document Request' or var_eventname = 'Establishment Blessing' `
  db.query(queryString1, (err, results, fields) => {
    var events =results;
      if (err) console.log(err);
      return res.render('home/views/index',{ events : events });
  });

})
indexRouter.post('/query', (req, res) => {
  var queryString1 =`SELECT * FROM tbl_event where int_eventID = ? `
  db.query(queryString1,[req.body.id], (err, results1, fields) => {
    var queryString2 =`select var_reqname from tbl_requirementtype where int_eventID = ?`
    
  db.query(queryString2,[req.body.id], (err, results2, fields) => {
    if (err) console.log(err);
    res.send({firstQuery:results1[0],secondQuery:results2});
  });
  });

})

indexRouter.get('/schedule', (req, res) => {

    res.render('home/views/schedule', req.query);
});


exports.index = indexRouter;