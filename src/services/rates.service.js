const Rate = require("../models/Rate");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

async function getRatesByRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error("Nhà hàng không tồn tại");
    }

    const result = await Rate.findAll({
      where: {
        resId: restaurantId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
}

async function getRatesByUser(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const result = await Rate.findAll({
      where: {
        userId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
}

async function rateRestaurant(userId, data) {
  try {
    const { restaurantId, amount } = data;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error("Nhà hàng không tồn tại!");
    }

    if (!amount || isNaN(amount)) {
      throw new Error("Điểm đánh giá không tồn tại!");
    }

    const rate = await Rate.findOne({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    if (rate) {
      throw new Error("Người dùng đã đánh giá nhà hàng!");
    }

    const result = await Rate.create({
      userId,
      resId: restaurantId,
      amount,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRatesByRestaurant,
  getRatesByUser,
  rateRestaurant,
};
