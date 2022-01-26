// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()
const fetch = require('node-fetch')

// schema
const schema = buildSchema(`
    type Weather {
        temperature: Float
        description: String
        feels_like: Float
        temp_min: Float
        temp_max: Float
        pressure: Int
        humidity: Int
        cod: Int!
        lon: Float
        lat: Float
        name: String
        message: String!
    }
    enum Units {
        standard
        metric
        imperial
    }
    type OneCallParam {
        temperature: Float
        feels_like: Float
        pressure: Int
        humidity: Int
    }
    type OneCall {
        timezone: String
        current: OneCallParam
        hourly: OneCallParam
        daily: OneCallParam
    }
    type Query {
        getWeather(zip: Int!, units: Units): Weather!
        oneCall(lat: Float!, lon: Float!): [OneCall]
    }
`)

// resolvers
const root = {
    getWeather: async ({ zip, units = 'imperial' }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
        const res = await fetch(url)
        const json = await res.json()
        const cod = json.cod
        console.log(json)
        if (cod == 200) {
            const message = 'success'

            const temperature = json.main.temp
            const description = json.weather[0].description
            const temp_min = json.main.temp_min
            const temp_max = json.main.temp_max
            const pressure = json.main.pressure
            const humidity = json.main.humidity
            const lon = json.coord.lon
            const lat = json.coord.lat
            const  name = json.name
            return { temperature, description, temp_min, temp_max, pressure, humidity, cod, lon, lat, name, message }
        } else {
            const message = json.message

            const temperature = null
            const description = null
            const temp_min = null
            const temp_max = null
            const pressure = null
            const humidity = null
            const lon = null
            const lat = null
            const name = null
            return { temperature, description, temp_min, temp_max, pressure, humidity, cod, lon, lat, name, message }
        }
    },
    // WIP: returning JSON dosent work
    oneCall: async ({ lon, lat }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&appid=${apikey}`
        const res = await fetch(url)
        const json = await res.json()
        
        const current = json.current
        const minutely = json.minutely
        const hourly = json.hourly
        const daily = json.daily
        return { current, minutely, hourly, daily }
    }
}

// app
const app = express()

// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = 4000
app.listen(port, () => {
    console.log('Running on port:'+port)
    console.log(`http://localhost:${port}/graphql`)
})