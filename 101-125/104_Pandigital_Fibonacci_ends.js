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

function check(arr) { // checks if starts and ends with 1-9
    var nums = '123456789',
        start = arr.slice(0,9).sort((a,b)=>a-b).join(''),
        end = arr.slice(-9).sort((a,b)=>a-b).join('');
    if (start === nums && end === nums) 
        return true;
    else return false;
}

var a1 = [1], a2 = [1]; // use arrays as big integers
for (var i=3; i<1000000; i++) {
    var t = a1.add(a2);
    if (check(t)) break;
    a1 = a2;
    a2 = t;
}
console.log(i,'done'); // 329468