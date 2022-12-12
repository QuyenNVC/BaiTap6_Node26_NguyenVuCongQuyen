const likeService = require("../services/likes.service");
const likeController = {
  getLikesByUser: () => {
    return async (req, res) => {
      try {
        const { userId } = req.params;
        const data = await likeService.getLikesByUser(userId);
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
  getLikesByRestaurant: () => {
    return async (req, res) => {
      try {
        const { restaurantId } = req.params;
        const data = await likeService.getLikesByRestaurant(restaurantId);
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
  like: () => {
    return async (req, res) => {
      try {
        const userId = Number(req.headers.userid);
        const { restaurantId } = req.body;
        const data = await likeService.likeRestaurant(userId, restaurantId);
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
  unlike: () => {
    return async (req, res) => {
      try {
        // Giả sử bước này lấy token user từ header
        const userId = Number(req.headers.userid);
        const { restaurantId } = req.body;
        const data = await likeService.unlikeRestaurant(userId, restaurantId);
        res
          .status(200)
          .json({ success: true, message: "Unlike nhà hàng thành công!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
};

module.exports = likeController;
