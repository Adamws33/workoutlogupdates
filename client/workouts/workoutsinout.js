$(function () {
  var currentdate = new Date();
  let startid;
  let patchData
  let postData
  $.extend(WorkoutLog, {
    time: {
      clock: [],
      clocks: {
        
        startDay: `${(currentdate.getMonth() + 1)}/${currentdate.getDate()}/${currentdate.getFullYear()} `,
        startHour: (currentdate.getHours() * 60),
        startMinute: currentdate.getMinutes()
      },
      setWorkoutin: function () {
        console.log("Hey im a workout in", WorkoutLog.time.clocks)
        var currentdate = new Date();
        postData = {
          startDay: `${(currentdate.getMonth() + 1)}/${currentdate.getDate()}/${currentdate.getFullYear()} `,
          startHour: (currentdate.getHours() * 60),
          startMinute: currentdate.getMinutes()
        }
          var started = $.ajax({
                      type: "POST",
                      url: WorkoutLog.API_BASE + "workoutins",
                      data: JSON.stringify(postData),
                      contentType: "application/json"
        });
        started.done(function (data) {
          console.log("Data", data.workoutins)
          WorkoutLog.time.clock.push(data.workoutins);
          startid = WorkoutLog.time.clock[0].id;
          console.log("after id:", startid);
          console.log("after id:", WorkoutLog.time.clock);
          $("#workouts-listItem").val("");

          //to change to a new tab if needed
          // $('a[href="#workouts"]').tab("show");
        });
      },
      setWorkoutout: function () {
        console.log("after id:", startid);
        var currentdate = new Date();
        var patchData = {
          endDay: `${(currentdate.getMonth() + 1)}/${currentdate.getDate()}/${currentdate.getFullYear()} `,
          endHour: (currentdate.getHours() * 60),
          endMinute: currentdate.getMinutes()
        }
        console.log("Patch Data:", patchData)
          var ended = $.ajax({
                      type: "PATCH",
                      url: WorkoutLog.API_BASE + "workoutins/"+startid,
                      data: JSON.stringify(patchData),
                      contentType: "application/json"
        });
        ended.done(function (data) {
          // var obj = patchData
          // var result = Object.keys(patchData).map(function(key) {
          //   return [Number(key), patchData[key]];
          // });
          console.log("patchdata",patchData)
          console.log("WorkoutLog.time.clock before patch:",WorkoutLog.time.clock)
          WorkoutLog.time.clock[0].dayout = (patchData.endDay);
          WorkoutLog.time.clock[0].hourout = (patchData.endHour);
          WorkoutLog.time.clock[0].minout = (patchData.endMinute);
          console.log("WorkoutLog.time.clock after patch:",WorkoutLog.time.clock)

          WorkoutLog.time.setWorkoutins();
          WorkoutLog.time.fetchAll();

          $("#workouts-listItem").val("");

          //to change to a new tab if needed
          // $('a[href="#workouts"]').tab("show");
        });
      },
      fetchAll: function () {
        var fetchClocks = $.ajax({
          type: "GET",
          url: WorkoutLog.API_BASE + "workoutins",
          headers: {
            "authorization": window.localStorage.getItem("sessionToken")
          }
        })
        .done(function (data) {
            console.log("data:", data)
            // WorkoutLog.time.clocks = data;
          })
          .fail(function (err) {
            console.log(err);
          });
      },
      setWorkoutins: function () {
        console.log("starting time list:", WorkoutLog.time.clock[0])
        var workOutIn = WorkoutLog.time.clock;
        var leng = workOutIn.length;
        var list = "";
        // for ( i = 0; i < leng; i++) {
        //   console.log("i",workOutIn[i])
        //   console.log("workoutin hour:", workOutIn[i].hourout )
          list += `<li id='workout-list' class="list-group-item text-center">On ${workOutIn[0].dayin} you worked out for 
          <strong>${((workOutIn[0].hourout)+(workOutIn[0].minout))-((workOutIn[0].minin)+(workOutIn[0].hourin))}</strong>
          minutes and got SWOLE! <div class='pull-right'>
            </div></li>`
        // }
        console.log("this is a result of making a list:", list)
        console.log("workOutIn.length", workOutIn.length)
        $("#workout-list").remove();
        $("#workouts-list").append(list);
      }
    }
  })
  // $("#workout-start").on("click", WorkoutLog.time.setWorkouts);
  ;

  // if (window.localStorage.getItem("sessionToken")) {
  //   WorkoutLog.time.fetchAll();
  // }
})

// -(workOutIn[i].minin+workOutIn[i].hourin)+workOutIn[i].hourout


  // list += "<li class='list-group-item'>" + "On " + workOutIn[i].dayin + " you worked out for " +  
  // ((workOutIn[i].minin+workOutIn[i].hourin)-(workOutIn[i].minout+workOutIn[i].hourout)) 
  // + " minutes and got SWOLE!" +
  // // pass the log.id into the button's id attribute // watch your quotes!
  // "<div class='pull-right'>" +
  //   "<button id='" + workOutIn[i].id + "' class='update'><strong>U</strong></button>" +
  //   "<button id='" + workOutIn[i].id + "' class='remove'><strong>X</strong></button>" +
  //   "</div></li>";