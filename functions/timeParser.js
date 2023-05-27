export function timeParser(timestamp) {
    let [date, time] = timestamp.split(' ');

    // console.log(date);
    
    let [year, month, day] = date.split('-');
    day = parseInt(day)
    let [hour, minute, second] = time.split(':');

    // Get Month Name
    switch(parseInt(month)) {
        case 1:
            month = 'Jan';
            break;
        case 2:
            month = 'Feb';
            break;
        case 3:
            month = 'Mar';
            break;
        case 4:
            month = 'Apr';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'Jun';
            break;
        case 7:
            month = 'Jul';
            break;
        case 8:
            month = 'Aug';
            break;
        case 9:
            month = 'Sep';
            break;
        case 10:
            month = 'Oct';
            break;
        case 11:
            month = 'Nov';
            break;
        case 12:
            month = 'Dec';
            break;
    }

    // Ordinal Day
    if(parseInt(day) > 3 && parseInt(day) < 21) {
        day = `${day}th`;
    } else {
        switch(day % 10) {
            case 1:
                day = `${day}st`;
            case 2:
                day = `${day}nd`;
            case 3:
                day = `${day}rd`;
            default:
                day = `${day}th`;
        }
    }

    // Create Date
    date = `${day} ${month} ${year}`;

    // Get Meridiem And Hour
    let meridiem = '';

    if(parseInt(hour) > 12) {
        meridiem = 'pm';
        hour = (Math.abs(parseInt(hour) - 12)).toString();
    } else {
        meridiem = 'am';
        hour = (parseInt(hour)).toString();
    }

    // Create Time
    time = `${hour}:${minute} ${meridiem}`;

    let date_and_time = {
        date: date,
        time: time,
    }

    return date_and_time;
}