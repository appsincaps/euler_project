function numberToArray(n) { // converts a number to array of digits
    return n.toString().split('').map(Number);
}
function arrayToString(a) { // converts an array of digits to a number string
    while (a[0] === 0) a.shift();
    return a.join('');
}
function isPalindrom(a) { // checks if number array is palindromic
    return arrayToString(a) === arrayToString(a.slice().reverse());
}
function add(n,m) { // adds arrays of digits like regular numbers
    var sum = [],
        nLen = n.length,
        mLen = m.length,
        len = Math.max(nLen,mLen);
    for (var i=0,c=0; i<len; i++) {
        var x=0,y=0;
        if (i<nLen) x = n[nLen-i-1];
        if (i<mLen) y = m[mLen-i-1];
        var z = x+y+c,
            c = ~~(z/10);
        sum[len-i-1] = z%10;
    }
    if (c>0) sum.unshift(c);
    return sum;
}
function isLychrel(n) { // goes through Lychrel steps 50 times
    n = numberToArray(n);
    for (var i=0; i<50; i++) {
        n = add(n,n.slice().reverse());
        if (isPalindrom(n)) return false;
    }
    return true;
}

for (var i=1,count=0; i<10000; i++) 
    if (isLychrel(i)) {count++;}
console.log(count); // 249