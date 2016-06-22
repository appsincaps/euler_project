function collatz(num) {
    var count = 0;
    while (num > 1) {
        num = num%2 ? 3*num+1 : num/2;
        count++;
    }
    return count;
}

var max = 0, n = 1;
for (var i=500000; i<1000000; i++) {
    var x = collatz(i);
    if (max < x) {max = x; n = i;}
}
console.log(n);