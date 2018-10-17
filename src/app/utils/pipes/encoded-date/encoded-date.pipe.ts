import { Pipe, PipeTransform } from '@angular/core';
import { decodeDate } from '../../utils';


@Pipe({
  name: 'encodedDate',
  pure: true
})
export class EncodedDatePipe implements PipeTransform {

  transform(value: any, args?: any): Date {
    return decodeDate(value);
  }

}
