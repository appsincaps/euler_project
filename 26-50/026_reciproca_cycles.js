function oneOver(num) {
    var n=10, i=0, arr=[1], str='';
    while (!arr[n]) {
        arr[n] = ++i;
        str += ~~(n/num);
        n = (n%num)*10;
    }
    if (n === 0) 
        return {
            value: '0.'+str,
            length: 0 
        };
    i = arr[n]-1;
    return {
        number: num,
        value: '0.'+str.slice(0,i)+'(' + str.slice(i)+')',
        length: str.length - i 
    };
}

var max = oneOver(2);
for (var i=3; i<1000; i++) {
    var res = oneOver(i);
    if (max.length < res.length) max = res;
}
console.log(max.number, max.length);