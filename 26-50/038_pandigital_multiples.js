function panMult() { // checks 9xxx combinations multiplied by (1,2)
    for (var a=8; a>1; a--) {
        for (var b=8; b>0; b--) {
            if (a !== b) {
                for (var c=8; c>0; c--) {
                    if (a !== c && b !== c) {
                        var num = (9*1000+a*100+b*10+c)*100002;
                        if (check(num)) return num;
                    }
                }
            }
        }
    }
}

function check(num) { //checks if there are no repeat digits and 0s
    return !/(\d)\d*\1|0/.test(num.toString());
}

console.log(panMult()); // 932718654