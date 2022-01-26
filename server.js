// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// schema
const schema = buildSchema(`
    type Test {
        message: String!
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