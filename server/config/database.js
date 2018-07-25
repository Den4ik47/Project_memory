const mysql=require('mysql');
var connection = mysql.createConnection({
    host     : '217.173.195.9',
    user     : '119844',
    password : '119844',
    database:'119844'
  });
  
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
  
  });  module.exports = connection;