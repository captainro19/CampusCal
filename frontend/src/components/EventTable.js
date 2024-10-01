import React from 'react';

const EventsTable = ({ events }) => {
  return (
    <div className="event-table-container">
      <h3>Extracted Academic Events</h3>
      {events.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events to display</p>
      )}
    </div>
  );
};

export default EventsTable;
