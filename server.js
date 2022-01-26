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
    }
    enum Units {
        standard
        metric
        imperial
    }
    type Query {
        getWeather(zip: Int!, units: Units): Weather!
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
        if (cod == 200) {
            const temperature = json.main.temp
            const description = json.weather[0].description
            const temp_min = json.main.temp_min
            const temp_max = json.main.temp_max
            const pressure = json.main.pressure
            const humidity = json.main.humidity
            return { temperature, description, temp_min, temp_max, pressure, humidity, cod }
        } else {
            const temperature = null
            const description = null
            const temp_min = null
            const temp_max = null
            const pressure = null
            const humidity = null
            return { temperature, description, temp_min, temp_max, pressure, humidity, cod }
        }
        
        
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