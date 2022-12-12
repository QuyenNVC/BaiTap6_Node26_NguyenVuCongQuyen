const Like = require("../models/Like");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

async function getLikesByUser(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User không tồn tại!");
    }
    const result = await Like.findAll({
      where: {
        userId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getLikesByRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant không tồn tại!");
    }
    const result = await Like.findAll({
      where: {
        resId: restaurantId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function likeRestaurant(userId, restaurantId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error("Nhà hàng không tồn tại!");
    }

    const like = await Like.findOne({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    if (like) {
      throw new Error("Người dùng đã like nhà hàng!");
    }

    const result = await Like.create({
      userId,
      resId: restaurantId,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function unlikeRestaurant(userId, restaurantId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error("Nhà hàng không tồn tại!");
    }

    const like = await Like.findOne({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    if (!like) {
      throw new Error("Người dùng chưa like nhà hàng!");
    }

    await Like.destroy({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getLikesByUser,
  getLikesByRestaurant,
  likeRestaurant,
  unlikeRestaurant,
};
