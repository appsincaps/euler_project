// cuboid with sides a, b and c has three potential shortest paths:
// sqrt(a^2+(b+c)^2), sqrt(b^2+(a+c)^2) and sqrt(c^2+(b+a)^2)
// if a<=b<=c, then the shortest is sqrt(c^2+(b+a)^2)

/*
var count=0, M=100; // max
for (var a=1; a<=M; a++) { // check M=100 count
    for (var b=1; b<=a; b++) {
        for (var c=1; c<=b; c++) {
            var x = Math.sqrt(a*a+(b+c)*(b+c));
            if (x%1 === 0) count++;
        }
    }
}
console.log(count); // 2060 
*/

for (var count=0,a=1; count<1e6; a++) {
    for (var b=1; b<=a; b++) {
        for (var c=1; c<=b; c++) {
            var x = Math.sqrt(a*a+(b+c)*(b+c));
            if (x%1 === 0) count++;
        }
    }
}
console.log(a-1,count); // 1818 1000457