const express = require("express");
const https=require("https");
const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=2f8db4840cb236cd4c311f7e860db966";
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp);
            const weatherDesc = weatherData.weather[0].description
            console.log(weatherDesc);
        })
    })
    
    res.send("Server is up and running.")
})


app.listen(8080, function() {
    console.log("Server is running on port 8080.")
})