const rateService = require("../services/rates.service");
const rateController = {
  getRatesByRestaurant: () => {
    return async (req, res) => {
      try {
        const { restaurantId } = req.params;
        const data = await rateService.getRatesByRestaurant(restaurantId);
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
  getRatesByUser: () => {
    return async (req, res) => {
      try {
        const { userId } = req.params;
        const data = await rateService.getRatesByUser(userId);
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
  rate: () => {
    return async (req, res) => {
      try {
        const userId = Number(req.headers.userid);
        const data = req.body;
        const result = await rateService.rateRestaurant(userId, data);
        res.status(200).json({ data: result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
};

module.exports = rateController;
