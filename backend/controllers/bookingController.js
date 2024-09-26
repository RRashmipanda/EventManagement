import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Booking } from "../models/bookingSchema.js";
import { Event } from "../models/eventSchema.js";


// New users can book an event
export const bookingEvent = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  if (role === "organiser") {
    return next(new ErrorHandler("Organizers cannot book events.", 403));
  }
  const { name, email, phone, address, eventID } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !address || !eventID) {
    return next(new ErrorHandler("Please provide all required booking details.", 400));
  }
  const event = await Event.findById(eventID);
  if (!event) {
    return next(new ErrorHandler("Event not found.", 404));
  }
  // Creating a new booking for the event by the user
  const booking = await Booking.create({
    name,
    email,
    phone,
    address,
    eventID,
    userID: req.user._id, 
  });

  res.status(200).json({
    success: true,
    message: "Event booked successfully!",
    booking,
  });
});



// Organiser gets all bookings for their events
export const organiserGetAllBookings = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
    const { role } = req.user;
    if (role !== "organiser") {
      return next(new ErrorHandler("Only organizers can view bookings.", 403));
    }
  
    // Find all bookings 
    const bookings = await Booking.find().populate('eventID', 'title').populate('userID', 'name email');
  
    if (!bookings || bookings.length === 0) {
      return next(new ErrorHandler("No bookings found for your events.", 404));
    }
  
    res.status(200).json({
      success: true,
      bookings,
    });
  });


// New user gets all their bookings
export const newuserGetAllBookings = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
  
    if (role !== "newuser") {
      return next(new ErrorHandler("please login as user, only user can view ", 403));
    }
    // Find bookings made by the logged-in user
    const bookings = await Booking.find({ userID: req.user._id }).populate('eventID', 'title');
  
    if (!bookings || bookings.length === 0) {
      return next(new ErrorHandler("No bookings found.", 404));
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  });
  

  // New user deletes their own booking
export const newuserDeleteBooking = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
  
    if (role !== "newuser") {
      return next(new ErrorHandler("Only new users can delete their bookings.", 403));
    }
    const { id } = req.params;
    // Check if the booking belongs to the logged-in user
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(new ErrorHandler("Booking not found.", 404));
    }
    if (booking.userID.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You are not authorized to delete this booking.", 403));
    }
    await booking.deleteOne();
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  });
  


  