// Load data from a file:
var fs = require('fs'),
    source = 'p105_sets.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(v=>v.split(',').map(Number));

// subset helper functions:
function sumSubset(a,n) { // make a subset sum
    if (n===1) return a;
    var arr = [], len = a.length-n+1;
    for (var i=0; i<len; i++) {
        var f = a[i],
            rest = sumSubset(a.slice(i+1),n-1).map(v=>f+v);
        arr = arr.concat(rest);
    }
    return arr;
}
//console.log(sumSubset(['a','b','c','d','e'],4));

function checkSet(a) {
    var sums = [a],
        max = a.length-1;
    for (var i=2; i<=max; i++) {
        var sub = sumSubset(a,i);
        if (sub.some((v,i)=>sub.indexOf(v,i+1)>-1))
            return false; // check subset inner uniqueness
        if (Math.max.apply(null,sums[i-2]) >= Math.min.apply(null,sub))
            return false; // check bigger subsets are larger
        sums[i-1] = sub;
    }
    return true;
}

function sum(a) {return a.reduce((x,y)=>x+y);}

// Main
for (var s=0, i=0; i<data.length; i++)
    if (checkSet(data[i])) s += sum(data[i]);

console.log(s); // 73702