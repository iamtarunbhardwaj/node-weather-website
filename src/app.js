const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Defining Path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsDirectoryPath = path.join(__dirname, "../templates/views")
const partialsDirectoryPath = path.join(__dirname, "../templates/partials")

//use public directory in express
app.use(express.static(publicDirectoryPath))

//setup views directory and partials directory
app.set("view engine", "hbs")
app.set("views", viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//home route
app.get("", (req,res) =>{
    res.render("index", {
        title: "Weather App",
        name: "Tarun Bhardwaj"
    })
})

//about page route
app.get("/about", (req,res) => {
    res.render("about", {
        title: "About the developer",
        name: "Tarun Bhardwaj"
    })
})

//help route
app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help Page",
        msg: "If you need help then go through this page",
        name: "Tarun Bhardwaj"
    })
})

//weather route ---> get location from the user
app.get("/weather", (req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                address,
                location
            })
        })
    })
    
})

//error page on Help route
app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "404",
        name: "Tarun Bhardwaj",
        errorMsg: "Help article not found"
    })
})

//error page 404 
app.get("*", (req,res) => {
    res.render("404", {
        title: "404",
        name: "Tarun Bhardwaj",
        errorMsg: "Page not found"        
    })
})


app.listen(port, () => {
    console.log("server is up and running on port " + port)
})