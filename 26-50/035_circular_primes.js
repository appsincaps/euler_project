function isPrime(n) {
    if (n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}
function isCircularPrime(a) {
    for (var i=0; i<a.length; i++) {
        var num = a.slice(i).concat(a.slice(0,i)).join('');
        if (!isPrime(Number(num))) return false;
    }
    return true;
}

var cPrimes = [2,3,5,7], // single digit primes to start with
    digits = [1,1], // digits of a number
    next = function() {
        var i = digits.length-1;
        while (i>=0 && digits[i]===9) i--;
        if (i>=0) digits[i] += 2; // no even numbers!
        else {i++; digits.unshift(1);}
        for (var j=i+1; j<digits.length; j++)
            digits[j] = 1;
    };
while (digits.length<7) {
    if (isCircularPrime(digits)) 
        cPrimes.push(+digits.join(''));
    next();
}

console.log(cPrimes.length); // 55
