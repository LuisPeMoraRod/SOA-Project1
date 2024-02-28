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
  var response = {}

  let recommendationMessage = "";

  if (query.meal) {

    const mealIndex = data.meals.findIndex(meal => meal.name.toLowerCase() === query.meal.toLowerCase());
    if (mealIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Meal not found" });
      
    }
    response.meal = data.meals[mealIndex];
    response.dessert = data.desserts[mealIndex];
    response.drink = data.drinks[mealIndex];
    response.recommendationMessage = `Para acompañar ${query.meal} le recomendamos ${response.dessert.name} y ${response.drink.name}`;
  }
  else if (query.dessert) {

    const dessertIndex = data.desserts.findIndex(dessert => dessert.name.toLowerCase() === query.dessert.toLowerCase());
    if (dessertIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Dessert not found" });
    }
    response.meal = data.meals[dessertIndex];
    response.dessert = data.desserts[dessertIndex];
    response.drink = data.drinks[dessertIndex];
    response.recommendationMessage = `Para acompañar ${query.dessert} le recomendamos ${response.meal.name} y ${response.drink.name}`;
    
  }
  else if (query.drink) {

    const drinkIndex = data.drinks.findIndex(drink => drink.name.toLowerCase() === query.drink.toLowerCase());
    if (drinkIndex === -1) {
      return res.status(statusCodes.NOT_FOUND).json({ error: "Drink not found" });
    }
    response.meal = data.meals[drinkIndex];
    response.dessert = data.desserts[drinkIndex];
    response.drink = data.drinks[drinkIndex];
    response.recommendationMessage = `Para acompañar ${query.drink} le recomendamos ${response.meal.name} y ${response.dessert.name}`;

  }
  else {
    return res.status(statusCodes.BAD_REQUEST).json({ error: "Invalid query" });
  }

  return res.status(statusCodes.OK).json(response);
};

module.exports = {
  getRecommendation,
};