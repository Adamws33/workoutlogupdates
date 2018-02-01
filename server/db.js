var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'familia7', {
  host:'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
      console.log('connected to workoutlog postgress db');
    },
    function(err){
      console.log('err');
    }
);

var Users = sequelize.import('./models/user');

module.exports=sequelize;