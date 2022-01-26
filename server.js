// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()
const fetch = require('node-fetch')

// schema
const schema = buildSchema(`
    type Weather {
        temperature: Float!
        description: String!
    }
    type Query {
        getWeather(zip: Int!): Weather!
    }
`)

// resolvers
const root = {
    getWeather: async ({ zip }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
        const res = await fetch(url)
        const json = await res.json()
        const temperature = json.main.temp
        const description = json.weather[0].description
        return { temperature, description }
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