require('dotenv').config();

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var sequelize = require('./db.js')

// var User = sequelize.import('./models/user.js');

//created the table in postgres
//mathces the model we defied 
// doesnt drop the db 
// User.sync();
// //**********DANGER************DANGER************DANGER********
// // **********DANGER************DANGER************DANGER********
// // ****************** sequelize.sync({ force: true}); *******************
// // ***** DANGER THIS CODE WILL DROP ALL DATA STORED IN THE DB ****
// // **********DANGER************DANGER************DANGER******** 
// // **********DANGER************DANGER************DANGER********

sequelize.sync();


app.use(bodyParser.json());
// saying to require the addition of headers from this file to have additional information sent along 

app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));
app.use('/api/workoutins', require('./routes/workoutin'));
// sending the string "hello world" to the api/test location for the client to pull through a header
app.use('/api/test', function(req,res){
  res.send("Hello World")
})

http.listen(process.env.PORT || 3000, function() {
  console.log('app is listening on port 3000...');
});



  

