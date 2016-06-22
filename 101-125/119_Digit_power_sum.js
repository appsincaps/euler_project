function check(i,n) {
    return i === n.toString().split('').reduce((s,v)=>+v+s,0);
}

function findMin(iMin,a) {
    var min = a[iMin], x = iMin;
    for (var i=iMin+1; i<a.length; i++) {
        if (a[i]<min) {min=a[i]; x=i;}
    }
    return {index: x, value: min};
}

function update(a,i) {
    a[i] = (a[i]||(i+2))*(i+2);
}

// Main:

var powerSums = [], min = 0,
    next = []; // next power: [2^x,3^y,4^z,...]
    
update(next,0); // seed
while (powerSums.length < 30) {
    var n = findMin(min,next);
    if (check(n.index+2,n.value)) {
            console.log(powerSums.length+1,n.index+2,Math.round(Math.log(n.value)/Math.log(n.index+2)),n.value);
            powerSums.push(n.value);
    }
    if (n.index === next.length-1) {
        next[n.index+1] = (n.index+3)*(n.index+3); // update(next,n.index+1);
        if (n.index > 7) next[n.index+1] *= (n.index+3);
        if (n.index > 27) next[n.index+1] *= (n.index+3);
    }
    next[n.index] *= n.index+2; // update(next,n.index);
    if (n.index === min && (next[min].toString().length-1)*2 > min+2) {
        min++;
    }
}
console.log(powerSums[powerSums.length-1]); // 248155780267521