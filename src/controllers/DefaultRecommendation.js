const data = require("../models/meals.json");
const statusCodes = require("../constants/statusCodes");

/**
 * Handle custom recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRecommendation = (req, res) => {
  const query = req.query; // query params

  console.log("Query params: ", query);

  let mealIndex = -1;

  // Find the index of the requested meal in the meals array
  for (let i = 0; i < data.meals.length; i++) {
    if (data.meals[i].name.toLowerCase() === query.meal.toLowerCase()) {
      mealIndex = i;
      break;
    }
  }

  if (mealIndex === -1) {
    return res.status(statusCodes.NOT_FOUND).json({ error: "Meal not found" });
  }

  const meal = data.meals[mealIndex];
  const dessert = data.desserts[mealIndex];
  const drink = data.drinks[mealIndex];

  const recommendation = {
    meal: meal.name,
    dessert: dessert.name,
    drink: drink.name
  };

  return res.status(statusCodes.OK).json(recommendation);
};

module.exports = {
  getRecommendation,
};