// solution adapted from Wolfram Mathworld:

function continuedFraction(num) { // root(num) = whole + remainder, 1/remainder = whole + remainder ...
    var a=Math.floor(Math.sqrt(num)), // whole = a
        k=1, l=a, m=1, arr=[a], // remainder = (k*root-l)/m,
        result = {root: num, fractions: arr, answer:'['+a+';]', period: 0},
        memo = []; // to keep track of repeating patterns
    if (a*a === num) return result;
    var label = [a,k,l,m].join();
        memo.push(label);
    for (var i=1,j=-1; j<0; i++) { // loop over for the remainder
        a = Math.floor(m/(k*Math.sqrt(num)-l));
        var temp = k*k*num - l*l;
        k = m*k;
        l = a*temp-m*l;
        m = temp;
        var n = gcd(gcd(m,k),gcd(m,l)); // find common divider - not needed?
        k = k/n;
        l = l/n;
        m = m/n;
        label = [a,k,l,m].join();
        j = memo.indexOf(label),
        memo.push(label);
        arr.push(a);
    }
    result.fractions = arr.slice(0,-1);
    result.answer = '['+arr.slice(0,j).join()+';('+arr.slice(j,-1).join()+')]';
    result.period = i-j-1;
    return result; // an overkill - but makes it easier to debug
}
function gcd(x,y) { // greatest common divisor
    return y%x ? gcd(y%x,x) : x; 
}
function convergent(a,n) {
    var n0=1, n1=a[0], d0=0, d1=1, // n - numerator, d - denominator
        len = a.length,
        r = len%2 ? len-2 : 2*len-3;
        
    for (var i=1; i<=r; i++) {
        if (i>len-1) a[i] = a[(i-1)%(len-1)+1];
        var temp = n1;
        n1 = a[i]*n1 + n0;
        n0 = temp;
        //temp = d1;
        //d1 = a[i]*d1 + d0;
        //d0 = temp;
    }
    return n1; //[n1,d1] we only need the numerator
}

// main loop:
var maxD=0, maxX=[0];
for (var i=1; i<=1000; i++) {
    if (Math.sqrt(i)%1===0) continue;
    var x = convergent(continuedFraction(i).fractions);
    if (x > maxX) {maxX = x; maxD = i;}
}
console.log(maxX,maxD); // 1.6421658242965922e+37 661