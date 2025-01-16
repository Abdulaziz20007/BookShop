const DAYS_IN_MONTH = 30;

const nextMonth = (date) => {
  const nextDate = new Date(date);
  const days = DAYS_IN_MONTH;
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const endDate = (date, months) => {
  const endDate = new Date(date);
  const days = months * DAYS_IN_MONTH;
  endDate.setDate(endDate.getDate() + days);
  return endDate;
};

module.exports = {
  nextMonth,
  endDate,
};
