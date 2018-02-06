var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');

  router.post('/', function(req, res) {
  //variables
  // var description = ;
  // var logType= ;
  // var owner = ;

  //methods   //objects must match the model
  Definition.create({ 
          description: req.body.definition.desc,
          logType: req.body.definition.type,
          owner: req.user.id
          // console.log("req info define",req)
        }).then(
      function createSuccess(definition) {
        //send a response as json
            res.json({
              definition: definition
            });
      }, 
          function createError(err) {
            res.send(500, err.message);
          }

          );
  });
  router.get('/', function(req, res) {
    //user variable
    var userid = req.user.id;
    Definition.findAll({
      where: { owner: userid }
    }).then(
      //success
      function findAllSuccess(data) {
        console.log(data);
        res.json(data);
      },
      //failure
      //error
      function findAllError(err) {
        res.send(500, err.message);
    });
  });

    module.exports = router;
    