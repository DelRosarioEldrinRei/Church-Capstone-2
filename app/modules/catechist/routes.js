var express = require('express');
var catechistRouter = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();

catechistRouter.use(authMiddleware.catechistAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
catechistRouter.get('/', (req, res)=>{
    var queryString2= `SELECT var_eventname from tbl_services`
    db.query(queryString2, (err, results, fields) => {
        var services = results;
        if (err) throw err
    return res.render('catechist/views/index',{catechist: req.session.catechist, services: services})
    });
});

catechistRouter.get('/calendar', (req, res)=>{
    
    var queryString2= `SELECT var_eventname from tbl_services`
    db.query(queryString2, (err, results, fields) => {
        var services = results;
        if (err) throw err
    return res.render('catechist/views/calendar',{catechist: req.session.catechist, services: services})
    });
    
});






catechistRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    return res.render('catechist/views/error/505', {title: '505: Something broke!'});
  })
catechistRouter.use(function(req, res, next) {
    res.status(404)
    return res.render('catechist/views/error/404', {title: '404: File Not Found'});
});
//===============================================================================================//
exports.catechist = catechistRouter;