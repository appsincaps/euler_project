var days = 0, count = 0,
    months = [31,28,31,30,31,30,31,31,30,31,30,31];
for (var year = 1901; year < 2001; year++)
    for (var month = 0; month < 12; month++) {
        days += months[month];
        if (month===1 && year%4===0) days++;
        if ((days+2)%7===0) count++;
    }
console.log(count);