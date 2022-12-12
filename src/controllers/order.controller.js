const { order } = require("../services/orders.service");

const orderController = {
  order: () => {
    return async (req, res) => {
      try {
        const userId = Number(req.headers.userid);
        const data = req.body;
        const result = await order(userId, data);
        res.status(200).json({ data: result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  },
};

module.exports = orderController;
