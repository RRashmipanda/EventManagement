import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"
import  bookingRouter from "./routes/bookingRoutes.js"
import eventRouter from "./routes/eventRoutes.js"
import {dbConnection} from "./database/dbConnection.js"
import {errorMiddleware} from "./middlewares/error.js"

const app=express();
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
  origin: [process.env.FRONTED_URL],
  methods:['GET','POST','DELETE','PUT'],  
  credentials:true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//     fileUpload({
//       useTempFiles: true,
//       tempFileDir: "/tmp/",
//     })
//   ); 

 app.use('/uploads', express.static('uploads'));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/booking", bookingRouter);


dbConnection();



app.use(errorMiddleware)
export default app;