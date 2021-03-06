import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'districtOrdinal'
})
export class DistrictOrdinalPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value === 0) {
      return 'At Large';
    }
    if (!value || value < 0) {
      return 'Unknown';
    }
    return this.ordinal(value);
  }

  ordinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
}
