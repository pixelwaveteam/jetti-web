import { addDays, differenceInDays, format, isBefore } from 'date-fns';

export function getDaysBetweenDates(startDate: Date, endDate: Date): number {
  const daysDiff = differenceInDays(endDate, startDate);

  return daysDiff;
}

export function getAllDatesBetween(startDate: Date, endDate: Date): string[] {
  const datesArray: string[] = [];
  let currentDate = new Date(startDate);

  while (isBefore(currentDate, endDate)) {
    datesArray.push(format(currentDate, 'MM/dd/yyyy'));
    currentDate = addDays(currentDate, 1);
  }

  return datesArray;
}

export function getDateFormatted(
  date: Date | string,
  showTime = false
): string {
  const formatString = showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy';

  const dateFormatted = format(new Date(date), formatString);

  return dateFormatted;
}
