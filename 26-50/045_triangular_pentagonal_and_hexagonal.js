function hexagon(x) { // hexagon number x
    return x*(2*x-1);
}

function isTriangular(x) { // checks if x is triangular
    return (Math.sqrt(8*x+1)-1)/2 % 1 === 0;
}

function isPentagonal(x) { // checks if x is pentagonal
    return (Math.sqrt(24*x+1)+1)/6 % 1 === 0;
}

for (var n=144; n<100000; n++) {
    var h = hexagon(n);
    if (isTriangular(h) && isPentagonal(h)) break;
}
console.log(n,h); // 27693 1533776805