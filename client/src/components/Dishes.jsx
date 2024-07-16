import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const socket = io(`${backendUrl}`);

function Dishes() {
  const [dishesData, setDishesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDishesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/dishes`);
      setDishesData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishesData();

    socket.on("dishUpdated", (updatedDish) => {
      console.log(updatedDish);

      setDishesData((prevDishes) => {
        return prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        );
      });
    });
    return () => {
      socket.off("dishUpdated");
    };
  }, []);

  const handleUpdateDish = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/dishes/${id}`);
      toast(`Updated Sucessfully`, { type: "success" });
      getDishesData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 flex w-full justify-center flex-wrap gap-10 my-10">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center text-white backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-sky-500 border-t-transparent"></div>
        </div>
      )}
      {dishesData &&
        dishesData.map((dish) => {
          return (
            <div
              key={dish.dishId}
              className="flex w-1/4 flex-col rounded-lg shadow border"
            >
              <div className="w-full">
                <img src={dish.imageUrl} className="h-52 object-cover w-full" />
              </div>
              <div className=" p-5 flex items-center justify-between">
                <p className="font-medium">{dish.dishName}</p>
                <button
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdateDish(dish.dishId)}
                >
                  {dish.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Dishes;
