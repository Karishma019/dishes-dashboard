import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dishesRoute from "./Routes/dishes.js";
// import { Socket } from "socket.io";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  },
});

// MiddleWares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    server.listen(process.env.PORT, () =>
      console.log(`Listening ${process.env.PORT} `)
    )
  )
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("dishUpdated", (dishUpdated) => {
    console.log(dishUpdated);
  });
});

app.use("/dishes", dishesRoute);
