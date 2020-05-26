const postman_request = require("postman-request")

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmhhcmR3YWp0YXJ1bjc4IiwiYSI6ImNrYWdvcG1wcjA2cHUycW8xdnR5djhrbmoifQ.kLhVIPh_Dyps57FXGztF8g&limit=1"
    postman_request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("error in accessing mapbox API", undefined)
        } else if(body.features.length === 0){
            callback("can't find any places. Search for another place")
        } else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode