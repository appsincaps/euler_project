function digits(n) {
    return n.toString().split('').sort().join('');
}

var result;
for (var z=1; z<=6; z++) {
    var f = Math.pow(10,z);
    for (var i=0; i<f; i++) {
        if (6*i >= 4*f) break;
        var num = f+i,
            d = digits(num);
        if (digits(2*num) !== d || digits(3*num) !== d ||
            digits(4*num) !== d || digits(5*num) !== d ||
            digits(6*num) !== d) continue;
        result = num;
        break;
    }
    if (result) break;
}
console.log(num); // 142857