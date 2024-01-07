// wrap everything in a function so html loads first
$(document).ready(function () {
    var displayTime = $("#currentDay");
    var currentEventBox = $("#currentEventBox");
    var currentEventText = $("#currentEvent");
  
    function updateDateTime() {
      var currentTime = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
      displayTime.text(currentTime);
    }
  
    function saveEvent() {
      var text = $(this).siblings(".description").val();
      var time = $(this).parent().attr("id");
  
      // Save text in local storage
      localStorage.setItem(time, text);
  
      // Store a reference to the button
      var saveBtn = $(this);
  
      // Add a class to the button to change its color
      saveBtn.addClass("saved");
  
      // Set a timeout to remove the class after a short delay 
      setTimeout(function () {
        saveBtn.removeClass("saved");
      }, 1000);
    }
  
    function clearSchedule() {
      // Clear all events from local storage
      localStorage.clear();
  
      // Reset textareas
      $(".description").val("");
    }
  
    $(".saveBtn").on("click", saveEvent);
    $("#clearBtn").on("click", clearSchedule);
  
    function hourTracker() {
        var currentHour = dayjs().hour();
        var futureEventsCount = 0;
      
        $(".time-block").each(function () {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
      
          if (blockHour > currentHour) {
            var savedEvent = localStorage.getItem("hour-" + blockHour);
            if (savedEvent) {
              futureEventsCount++;
            }
          }
      
          $(this).removeClass("past present future");
      
          if (blockHour < currentHour) {
            $(this).addClass("past");
          } else if (blockHour === currentHour) {
            $(this).addClass("present");
          } else {
            $(this).addClass("future");
          }
        });
      
        var currentEventHour = $("#hour-" + currentHour);
        var currentEvent = localStorage.getItem("hour-" + currentHour);
      
        if (currentEventHour.length && currentEvent) {
            currentEventText.html(currentEvent).show();
            currentEventText.html(currentEvent + "<br>There are " + futureEventsCount + " future task(s)").show();
          currentEventBox.show();
                } else {
          currentEventBox.html("No task(s) for the current time slot. " + "<br>There are " + futureEventsCount + " future task(s)").show();
        }
      }
      
      
    // Call hourTracker once on page load
    hourTracker();
  
    function displayText() {
      $(".time-block").each(function () {
        var blockHour = $(this).attr("id");
        $(this).children(".description").val(localStorage.getItem(blockHour));
      });
    }
  
    updateDateTime();
    displayText();
  
    setInterval(updateDateTime, 1000);
    setInterval(hourTracker, 60000); // Adjust the interval 
  });
  