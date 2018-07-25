const express = require('express');
var session=require('express-session');
const router = new express.Router();
var db = require('../config/database.js');
var bcrypt = require('bcrypt');
const perf = require('execution-time')();
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validate(payload) {
    const errors = {};
    let isFormValid = true;
    console.log(payload.checked_project);
    if(!payload.project_name&&payload.project_name!=null){
        if ( typeof payload.project_name !== 'string' || payload.project_name.length === 0) {
          isFormValid = false;
          errors.name = 'Please provide your name.';
        }}
        if(!payload.checked_project&&payload.checked_project!=null){
        if(typeof payload.checked_project !== 'string' || payload.checked_project.length === 0){
          isFormValid = false;
            errors.name = 'Please check project, before you will start.';
      }}
    return {
      success: isFormValid,
      errors
    };}
  
  router.post('/start',(req,res)=>{
    const validationResult = validate(req.body);
    console.log(validationResult);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.errors
      });
    }
    else{
      perf.start();
      var insertQuery = "UPDATE Projects_data SET start= ? WHERE id_project= ? " ;
      db.query(insertQuery,[new Date(),req.body.checked_project],function(err, rows) {
        console.log(err);
          return res.status(200).json({
            success: true,
            message: 'Project Started'
        
        });}
      );
    }

  });
  router.post('/stop',(req,res)=>{
    const validationResult = validate(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.errors
      });
    }
    else{
      const results = perf.stop();
      const sec = Math.floor((results.time / 1000) / 60);
      console.log(sec); 
      var insertQuery = "UPDATE Projects_data SET time_summary=time_summary + ? WHERE id_project= ? " ;
      db.query(insertQuery,[sec,req.body.checked_project],function(err, rows) {
        console.log(err);
      var insertQuery = "UPDATE Projects_data SET stop= ? WHERE id_project= ? " ;
      db.query(insertQuery,[new Date(),req.body.checked_project],function(err, rows) {
        console.log(err);
          return res.status(200).json({
            success: true,
            message: 'Project Stoped. Summary time from start: '+sec+'  minutes'
        
        });}
      );     
    }
  )}});
router.post('/add', (req, res) => {
    const validationResult = validate(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.errors
      });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const ProjectHash = bcrypt.hashSync(req.body.project_name, salt);
    var today = new Date();
              var newUserMysql = {
                  project_name: req.body.project_name,
                  u_id: ProjectHash,
                  user_id:req.body.username,
                  created:today  // use the generateHash function in our user model
              };
    console.log(req.body.username);
              var insertQuery = "INSERT INTO Projects_data ( project_name, id_user , id_project , created ) values (?,?,?,?)";
    
              db.query(insertQuery,[newUserMysql.project_name,newUserMysql.user_id,newUserMysql.u_id,newUserMysql.created],function(err, rows) {
              
                  return res.status(200).json({
                    success: true
                });});
});
router.get('/print',  (req, res,next) => {
  console.log(req.head);
	db.query('SELECT project_name, id_project from Projects_data', function(err, rows, fields) {
    
    if (!err) {
        	res.send(JSON.stringify(rows));
        } else {
			console.log('Error while performing Query.');
		}
	});
}
)

module.exports = router;