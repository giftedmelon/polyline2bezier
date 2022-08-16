const fs = require('fs');
const cheerio = require('cheerio');
var polyline2bezier= require('./polyline2bezier');


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
  return ('d="' + d + '"');
  //console.log('d="' + d + '"');
}

const path_to_svg = 'p2bn/a.png.svg';

let $;
let pathStringsArray= [];
fs.readFile(path_to_svg,"utf8",(err,data) => {
if (err) console.log(err);
$ = cheerio.load(data, {xmlMode:true});

const pathSet = $("polyline");
pathSet.each(function(){ 
  const points= $(this).attr("points");
  let arrx= points.slice(0,-1);
  // console.log(arrx);
  let arr = arrx.split(' ');
  let polyline = [];
  for (let element of arr){
    let x = Number.parseFloat(element.split(',')[0]);
    let y = Number.parseFloat(element.split(',')[1]);
    let point = [x, y];
    polyline.push(point);
  }
  //console.log(polyline);
  let bezierCurves = polyline2bezier(polyline);
  let dd = drawPath(bezierCurves);
  let d = dd.slice(0,-2);
  pathStringsArray.push(d + '"');
  console.log(pathStringsArray);
  let svg = ""
svg += '<?xml version="1.0" ?>\n'
svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xlink="http://www.w3.org/1999/xlink" baseProfile="full" height="584px" version="1.1" viewBox="0 0 100 100" width="600px">\n'
svg += '\t<defs/>\n'
svg += '\t<g id="kvg:StrokePaths_00065" style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;">\n'

console.log("Len: " + pathStringsArray.length);

for (let x = 0; x < pathStringsArray.length; x++) {
  svg += '\t<path id="kvg:00065-s1" '
  svg += pathStringsArray[x]
  svg += '/>\n'
}

console.log("DUBUG:");
console.log(pathStringsArray);

svg += '</svg>'

fs.writeFile('test.svg', svg, (err) =>{
  if (err) throw err;
  console.log('SVG written!');
});
});

//console.log(pathStringsArray);
});





