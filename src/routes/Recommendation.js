const express = require("express");
const router = express.Router();

const { getRecommendation } = require("../controllers/CustomRecommendation");
const {
  getExternalRecommendation,
} = require("../controllers/ExternalRecommendation");
const { getRecommendationAI } = require("../controllers/RecommendationAI");

router.get("/custom", getRecommendation);
router.get("/external", getExternalRecommendation);
router.get("/open_ai", getRecommendationAI);

module.exports = router;
