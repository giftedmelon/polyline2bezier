'use strict';
console.log('start demo');

function drawPath(segments) {
  var d = [];
  segments.forEach(function(segment, index) {
    if (index === 0) {
      d.push('M' + segment[0].x + ',' + segment[0].y + ' C');
    }
    segment.forEach(function(point, index_) {
      if (index_ === 0) {
        return;
      }
      d.push(point.x + ',' + point.y);
    });
  });
  if (segments.length > 0) {
    d.push('z');
  }
  d = d.join(' ');
  console.log('d="' + d + '"');
}

// document.getElementById("demo").innerHTML = 5 + 6;
var polyline = [
  [72.0499,80.2825], [72.4009,80.4738], [73.3388,80.9843], [76.0439,82.4476], [77.5043,83.2223], [78.6601,83.8112], [79.2003,84.0646], [79.7521,84.2944], [81.8962,85.1245], [83.4281,85.7057], [84.416,86.0762]];
var bezierCurves = polyline2bezier(polyline);
document.getElementById("demo").innerHTML = polyline;
drawPath(bezierCurves);




