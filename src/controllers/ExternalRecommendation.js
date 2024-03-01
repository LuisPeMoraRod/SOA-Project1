const statusCodes = require("../constants/statusCodes");
const getTypes = require("../constants/externalDictionary")
const helpers = require("../helpers/RecommendationHelpers")

const server = "https://meal-recommendation.azurewebsites.net/api/Meal"


async function fetchData(url, next) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = new Error("Error while requesting our service");
      err.status = response.status;
      throw err;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    if (next) {
      next(error);
    }
    throw error;
  }
}

/**
 * Handle external recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getExternalRecommendation = (req, res) => {
  const query = req.query; // query params
  var responseApi = {}

  const queryLength = Object.keys(query).length;
  const firstParameter = Object.keys(query)[0]
  const firstParameterValue = Object.values(query)[0]
  const body = `?SourceType=Local&MealName1=${firstParameterValue}&CourseType1=${getTypes[firstParameter]}`;
  if (queryLength === 2) {
    const secondParameter = Object.keys(query)[1]
    const secondParameterValue = Object.values(query)[1]
    body = body + `&MealName2=${secondParameterValue}&CourseType2=${getTypes[secondParameter]}`; 
  }

  const apiUrl = server + body

  fetchData(apiUrl, handleNextFunction)
  .then(jsonResponse => {
    console.log(jsonResponse);
      const recommendation1 = jsonResponse.data.RecommendedMeals[0].Name
      const type1 = jsonResponse.data.RecommendedMeals[0].CourseTyp
      if (queryLength === 1){
        const recommendation2 = jsonResponse.data.RecommendedMeals[1].Name
        const type2 = jsonResponse.data.RecommendedMeals[1].CourseType
        responseApi = helpers.writeResponse(responseApi, firstParameter, getTypes[type1], getTypes[type2], firstParameterValue, recommendation1, recommendation2)
      }
      responseApi = helpers.writeResponse(responseApi, firstParameter,secondParameter, getTypes[type1], firstParameterValue, secondParameterValue, recommendation1)
  })
  .catch(error => {
    console.error("Unknown error:", error);
  });

  return res.status(statusCodes.OK).json(responseApi);
};


module.exports = {
  getExternalRecommendation,
};
