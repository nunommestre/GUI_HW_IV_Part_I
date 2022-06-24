// File: index.js
// GUI Assignment: Adding JQuery Validation (HW4-Pt1)
// Nuno Mestre, UMass Lowell Computer Science, nuno_mestre@student.uml.edu
// June 23, 2022
// Description: Javascript that executes the validation.

// Ready function executes when the DOM is ready
// Used this for guidance https://jqueryvalidation.org/
$(function () {
  // If x2 < x1 it'll prompt an error
  $.validator.addMethod(
    "xBounds",
    function (value, element) {
      var x2 = Number(value);
      var x1 = Number($("#x1").val());
      if (x1 <= x2) {
        return true;
      }
      return false;
    },
    // Custom error message
    "Least X value cannot exceed the greatest value!"
  );
  // If y2 < y1 it'll prompt an error
  $.validator.addMethod(
    "yBounds",
    function (value, element) {
      var y2 = Number(value);
      var y1 = Number($("#y1").val());
      if (y1 <= y2) {
        return true;
      }
      return false;
    },
    // Custom error message
    "Least Y value cannot exceed the greatest value!"
  );
  // Sets the rules for validation
  $("#input_form").validate({
    rules: {
      x1: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      x2: {
        required: true,
        number: true,
        range: [-50, 50],
        xBounds: true,
      },
      y1: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      y2: {
        required: true,
        number: true,
        range: [-50, 50],
        yBounds: true,
      },
    },
    // Error messages if they fail to meet requirements (Notice X and Y bounds one isnt here its taken care of when creating a custom requirement)
    messages: {
      x1: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      x2: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      y1: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      y2: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
    },
  });
});
// Function that creates the dynamic table
function createTable(x1, x2, y1, y2) {
  var table = document.getElementById("m_table");
  var tbody = document.createElement("tbody");
  // set number of rows
  for (let i = 0; i <= y2 - y1 + 1; ++i) {
    let row = document.createElement("tr");
    // set number of columns
    for (let j = 0; j <= x2 - x1 + 1; ++j) {
      let data = document.createElement("td");
      // Top left block empty
      if (i === 0 && j === 0) {
        data.innerHTML = "";
      }
      // sets up top row
      else if (i === 0) {
        data.innerHTML = x1 + j - 1;
      }
      // sets first column
      else if (j === 0) {
        data.innerHTML = y1 + i - 1;
      }
      // Multiplication preformed the get the table numbers
      else {
        data.innerHTML = (x1 + j - 1) * (y1 + i - 1);
      }
      // appends the data to eachg row and individual data cell in that row and appends it to our currently empty html table
      row.appendChild(data);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
}

// music_play controls when the music can be played to prevent overlap
var music_play = false;
document.querySelector("button").addEventListener("click", function () {
  var audio = new Audio("Music/AmongUS_Drip.mp3");
  if (!music_play) {
    audio.play();
    music_play = true;
  }
  // Get all of needed elements from the form using getElementById
  document.getElementById("m_table").innerHTML = "";
  var form = document.getElementById("input_form");
  var multiplier_bottom = document.getElementById("x1").value;
  var multiplier_top = document.getElementById("x2").value;
  var multiplicand_bottom = document.getElementById("y1").value;
  var multiplicand_top = document.getElementById("y2").value;
  var values = [x1, x2, y1, y2];
  var range = [];
  // Loop through and look for empty inputs and set them to NaN
  for (var i = 0; i < values.length; ++i) {
    if (values[i] == "") {
      values[i] = NaN;
    }
    // Creates a new array of the text numbers becoming real names to JavaScript
    range[i] = Number(values[i].value);
  }
  // Checks validation
  if ($("#input_form").valid()) {
    createTable(
      Number(multiplier_bottom),
      Number(multiplier_top),
      Number(multiplicand_bottom),
      Number(multiplicand_top)
    );
  }
  document.getElementById("m_table").style.visibility = "visible";
  form.reset();

  return false;
});
