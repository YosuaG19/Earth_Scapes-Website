'use client';
import { useState, useMemo} from 'react';
import { useRouter } from "next/navigation";
import Payment from '../payment/Payment';

const RANGE_DAYS = 3; // 👉 ganti sesuai kebutuhan

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

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

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
      key: d.toDateString(),
    };
  });
};

export default function DateSelection() {
  const router = useRouter();
  const [baseDate, setBaseDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState('');
  const [showPayment, setShowPayment] = useState(false);


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
    startDate && endDate && date > startDate && date < endDate;

  const handleSelect = (date, isDisabled) => {
    if (isDisabled) return;

    const autoEnd = addDays(date, RANGE_DAYS);

    setStartDate(date);
    setEndDate(autoEnd);
  };

  const apply = () => {
    if (!startDate || !endDate) return;
    setShowPayment(true);
  };

  const cancel = () => {
    setStartDate(null);
    setEndDate(null);
    setResult('');
  };

  return (
    <>
      {showPayment && (
        <Payment
          startDate={startDate} endDate={endDate}
          onClose={() => setShowPayment(false)}
        />
      )}

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

            <div className="flex gap-[.5rem]">
              <button onClick={cancel} type='button' className="cancel">
                Cancel
              </button>
              <button onClick={apply} type='button' className="apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
        {onPrev && <button onClick={onPrev}>prev</button>}
        <strong>
          {title.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </strong>
        {onNext && <button onClick={onNext}>next</button>}
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
