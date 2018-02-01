var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');


router.post('/', function(req, res) {
  //when we post to API uder, it will want a user object in the body
  var username = req.body.user.username;
  var pass = req.body.user.password;  //bcrypt will encript this information below

    // match the model we created above
  //sequelize - take the user model and go out to the db and create this:
    User.create({
      username:username,
      passwordhash: bcrypt.hashSync(pass,10)//encripting the password over 10 iterations
    }).then(
      //sequelize is going to return the object it created from the db
      function createSuccess(user){
        //sucessfull get this
        var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
        res.json({
          user: user,
          message: 'created',
          sessionToken: token
        })
      },
      function createError(err){
        res.send(500, err.message);
      }
    )
})
  module.exports=router;