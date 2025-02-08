import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  // Force polling transport to bypass WebSocket issues
  const socket = io("http://localhost:5000", { transports: ["polling"] });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));

    socket.on("attendeeUpdate", (data) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === data.eventId
            ? { ...event, attendees: data.attendees }
            : event
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <h1>Event Dashboard</h1>
      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>Attendees: {event.attendees.length}</p>
        </div>
      ))}
    </div>
  );
};

export default EventDashboard;