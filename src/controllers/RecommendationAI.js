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

  var response = {};

  if (query.meal) {
    first = "drink";
    second = "dessert";
    param = query.drink;
    
  } else if (query.dessert) {
    first = "meal";
    second = "drink";
    param = query.drink;
  
  } else if (query.drink) {
    first = "meal";
    second = "dessert";
    param = query.drink;

  }

  const firstRequest = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are an expert chef and have to give recommendations for meals to go with in spanish. JUST THE NAME, NO EXTRA TEXT"},
    {"role": "user", "content": `What ${first} do you recommend to go with ${param}`}],
    model: "gpt-3.5-turbo",
  });

  const secondRequest = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are an expert chef and have to give recommendations for meals to go with in spanish. JUST THE NAME, NO EXTRA TEXT"},
    {"role": "user", "content": `What ${second} do you recommend to go with ${param}`}],
    model: "gpt-3.5-turbo",
  });


  if (query.meal) {
    response.drink = firstRequest.choices[0].message.content
    response.dessert = secondRequest.choices[0].message.content
    param = query.meal 
    
  } else if (query.dessert) {
    response.meal = firstRequest.choices[0].message.content
    response.drink = secondRequest.choices[0].message.content
    param = query.dessert
  
  } else if (query.drink) {
    response.meal = firstRequest.choices[0].message.content
    response.dessert = secondRequest.choices[0].message.content
    param = query.drink

  }

  response.message = `Para acompañar ${param}, recomendamos ${firstRequest.choices[0].message.content} con ${secondRequest.choices[0].message.content}!`

  return res.status(statusCodes.OK).json(response);
};

module.exports = {
  getRecommendationAI,
};
