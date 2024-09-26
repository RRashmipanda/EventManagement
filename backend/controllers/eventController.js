import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Event} from "../models/eventSchema.js";
import { upload } from '../middlewares/uploads.js';


export const getAllevents = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find({ expired: false });
    res.status(200).json({
      success: true,
      events,
    });
  });
  

  export const searchEvents = catchAsyncErrors(async (req, res, next) => {
    const { keyword, category, location } = req.query;
    let query = { expired: false };
  
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    try {
      const events = await Event.find(query);
      if (!events || events.length === 0) {
        return next(new ErrorHandler("No events found matching the criteria.", 404));
      }
      res.status(200).json({ success: true, events });
    } catch (error) {
      console.error("Error searching events:", error);
      return next(new ErrorHandler("Error searching events", 500));
    }
  });
  
  


  export const createEvents = [
    upload.single('eventImage'), 
    catchAsyncErrors(async (req, res, next) => {
      const { role } = req.user;
      if (role === "organiser") {
        return next(
          new ErrorHandler("Organiser not allowed to access this resource.", 400)
        );
      }
    const {title, description, category,location,ticketprice} = req.body;

    if (!title || !description || !category || !location) {
    return next(new ErrorHandler("Please provide full Event details.", 400))};

  //  console.log("Request Body:", req.body);
  
  if (!ticketprice) {
    return next(
      new ErrorHandler(  "Please provide fixed Ticket Price .",400)
    );
  }
// Check if file was uploaded
const eventImage = req.file ? req.file.path : null;
  const createdBy = req.user._id;
  const event = await Event.create({
    title, description, category,location,ticketprice,createdBy,eventImage 
  });

  res.status(200).json({
    success: true,
    message: "Event Created Successfully!",
    event,
  });

})
  ];



export const getMyEvents = catchAsyncErrors(async (req, res, next) => {
  const {role} = req.user;
  if (role === "organiser") {
    return next(
      new ErrorHandler("Organiser not allowed to access this resource.", 400)
    );
  }
  const myEvents = await Event.find({ createdBy: req.user._id });
  res.status(200).json({
   success: true,
   myEvents,
  });
});



export const updateEvent = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "newuser") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let event = await Event.findById(id);
  if (!event) {
    return next(new ErrorHandler("OOPS! Event not found.", 404));
  }
  event = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Event Updated!",
  });
});



export const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "newuser") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await event.deleteOne();
  res.status(200).json({
    success: true,
    message: "Event Deleted!",
  });
});


export const getSingleEvent = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!Event) {
      return next(new ErrorHandler("Event not found.", 404));
    }
    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});