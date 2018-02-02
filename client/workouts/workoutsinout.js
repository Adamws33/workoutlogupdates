$(function() {
	$.extend(WorkoutLog, {
		time: {
      clock: [],

      setWorkouts: function() {
        var currentdate = new Date();
        var starth = (currentdate.getHours() * 60);
        var startm = currentdate.getMinutes();
        console.log("start:",starth+startm)
        // var opts;
        // for (var i = 0; i < len; i++) {
          
        // opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
        // }
        // $("#log-definition").children().remove();
        // $("#log-definition").append(opts);
        // $("#update-definition").children().remove();
        // $("#update-definition").append(opts);
      },
      fetchAll: function() {
        var fetchDefs = $.ajax({
          type: "GET",
          url: WorkoutLog.API_BASE + "log",
          headers: {
            "authorization": window.localStorage.getItem("sessionToken")
          }
       })
       .done(function(data) {
         console.log("data:", data)
          WorkoutLog.time.workouts = data;
       })
       .fail(function(err) {
          console.log(err);
       });
			}
    }
  })
  if (window.localStorage.getItem("sessionToken")) {
    WorkoutLog.definition.fetchAll();
       }
})