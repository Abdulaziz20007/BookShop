const DAYS_IN_MONTH = 30;

const nextMonth = (date) => {
  console.log("nextMonth input date:", date);
  const nextDate = new Date(date);
  const days = DAYS_IN_MONTH;
  nextDate.setDate(nextDate.getDate() + days);
  console.log("nextMonth result:", nextDate);
  return nextDate;
};

const endDate = (date, months) => {
  console.log("endDate input:", { date, months });
  const endDate = new Date(date);
  const days = months * DAYS_IN_MONTH;
  endDate.setDate(endDate.getDate() + days);
  console.log("endDate result:", endDate);
  return endDate;
};

module.exports = {
  nextMonth,
  endDate,
};
