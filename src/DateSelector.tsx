import React, { useState, useEffect } from "react";

export const DateSelector: React.FC<{
  startYear: number;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}> = ({ startYear, setDate }) => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedDay, setSelectedDay] = useState<number | undefined>();
  const today = new Date();

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const selectedDate = new Date(
        selectedYear,
        selectedMonth - 1,
        selectedDay
      );
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  }, [setDate, selectedYear, selectedMonth, selectedDay]);

  const YearOptions: React.FC<{ start: number; end: number }> = ({
    start,
    end,
  }) => {
    const years = new Array<number>();
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return (
      <>
        <option value={undefined}>{""}</option>
        {years.map((year, idx) => {
          return (
            <option key={idx} value={year}>
              {year}
            </option>
          );
        })}
      </>
    );
  };

  const MonthOptions: React.FC = () => {
    const months = new Array<number>();
    for (let month = 1; month <= 12; month++) {
      months.push(month);
    }
    return (
      <>
        <option value={undefined}>{""}</option>
        {months.map((month, idx) => {
          return (
            <option key={idx} value={month}>
              {month}
            </option>
          );
        })}
      </>
    );
  };

  const DayOptions: React.FC<{
    year: number | undefined;
    month: number | undefined;
  }> = ({ year, month }) => {
    year = year ?? startYear;
    month = month ?? 1;
    const endDatesOfYear = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const days = new Array<number>();
    const endDay = endDatesOfYear[month - 1];
    for (let day = 1; day <= endDay; day++) {
      days.push(day);
    }
    return (
      <>
        <option value={undefined}>{""}</option>
        {days.map((day, idx) => {
          return (
            <option key={idx} value={day}>
              {day}
            </option>
          );
        })}
      </>
    );
  };

  const isLeapYear = (year: number | undefined) => {
    if (!year) {
      return false;
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  return (
    <>
      {/* year */}
      <select
        value={selectedYear}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const year = Number(event.target.value);
          // leap year -> not leap year in 2/29
          if (
            !isLeapYear(year) &&
            isLeapYear(selectedYear) &&
            selectedMonth === 2 &&
            selectedDay === 29
          ) {
            setSelectedMonth(undefined);
            setSelectedDay(undefined);
          }
          setSelectedYear(year);
        }}
      >
        <YearOptions start={startYear} end={today.getFullYear()} />
      </select>

      {/* month */}
      <select
        value={selectedMonth}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedMonth(Number(event.target.value));
        }}
      >
        <MonthOptions />
      </select>

      {/* day */}
      <select
        value={selectedDay}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedDay(Number(event.target.value));
        }}
      >
        <DayOptions year={selectedYear} month={selectedMonth} />
      </select>
    </>
  );
};
