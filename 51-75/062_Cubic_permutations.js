for (var i=100; i<10000; i++) { // top number is not important
    var cube = Math.pow(i,3),
        n = cube.toString().length,
        arr = []; // array for cubes with same number of digits
    while (cube.toString().length === n) {
        arr.push(cube);
        cube = Math.pow(++i,3);
    }
    var marr = arr.map(n=>n.toString().split('').sort().join(''));
    if (marr.some((n,i) => { // checking what cubes have same digits
            var num = 0,j=i;
            while (j>-1) {
                num++;
                j = marr.indexOf(n,j+1);
            }
            if (num >= 5) {// looking for 5 matching cubes
                console.log(arr[i]); // answer: 127035954683 - smallest of them
                return true;
            }
            return false;
    })) break;
}

console.log('done');