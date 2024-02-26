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

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are an expert chef and have to give recommendations to dishes in spanish. No explanations need. You can get a dish, dessert or drink, whatever you get, you recommend the other two" },
    {"role": "user", "content": "Cantonés"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};

module.exports = {
  getRecommendationAI,
};
