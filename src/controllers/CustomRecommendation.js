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

  const queryLength = Object.keys(query).length;
  const firstParameter = Object.keys(query)[0]
  const secondParameter = Object.keys(query)[1]
  const firstParameterValue = Object.values(query)[0]
  const secondParameterValue = Object.values(query)[1]

  var response = {}

  if (queryLength === 2) {
    
    const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
    const secondParameterIndex = data[secondParameter].findIndex(item => item.name === secondParameterValue);

    if (firstParameterIndex === secondParameterIndex) {
      
      const missingParameter = getTwoMissingParameter(firstParameter, secondParameter);
      const missingParameterValue = data[missingParameter][firstParameterIndex].name
      response = writeResponse(response, firstParameter, secondParameter, missingParameter, firstParameterValue, secondParameterValue, missingParameterValue)
    }

  }
  else {

    const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
    const missingParameters = getOneMissingParameter(firstParameter);
    const missingParameterValue1 = data[missingParameters[0]][firstParameterIndex].name
    const missingParameterValue2 = data[missingParameters[1]][firstParameterIndex].name
    response = writeResponse(response, firstParameter, missingParameters[0], missingParameters[1], firstParameterValue, missingParameterValue1, missingParameterValue2)
    
  }

  return res.status(statusCodes.OK).json(response);
};

const writeResponse = (response, key1, key2, key3, value1, value2, value3) => {
  response[key1] = value1;
  response[key2] = value2;
  response[key3] = value3;
  return response
}

const getTwoMissingParameter = (foodType1, foodType2) => {
  const foodTypes = ["meal", "dessert", "drink"];
  
  if (!foodTypes.includes(foodType1) || !foodTypes.includes(foodType2)) {
    return "Invalid food type";
  }

  if (foodType1 === foodType2) {
    return "Same food type";
  }

  const missingFoodType = foodTypes.find(type => type !== foodType1 && type !== foodType2);
  return missingFoodType;
};

const getOneMissingParameter = (foodType) => {
  const foodTypes = ["meal", "dessert", "drink"];

  if (!foodTypes.includes(foodType)) {
    return "Invalid food type";
  }

  const missingFoodTypes = foodTypes.filter(type => type !== foodType);
  return missingFoodTypes;
};


module.exports = {
  getRecommendation,
};