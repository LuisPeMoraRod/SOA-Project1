const data = require("../models/meals.json");
const statusCodes = require("../constants/statusCodes");

/**
 * Handle AI recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRecommendationAI = (req, res) => {
  const query = req.query; // query params

  console.log("Query params: ", query);

  //process request
  return res.status(statusCodes.OK).json(data);
};

module.exports = {
  getRecommendationAI,
};
