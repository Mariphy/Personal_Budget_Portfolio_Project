const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

const app = express();

const database = require('./server/envelopes.js');

module.exports = app;

const PORT = process.env.PORT || 4001;

// setup static 
app.use(express.static('./public'));

/*// middleware for handling CORS requests from index.html
app.use(cors());*/

// middware for parsing request bodies here:
app.use(bodyParser.json());

/*app.use((req, res, next) => {
  morgan('short');
  next();
});*/

const envelopesRouter = require('./server/envelopesRouter');

envelopesRouter.post('/', (req, res, next) => {
  newEnvelope = {};
  newEnvelope.id = database.length + 1;
  newEnvelope.name = req.params.name;
  newEnvelope.amount = req.params.amount;
  database.push(newEnvelope)
  res.send(database);
});

envelopesRouter.get('/', (req, res) => {
    res.json(database)
});
  
app.use('/envelopes', envelopesRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



