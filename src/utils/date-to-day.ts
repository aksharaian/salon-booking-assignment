export const DateToDay = (date: string) => {
  const d = new Date(date);
  let day = d.getDay();

  const dateToDay = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thrusday',
    5: 'Friday',
    6: 'Saturday',
  };

  return dateToDay[day];
};
