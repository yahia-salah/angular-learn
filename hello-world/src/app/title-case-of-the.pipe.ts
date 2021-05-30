import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseOfThe',
})
export class TitleCaseOfThePipe implements PipeTransform {
  transform(value: string): string {
    let valueAsArray = value.split(' ');
    for (let i = 1; i < valueAsArray.length; i++) {
      if (valueAsArray[i] == 'Of' || valueAsArray[i] == 'The')
        valueAsArray[i] = valueAsArray[i].toLocaleLowerCase();
    }

    return valueAsArray.join(' ');
  }
}
