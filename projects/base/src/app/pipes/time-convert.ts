import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any) {
       const datePipe = new DatePipe("en-US");
       value = datePipe.transform(value, 'MMMM yyyy');
       return value;
    }
}