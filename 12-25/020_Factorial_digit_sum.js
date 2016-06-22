function multiply(arr,x) {
    for (var p=0,i=0; i<arr.length; i++) {
        p += arr[i]*x;
        arr[i] = p%10;
        p = ~~(p/10);
    }
    while (p>0) {arr.push(p%10); p = ~~(p/10);}
    //console.log(arr);
    return arr;
}
function fact(n) {
    var num = [1];
    for (var i=2; i<=n; i++)
        num = multiply(num,i);
    return num;
}

var sum = fact(100).reduce((a,b)=>a+b);
console.log(sum);