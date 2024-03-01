const express = require("express");
const router = express.Router();


/**
 * Handle custom errors
 * @param {*} req
 * @param {*} res
 * @returns
*/
const queryValidatorMiddleware = (req, res, next) => {
  const query = req.query;
  const queryParams = Object.keys(query);
  const validParams = ["meal", "drink", "dessert"];
  console.log("aqui estoy")

  if (queryParams.length > 2 || queryParams.length === 0) {
    const err = new Error("Invalid number of query parameters. Must be between 1 and 2.");
    err.status = 400;
    return next(err);
  }
  
  for (const param of queryParams) {
    console.log(param)
    if (!validParams.includes(query[param])) {
      const err = new Error(`Invalid query parameter value '${query[param]}'. Must be one of: meal, drink, dessert.`);
      err.status = 400;
      return next(err);
    }
  }
  
  // Proceed to controllers
  next();
};

//import controllers
const { getRecommendation } = require("../controllers/CustomRecommendation");
const { getExternalRecommendation } = require("../controllers/ExternalRecommendation");
const { getRecommendationAI } = require("../controllers/RecommendationAI");

//assign controller for every route
router.get("/custom", getRecommendation);
router.get("/external", getExternalRecommendation);
router.get("/open_ai", getRecommendationAI);


const handleEmptyResponse = (req, res, next) => {
  const responses = [
    getRecommendation(req, res),
    getExternalRecommendation(req, res),
    getRecommendationAI(req, res)
  ];

  // Check if all responses are empty
  const allEmpty = responses.every(response => response === null || (Array.isArray(response) && response.length === 0));

  if (allEmpty) {
    const err = new Error("Could not find a recommendation for that meal");
    err.status = 404;
    return next(err);
  }

  next();
};

module.exports = router;
