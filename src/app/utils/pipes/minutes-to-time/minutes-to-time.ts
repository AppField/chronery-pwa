import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'minutesToTime',
  pure: true
})
export class MinutesToTimePipe implements PipeTransform {
  transform(allMinutes: number): string {
    let time = '00:00 h';

    if (allMinutes) {
      const hours = Math.floor(allMinutes / 60);
      const minutes = allMinutes % 60;

      // Ensure leading zeros
      const hoursStr = ('00' + hours).substr(-2);
      const minutesStr = ('00' + minutes).substr(-2);
      time = `${hoursStr}:${minutesStr}`;
    }

    return time;

  }
}
