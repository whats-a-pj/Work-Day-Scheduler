//encapsulates the functions to be ran when the html file is completely loaded up
$(document).ready(function() {

//displays whatever day it is at the top of the html file
var todaysDate = dayjs();
$('#currentDay').text(todaysDate.format('MMM D, YYYY'));

//grabs the hour of users local time to help calculate how the timeBlock function will run
var currentTime = dayjs().hour();

$(".saveBtn").on("click", function() {
    //userInput = (this) is referring to the saveBtn, then .siblings, then the value of those siblings
  var userInput = $(this).siblings(".description").val();
//blockIds = (this) also refers to the saveBtn, then the .parent (so the time-block or div id="")
  var blockIds = $(this).parent().attr("id");
//gets the items from userInput and blockIds to save them for when the user reloads the page
    localStorage.setItem(blockIds, userInput);
});

//grabs all the div classes .time-block
var timeBlock = $(".time-block");
//function that loops through if the current time is =, <, >, to the times on the html file
timeBlock.each(function(block) {
var scheduleTime = hourConverter($(this).children(".hour").text());
    if (currentTime === scheduleTime) {
    //adds classes to the .time-block
      $(this).addClass("present");
  } else if (currentTime > scheduleTime) {
      $(this).removeClass("present");
      $(this).addClass("past");
  } else if (currentTime < scheduleTime) {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
  };
});

//gets the user's input (.val) and saves it to local storage based on the id name
$("#9 .description").val(localStorage.getItem("9"));
$("#10 .description").val(localStorage.getItem("10"));
$("#11 .description").val(localStorage.getItem("11"));
$("#12 .description").val(localStorage.getItem("12"));
$("#1 .description").val(localStorage.getItem("1"));
$("#2 .description").val(localStorage.getItem("2"));
$("#3 .description").val(localStorage.getItem("3"));
$("#4 .description").val(localStorage.getItem("4"));
$("#5 .description").val(localStorage.getItem("5"));

//this function converts AM PM to 24 hour time
function hourConverter(time) {
  //this if is because the styles don't apply to 12PM based on the other vars
    if (time === "12PM") {
      return 12
    }
  //this var takes time and will split the AM from the string Els and gives it an index of 1
  //the ===undefined?"PM":"AM"; is a shorthand if statement
  var amPm = time.split("AM")[1]===undefined?"PM":"AM";
  //parseInt takes a string El and turns it into a number
  //the fixedTime var here turns it into a number and then splits amPm and gives it an index of 0
  var fixedTime = parseInt(time.split(amPm)[0]);
    if (amPm === "AM") {
      return fixedTime;
    } else {
    //+12 because currentTime is based on 24 hour clock
      return fixedTime+12;
    };
  };
});
