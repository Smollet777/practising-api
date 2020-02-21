import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeCase'
})
export class SnakeCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value.replace(/ /g, '_');
  }

}
