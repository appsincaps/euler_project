var coins = [200,100,50,20,10,5,2,1], memo = [];
function combs(amount, length) { // number of change combinations for given amount
    if (memo[length] && memo[length][amount]) 
        return memo[length][amount];
    var change = coins.slice(length);
    if (amount === 0) return 1;  // only one combination - zeros for everything
    if (change.length === 1 ) {  // one coin left
        if (amount%change[0] === 0) return 1; // exact change
        else return 0;  // not exact (not necessary with 1 cents)
    }
    var nums = 0, largeOne = change[0]; // change order - large to small
    for (var n=0; n*largeOne<=amount; n++)
        nums += combs(amount-n*largeOne, length+1);
    if (!memo[length]) memo[length] = [];
    memo[length][amount] = nums;
    return nums;
}

function time(func, args) {
    var start = new Date();
    var result = func.apply(null, args);
    var stop = new Date();
    console.log('It took ' + (stop-start) + 'ms');
    console.log('The result is: ' + result);
}
time(combs, [1000,0]);