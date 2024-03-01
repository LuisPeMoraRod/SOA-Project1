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
  fetch("request")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(data => data)
    .catch(error => console.error("Error fetching data:", error));

  return res.status(statusCodes.OK).json(data);
};

module.exports = {
  getExternalRecommendation,
};
