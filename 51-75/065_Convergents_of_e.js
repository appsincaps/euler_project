// helpful few array methods
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

// represent numbers as arrays of digits
var fractions = [2], cd, temp, 
    n = [1], d = [0]; // n - numerator, d - denominator
    
// populate fractions array
for (var i=0; i<33; i++)
    fractions = fractions.concat(1,2*(i+1),1);
// calculate convergent
for (var i=99; i>=0; i--) {
    temp = n.times(fractions[i]).add(d);
    d = n;
    n = temp;
}
console.log(n.sum()); // 272
