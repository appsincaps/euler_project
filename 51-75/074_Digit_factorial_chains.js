function f(x) {
    return x>1 ? x*f(x-1) : 1;
}
var facts = []; // list of first 10 factorials
for (var i=0; i<10; i++) 
    facts.push(f(i));
//console.log(facts); // [ 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880 ]

function sum(n) { // number conversion through the sum if its digits factorials
    return n.toString().split('').reduce((s,v)=>s+facts[+v],0);
}

var longLoops = [];
for (var n=1; n<1000000; n++) {
    var a=[],loop=0,num=n;
    do {
        a[num] = true;
        num = sum(num);
        loop++;
    } while (!a[num])
    if (loop===60) longLoops.push(n);
    if (loop>60) {console.log(n); break;} // checks if indeed there are no loops >60
}
console.log(longLoops.length); // 402