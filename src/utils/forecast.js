const postman_request = require("postman-request")

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=01d2c5fd4371f17950ae761589cc0caf&query=' + latitude + ',' + longitude + '&units=f'
        postman_request({url, json:true}, (error,{body}) =>{
        if(error){
            callback("unable to connect to weather service!", undefined)
        } else if(body.error){
            callback("unable to find location!")
        } else{
            callback(undefined, "Temperature is " + body.current.temperature + " but it feels like " + body.current.feelslike + " and there is " + body.current.precip + "% chance of rain")
        }
    })
}

module.exports = forecast