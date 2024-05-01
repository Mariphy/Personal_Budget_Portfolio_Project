const express = require('express');
const app = express();
/*const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');*/

module.exports = app;


const PORT = process.env.PORT || 4001;

/*// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

app.use((req, res, next) => {
  morgan('short');
  next();
});*/


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



