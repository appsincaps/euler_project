var N = 2e6, // target number
    fit = N, // fit metric
    best = 1, // best fit area
    max = Math.ceil(Math.sqrt(2*Math.sqrt(N)));
    
function count(n,m) { // number of rectangles
    return n*(n+1)*m*(m+1)/4;
}

for (var n=1,m=N; n<m; n++) {
    var c = 4*N/n/(n+1);
    m = ~~(Math.sqrt(1+4*c)/2-0.5);
    var a = m*n, f = Math.abs(count(n,m)-N);
    if (f < fit) {
        fit = f;
        best = a;
    }
}
console.log(best, fit); // 2772 2
