function generateN(n) { // returns a function to produce arrays of size n, 
                        // which sum up to numbers divisble by n
    var f = function(a,count,sum) {
        sum = sum || 0;
        if (count === 0 || count > a.length) return [];
        var arr = [];
        for (var i=0; i<a.length-count+1; i++) {
            var picks, x = a[i];
            if (count === 1) {
                if ((sum+a[i])%n === 0) arr.push([a[i]]);
            } else {
                picks = f(a.slice(i+1),count-1,sum+x);
                arr = arr.concat(picks.map(v=>[x].concat(v)));
            }
        }
        return arr;
    }
    return f;
}

function complimentary(a,b) { // makes a complimetary array
    return a.filter(v=>b.indexOf(v)<0);
}

function checkSum(a,sum) { // checks if there are two numbers in a that add up to sum
    var arr = [];
    for (var i=0; i<a.length-1; i++) {
        for (var j=i+1; j<a.length; j++) {
            if (a[i]+a[j] === sum) arr.push([a[i],a[j]]);
        }
    }
    return arr;
}

var n = 5;
var pick5 = generateN(n);
var nums = [10,9,8,7,6,5,4,3,2,1];
var arr = pick5(nums.slice(1),n-1,0).map(v=>[10].concat(v)); // generates external nodes
// 10 must be one of the external nodes

var res = [];
for (var e of arr) {
    var sol = [];
    var comp = complimentary(nums,e); // internal nodes
    var sum = comp.reduce((x,y)=>x+y)/5 + 11;
    if (sum > 17) continue; // impossible to make sums > 17
    if (!e.every(function(v) {
        var check = checkSum(comp,sum-v);
        sol.push(check);
        return check.length > 0;
    })) continue;
    console.log(e);
    console.log(sol);
    res.push(sol);
}

/*
[ 10, 9, 8, 7, 6 ]
[ [ [ 3, 1 ] ],
  [ [ 4, 1 ], [ 3, 2 ] ],
  [ [ 5, 1 ], [ 4, 2 ] ],
  [ [ 5, 2 ], [ 4, 3 ] ],
  [ [ 5, 3 ] ] ]
[ 10, 8, 6, 4, 2 ]
[ [ [ 5, 1 ] ],
  [ [ 7, 1 ], [ 5, 3 ] ],
  [ [ 9, 1 ], [ 7, 3 ] ],
  [ [ 9, 3 ], [ 7, 5 ] ],
  [ [ 9, 5 ] ] ]
  
the first one produces a larger number:
653_1031_914_842_725
*/