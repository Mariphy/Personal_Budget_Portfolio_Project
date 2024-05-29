const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const envelopesRouter = require('./routes/envelopesRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('js-yaml');
const fs = require('fs');
const budgetRouter = require('./routes/budgetRouter');
require('dotenv').config();

const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8')); 

const server = express();
module.exports = server;

const PORT = process.env.PORT || 4001;

// setup static 
//app.use(express.static('./public'));

// middware 
server.use(bodyParser.json());
server.use(morgan('short'));
server.use(cors());

server.use(express.urlencoded({ extended: false }));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//envelopes router
server.use('/api/envelopes', envelopesRouter);

//budget router
server.use('/api/budget', budgetRouter)

//transactions router

//home page
server.get('/', (req, res, next) => {
  res.send('<h1>Personal Budget Manager</h1><a href="/api/envelopes">Envelopes</a>')
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



