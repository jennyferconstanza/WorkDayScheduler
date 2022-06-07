//moment.js displays current date and time
$("#currentDay").text(moment().format("MMM Do YYYY, h:mm:ss a"));
//variable for hours in the work day that will display in scheduler (9am-5pm)
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
//function hour is AM/PM and whether hour is in past, present, or future
workHours.forEach(function (hour) {
  var timeblockTracker = "past";
  var blockTime = "";
  var currentTime = moment().hours();
  //console.log(currentTime); this will display the current time in console
  //if blockTime is less than 12 it is "AM", 12===12 "PM", more than 12 it is "PM"
  if (hour < 12) {
    blockTime = hour + "AM";
  } else if (hour === 12) {
    blockTime = hour + "PM";
  } else {
    blockTime = hour - 12 + "PM";
  }
  //console.log(blockTime); displays blockTime 9am-5pm in console
  //if hour is in past the time block is gray, present is red, and future is green
  if (hour === currentTime) {
    timeblockTracker = "present";
  } else if (hour < currentTime) {
    timeblockTracker = "past";
  } else {
    timeblockTracker = "future";
  }
  //adding row for each hour timeblock, textarea for user to input work event, and save button to save work event inputted by user
  var rowDiv = $("<div>").addClass("row time-block").attr("id", hour);
  var textDiv = $("<textarea>").addClass("col-md-10 description " + timeblockTracker).val(localStorage.getItem(hour));
  var hourDiv = $("<div>").addClass("col-md-1 hour").text(blockTime);
  var saveBtn = $("<button>").addClass("col-md-1 saveBtn btn btn-primary").text("").addClass("fas fa-save");
  //appending the above
  $(".container").append(rowDiv.append(hourDiv, textDiv, saveBtn));
});
//saves work event inputted by user in textarea into localStorage, when user refreshes page the event will still display
$(".saveBtn").on("click", function () {
  var workEvent = $(this).siblings(".description").val().trim();
  var time = $(this).parent().attr("id");
  localStorage.setItem(time, workEvent);
});
