const { response } = require("../helpers/response");
const likeService = require("../services/likes.service");
const likeController = {
  getLikesByUser: () => {
    return async (req, res, next) => {
      try {
        const { userId } = req.params;
        const data = await likeService.getLikesByUser(userId);
        res.status(200).json(response(data));
      } catch (error) {
        next(error);
      }
    };
  },
  getLikesByRestaurant: () => {
    return async (req, res, next) => {
      try {
        const { restaurantId } = req.params;
        const data = await likeService.getLikesByRestaurant(restaurantId);
        res.status(200).json(response(data));
      } catch (error) {
        next(error);
      }
    };
  },
  like: () => {
    return async (req, res, next) => {
      try {
        const userId = Number(req.headers.userid);
        const { restaurantId } = req.body;
        const data = await likeService.likeRestaurant(userId, restaurantId);
        res.status(200).json(response(data));
      } catch (error) {
        next(error);
      }
    };
  },
  unlike: () => {
    return async (req, res, next) => {
      try {
        // Giả sử bước này lấy token user từ header
        const userId = Number(req.headers.userid);
        const { restaurantId } = req.body;
        const data = await likeService.unlikeRestaurant(userId, restaurantId);
        res.status(200).json(response(true));
      } catch (error) {
        next(error);
      }
    };
  },
};

module.exports = likeController;
