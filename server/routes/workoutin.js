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
  router.put('/', function(req, res) {
    var dayin =  req.body.startDay;
    var hourin = req.body.startHour;
    var minin =  req.body.startMinute;
    Log.update(
      {
        description: description,
        result: result,
        def: definition
      },

      {where: {id: data}}
      ).then(
        function updateSuccess(updatedLog) {
          res.json(updatedLog);
        },

        function updateError(err){
          res.send(500, err.message);
        }
      )
  });
  // router.get('/', function(req, res) {
  //   //user variable
  //   var userid = req.user.id;
  //   Workoutinss.findAll({
  //     where: { owner: userid }
  //   }).then(
  //     //success
  //     function findAllSuccess(data) {
  //       console.log(data);
  //       res.json(data);
  //     },
  //     //failure
  //     //error
  //     function findAllError(err) {
  //       res.send(500, err.message);
  //   });
  // });

    module.exports = router;
    