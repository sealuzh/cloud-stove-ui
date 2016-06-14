import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'csProperty',
    pure: false
})

export class PropertyPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        if (items == null) {
          return;
        }
        
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
          return item[args[1]].indexOf(args[0])[args[1]] !== -1;
        });
    }
}
