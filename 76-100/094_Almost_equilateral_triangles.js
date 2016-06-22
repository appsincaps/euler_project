// helpful array methods
Array.prototype.add = function(n) {
    var len = Math.max(n.length,this.length);
    for (var m=[],c=0,i=0; i<len; i++) {
        var k = (n[i] || 0) + (this[i] || 0) + c;
        m[i] = k % 10;
        c = ~~(k/10);
    }
    if (c>0) m.push(c);
    return m;
}
Array.prototype.times = function(x) {
    var len = this.length;
    for (var m=[],c=0,i=0; i<len; i++) {
        var k = this[i]*x + c;
        m[i] = k % 10;
        c = ~~(k/10);
    }
    while (c>0) {
        m.push(c%10);
        c = ~~(c/10);
    }
    return m;
}
Array.prototype.mag = function(x) {
    for (var i=0; i<x; i++)
        this.unshift(0);
    return this;
}
Array.prototype.mult = function(n) {
    var res = [0], len = n.length;
    for (var i=0; i<len; i++) {
        var p = this.times(n[i]);
        res = res.add(p.mag(i));
    }
    return res;
}
Array.prototype.power = function(x) {
    var res = [1], p = this.slice();
    for (var i=0; i<x; i++)
        res = res.mult(p);
    return res;
}

function numberToArray(n) { // converts a number to array of digits
    return n.toString().split('').reverse().map(Number);
}

function arrayToNumber(a) { // converts array number to string
    return a.reverse().join('');
}

function findX(p,c) {
    var x = 1,
        y = x*(20*p+x);
    while (y<=c) {
        x++;
        y = x*(20*p+x);
    }
    return x-1;
}

function isSquare(n) { // digit-by-digit square root algorithm
    if ([2,3,7,8].indexOf(n[0])>-1) return false;
    if (n.length%2 >0) n.push(0);
    var n = n.slice().reverse(),
        len = n.length/2;
    for (var arr=[],i=0; i<len; i++) // split n into digit pairs
        arr.push(+n.slice(i*2,(i+1)*2).join(''));
    len = arr.length;
    var c = 0, p = 0;
    for (var i=0; i<len; i++) {
        c = c*100 + arr[i];
        var x = findX(p,c);
        c = c - x*(20*p+x);
        p = 10*p + x;
    }
    return c === 0;
}

var M = 1e9, n=1, sum=0, flag=1, a, p, num;

while (true) {
    p = flag>0 ? 6*n + 4 : 6*n + 2; // flag for switching between odd and even squares
    if (p>M) break;
    num = numberToArray(n); // use arrays to represent numbers (needed only for the last solution)
    a = flag>0 ? num.times(3).add([2]).mult(num) : num.times(3).add([1]).mult(num.add([1]));
    if (isSquare(a)) {
        //console.log(n,arrayToNumber(a));
        sum += p;
        flag = -flag;
        n = ~~(n*3.73); // fudge factor ~ ratio between successive solutions
    }
    //if (n%100000===0) console.log(n,p,sum);
    n++;
}

console.log(sum); // 518408346
