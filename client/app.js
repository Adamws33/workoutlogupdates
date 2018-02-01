// wait for Jquery to be ready
$(function(){

  var WorkoutLog = (function($, undefined){
      //private
      var API_BASE = 'https://woserverapias.herokuapp.com/api'; 
      var userDefinitions = [];

      var setAuthHeader = function(sessionToken){
        window.localStorage.setItem("sessionToken", sessionToken);
        //set the authorization header
        //This can be done on individual calls
        //here we showcase ajaxSetup as a global tool
        $.ajaxSetup({
          "headers": {
            "Authorization": sessionToken
          }
        });
      };
      //public
      return{
        API_BASE: API_BASE,
        setAuthHeader: setAuthHeader
      };
  })
  
  (jQuery);

    //iife immedietly invoked function expression

    $('.nav-tabs a[data-toggle="tab"]').on("click", function(e) {
      var token = window.localStorage.getItem("sessionToken");
      if ($(this).hasClass("disabled") && !token) {
         e.preventDefault();
         return false;
      }
    });
      // bind tab changes events
      $('.nav-tabs a[data-toggle="tab"]').on("click", function(e) {
        var target = $(e.target).attr("href"); //activated tab
        if (target === '#log'){
          WorkoutLog.log.setDefinitions();
        }

        if (target === '#history'){
          WorkoutLog.log.setHistory();
        }
      });
    $(document).on("keypress", function(e){
      if(e.which ===13) { //enter key
        if($("#signup-modal").is(':visible')){
          $("#signup").trigger("click");
        }
        if ($("#login-modal").is(":visible")){
          $("#login").trigger("click");
        }
      }
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // activated tab
      if (target === "#log") {
        console.log(WorkoutLog)
         WorkoutLog.log.setDefinitions();
      }

      if (target === "#update-log") {
        WorkoutLog.log.setDefinitions();
        }
 
      if (target === "#history") {
         WorkoutLog.log.setHistory();
      }
   });

    var token= window.localStorage.getItem("sessionToken");
    if(token){
      WorkoutLog.setAuthHeader(token);
    }

    //expose this to the workoutlog modules
    window.WorkoutLog=WorkoutLog;
  });











// 	$("#testAPI").on("click", function(){
// 		console.log("It is working");
//   });

//   // calling an ajax get to 
//   var test = $.ajax({
//     type: "GET",
//     url: "http://localhost:3000/api/test"
//   })
//   .done(function(data){
//     // this is logging the info recieved from the API
//     console.log(data);
//   })
// .fail(function(){
//     console.log("Oh no!");
//   });
// });

  // var app = angular.module('WorkoutLog',[
  //   'ui.router',
  //   'workoutlog.define',
  //   'worloutlog.log',
  //   'workoutlog.history',
  //   'workoutlog.feed',
  //   'workoutlog.auth.signup',
  //   'workoutlog.auth.signup'

  // ])
