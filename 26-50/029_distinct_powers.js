var n = 100, count = 0, done = [];
for (var a=2; a<=n; a++) {
    var doneToo = [];
    if (done[a]) continue;
    for (var c=1; c<=10; c++) {
        var x = Math.pow(a,c);
        if (x>n) continue;
        done[x] = true;
        for (var b=2; b<=n; b++) {
            var y = c*b;
            if (doneToo[y]) continue;
            doneToo[y] = true;
            count++;
        }
    }
}
console.log(count);