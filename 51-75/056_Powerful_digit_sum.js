Array.prototype.sum = function() {return this.reduce((a,b)=>a+b)};
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

// represent numbers as arrays of digits
var sums = [];
for (var i=99; i>90; i--) { // check only the top of the range
    for (var j=99; j>90; j--)
        sums.push(numberToArray(j).power(i).sum());
}
console.log(Math.max.apply(this,sums)); // 972