// helper functions for primes

var prime = function primeGen() { // prime generator
  
  var primes = [2,3,5], count = 0;
  function isPrime(n) {
    if (n%3===0) return false;
    var m = Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
  }
  
  function nextPrime() {
    var n = primes[primes.length-1]+2;
    while (!(isPrime(n))) n += 2;
    primes.push(n);
    return n;
  }
  
  return function(num) {
    while (num >= primes.length) nextPrime();
    return primes[num];
  };
}();

function isPrime(n) {
    var m = Math.ceil(Math.sqrt(n));
    for (var i=0; prime(i)<=m; i++) {
        if (n%prime(i) === 0) return false;
    }
    return true;
}

function isDifferent(n) {
  n = n.toString().split('').map(Number);
  return n.every((v,i)=>v&&n.indexOf(v,i+1)<0);
}

var m=[], o=0, p=prime(o); // array of sorted primes
while (p < 1e7) {
  if (isDifferent(p)) {
    var size = (''+p).length - 1;
    if (!m[size]) m[size] = [];
    m[size].push(p);
  }
  p = prime(++o);
}

// helper functions for making prime sets

function countPrimes(num,digits) { // one way to count prime sets
  var count = 0;
  if (digits.length === 1) {
    if (isPrime(Number(num+digits[0]))) count++;
  } else {
    for (var i=0; i<digits.length; i++) {
      var d = digits.slice();
      d.splice(i,1);
      count += countPrimes(num+digits[i],d);
    }
  }
  return count;
}

function count8() {
  var d = [1,2,3,4,5,6,7,8,9], count = 0;
  for (var i of m[0]) count += countPrimes('',reduce(d,i));
  return count;
}

function count7() {
  var d = [1,2,3,4,5,6,7,8,9], count = 0;
  for (var i of m[1]) count += countPrimes('',reduce(d,i));
  for (var i=0; i<m[0].length-1; i++) {
    for (var j=i+1; j<m[0].length; j++) {
      count += countPrimes('',reduce(d,m[0][i]+10*m[0][j]));
    }
  }
  return count;
}

function count6() {
  var d = [1,2,3,4,5,6,7,8,9], count = 0;
  for (var i of m[2]) {
    count += countPrimes('',reduce(d,i));
  }
  for (var i of m[1]) {
    for (var j of m[0]) {
      if (i.toString().indexOf(j.toString())<0) 
        count += countPrimes('',reduce(d,i*10+j));
    }
  }
  for (var i=0; i<m[0].length-2; i++) {
    for (var j=i+1; j<m[0].length-1; j++) {
        for (var k=j+1; k<m[0].length; k++) {
            count += countPrimes('',reduce(d,m[0][i]*100+m[0][j]*10+m[0][k]));
        }
    }
  }
  return count;
}

//console.log(count8()); // 11483
//console.log(count7()); // 10896
//console.log(count6()); // 9259

function filter(array,num) {
  num = num.toString();
  var check = (n) => n.toString().split('').every(x=>num.indexOf(x)<0);
  return array.filter(check);
}

function reduce(digs,num) {
  return filter(digs,num);
}

function add(digs,num) { // add digits from num to digs array
  num = num.toString().split('').map(Number);
  digs = digs.concat(num);
  return digs.sort();
}

function pick(a,num,digits,used) { // another way to count prime sets
  if (digits.length === 0 || (num === 1 && digits.every(n=>a.indexOf(n)>-1)))
    return 1;
  var sum = 0;
  if (num > 1) {
    while (a.length > 0) {
      var next = a.shift();
      sum += pick(filter(a,next),num,reduce(digits,next),add(used,next));
    }
    sum += pick(filter(m[num-2],used),num-1,digits,used);
  }
  return sum;
}

function pickTest(a,num,digits,used) {
  var arr = [];
  if (num > 1) {
    while (a.length > 0) {
      var next = a[0];
      a = a.slice(1);
      var rest = pickTest(filter(a,next),num,reduce(digits,next),add(used,next));
      if (rest.length>0) {
        arr = arr.concat(rest.map(v=>[next].concat(v)));
      }
    }
    rest = pickTest(filter(m[num-2],used),num-1,digits,used);
    if (rest.length>0) arr = arr.concat(rest);
  }
  
  if (num === 1 && digits.every(n=>m[0].indexOf(n)>-1)) 
    arr = arr.concat([digits]);
  return arr;
}

//var stock = [1,2,3,4,5,6,7,8,9];
//console.log(pick(m[6],7,stock,[])); // 4:3375, 5:13042, 6:22301, 7: 33197
// combination of two ways to count sets:
console.log(count8()+count7()+22301); // 44680

