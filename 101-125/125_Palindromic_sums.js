function isPalindrome(n) {
    return n === +n.toString().split('').reverse().join('');
}
function sum(n) { // sum of squares
    return n*(n+1)*(2*n+1)/6;
}

var p = [],
    limit = 1e8,
    max = ~~Math.sqrt(limit/2);
for (var n=1; n<=max; n++) {
    for (var m=2;; m++) {
        var s = sum(n+m-1) - sum(n-1);
        if (s>=limit) break;
        if (isPalindrome(s) && p.indexOf(s)<0) p.push(s);
    }
}
console.log(p.reduce((a,b)=>a+b)); // 2906969179