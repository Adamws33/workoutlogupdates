$(function () {
  var currentdate = new Date();
  $.extend(WorkoutLog, {
    time: {
      clock: [],
      clocks: {
        
        startDay: `${currentdate.getDate()}/${(currentdate.getMonth() + 1)}/${currentdate.getFullYear()} `,
        startHour: (currentdate.getHours() * 60),
        startMinute: currentdate.getMinutes()
      },
      setWorkoutin: function () {
        console.log("Hey im a workout", WorkoutLog.time.clocks)
        var currentdate = new Date();
        var start = {
          startDay: `${currentdate.getDate()}/${(currentdate.getMonth() + 1)}/${currentdate.getFullYear()} `,
          startHour: (currentdate.getHours() * 60),
          startMinute: currentdate.getMinutes()
        }
          var postData = {time: start}.time;
          console.log("WorkoutLog before post workoutinout.js",WorkoutLog)
          console.log("start:", postData);
          var started = $.ajax({
                      type: "POST",
                      url: WorkoutLog.API_BASE + "workoutins",
                      data: JSON.stringify(postData),
                      contentType: "application/json"
        });
        started.done(function (data) {
          console.log("data.time:",data.workoutins)

          WorkoutLog.time.clocks.push(data.workoutins);
          $("#workouts-listItem").val("");

          //to change to a new tab if needed
          // $('a[href="#workouts"]').tab("show");
        });
      },
      fetchAll: function () {
        var fetchDefs = $.ajax({
          type: "GET",
          url: WorkoutLog.API_BASE + "workoutins",
          headers: {
            "authorization": window.localStorage.getItem("sessionToken")
          }
        })
          .done(function (data) {
            console.log("data:", data)
            WorkoutLog.time.clocks = data;
          })
          .fail(function (err) {
            console.log(err);
          });
      },
      setWorkoutins: function () {
        var workOutIn = WorkoutLog.time;
        var leng = workOutIn.length;
        var list = "";
        for (var i = 0; i < leng; i++) {
          list += "<li class='list-group-item'>" +
            workOutIn[i].id
          // pass the log.id into the button's id attribute // watch your quotes!
          "<div class='pull-right'>" +
            "<button id='" + workOutIn[i].id + "' class='update'><strong>U</strong></button>" +
            "<button id='" + workOutIn[i].id + "' class='remove'><strong>X</strong></button>" +
            "</div></li>";
        }
        console.log("this is a result of function setWorkoutins", workOutIn)
        $("#workouts-listItem").children().remove();
        $("#workouts-listItem").append(list);
      }
    }
  })
  // $("#workout-start").on("click", WorkoutLog.time.setWorkouts);
  $("#workout-start").on("click", WorkoutLog.time.setWorkoutins);

  // if (window.localStorage.getItem("sessionToken")) {
  //   WorkoutLog.workoutins.fetchAll();
  // }
})