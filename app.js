const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const apiKey = "2f8db4840cb236cd4c311f7e860db966";
    const unit = "metric";
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<h1>The temperature in " + query + " is " + temp + "°C</h1>");
            res.write("<h3>The weather is currently " + weatherDesc + "</h3>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });
    });

});



app.listen(8080, function() {
    console.log("Server is running on port 8080.");
})