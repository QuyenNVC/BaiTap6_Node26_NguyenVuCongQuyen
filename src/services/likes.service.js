const { AppError } = require("../helpers/error");
const Like = require("../models/Like");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

async function getLikesByUser(userId) {
  try {
    const user = await User.findByPk(userId, {
      include: "likedRestaurants",
    });
    if (!user) {
      throw new AppError(400, "Người dùng không tồn tại!");
    }
    return user.likedRestaurants;
  } catch (error) {
    throw error;
  }
}

async function getLikesByRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId, {
      include: "likedUsers",
    });
    if (!restaurant) {
      throw new AppError(400, "Restaurant không tồn tại!");
    }
    return restaurant.likedUsers;
  } catch (error) {
    throw error;
  }
}

async function likeRestaurant(userId, restaurantId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "Người dùng không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Nhà hàng không tồn tại!");
    }

    const like = await Like.findOne({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    if (like) {
      throw new AppError(400, "Người dùng đã like nhà hàng!");
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
      throw new AppError(400, "User không tồn tại!");
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Nhà hàng không tồn tại!");
    }

    const like = await Like.findOne({
      where: {
        userId,
        resId: restaurantId,
      },
    });
    if (!like) {
      throw new AppError(400, "Người dùng chưa like nhà hàng!");
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
