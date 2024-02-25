const express = require("express"); //Import express framework module
const app = express(); //Main express app
const port = process.env.PORT || 8080; //Define port: first checks if available in environment variables

const recommendationRoutes = require("./routes/Recommendation");
app.use("/recommendation", recommendationRoutes); //Define path for recommendation requests

app.listen(port, () => console.log(`Service listening on port ${port}...`));
