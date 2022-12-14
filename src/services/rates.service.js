const { AppError } = require("../helpers/error");
const Rate = require("../models/Rate");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

async function getRatesByRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId, {
      include: {
        association: "ratedUsers",
      },
    });

    if (!restaurant) {
      throw new AppError(400, "Nhà hàng không tồn tại");
    }

    return restaurant.ratedUsers;
  } catch (error) {
    throw error;
  }
}

async function getRatesByUser(userId) {
  try {
    const user = await User.findByPk(userId, {
      include: {
        association: "ratedRestaurants",
      },
    });

    if (!user) {
      throw new AppError(400, "Người dùng không tồn tại");
    }

    return user.ratedRestaurants;
  } catch (error) {
    throw error;
  }
}

async function rateRestaurant(userId, data) {
  try {
    const { restaurantId, amount } = data;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "Người dùng không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Nhà hàng không tồn tại!");
    }

    if (!amount || isNaN(amount)) {
      throw new AppError(400, "Điểm đánh giá không tồn tại!");
    }

    const hasRated = await user.hasRatedRestaurant(restaurantId);

    if (hasRated) {
      throw new AppError(400, "Người dùng đã đánh giá nhà hàng!");
    } else {
      const result = await Rate.create({
        resId: restaurantId,
        userId,
        amount,
      });
      return result;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRatesByRestaurant,
  getRatesByUser,
  rateRestaurant,
};
