function divisors(n) {
    var divs = [], 
        m = Math.sqrt(n),
        i = 1;
    while (i <= m) {
        if (n%i === 0) divs.push(i);
        ++i;
    }
    return divs;
}

function count(n) { // count positive integer solutions
    var divs = divisors(n),
        solutions = 0;
    divs.forEach(function(div) {
        var div2 = n/div,
            a = (div + div2) / 2;
        if (a%2 === 0) {
            var b = (div2 - div) / 2;
            if (b === 0 || b >= a/2) solutions += 1;
            else solutions += 2;
        }
    });
    return solutions;
}

for (var s=0,i=1; i<1e6; i++)
    if (count(i) === 10) s++;
console.log(s); // 4989
