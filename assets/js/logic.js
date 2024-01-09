// Wrap everything in a function to ensure HTML is fully loaded before executing
$(document).ready(function () {
  // DOM elements
  var displayTime = $("#currentDay");
  var currentEventBox = $("#currentEventBox");
  var currentEventText = $("#currentEvent");

  //update the displayed date and time
  function updateDateTime() {
      var currentTime = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
      displayTime.text(currentTime);
  }

  //save the event to local storage
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

  // Function to clear all events and reset textareas
  function clearSchedule() {
      // Clear all events from local storage
      localStorage.clear();

      // Reset textareas
      $(".description").val("");
  }

  //handlers
  $(".saveBtn").on("click", saveEvent);
  $("#clearBtn").on("click", clearSchedule);

  // track the hour, determine past, present, and future events
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

          // Remove previous classes
          $(this).removeClass("past present future");

          // Add appropriate class based on the current hour
          if (blockHour < currentHour) {
              $(this).addClass("past");
          } else if (blockHour === currentHour) {
              $(this).addClass("present");
          } else {
              $(this).addClass("future");
          }
      });

      // Display current or future events
      var currentEventHour = $("#hour-" + currentHour);
      var currentEvent = localStorage.getItem("hour-" + currentHour);

      if (currentEventHour.length && currentEvent) {
          currentEventText.html(currentEvent + "<br>There are " + futureEventsCount + " future task(s)").show();
          currentEventBox.show();
      } else {
          currentEventBox.html("No task(s) for the current time slot. " + "<br>There are " + futureEventsCount + " future task(s)").show();
      }
  }

  // Call hourTracker once on page load
  hourTracker();

  //display saved text in textareas
  function displayText() {
      $(".time-block").each(function () {
          var blockHour = $(this).attr("id");
          $(this).children(".description").val(localStorage.getItem(blockHour));
      });
  }

  // Initial
  updateDateTime();
  displayText();

  // Update date and time every second
  setInterval(updateDateTime, 1000);

  // Update hour tracking every minute (adjust the interval as needed)
  setInterval(hourTracker, 60000);
});
