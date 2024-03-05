const statusCodes = require("../constants/statusCodes");
const helpers = require("../helpers/RecommendationHelpers")
const OpenAI = require( "openai");

/**
 * Handle AI recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRecommendationAI = async (req, res, next) => {
  try {
    const query = req.query; // query params

    const openai = new OpenAI();
    openai.api_key = process.env.OPENAI_API_KEY;
      
    const queryLength = Object.keys(query).length;
    const firstParameter = Object.keys(query)[0]
    const secondParameter = Object.keys(query)[1]
    const firstParameterValue = Object.values(query)[0]
    const secondParameterValue = Object.values(query)[1]

    var response = {}

    if (queryLength === 2) {
      if (firstParameterValue === '' || secondParameterValue === '') {
        return notFoundError(next);
      } else {
        const missingParameter = helpers.getOneMissingParameter(firstParameter, secondParameter);

        const request = await openai.chat.completions.create({
          messages: [{ role: "system", content: "You are an expert chef and have to give recommendations for meals to go with in spanish. JUST THE NAME, NO EXTRA TEXT"},
          {"role": "user", "content": `What ${missingParameter} do you recommend to go with ${firstParameterValue} and ${secondParameterValue}`}],
          model: "gpt-3.5-turbo",
        });

        const missingParameterValue = request.choices[0].message.content
        response = helpers.writeResponse(response, firstParameter, secondParameter, missingParameter, firstParameterValue, secondParameterValue, missingParameterValue)
        }
      } else {
        if (firstParameterValue === '') {
          return notFoundError(next);
        } else {
          const missingParameters = helpers.getTwoMissingParameter(firstParameter);

          const firstRequest = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert chef and have to give recommendations for meals to go with in spanish. JUST THE NAME, NO EXTRA TEXT"},
            {"role": "user", "content": `What ${missingParameters[0]} do you recommend to go with ${firstParameterValue}`}],
            model: "gpt-3.5-turbo",
          });
      
          const secondRequest = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert chef and have to give recommendations for meals to go with in spanish. JUST THE NAME, NO EXTRA TEXT"},
            {"role": "user", "content": `What ${missingParameters[1]} do you recommend to go with ${firstParameterValue}`}],
            model: "gpt-3.5-turbo",
          });
      
          const missingParameterValue1 = firstRequest.choices[0].message.content
          const missingParameterValue2 = secondRequest.choices[0].message.content
          response = helpers.writeResponse(response, firstParameter, missingParameters[0], missingParameters[1], firstParameterValue, missingParameterValue1, missingParameterValue2)
        }
    }
    
    return res.status(statusCodes.OK).json(response);

  } catch (error) {
    return internalError(next)
  }
};

function internalError(next) {

  const err = new Error("Internal server error, an error occured trying to connect with OpenAI");
  err.status = statusCodes.INTERNAL_SERVER_ERROR;
  return next(err);
  
};

function notFoundError(next) {

  const err = new Error("Could not find a recommendation for that meal");
  err.status = statusCodes.NOT_FOUND;
  return next(err);
  
};

module.exports = {
  getRecommendationAI,
};
