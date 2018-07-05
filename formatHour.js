export default function am_pm_to_24_string(am_pm_string) {
    let formatted24String;
    let hourTaken = '';
    let minutesTaken = '';
    let hour = false;
    let minutes = false;
    let pm = false;

    let i;

    for (i = 0; i < am_pm_string.length; i++) {
        if (am_pm_string[i] !== ':' && !hour) {
            hourTaken += am_pm_string[i];
        } else if (am_pm_string[i] === ':' && !hour) {
            hour = true;
        } else if (am_pm_string[i] !== 'A' && am_pm_string[i] !== 'P' && !minutes) {
            minutesTaken += am_pm_string[i];
        } else if (am_pm_string[i] === 'A' || am_pm_string[i] === 'P') {
            minutes = true;
        }
        if (am_pm_string[i] === 'P') {
            pm = true;
        }
    }
    let hourInt = parseInt(hourTaken);
    if (hourInt < 12 && pm) {
        hourInt += 12;
    } else if (hourInt === 12 && !pm) {
        hourInt = 0;
    }
    hourTaken = '' + hourInt;
    formatted24String = hourTaken + ':' + minutesTaken;
    return formatted24String;
}
