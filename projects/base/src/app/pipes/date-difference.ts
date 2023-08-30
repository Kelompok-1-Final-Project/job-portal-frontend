import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateDifference",
  standalone: true
})
export class DateDifference implements PipeTransform {
  transform(startingDate: any, endingDate: any): any {
    var startDate = new Date(startingDate);
    // user not pass endingDate then set current date as end date.
    if (!endingDate) {
      endingDate = new Date();
    }
    let endDate = new Date(endingDate);
    // chack start date and end date and base on condication alter date.
    if (startDate > endDate) {
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    // This is for leap year.
    const startYear = startDate.getFullYear();
    const february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
        ? 29
        : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    if(yearDiff != 0){
        return (yearDiff + " Years")
    }
    else if (yearDiff == 0 && monthDiff != 0){
        return (monthDiff + " Months")
    }
    else if (yearDiff == 0 && monthDiff == 0 && dayDiff != 0){
        return (dayDiff + " Days")
    }
  }
}