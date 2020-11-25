import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svota'
})
export class SvotaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let num: number = +value;
    num = num / 100;
    return num + ' kn';
  }

}
