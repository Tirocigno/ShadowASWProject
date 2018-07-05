function extractDateFromString(dateBikeTaken, timeBikeTaken) {
    let dayTaken = '';
    let monthTaken = '';
    let yearTaken = '';
    let hourTaken = '';
    let minutesTaken = '';
    let day = false;
    let month = false;
    let year = false;
    let hour = false;
    let minutes = false;
    let pm = false;
    let i;
    for (i = 0; i < dateBikeTaken.length; i++) {
        if (dateBikeTaken[i] !== '/' && !month) {
            monthTaken += dateBikeTaken[i];
        } else if (dateBikeTaken[i] === '/' && !month) {
            month = true;
        } else if (dateBikeTaken[i] !== '/' && !day) {
            dayTaken += dateBikeTaken[i];
        } else if (dateBikeTaken[i] === '/' && !day) {
            day = true;
        } else if (dateBikeTaken[i] !== '/' && !year) {
            yearTaken += dateBikeTaken[i];
        } else if (dateBikeTaken[i] === '/' && !year) {
            year = true;
        }
    }
    for (i = 0; i < timeBikeTaken.length; i++) {
        if (timeBikeTaken[i] !== ':' && !hour) {
            hourTaken += timeBikeTaken[i];
        } else if (timeBikeTaken[i] === ':' && !hour) {
            hour = true;
        } else if (timeBikeTaken[i] !== 'A' && timeBikeTaken[i] !== 'P' && !minutes) {
            minutesTaken += timeBikeTaken[i];
        } else if (timeBikeTaken[i] === 'A' || timeBikeTaken[i] === 'P') {
            minutes = true;
        }
        if (timeBikeTaken[i] === 'P') {
            pm = true;
        }
    }
    let dayInt = parseInt(dayTaken);
    let monthInt = parseInt(monthTaken);
    let yearInt = parseInt(yearTaken);
    let hourInt = parseInt(hourTaken);
    let minutesInt = parseInt(minutesTaken);
    if (hourInt < 12 && pm) {
        hourInt += 12;
    } else if (hourInt === 12 && !pm) {
        hourInt = 0;
    }
    return new Date(yearInt, monthInt, dayInt, hourInt, minutesInt);
}

function diff_minutes(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export default function calculatePrice(dateBikeTaken, timeBikeTaken) {
    let price = 0.0;
    let dateTaken = extractDateFromString(dateBikeTaken, timeBikeTaken);
    let currentDate = new Date();

    currentDate.setMonth(currentDate.getMonth() + 1);
    let diffInMinutes = diff_minutes(currentDate, dateTaken);

    if (diffInMinutes <= 60) {
        price = 1.5;
    } else {
        price = (diffInMinutes / 60) * 1.5;
    }
    return price;
}