const Food = require("../models/Food");
const Order = require("../models/Order");
const SubFood = require("../models/SubFood");
const User = require("../models/User");

async function order(userId, data) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }
    const code = new Date().getTime();

    for (const item of data) {
      const { foodId, amount, arrSubFood } = item;
      const food = await Food.findByPk(foodId);
      if (food) {
        const arrSubId = [];
        for (const subId of arrSubFood) {
          const subFood = await SubFood.findOne({
            where: {
              subId,
              foodId,
            },
          });
          if (subFood) {
            arrSubId.push(subId);
          }
        }

        await Order.create({
          userId,
          foodId,
          amount,
          code,
          arrSubId: JSON.stringify(arrSubId),
        });
      }
    }

    const orders = await Order.findAll({
      where: {
        code,
        userId,
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  order,
};
