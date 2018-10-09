import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // copy item to remove reference
      item = { ...item };
      const keys = Object.keys(item);
      if (item.hasOwnProperty('id')) {
        item.id = '';
      }

      return keys.some((keyName) => {
        return item[keyName].toString().toLowerCase().includes(searchText);
      });
    });
  }
}
