function power(n) { // adapting to large number cases
    for (var count=0,i=1; i<10; i++) // no need to go above 9
        if (Math.pow(i/10,n) >= 0.1) count++;
    return count;
}

for (var cnt=0,n=1,p=power(n); p>0; p=power(++n)) cnt+=p;
console.log(cnt); // 49

