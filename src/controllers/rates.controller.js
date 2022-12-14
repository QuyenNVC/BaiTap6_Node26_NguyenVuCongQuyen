const rateService = require("../services/rates.service");
const { response } = require("../helpers/response");
const rateController = {
  getRatesByRestaurant: () => {
    return async (req, res, next) => {
      try {
        const { restaurantId } = req.params;
        const data = await rateService.getRatesByRestaurant(restaurantId);
        res.status(200).json(response(data));
      } catch (error) {
        next(error);
      }
    };
  },
  getRatesByUser: () => {
    return async (req, res, next) => {
      try {
        const { userId } = req.params;
        const data = await rateService.getRatesByUser(userId);
        res.status(200).json(response(data));
      } catch (error) {
        next(error);
      }
    };
  },
  rate: () => {
    return async (req, res, next) => {
      try {
        const userId = Number(req.headers.userid);
        const data = req.body;
        const result = await rateService.rateRestaurant(userId, data);
        res.status(200).json(response(result));
      } catch (error) {
        next(error);
      }
    };
  },
};

module.exports = rateController;
