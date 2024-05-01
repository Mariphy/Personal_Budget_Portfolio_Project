const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

module.exports = app;


const PORT = process.env.PORT || 4001;

/*// Add middleware for handling CORS requests from index.html
app.use(cors());*/

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

/*app.use((req, res, next) => {
  morgan('short');
  next();
});*/

const envelopesRouter = require('./server/envelopesRouter');

envelopesRouter.post('/', (req, res, next) => {
  let newEnvelope = {};
  let id = 0;
  newEnvelope.id = id+1;
  newEnvelope.name = req.params.name;
  newEnvelope.amount = req.params.amount;
  res.send(newEnvelope);
});

envelopesRouter.get('/', (req, res) => {
    res.send('Hello World!')
});
  
app.use('/envelopes', envelopesRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



