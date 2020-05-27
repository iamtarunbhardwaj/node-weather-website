const postman_request = require("postman-request")

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=01d2c5fd4371f17950ae761589cc0caf&query=' + latitude + ',' + longitude + '&units=m'
        postman_request({url, json:true}, (error,{body}) =>{
        if(error){
            callback("unable to connect to weather service!", undefined)
        } else if(body.error){
            callback("unable to find location!")
        } else{
            callback(undefined, body.current.weather_descriptions + ". Temperature is " + body.current.temperature + " degree celcius but it feels like " + body.current.feelslike + " degree celcius. Humidity is " + body.current.humidity + " and there is " + body.current.precip + "% chance of rain.")
        }
    })
}

module.exports = forecast