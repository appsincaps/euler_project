function mult(x,y) {
    return (x*y)%z;
}

var sum = 0, z = 1e10;
for (var n=1; n<=1000; n++) {
    var p = 1;
    for (var i=1; i<=n; i++)
        p = mult(p,n);
    sum = (sum + p) % z;
}

console.log(sum); // 9110846700