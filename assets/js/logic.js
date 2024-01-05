$(document).ready(function () {
    function updateDateTime() {
      var timeAndDate = $("#currentDay");
      var currentDateAndTime = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
      timeAndDate.text(currentDateAndTime);
    }

    // Initial update
    updateDateTime();

    // Update every second (1000 milliseconds)
    setInterval(updateDateTime, 1000);




    
  });