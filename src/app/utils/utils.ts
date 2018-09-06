import { Injectable } from '@angular/core';
import { format, parse } from 'date-fns';


@Injectable()
export class Utils {

  static getDateTime(time) {
    if (typeof time !== 'string') {
      const { hour, minute } = time;
      const date = parse(new Date().toISOString());

      date.setUTCHours(hour.value);
      date.setUTCMinutes(minute.value);
      return parse(format(date, 'YYYY-MM-DDTHH:mm:ssTZD'));
    }
    return parse(time);
  }

}