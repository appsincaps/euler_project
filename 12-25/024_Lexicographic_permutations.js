function fact(n) {
    return n>1?n*fact(n-1):1;
}
function findF(n) { // find largest factorial less or equal than n
    var i=1, f=1;
    while (f<=n) f=fact(++i);
    return f/i;
}

// main part:
var num = '0123456789'.split(''), // create digit array
    n = 1000000-1, // n-th permutation, 0-indexed
    arr = []; // placeholder for the result
while (num.length > 0) { // iterating through num array
    var f=findF(n), i=Math.floor(n/f); // picking next digit for f-th permutation
    arr.push(num.splice(i,1));
    n = n%f;
}
console.log(arr.join(''));