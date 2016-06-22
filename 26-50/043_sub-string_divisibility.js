// Need n-digit number scanner in decreasing order
var length, digits, num;
    
function set(len) {
    length = len; // number of digits (0 to 9)
    digits = Array.apply(null,Array(length)).map((_,i)=>length-i-1);
    num = digits.slice(); // number to play with
}

function next() { // add digits to number
    for (var i = length-2; i>=0; i--) {
        for (var n=num[i]-1; n>=0; n--)
            if (num.slice(i+1).indexOf(n)>-1) {
                num[i] = n;
                var temp = digits.slice(); // copy digits
                for (var j=0; j<=i; j++) // remove used digits
                    temp.splice(temp.indexOf(num[j]),1);
                for (var j=i+1; j<length; j++) { // append remaining
                    num[j] = temp.shift(); // in descending order
                }
                return num[0]>0; // if successful
            }
    }
    return false; // if no more numbers
}

function isDivisibe(a) {
    return a[3]%2 === 0 &&
           (a[2]+a[3]+a[4])%3 === 0 &&
           a[5]%5 === 0 &&
           (a[4]*100+a[5]*10+a[6])%7 === 0 &&
           (a[5]*100+a[6]*10+a[7])%11 === 0 &&
           (a[6]*100+a[7]*10+a[8])%13 === 0 &&
           (a[7]*100+a[8]*10+a[9])%17 === 0;
}

var sum = 0;
set(10);
do {
    if (isDivisibe(num)) 
        sum += +num.join('');
} while (next())

console.log(sum); // 16695334890