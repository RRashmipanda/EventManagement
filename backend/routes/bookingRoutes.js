import express from "express";
import {organiserGetAllBookings,newuserGetAllBookings,newuserDeleteBooking,bookingEvent} from '../controllers/bookingController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router.get("/organiser/getall",isAuthenticated,organiserGetAllBookings);
router.get("/newuser/getall",isAuthenticated,newuserGetAllBookings);
router.delete("/delete/:id",isAuthenticated,newuserDeleteBooking);
router.post("/book-event",isAuthenticated,bookingEvent);


export default router;