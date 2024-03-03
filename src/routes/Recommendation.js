const express = require("express");
const router = express.Router();


const errorHandler = require("../errors/RecommendationError");
router.use(errorHandler.queryValidatorMiddleware);

//import controllers
const { getRecommendation } = require("../controllers/CustomRecommendation");
const { getExternalRecommendation } = require("../controllers/ExternalRecommendation");
const { getRecommendationAI } = require("../controllers/RecommendationAI");

//assign controller for every route
router.get("/custom", getRecommendation);
router.get("/external", getExternalRecommendation);
router.get("/open_ai", getRecommendationAI);

module.exports = router;
