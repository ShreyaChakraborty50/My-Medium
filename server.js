const express = require("express");
const app = express();
const router = require("./routes/index.js");
const { globalError } = require("./errorHandler/globalError.js");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(globalError);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
