import { parse, format, toDate } from 'date-fns';


export function getDateTime(time, date: Date = new Date()): Date {
  if (typeof time !== 'string') {
    const { hour, minute } = time;
    date = toDate(new Date().toISOString());

    date.setUTCHours(hour.value);
    date.setUTCMinutes(minute.value);
    // return parse(format(date, ' YYYY-MM-DDTHH:mm:ss.sssZ'));
  } else {
    date = toDate(time);
  }

  date.setUTCSeconds(0);
  return date;
}

export function getDateFromObject(dateObj): Date {
  const { day, month, year } = dateObj;

  return parse(`${day.value}.${month.value}.${year.value}`, 'dd.MM.yyyy', new Date());
}

export function getDateWithCurrentTime(): Date {
  const date = new Date();
  // Add timezone offset
  date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60);
  return date;
}

export function encodeDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}


export function decodeDate(encodedDate: string): Date {
  if (encodedDate) {
    return parse(encodedDate, 'yyyy-MM-dd', new Date());
  } else {
    return null;
  }
}

