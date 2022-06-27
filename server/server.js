require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/db');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const port = process.env.PORT || 4000;
connectionDB();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'developement',
	})
);

app.listen(port, () => console.log(`server is running on ${port}`));
