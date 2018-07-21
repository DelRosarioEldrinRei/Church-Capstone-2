var express = require('express');
var indexRouter = express.Router();
var authMiddleware = require('../../modules/auth/middlewares/auth');
var db = require('../../lib/database')();

indexRouter.route('/').get(authMiddleware.noAuthed, (req, res) => {
  var queryString1 =`SELECT * FROM tbl_event where var_eventname = 'Baptism' or var_eventname = 'Funeral Service' or var_eventname = 'Marriage' or var_eventname = 'Facility Reservation' or var_eventname = 'Document Request' or var_eventname = 'Establishment Blessing' `
  db.query(queryString1, (err, results, fields) => {
    var events =results;
      if (err) console.log(err);
      
  
      return res.render('home/views/index',{ events : events });
  });

})
indexRouter.post('/query',authMiddleware.noAuthed, (req, res) => {
  var queryString =`SELECT * FROM tbl_event where int_eventID = ? `
  db.query(queryString,[req.body.id], (err, results, fields) => {
      if (err) console.log(err);
      res.send(results[0]);
      console.log(results[0])
  });

})

indexRouter.route('/schedule')
.get(authMiddleware.noAuthed, (req, res) => {
    res.render('home/views/schedule', req.query);
})


exports.index = indexRouter;