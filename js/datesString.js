export class InvalidDateError extends Error {
  constructor() {
    super('Invalid date error.');
  }
}

export function parseDate(dateString) {
  const matchResult = dateString.match(/^(\d+)\/(\d+)\/(\d+)$/);

  if (matchResult === null) throw new InvalidDateError();

  const date = new Date(
    parseInt(matchResult[3]),
    parseInt(matchResult[1]) - 1,
    parseInt(matchResult[2])
  );

  if (generateDateString(date) !== dateString) throw new InvalidDateError();

  return date;
}

export function generateDateString(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function parseDates(datesString) {
  return datesString.split(', ').map(parseDate);
}

export function generateDatesString(dates) {
  return dates.map(generateDateString).join(', ');
}
