const express = require('express');
const envelopesRouter = express.Router();
const database = require('../DB/queries');

envelopesRouter.post('/', database.createEnvelope);  
envelopesRouter.get('/', database.getEnvelopes); 
envelopesRouter.get('/:envelopeId', database.getEnvelopeById);
envelopesRouter.delete('/:envelopeId', database.deleteEnvelope);
envelopesRouter.put('/:envelopeId', database.updateEnvelope);

module.exports = envelopesRouter;