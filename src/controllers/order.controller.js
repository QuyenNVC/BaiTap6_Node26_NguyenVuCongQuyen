const { response } = require("../helpers/response");
const { order } = require("../services/orders.service");

const orderController = {
  order: () => {
    return async (req, res, next) => {
      try {
        const userId = Number(req.headers.userid);
        const data = req.body;
        const result = await order(userId, data);
        res.status(200).json(response(result));
      } catch (error) {
        next(error);
      }
    };
  },
};

module.exports = orderController;
