var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://houjotzntclstv:58a501b8b00776657f6b4ac8202531de971e1259fba01b75a3dbe76eb5f0c9b6@ec2-54-235-249-33.compute-1.amazonaws.com:5432/d84ieggs3igm0v', {
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