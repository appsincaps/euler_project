// Load data from a file:
var fs = require('fs'),
    source = 'p099_base_exp.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(v=>v.split(',').map(Number));


var max = data[0], line = 1,
    len = data.length;

for (var i=1; i<len; i++) {
    var n = data[i];
    if (Math.log(n[0])/Math.log(max[0])*(n[1]/max[1]) > 1) {
        max = data[i]; line = i+1;
    }
}
console.log(max, line); // [ 895447, 504922 ] 709