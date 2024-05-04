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

  envelopesRouter.delete('/:envelopeId', (req, res) => {
    const {envelopeId} = req.params;
    const envelopeIndex = database.findIndex((envelope) => envelope.id === Number(envelopeId));
    if(!envelopeIndex) {
      return res.status(404).send('Envelope does not exist')
    }
    database.splice(envelopeIndex, 1)
    res.status(200).send(database);
  });

  envelopesRouter.put('/:envelopeId', (req, res) => {
    const {envelopeId} = req.params;
    const {name, amount} = req.body;
    const envelopeToUpdate = database.find((envelope) => envelope.id === Number(envelopeId));
    if(!envelopeToUpdate) {
      return res.status(404).send('Envelope does not exist')
    }
    const updatedEnvelope = database.map((envelope) => {
      if (envelope.id === Number(envelopeId)) {
        envelope.name = name;
        envelope.amount = amount;
      }
      return envelopeToUpdate;
    });
    res.status(200).json({status: "updated", data: database});
  });

module.exports = envelopesRouter;