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

  let recommendationMessage = "";

  if (query.meal) {

    const mealIndex = data.meals.findIndex(meal => meal.name.toLowerCase() === query.meal.toLowerCase());
    if (mealIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Meal not found" });
      
    }
    const dessert = data.desserts[mealIndex];
    const drink = data.drinks[mealIndex];
    recommendationMessage = `Para acompañar ${query.meal} le recomendamos ${dessert.name} y ${drink.name}`;
  }
  else if (query.dessert) {

    const dessertIndex = data.desserts.findIndex(dessert => dessert.name.toLowerCase() === query.dessert.toLowerCase());
    if (dessertIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Dessert not found" });
    }
    const meal = data.meals[dessertIndex];
    const drink = data.drinks[dessertIndex];
    recommendationMessage = `Para acompañar ${query.dessert} le recomendamos ${meal.name} y ${drink.name}`;
    
  }
  else if (query.drink) {

    const drinkIndex = data.drinks.findIndex(drink => drink.name.toLowerCase() === query.drink.toLowerCase());
    if (drinkIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Drink not found" });
    }
    const meal = data.meals[drinkIndex];
    const dessert = data.desserts[drinkIndex];
    recommendationMessage = `Para acompañar ${query.drink} le recomendamos ${meal.name} y ${dessert.name}`;

  }
  else {
    return res.status(statusCodes.BAD_REQUEST).json({ error: "Invalid query" });
  }

  return res.status(statusCodes.OK).json({ recommendation: recommendationMessage });
};

module.exports = {
  getRecommendation,
};