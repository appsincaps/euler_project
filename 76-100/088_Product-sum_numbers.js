// step through numbers starting at 4: num = num + 1
// break into prime factors: factors(num)->[[p(i),n(i)],...]
// if the only factor is the number itself, store as prime and continue
// otherwise start generating multiplier sets from all factors:
// function mult([factors])->[[a(1),a(2)...a(k)],...]
// each multiplier set satisfies product-sum condition:
// product(a(1)...a(k)) = sum(a(1)...a(k)) + (n-k)
// n is number of elements in a sum
// k is number of multipliers
// n-k is number of 'ones' in a sum
// N=product(a(1)...a(k)) is the product-sum number
// if N(n) is the first number with length n, 
// set memo[n] = N(n) and/or memo[N] = true and/or memo.push(N)
// if n<=12000, sum += N; continue until N=2*max
// answer = sum

var primes = [2,3,5,7,11]; // used to store primes

function factors(num) { // note: works well when called with sequential numbers
    var i=0, arr = [];
    while (num>1) {
        var p = primes[i];
        if (!p) break;
        if (num%p===0) {
            var a = [p,0];
            while (num%p===0) {
                num /= p;
                a[1]++;
            }
            arr.push(a);
        }
        i++;
    }
    if (arr.length === 0) {
        primes.push(num);
        arr[0]=[num,1];
    }
    return arr;
}

function divisors(facts) { // returns array of all divisors
    if (facts.length === 0) return [1];
    var fs = facts.slice(),
        f = fs.pop(),
        p = f[0], n = f[1],
        divs = [],
        m = divisors(fs);
    for (var i=0; i<=n; i++) 
        divs = divs.concat(m.map(v=>v*Math.pow(p,i)));
    return divs.sort((a,b)=>a-b);
}

function mult(num,divs) { // breaks a number into multiplier combinations
    if (num === 1) return [1];
    if (divs.length === 0) return [];
    var ds = divs.slice(),
        div = ds.pop(),
        n = [], mults = mult(num,ds);
    while (num >= 1) {
        n.push(div);
        num /= div;
        if (num%1 > 0) break;
        var m = mult(num,ds);
        if (m.length>0) m = m.map(a=>n.concat(a));
        mults = mults.concat(m);
    }
    return mults;
}

function multipliers(num) {
    var fs = factors(num),
        divs = divisors(fs);
    divs = divs.slice(1,-1);
    return mult(num,divs);
}

function prodsum(num) {
    var mults = multipliers(num),
        ps = [];
    for (var m of mults) {
        var sum = m.reduce((a,b)=>a+b);
        ps.push(num-sum+m.length);
    }
    return ps;
}

var N = 12000, // max n
    memo_N = [0,0], // set N's (i=N)
    sum = 0; // sum for all product-sum numbers with set N
    
for (var num=4; num<=2*N; num++) { // max num for N = 2N
    var arr = prodsum(num),
        check = false;
    for (var ps of arr) {
        if (ps<=N && !memo_N[ps]) {
            memo_N[ps] = num;
            check = true;
        }
    }
    if (check) sum += num; // minimum number for at least one N
}

console.log(sum); // 7587457
