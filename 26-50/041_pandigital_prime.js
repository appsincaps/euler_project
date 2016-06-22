// Use n(n+1)/2 to find that only 7-digit and 4-digit
// pandigital numbers are not divisible by 3

function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

// Need n-digit number scanner in decreasing order
var length, digits, num;
    
function set(len) {
    length = len; // number of digits (4 or 7)
    digits = Array.apply(null,Array(length)).map((_,i)=>length-i);
    num = digits.slice(); // number to play with
}

function next() { // add digits to number
    for (var i = length-2; i>=0; i--) {
        for (var n=num[i]-1; n>0; n--)
            if (num.slice(i+1).indexOf(n)>-1) {
                num[i] = n;
                var temp = digits.slice(); // copy digits
                for (var j=0; j<=i; j++) // remove used digits
                    temp.splice(temp.indexOf(num[j]),1);
                for (var j=i+1; j<length; j++) { // append remaining
                    num[j] = temp.shift(); // in descending order
                }
                return true; // if successful
            }
    }
    return false; // if no more numbers
}

set(7);
do {
    var number = Number(num.join(''));
    if (isPrime(number)) break;
} while (next());
console.log(number); // 7652413
