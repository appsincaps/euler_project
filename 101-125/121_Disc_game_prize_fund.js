function f(p,n,m) { // net probability of winning m-p blue disks
    if (n>m) return 0;
    if (p === 0) return 1;
    if (p === 1) return (n+m)*(m-n+1)/2;
    for (var s=0,i=n; i<=m-p+1; i++) s += i*f(p-1,i+1,m);
    return s;
}

function sums(max) {
    var limit = ~~((max-1)/2),
        sum = 0;
    for (var p=0; p<=limit; p++) {
        sum += f(p,1,max);
    }
    return sum;
}

function fact(n) {
    return n>1 ? n*fact(n-1) : 1;
}

var turns = 15,
    n = sums(turns),
    d = fact(turns+1);
console.log(~~(d/n)); // 2269
