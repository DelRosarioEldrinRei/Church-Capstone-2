var express = require('express');
var coorcatechistRouter = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var db = require('../../lib/database')();

coorcatechistRouter.use(authMiddleware.coorcatechistAuth)
//===============================================================================================//
// I N D E X //
//===============================================================================================//
coorcatechistRouter.get('/', (req, res)=>{
    var queryString1= `SELECT * from tbl_school`
    db.query(queryString1, (err, results, fields) => {
        var schools = results;
        console.log(schools)
        if (err) throw err
        var sections;
        var queryString2= `SELECT * from tbl_section join tbl_school on
        tbl_section.int_schoolID = tbl_school.int_schoolID where tbl_school.int_schoolID = ?`
        for(var i = 0; i <= schools.length; i++){
            
            db.query(queryString2, [schools[i].int_schoolID], (err, results1, fields) => {
                var sections = results;
                console.log(sections)
                if (err) throw err
                if(i==2){
                    return res.render('coorcatechist/views/index',{catechist: req.session.catechist, schools: schools, sections: sections})
                }
            });
        }
        
        // for(var i = 0; i <= schools.length; i++){
        //     if(i<schools.length){
        //         db.query(queryString2, [schools[i].int_schoolID], (err, results1, fields) => {
        //             var sections = results;
        //             console.log(sections)
        //             if (err) throw err
        //         });
        //     }
        //     if(i==2){
            //         return res.render('coorcatechist/views/index',{catechist: req.session.catechist, schools: schools, sections: sections})
        //     }
        // }
});
});

coorcatechistRouter.get('/calendar', (req, res)=>{
    
    var queryString2= `SELECT var_eventname from tbl_services`
    db.query(queryString2, (err, results, fields) => {
        var services = results;
        if (err) throw err
    return res.render('coorcatechist/views/calendar',{catechist: req.session.catechist, services: services})
    });
    
});


coorcatechistRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    return res.render('coorcatechist/views/error/505', {title: '505: Something broke!'});
  })
coorcatechistRouter.use(function(req, res, next) {
    res.status(404)
    return res.render('coorcatechist/views/error/404', {title: '404: File Not Found'});
});
//===============================================================================================//
exports.coorcatechist = coorcatechistRouter;