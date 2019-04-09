import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentsIntoTime'
})
export class PercentsIntoTimePipe implements PipeTransform {

  transform(value: number, duration: number): number {
    return (value / 100) * duration;
  }

}
