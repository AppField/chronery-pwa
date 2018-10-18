import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcTime',
  pure: true
})
export class UtcTimePipe implements PipeTransform {

  transform(value: string): Date {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    date.setHours(date.getUTCHours());
    date.setMinutes(date.getUTCMinutes());
    return date;
  }

}
