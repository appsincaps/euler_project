function solve(n) { // 'trial and error' solver
    var sols = [], i = 2;
    while (sols.length < n) {
        var k = 5*i + 7, m = Math.sqrt((k*k-44)/5);
        if (m%1 === 0) {
            console.log(i,m, k*k);
            sols.push(i);
        }
        i++;
    }
    return sols;
}
//var s = solve(10);
//console.log(s.slice(2).map((v,i)=>v/s[i]));

function gen(x1,x2) {return 7*x1-x2+7};

var arr = [2,5,21,42]; // first 4 solutions found previously via solve()
while (arr.length < 30) {
    var len = arr.length;
    arr.push(gen(arr[len-2],arr[len-4])); // rest found using recurrence
}
console.log(arr.reduce((a,b)=>a+b)); // 5673835352990