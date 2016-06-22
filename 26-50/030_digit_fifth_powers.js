for (var i=0,powers=[]; i<10; i++) // calculate powers in advance
    powers.push(Math.pow(i,5));

var arr = [];
for (var n=2; n<295245; n++) { // limit to 295245 = (9^5)*5
    var m = n.toString().split('').reduce((s,v)=>s+powers[v],0);
    if (m === n) arr.push(n);
}
console.log(arr);
console.log(arr.reduce((a,b)=>a+b));