function powerDigitSum(x,y) { // small x (<10?)
    var multiply = function(arr,n) {
            for (var i=0,co=0; i<arr.length; i++) {
                var m = arr[i]*n;
                arr[i] = m%10 + co;
                co = ~~(m/10);
            }
            if (co) arr.push(co);
            return arr;
        },
        res = [1];
    
    for (var i=0; i<y; i++) 
        res = multiply(res,x);
        
    return res.reduce((a,b)=>a+b);
}

console.log(powerDigitSum(2,1000));
