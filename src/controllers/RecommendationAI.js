const data = require("../models/meals.json");
const statusCodes = require("../constants/statusCodes");
const fetch = require('node-fetch');
const OpenAI = require( "openai");
const openai = new OpenAI();

/**
 * Handle AI recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRecommendationAI = async (req, res) => {
  const query = req.query; // query params

  console.log("Query params: ", query);

  var description = "";
  var param = "";

  if (query.meal) {
    description = "You are an expert chef and have to give recommendations for meals to go with in spanish.\
    I need you to give me the answer in JSON style example, Dessert: Just the name of the dessert, Drink: Just the name of the drink.";
    param = query.meal
    
  } else if (query.dessert) {
    description = "You are an expert chef and have to give recommendations for desserts to go with in spanish.\
    I need you to give me the answer in JSON style example, Meal: Just the name of the meal, Drink: Just the name of the drink.";
    param = query.dessert
  
  } else if (query.drink) {
    description = "You are an expert chef and have to give recommendations for drinks to go with in spanish.\
    I need you to give me the answer in JSON style example, Meal: Just the name of the meal, Dessert: Just the name of the dessert.";
    param = query.drink

  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: description},
    {"role": "user", "content": param}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
  return res.status(statusCodes.OK).json(JSON.parse(completion.choices[0].message.content));
};

module.exports = {
  getRecommendationAI,
};
