const mysql=require('mysql');
var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database:''
  });
  
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
  
  });  module.exports = connection;
