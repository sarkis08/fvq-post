const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Import Environment Variable
require('dotenv').config({ path: 'variables.env' });

// Import Mongoose Models
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to Mlab Database
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('DB connected!'))
    .catch(err => console.error(err));



// Create Apollo/GraphQL Server uisng typeDefs, resolvers, and context objects
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);

});