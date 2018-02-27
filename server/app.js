require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

//use cors if in development
//not needed in prod because api also serves react app
if(process.env.NODE_ENV === "development"){
    const cors = require("cors");
    app.use(cors());
}

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//api routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

//serves react app on all other routes
app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "..", "dist/index.html"));
});

app.listen(8000, console.log("App is running"));