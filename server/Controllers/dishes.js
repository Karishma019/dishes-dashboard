import Dish from "../Models/dishModal.js";
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    return res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createDishes = async (req, res) => {
//   const dish = req.body;
//   const newDish = new Dish({ ...dish });
//   try {
//     await newDish.save();
//     return res.status(201).json(newDish);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateDishes = async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: req.params.dishId });
    if (dish) {
      dish.isPublished = !dish.isPublished;
      const updatedDish = await dish.save();
      io.emit("dishUpdated", updatedDish); // Emit event to all connected clients
      res.json(updatedDish);
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
