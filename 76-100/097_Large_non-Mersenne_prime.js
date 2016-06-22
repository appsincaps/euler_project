var a = 28433, // form n = a*2^b + 1
    b = 7830457,
    p = 1e10, 
    m = Math.pow(2,20); 
while (b > 20) {
    b -= 20;
    a = (a*m)%p;
}
var n = (a*Math.pow(2,b) + 1)%p;
console.log(n); // 8739992577