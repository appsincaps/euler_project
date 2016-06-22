function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

function numberToArray(n) { // converts number to array of digits
    return n.toString().split('').map(Number);
}

function arrayToNumber(a) { // converts array of digits to number
    return Number(a.join(''));
}

function next(a,n) { // slects the next set of indices
    var len = a.length; // a = array of indices, n = max index
    for (var i=0; i<len; i++)
        if (a[len-1-i] < n-i) {
            var v = ++a[len-1-i];
            for (var j=0; j<i; j++)
                a[len-i+j] = ++v;
            return a;
        }
    return false;
}

// ****** - number of length size (max size=6)
// ***ddd - ddd is the fixed part of the number of size 'len'
// xdxxdd - x's are digits (0-9) in various positions, 'j = size-len'
// the number has to be a prime, so the last digit is odd

var memo=[], 
    primeSequence = 8,
    max = 6; // maximum number of digits in a number
    
for (var i=1; i<10000; i+=2) { // starting number in the fixed part
    var n = numberToArray(i),
        len = n.length;
    for (var j=1; j<=max-len; j++) { // filling digits indices
        var ind = Array.apply(null,Array(j)).map((_,i)=>i);
        while (ind) { // changing digits positions by varying indices
            var ncopy = n.slice(),
                numberArray = [],
                num = []; // final number
            for (var k=len+j-1; k>=0; k--)
                if (ind.indexOf(k)<0) num[k]=ncopy.pop();
            for (var total=0,m=0; m<=9; m++) {
                if (m===0 && ind[0]===0) continue;
                for (var f of ind) num[f]=m;
                var number = arrayToNumber(num);
                if (isPrime(number)) { 
                    total++;
                    numberArray.push(number);
                }
            }
            if (total >= primeSequence) memo.push(numberArray);
            ind = next(ind,j+len-2); // max index = j+len-2 (last digit is odd)
        }
    }
}

console.log(memo); //[[ 121313, 222323, 323333, 424343, 525353, 626363, 828383, 929393 ]]