var n = 1, d = 1; // convergent fractions for sqrt(2)
for (var i=0; i<40; i++) {
    var t = n + 2*d; // nominator
        d = n + d;  // denominator
        n = t;
    var x = (d+1)/2, // blue disks
        y = (n+1)/2;
    if (y>1e12) break;
}
console.log(x); // 756872327473