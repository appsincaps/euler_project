function generate(len) {
    var arr = [];
    for (var m=2;; m++) {
        var min = 1+m%2;
        if (2*m*(m+min) > len) break;
        for (var n=min; n<m; n+=2) {
            if (gcd(m,n)>1) continue; // this is the place i used break!
            var p = 2*m*(m+n);
            for (var k=1; k*p<=len; k++)
                arr[k*p] = (arr[k*p]||0) + 1;
        }
    }
    return arr;
}
function gcd(a,b) { // greatest common divisor
    while (b !== 0) {
       var t = b; 
       b = a % b; 
       a = t; 
    }
    return a;
}

console.log(generate(1500000).filter(v=>v===1).length); // 161667
