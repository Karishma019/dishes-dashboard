import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
  dishName: String,
  dishId: String,
  imageUrl: String,
  isPublished: Boolean,
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
