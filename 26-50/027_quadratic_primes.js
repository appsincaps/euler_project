function f(n,a,b) {
    return n*n + a*n + b;
}
function isPrime(n) {
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}
function countPrimes(a,b) {
    var i = 0;
    while (isPrime(f(i,a,b))) i++;
    return i;
}
var max = 0, ans = [];
for (var b=41; b<1000; b+=2) {
    for (var a=-999; a<1000; a+=2) {
        var count = countPrimes(a,b);
        if (max < count) {
            max = count;
            ans = [a,b];
        }
    }
}
console.log(max, ans, ans[0]*ans[1]);