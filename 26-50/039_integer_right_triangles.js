var solutions = [];
for (var p = 12; p<1000; p+=2) {
    var sol = [], m = p*(1-Math.SQRT1_2); //m limits a<b
    for (var a = 1; a<m; a++)
        if ((p*(p-2*a))%(2*(p-a))===0) 
            sol.push([p,a,p*(p-2*a)/2/(p-a),(p-a)/2+a*a/2/(p-a)]);
    if (solutions.length < sol.length)
        solutions = sol;
}
//console.log(solutions);
console.log(solutions.length); // 8
console.log(solutions[0][0]); // 840
