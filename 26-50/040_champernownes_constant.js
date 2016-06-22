// Champernowne's constant == .123456789101112131415...
for (var ref=[1],i=1; i<=6; i++) { // helper array
    ref.push(ref[i-1]+i*9*Math.pow(10,i-1));
}
//console.log(ref); // [ 1, 10, 190, 2890, 38890, 488890, 5888890 ]
// ref array marks starts of 1-digit, 2-digit, etc sections

function digit(n) {
    if (n===1) return 1;
    for (var i=0; ref[i]<n && i<ref.length; i++) {}
    n -= ref[i-1]; // subtract indices of smaller-digit numbers
    var num = ~~(n/i)+Math.pow(10,i-1); // calculate indexed number
    return +num.toString()[n%i]; // pick the right digit
}
var p = 1;
for (var i=0; i<=6; i++) {
    var n = Math.pow(10,i),
        d = digit(n); // 1, 1, 5, 3, 7, 2, 1
    p *= d;
}

console.log(p); // 210
