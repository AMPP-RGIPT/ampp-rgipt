const Event = require('../models/Event');
const AuditLog = require('../models/AuditLog');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ampp_events' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};


const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, time, type, registrationLink } = req.body;
    let { imageUrl } = req.body;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      time,
      imageUrl: imageUrl || '',
      type,
      registrationLink,
      createdBy: req.user.id
    });


    const newEvent = await event.save();

    await AuditLog.create({
      action: 'CREATE',
      entityId: newEvent._id,
      performedBy: req.user.id,
      details: { title: newEvent.title }
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};


const updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { title, description, date, location, time, type, registrationLink } = req.body;
    let { imageUrl } = req.body;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const updateData = {
      title,
      description,
      date,
      location,
      time,
      type,
      registrationLink,
      updatedBy: req.user.id
    };

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl;
    }


    const oldEvent = await Event.findById(eventId);
    if (!oldEvent) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      return next(error);
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true });

    await AuditLog.create({
      action: 'UPDATE',
      entityId: updatedEvent._id,
      performedBy: req.user.id,
      details: {
        title: updatedEvent.title,
        changes: updateData
      }
    });

    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};


const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      return next(error);
    }

    await Event.findByIdAndDelete(eventId);

    await AuditLog.create({
      action: 'DELETE',
      entityId: eventId,
      performedBy: req.user.id,
      details: { title: event.title }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
