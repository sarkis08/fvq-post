const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

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


// Verify JWT Token passed from client
const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);

        } catch (err) {
            throw new AuthenticationError('Your session has expired. Please signin again!')

        }
    }
}

// Create Apollo/GraphQL Server uisng typeDefs, resolvers, and context objects
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers['authorization'];

        return { User, Post, currentUser: await getUser(token) };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);

});