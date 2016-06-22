function divSum(num) {
    var sum = 1,
        m = Math.round(Math.sqrt(num));
    if (m*m === num) sum += m;
    for (var i=2; i<m; i++) 
        if (num%i === 0) sum += i+num/i;
    return sum;
}

var arr = [];
for (var i=10; i<10000; i++) {
    if (arr.indexOf(i)<0) {
        var n = divSum(i);
        if (i !== n && i === divSum(n)) arr = arr.concat([i,n]);
    }
}
console.log(arr.reduce((a,b)=>a+b));