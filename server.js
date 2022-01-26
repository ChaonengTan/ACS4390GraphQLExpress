// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()
const fetch = require('node-fetch')

const apikey = process.env.OPENWEATHERMAP_API_KEY

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
    // 
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