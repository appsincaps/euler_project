var seed = [1,2,3,5,7,9], // seed digits used add left or right
    left = [2,3,5,7], // starting array of prime numbers
    right = left,
    tPrimes = []; // taken from intersection of left and right
    
function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}
    
function add(arr,dir) { // left: dir = false, right: dir = true
    var a = [], 
        p = dir ? 0 : arr[0].toString().length,
        k = dir ? 10 : 1;
    for (var n of arr) {
        for (var i of seed) {
            var num = i*Math.pow(10,p) + n*k;
            if (isPrime(num)) a.push(num);
        }
    }
    return a; // return new array of primes
}
while (left.length>0 && right.length>0) {
    left = add(left,0); // build from adding on left
    right = add(right,1); // build from adding on right
    for (var n of right)
        if (left.indexOf(n)>-1)
            tPrimes.push(n);
}
console.log(tPrimes);
console.log(tPrimes.reduce((a,b)=>a+b));