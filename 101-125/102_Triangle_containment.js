// Load data from a file:
var fs = require('fs'),
    source = 'p102_triangles.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(v=>v.split(',').map(Number));

function getPoints(a) { // break into points
    var points = [];
    for (var i=0; i<3; i++)
        points.push([a[i*2],a[i*2+1]]);
    return points;
}

function getAngle(point) { // angle = 0 to 2*PI
    var angle = Math.atan2(point[1],point[0]);
    return angle >= 0 ? angle : angle + 2*Math.PI;
}

function origIn(points) { // checks if origin is inside by projecting sides on a circle
    var arc = [];
    for (var point of points) {
        arc.push(getAngle(point));
    }
    var diff = [];
    for (var i=0; i<arc.length-1; i++) {
        for (var j=i+1; j< arc.length; j++) {
            var d = Math.abs(arc[i] - arc[j]);
            if (d>Math.PI) d = 2*Math.PI - d;
            diff.push(d);
        }
    }
    diff.sort((a,b)=>a-b); // get smallest arcs
    return diff[0]+diff[1] >= Math.PI;
}

// Main:
var count = 0;
for (var i=0; i<data.length; i++)
    if (origIn(getPoints(data[i]))) count++; 
console.log(count); // 228