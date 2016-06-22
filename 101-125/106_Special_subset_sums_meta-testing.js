function f(n,k) {
    var a=1,b=1;
    for (var i=0; i<k; i++) {
        a *= n-i;
        b *= i+1;
    }
    return a/b;
}

var a = [1,5,21,84,330],
    b = [4,6,4,2,0];
for (var s=0,i=0;i<5;i++) {
    s += a[i]*f(12,b[i]);
}
console.log(s); // 21384