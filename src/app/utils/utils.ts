import { Injectable } from '@angular/core';
import { parse, format, setISODay, toDate } from 'date-fns';


@Injectable()
export class Utils {
  // YYYY-MM-DDTHH:mm:ssTZD

  static getDateTime(time): Date {
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

  static encodeDate(date: Date): string {
    return format(date, 'YYYY-MM-dd');
  }

  static decodeDate(encodedDate: string): Date {
    if (encodedDate) {
      return parse(encodedDate, 'YYYY-MM-dd', new Date());
    } else {
      return null;
    }
  }

}
