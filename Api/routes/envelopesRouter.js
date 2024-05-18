//import * as db from '../DB/index';
const express = require('express');
const envelopesRouter = express.Router();
const database = require('../DB/queries');

/*
app.get('/:id', async (req, res, next) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
  res.send(result.rows[0])
})
*/
envelopesRouter.post('/', database.createEnvelope);
  
  envelopesRouter.get('/', database.getEnvelopes);
  
  envelopesRouter.get('/:envelopeId', database.getEnvelopeById);

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