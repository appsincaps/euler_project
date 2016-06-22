var fullFractions = [], fractions = []; // to store valid fractions
for (var a=1; a<=9; a++) { // a,b and x - single digits
    for (var b=1; b<=9; b++) {
        if (a>=b) continue; // skip fractions >=1
        if (9*a*b%(10*a-b)===0) { // valid form 2: ax/xb
            var x = 9*a*b/(10*a-b); 
            if (x<10) fullFractions.push(''+a+x+'/'+x+b); // whole fractions
            if (x<10) fractions.push([a,b]); // part fractions
        }
        if (9*a*b%(10*b-a)===0) { // valid form 3: xa/bx (not needed)
            var x = 9*a*b/(10*b-a); 
            if (x<10) fullFractions.push([''+x+a+'/'+b+x]); // whole fractions
            if (x<10) fractions.push([a,b]); // part fractions
        }
    }
}
console.log(fullFractions); // [ '16/64', '19/95', '26/65', '49/98' ]
console.log(fractions); // check: [ [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 4, 8 ] ]

a = fractions.reduce((s,v)=>s*v[0],1); // multiply numerators: 8
b = fractions.reduce((s,v)=>s*v[1],1); // multiply denominators: 800

function gcd(x,y) { // greatest common denominator
    return y%x ? gcd(y%x,x) : x; 
}
var c = gcd(a,b); // 8
console.log(b/c); // 100


