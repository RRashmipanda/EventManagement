import express from "express";
import {getAllevents,searchEvents,createEvents,getMyEvents,updateEvent,deleteEvent,getSingleEvent} from "../controllers/eventController.js";

import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall",getAllevents)
router.get("/search",searchEvents)
router.post("/create",isAuthenticated,createEvents)
router.get("/MyEvents",isAuthenticated,getMyEvents)
router.put("/UpdateEvents/:id",isAuthenticated,updateEvent)
router.delete("/DeleteEvents/:id",isAuthenticated,deleteEvent)
router.get("/:id",isAuthenticated,getSingleEvent)


export default router;