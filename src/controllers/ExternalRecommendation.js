const statusCodes = require("../constants/statusCodes");

/**
 * Handle external recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getExternalRecommendation = (req, res) => {
  const query = req.query; // query params

  console.log("Query params: ", query);

  //process request
  return res.status(statusCodes.OK).json(data);
};

module.exports = {
  getExternalRecommendation,
};
