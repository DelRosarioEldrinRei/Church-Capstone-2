var express = require('express');
var coordinatorRouter = express.Router();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();
var multer = require('multer');
var swal = require('sweetalert2')
//===============================================================================================//
coordinatorRouter.use(authMiddleware.coordinatorAuth)
// I N D E X //
//===============================================================================================//
coordinatorRouter.get('/', (req, res)=>{
    res.render('coordinator/views/index')
});
coordinatorRouter.get('/members', (req, res)=>{
    res.render('coordinator/views/members')
});
coordinatorRouter.get('/officers', (req, res)=>{
    res.render('coordinator/views/officers')
});
coordinatorRouter.get('/schedule', (req, res)=>{
    res.render('coordinator/views/schedule')
});
coordinatorRouter.get('/appointments', (req, res)=>{
    res.render('coordinator/views/appointments')
});



coordinatorRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    return res.render('coordinator/views/error/505', {title: '505: Something broke!'});
  })
coordinatorRouter.use(function(req, res, next) {
    res.status(404)
    return res.render('coordinator/views/error/404', {title: '404: File Not Found'});
});
//===============================================================================================//
exports.coordinator = coordinatorRouter;