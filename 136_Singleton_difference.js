function sieve(m) {
    var solutions = [], // number of solutions for each n
        mdiv = Math.sqrt(m);
    for (var div=1; div<=mdiv; div++) {
        for (var div2=div, n=div*div2; n<m; n=div*(++div2)) {
            var a = (div + div2)/2;
            if (a%2 === 0) {
                var b = (div2 - div) / 2;
                if (b === 0 || b >= a/2) solutions[n] = (solutions[n] || 0) + 1;
                else solutions[n] = (solutions[n] || 0) + 2;
            }
        }
    }
    return solutions;
}

console.log(sieve(5e7).filter(v=>v===1).length); // 2544559