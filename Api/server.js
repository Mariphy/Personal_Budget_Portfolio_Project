const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
let database = require('./server/envelopes.js');
const envelopesRouter = require('./server/envelopesRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8')); 

module.exports = app;

const PORT = process.env.PORT || 4001;

// setup static 
//app.use(express.static('./public'));

// middware 
app.use(bodyParser.json());
app.use(morgan('short'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//envelopes router
app.use('/api/envelopes', envelopesRouter);

//home page
/*app.get('/', (req, res, next) => {
  res.send('<h1>Personal Budget Manager</h1><a href="/api/envelopes">Envelopes</a>')
});*/

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



