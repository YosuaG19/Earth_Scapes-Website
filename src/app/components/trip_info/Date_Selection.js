'use client';
import { useState, useMemo } from 'react';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isSameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const buildCalendar = (year, month) => {
  const start = new Date(year, month, 1);
  start.setDate(start.getDate() - start.getDay());

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    return {
      date: d,
      day: d.getDate(),
      isDisabled: d.getMonth() !== month,
      key: formatDate(d),
    };
  });
};

export default function DateSelection() {
  const [baseDate, setBaseDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState('');

  const leftDate = baseDate;
  const rightDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1);
  const today = new Date();

  const leftCalendar = useMemo(
    () => buildCalendar(leftDate.getFullYear(), leftDate.getMonth()),
    [leftDate]
  );

  const rightCalendar = useMemo(
    () => buildCalendar(rightDate.getFullYear(), rightDate.getMonth()),
    [rightDate]
  );

  const isInRange = (date) =>
    startDate && endDate && startDate < date && date < endDate;

  const handleSelect = (date, isDisabled) => {
    if (isDisabled) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const apply = () => {
    if (startDate && endDate) {
      setResult(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }
  };

  const cancel = () => {
    setStartDate(null);
    setEndDate(null);
    setResult('');
  };

  return (
    <div className="datepicker">
      <div className="calendar">
        <Calendar
          title={leftDate}
          dates={leftCalendar}
          today={today}
          startDate={startDate}
          endDate={endDate}
          isInRange={isInRange}
          onSelect={handleSelect}
          onPrev={() =>
            setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1))
          }
        />

        <Calendar
          title={rightDate}
          dates={rightCalendar}
          today={today}
          startDate={startDate}
          endDate={endDate}
          isInRange={isInRange}
          onSelect={handleSelect}
          onNext={() =>
            setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1))
          }
        />

        <div className="action-menu">
          <span className="selection">
            {startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : 'Month Day, Year - Month Day, Year'}
          </span>

          <div className='flex gap-[.5rem]'>
            <button type="button" onClick={cancel} className='cancel'>
              Cancel
            </button>
            <button type="button" onClick={apply} className='apply'>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar({
  title,
  dates,
  today,
  startDate,
  endDate,
  isInRange,
  onSelect,
  onPrev,
  onNext,
}) {
  return (
    <div className="side">
      <div className="controls">
        {onPrev && (
          <button type="button" onClick={onPrev}>
            prev
          </button>
        )}
        <strong className="label">
          {title.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </strong>
        {onNext && (
          <button type="button" onClick={onNext}>
            next
          </button>
        )}
      </div>

      <div className="days">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="dates">
        {dates.map((d) => {
          const isToday = isSameDay(d.date, today);
          const isStart = isSameDay(d.date, startDate);
          const isEnd = isSameDay(d.date, endDate);

          return (
            <span
              key={d.key}
              className={[
                d.isDisabled && 'disabled',
                isToday && 'today',
                isStart && 'start_range',
                isEnd && 'end_range',
                isInRange(d.date) && 'in_range',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(d.date, d.isDisabled)}
            >
              {d.day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
