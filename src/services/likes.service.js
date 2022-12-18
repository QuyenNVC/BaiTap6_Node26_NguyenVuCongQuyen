const { AppError } = require("../helpers/error");
const Like = require("../models/Like");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

async function getLikesByUser(userId) {
  try {
    const user = await User.findByPk(userId, {
      include: {
        association: "likedRestaurants",
        through: {
          attributes: [],
        },
      },
    });

    if (!user) {
      throw new AppError(400, "Người dùng không tồn tại");
    }

    return user.likedRestaurants;
  } catch (error) {
    throw error;
  }
}

async function getLikesByRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId, {
      include: {
        association: "likedUsers",
        through: {
          attributes: [],
        },
      },
    });

    if (!restaurant) {
      throw new AppError(400, "Nhà hàng không tồn tại");
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

    // console.log(restaurant.__proto__);

    const hasLiked = await restaurant.hasLikedUser(userId);
    if (hasLiked) {
      throw new AppError(400, "Người dùng đã like nhà hàng!");
    } else {
      const result = await restaurant.addLikedUser(userId);
      return result;
    }
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

    const hasLiked = await restaurant.hasLikedUser(userId);
    if (!hasLiked) {
      throw new AppError(400, "Người dùng đã chưa nhà hàng!");
    } else {
      await restaurant.removeLikedUser(userId);
      return true;
    }
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
