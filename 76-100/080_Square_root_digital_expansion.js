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
Array.prototype.subtract = function(n) { // first attempt on subtraction, not guaranteed to work!
    var len = Math.max(n.length,this.length);
    for (var m=[],c=0,i=0; i<len; i++) {
        var k = (-n[i] || 0) + (this[i] || 0) + c;
        m[i] = k<0 ? k+10 : k;
        c = k<0 ? -1 : 0;
    }
    if (c<0) m.push(c);
    else while (m[m.length-1] === 0) m.pop();
    return m;
}
function numberToArray(n) { // converts a number to array of digits
    return n.toString().split('').reverse().map(Number);
}
function compare(a,b) {
    if (a.length !== b.length) return a.length>b.length?1:-1;
    for (var i=a.length; i>=0; i--)
        if (a[i] !== b[i]) return a[i]>b[i]?1:-1;
    return 0;
}
function sum(arr) {
    return arr.reduce((a,b)=>a+b);
}

// old Japanese square root method by Frazer Jarvis
function jRoot(num,precision) {
    var a = numberToArray(5*num), 
        b =[5], count=0;
    for (var i=0; count<precision; i++) {
        if (compare(a,b) < 0) { // rule 2
            a.unshift(0); a.unshift(0);
            b.splice(1,0,0);
            count++;
        } else { // rule 1
            a = a.subtract(b);
            b = b.add([0,1]);
        }
    }
    return b.slice(2);
}

for (var s=0,n=2; n<100; n++)
    if (Math.sqrt(n)%1>0)
        s += sum(jRoot(n,100));

console.log(s); // 40886

