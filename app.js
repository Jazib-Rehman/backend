const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const connection = require("./config/config");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const {
  adminRoutes,
  serviceRoutes,
} = require("./api/routes/routes");

// mongodb connection
connection;

app.use(cors({ "Access-Control-Allow-Origin": "*" }));
app.use(jsonParser);
app.use(express.json({ extended: false }));
app.use(urlencodedParser);
app.use(express.static("public"));

app.use("/user", adminRoutes);
app.use("/service", serviceRoutes);

const PORT = process.env.PORT || 2020;
server.listen(PORT, () => console.log("listening port 2020"));
