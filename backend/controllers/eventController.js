const Event = require("../models/Event");

// Create a new event
const createEvent = async (req, res) => {
  const { name, description, date, location, image } = req.body;
  const createdBy = req.user.userId; // User ID from JWT

  try {
    const event = new Event({ name, description, date, location, image, createdBy });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate("createdBy", "username");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, image } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update this event" });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.image = image || event.image;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

// Add an attendee to an event
const addAttendee = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // User ID from JWT

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User is already an attendee" });
    }

    event.attendees.push(userId);
    await event.save();

    // Emit real-time update to all clients
    req.io.emit("attendeeUpdate", { eventId: id, attendees: event.attendees });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error adding attendee", error });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendee,
};