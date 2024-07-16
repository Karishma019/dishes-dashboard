import express from "express";
import { getDishes } from "../Controllers/dishes.js";
// import { createDishes } from "../Controllers/dishes.js";
import { updateDishes } from "../Controllers/dishes.js";

const router = express.Router();

router.get("/", getDishes);
// router.post("/", createDishes);
router.put("/:dishId", updateDishes);

export default router;
