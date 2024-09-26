import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [20, "Title cannot exceed 20 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [10, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [3, "Location must contian at least 3 characters!"],
  },
  eventPostedOn: {
    type: Date,
    default: Date.now,
  },
  ticketprice: {
    type: Number,
    minLength: [3, "Salary must contain at least 3 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  eventImage: {
    type: String ,
    default: null 
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Event = mongoose.model("Event", eventSchema);