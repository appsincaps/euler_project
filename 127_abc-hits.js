var rad = [0,1]; 
function seed(m) { // calculate rads for m numbers
    for (var i=2; i<m; i++)
        if (!rad[i]) {
            for (var j=i; j<m; j+=i)
                rad[j] = (rad[j]||1)*i;
        }
}

function gcd(a,b) { // greatest common divisor
    while (b !== 0) {
       var t = b; 
       b = a % b; 
       a = t; 
    }
    return a;
}

function abc(m) {
    seed(m);
    var hits = [];
    for (var a = 1; a < m/2; a++) {
        var aRad = rad[a];
        for (var b = a+1; a+b < m; b++) {
            var bRad = rad[b];
            if (gcd(aRad,bRad) === 1) {
                var c = a + b,
                    cRad = rad[c];
                if (aRad*bRad*cRad < c) {
                    if (gcd(cRad,bRad) === 1 && gcd(aRad,cRad) === 1) hits.push([a,b,c]);
                }
            }
        }
        if (a%1000===0) console.log(a,hits.length);
    }
    return hits;
}
var hits = abc(120000);
console.log(hits.length); // 456
console.log(hits.reduce((s,v)=>s+v[2],0)); // 18407904