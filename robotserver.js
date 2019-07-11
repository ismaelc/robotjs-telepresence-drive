// server.js
var express = require('express');
var robot = require('robotjs');
var cmd = require('node-cmd');
app = express();

app.get('/r', async function (req, res) {

  function doIt(command) {
    var base_x = 647;
    var base_y = 600;
    var base_d = 1000; // 1 sec

    switch (req.query.m) {
      case "forward":
        return {
          x: base_x, y: base_y, duration: base_d
        };
      case "left":
        return {
          x: base_x - 75, y: base_y + 100, duration: base_d // The farther you are from middle in x axis, the faster it rotates
        };
      case "right":
        return {
          x: base_x + 75, y: base_y + 100, duration: base_d // ... +/- 75
        };
      case "park":
        return {
          x: base_x, y: base_y - 10, duration: base_d + 9000
        };
      case "left_small":
        return {
          x: base_x - 75, y: base_y + 100, duration: base_d - 500
        };
      case "right_small":
        return {
          x: base_x + 75, y: base_y + 100, duration: base_d - 500// ... +/- 75
        };
        case "forward_small":
            return {
              x: base_x, y: base_y, duration: base_d - 500
            };       
      default: {};
    }
  }

  var kbm = doIt(req.query.m);

  // Set focus to Beam app
  cmd.run('open -a Beam');
  setTimeout(function () {
    var pressDuration = kbm.duration;
    robot.moveMouse(kbm.x, kbm.y)

    robot.mouseToggle("down");
    setTimeout(function () {
      robot.mouseToggle("up");
      res.send('Done')
    }, pressDuration); // Press the mouse this long

  }, 1500); // This should accommodate the time it takes to switch windows

})

var port = process.env.PORT || 5003;
app.listen(port);
console.log('server started ' + port);