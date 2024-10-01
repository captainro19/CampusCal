import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import EventsTable from './components/EventTable';
import CalendarView from './components/CalendarView';
import Countdown from 'react-countdown';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  const nextEvent = events.length > 0 ? new Date(events[0].date) : null;

  return (
    <div className="App">
      <h1>CampusCal</h1>
      <UploadForm setEvents={setEvents} />
      <EventsTable events={events} />
      <CalendarView events={events} />
      {nextEvent && (
        <div className="countdown-container">
          <h4>Next Event Countdown:</h4>
          <Countdown date={nextEvent} />
        </div>
      )}
    </div>
  );
}

export default App;
