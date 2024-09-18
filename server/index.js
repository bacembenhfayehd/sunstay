import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import hotelsRoutes from './routes/hotels.js'
import roomsRoutes from './routes/rooms.js'
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to data base");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected , Ip adress possible");
});


//middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use('/auth' ,authRoutes);
app.use('/users' ,usersRoutes);
app.use('/hotels' ,hotelsRoutes);
app.use('/rooms' ,roomsRoutes);

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something is wrong";
 return res.status(errorStatus).json({
  success:false,
  status:errorStatus,
  message:errorMessage,
  stack:err.stack,
 })

})


app.listen(5000, () => {
  connect();
  console.log("connected successfully to backend");
});
