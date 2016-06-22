// Due to large powers (upto 10), ability to handle large numbers may be useful.
// load math.js to use with bignumbers and matrices

var math = require('mathjs');

function makeBigMatrix(m) { // convert normal matrix to bignumber matrix
    return m.map(row=>row.map(v=>math.bignumber(v.toString())));
}

function genX(n,x) { // make an array of n+1 features of powers of x
    for (var arr=[1],i=1; i<n; i++) 
        arr.push(Math.pow(x,i));
    return arr;
}

function genBigX(n,x) { // same with bignumbers
    for (var arr=[math.bignumber(1)],i=1; i<n; i++) 
        arr.push(math.bignumber(Math.pow(x,i)));
    return arr;
}

function genFunc(x) {  // sequence generating function
    for (var f=1,i=0; i<10; i++)
        f += Math.pow(-x,i+1);
    return f;
}

function solveBig(n) {
    var x = [], y = [];
    for (var i=0; i<n; i++) {
        x.push(genBigX(n,i+1));  // create x matrix with xi vectors for each yi
        y.push(math.bignumber(genFunc(i+1))); // // create y vector
    }
    var t = math.multiply(math.inv(x),y), // solve x*t = y for t
        nextX = genBigX(n,n+1); // next x(n+1) vector
    return math.multiply(nextX,t); // y(n+1) = x(n+1)*t (FIT)
}

function bigSolution() {
    var sum = math.bignumber(0);
    for (var i=0; i<10; i++)
        sum = sum.add(solveBig(i+1)); // add all FITs
    return sum.toNumber();
}

console.log(bigSolution()); // 37076114526

// trying normal numbers:

function solve(n) {
    var x = [], y = [];
    for (var i=0; i<n; i++) {
        x.push(genX(n,i+1));
        y.push(genFunc(i+1));
    }
    var t = math.multiply(math.inv(x),y),
        nextX = genX(n,n+1);
    return math.multiply(nextX,t);
}

function solution() {
    var sum = 0;
    for (var i=0; i<10; i++)
        sum += solve(i+1);
    return Math.round(sum);
}

console.log(solution()); // not as precise but it gets the same answer!

// another alternative I had in mind was to transform x's using offset by half-range,
// I checked it in matlab, but it turned out unnecessary.