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

catechistRouter.get('/calendar', (req, res)=>{
    res.render('catechist/views/calendar')
});



//===============================================================================================//
exports.catechist = catechistRouter;