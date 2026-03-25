const buildFormatter = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', {
    ...options,
    timeZone: 'UTC',
  });

const monthYearFormatter = buildFormatter({
  month: 'long',
  year: 'numeric',
});

const fullDateFormatter = buildFormatter({
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export const formatMonthYear = (date: Date) => monthYearFormatter.format(date);

export const formatFullDate = (date: Date) => fullDateFormatter.format(date);
