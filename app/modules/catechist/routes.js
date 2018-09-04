var express = require('express');
var catechistRouter = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();

catechistRouter.use(authMiddleware.catechistAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
catechistRouter.get('/', (req, res)=>{
    res.render('catechist/views/index')
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