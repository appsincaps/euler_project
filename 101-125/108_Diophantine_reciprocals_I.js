function divisors(n) {
    var divs = [],
        max = Math.sqrt(n);
    if (max%1 === 0) divs.push(max);
    for (var i=1; i<max; i++) 
        if (n%i === 0) {
            divs.push(i);
            divs.push(n/i);
        }
    return divs.sort((a,b)=>a-b);
}

function factors(n) { // return number of prime factors
    var facts = [], i = 2;
    while (n > 1) {
        var m = 0;
        while (n%i === 0) {
            m++;
            n /= i;
        }
        if (m > 0) facts.push([i,m]);
        i++;
    }
    return facts;
}

function numberOfDivsSquare(n) {
    var num = 1, facts = factors(n);
    for (var fact of facts)
        num *= 1 + 2*fact[1];
    return num;
}

function countParts(x) { // x is number of prime factors in a number
    return Math.pow(2,x-1);
}

function reciprocals(n) {
    var divs = divisors(n), count = 0;
    for (var div of divs) {
        count += countParts(factors(div).length);
    }
    return count;
}

/*
for (var n=100000; n<1000000; n++) {
    if (reciprocals(n) > 1000) break;
}
console.log(n); // 180180
*/

for (var n=4; n<1000000; n++) {
    if (Math.ceil((numberOfDivsSquare(n)+1)/2) > 1000) break;
}
console.log(n); // 180180