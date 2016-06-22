// use arrays to represent large numbers
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

var count = 0, 
    f = [[1],[1]]; // represents fraction f[0]/f[1]
for (var i=0; i<1000; i++) {
    var n = f[0].add(f[1].times(2)), // nominator
        d = f[0].add(f[1]); // denominator
        f = [n,d];
        if (n.length > d.length) count++;
}

console.log(count); // 153