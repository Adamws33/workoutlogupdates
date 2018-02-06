var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Workoutins = sequelize.import('../models/workoutin.js');
// var currentdate = new Date();
// var clocks =  {
        
//   startDay: currentdate.getDate()+"/"+ (currentdate.getMonth() + 1)+"/"+currentdate.getFullYear(),
//   startHour: (currentdate.getHours() * 60),
//   startMinute: currentdate.getMinutes()
// }
// console.log (clocks.startDay)

  router.post('/', function(req, res) {
  //methods   //objects must match the model
  //  var request = req.body.clock
  console.log("*****************req is**************",req.body)
  Workoutins.create({ 
      dayin: req.body.startDay,
      hourin: req.body.startHour,
      minin: req.body.startMinute,
        }).then(
      function createSuccess(workoutins) {
        //send a response as json
            res.json({
              workoutins: workoutins
            });
      }, 
          function createError(err) {
            res.send(500).send(err.message);
          }

          );
  
  });
  router.patch('/:id', function(req, res) {
    Workoutins.update(
      {
        dayout: req.body.endDay,
        hourout: req.body.endHour,
        minout: req.body.endMinute
      },

      {where: {id: req.params.id}}
      ).then(
        function updateSuccess(workoutout) {
          res.json(workoutout);
          console.log("************************************************",workoutout,"*************************************************************")
        },

        function updateError(err){
          res.send(500, err.message);
        }
      )
  });
  router.get('/', function(req, res) {
    var userid = req.user.id;
    console.log("************************************************",userid)
    Workoutins.findAll({
      where: { id: userid }
    }).then(
      //success
      function findAllSuccess(data) {
        res.json(data);
        console.log("************************* find all data",data)
      },
      //failure
      //error
      function findAllError(err) {
        res.send(500, err.message);
    });
  });

    module.exports = router;
    