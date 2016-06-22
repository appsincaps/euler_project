function lattice(n) {
    var fac = (x,y) => x>y? x*fac(x-1,y) : y;
    return fac(2*n,n+1)/fac(n,2);
}

console.log(lattice(20));