import { parse, format, toDate } from 'date-fns';


export function getDateTime(time): Date {
  let date: Date;
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

export function getDateWithCurrentTime(): Date {
  const date = new Date();
  // Add timezone offset
  date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60);
  return date;
}

export function encodeDate(date: Date): string {
  return format(date, 'YYYY-MM-dd');
}


export function decodeDate(encodedDate: string): Date {
  if (encodedDate) {
    return parse(encodedDate, 'YYYY-MM-dd', new Date());
  } else {
    return null;
  }
}

