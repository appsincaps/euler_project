function spiral(size) {
    var n = (size-1)/2;
    return 1 + 4*n + n*(n+1)*(6+8*(2*n+1))/3;
}
console.log(spiral(1001));