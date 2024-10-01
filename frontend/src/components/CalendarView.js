import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const eventsForSelectedDate = events.filter(
    (event) => event.date === formattedDate(selectedDate)
  );

  return (
    <div className="calendar-view-container">
      <h3>Event Calendar</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) => {
          if (events.find((event) => event.date === formattedDate(date))) {
            return 'highlight-event';
          }
          return null;
        }}
        className="calendar"
      />
      {eventsForSelectedDate.length > 0 && (
        <div className="event-details">
          <h4>Events for {formattedDate(selectedDate)}:</h4>
          <ul>
            {eventsForSelectedDate.map((event, index) => (
              <li key={index}>
                <strong>{event.name}</strong>: {event.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
