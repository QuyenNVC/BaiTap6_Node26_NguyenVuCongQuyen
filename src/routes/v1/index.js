const express = require("express");
const likeController = require("../../controllers/likes.controller");
const { order } = require("../../controllers/order.controller");
const {
  getRatesByRestaurant,
  getRatesByUser,
  rate,
} = require("../../controllers/rates.controller");
const v1 = express.Router();

v1.get("/users/:userId/likes", likeController.getLikesByUser());
v1.get("/users/:userId/rates", getRatesByUser());

v1.get(
  "/restaurants/:restaurantId/likes",
  likeController.getLikesByRestaurant()
);
v1.get("/restaurants/:restaurantId/rates", getRatesByRestaurant());

v1.post("/like", likeController.like());
v1.delete("/unlike", likeController.unlike());

v1.post("/rate", rate());

v1.post("/order", order());

module.exports = v1;
