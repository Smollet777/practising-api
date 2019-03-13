import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds'
})
export class HoursMinutesSecondsPipe implements PipeTransform {

  transform(value: number | string, args?: any): any {
    const secNum = parseInt(value as any, 10);

    let hours: string | number = Math.floor(secNum / 3600);
    let minutes: string | number = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds: string | number = secNum - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }

}