function af(x) {
    return 1/(1/x-1-x);
}

function check(k) {
    var m2 = 5*k*k+2*k+1, m = Math.round(Math.sqrt(m2));
    return m*m === m2;
}

function run(max) {
    var arr = [];
    for (var p=1,i=2; i<=max; i+=2) {
        if (check(i)) {
            arr.push(i);
            console.log(i/p); // 6.854102074621815
            p = i;
        }
        if (i%5 === 4) i--;
    }
    return arr;
}


//console.log(run(1e8)); // [ 2, 15, 104, 714, 4895, 33552, 229970, 1576239, 10803704, 74049690 ]

// load math.js (using node.js)
var math = require('mathjs');

// configure the default type of numbers as BigNumbers
math.config({
  number: 'BigNumber',  // Default type of number:
                        // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 24         // Number of significant digits for BigNumbers
});

function checkBig(k) {
    var k1 = math.bignumber(k),
        k5 = math.bignumber(k*5),
        m2 = math.add(math.multiply(k1,k5),2*k+1), 
        m = math.sqrt(m2);
    return math.number(math.mod(m,1)) === 0;
}

function runBig(max) {
    var arr = [];
    for (var p=1,i=2; i<=max; i+=1) {
        if (checkBig(i)) {
            arr.push(i);
            var t = Math.round(i*i/p - 7); // next target index
            p = i; // previous index saved
            if (i>700) i = t-1;
        }
    }
    return arr;
}

var a = runBig(2e12);
console.log(a[14]); // 1120149658760