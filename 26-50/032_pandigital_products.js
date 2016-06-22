var products = [];
function isPanda(a,b,c,d,e,f) {
    return (''+a+b+c+d+e+f).split('').sort().join('') === '123456789';
}
// first pandigital form: x * xxxx = xxxx
for (var a=2; a<9; a++) {
    if (a===5) continue;
    for (var b=1; b<=9; b++) {
        if (a===b) continue;
        for (var c=1; c<=9; c++) {
            if (a===c || b===c) continue;
            for (var d=1; d<=9; d++) {
                if (a===d || b===d || c===d) continue;
                for (var e=2; e<=9; e++) {
                    if (a===e || b===e || c===e || d===e || e===5) continue;
                    var product = a*(1000*b+100*c+10*d+e);
                    if (product<10000 && isPanda(a,b,c,d,e,product)) {
                        products.push(product);
                    }
                }
            }
        }
    }
}
// second pandigital form: xx * xxx = xxxx
for (var a=1; a<=8; a++) {
    for (var b=2; b<=9; b++) {
        if (a===b || b===5) continue;
        for (var c=1; c<=9; c++) {
            if (a===c || b===c) continue;
            for (var d=1; d<=9; d++) {
                if (a===d || b===d || c===d) continue;
                for (var e=2; e<=9; e++) {
                    if (a===e || b===e || c===e || d===e || e===5) continue;
                    var product = (10*a+b)*(100*c+10*d+e);
                    if (product<10000 && isPanda(a,b,c,d,e,product))
                        if (products.indexOf(product)<0) 
                            products.push(product);
                }
            }
        }
    }
}
console.log(products);
console.log(products.reduce((a,b)=>a+b));