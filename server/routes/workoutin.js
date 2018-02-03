var router = require('express').Router();
var sequelize = require('../db.js');
var Workoutins = sequelize.import('../models/workoutin.js');

  router.post('/', function(req, res) {
  //methods   //objects must match the model
  //  var request = req.body.clock
  //  console.log(request)
  Workoutins.create({ 
      dayin: req.body.time.startDay,
      hourin: req.body.time.startHour,
      minin: req.body.time.startMinute,
        }).then(
      function createSuccess(workoutins) {
        //send a response as json
            res.json({
              workoutins: workoutins
            });
      }, 
          function createError(err) {
            res.send(500, err.message);
          }

          );
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
    