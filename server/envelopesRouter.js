const express = require('express');
const envelopesRouter = express.Router();
let database = require('./envelopes.js');

envelopesRouter.post('/', (req, res, next) => {
    let newEnvelope = {};
    newEnvelope.id = database.length + 1;
    newEnvelope.name = req.body.name;
    newEnvelope.amount = req.body.amount;
    if(!newEnvelope.name || !newEnvelope.amount) {
        res.status(400).send('Please, enter a name for you envelope and amount of money you want to allocate to it');
    }; 
    database.push(newEnvelope)
    res.status(201).send(newEnvelope);
  });
  
  envelopesRouter.get('/', (req, res) => {
      res.status(200).send(database);
  });
  
  envelopesRouter.get('/:envelopeId', (req, res, next) => {
    const {envelopeId} = req.params;
    const singleEnvelope = database.find((envelope) => envelope.id === Number(envelopeId));
    if(!singleEnvelope) {
      return res.status(404).send('Envelope does not exist')
    }
    res.json(singleEnvelope);
  });

module.exports = envelopesRouter;