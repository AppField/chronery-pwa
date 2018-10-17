import { parse, format } from 'date-fns';


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

