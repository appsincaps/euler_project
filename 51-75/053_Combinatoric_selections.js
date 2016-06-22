var min = 1e6, count=0;
for (var n=1; n<=100; n++) {
    for (var c=1,k=1; k<=n/2; k++) {
        var c = c*(n-k+1)/k;
        if (c>min) break;
    }
    if (c>min) count += n+1-2*k;
}
console.log(count) // 4075