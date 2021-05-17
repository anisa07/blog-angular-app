import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {

  transform(value: string, fallback: string, ...args: unknown[]): string {
    return value ? value : fallback;
  }

}
