const express = require('express');
const envelopesRouter = express.Router();
const database = require('../controllers/queries');

envelopesRouter.post('/', database.createEnvelope);  
envelopesRouter.get('/', database.getEnvelopes); 
envelopesRouter.get('/:envelopeId', database.getEnvelopeById);
envelopesRouter.delete('/:envelopeId', database.deleteEnvelope);
envelopesRouter.put('/:envelopeId', database.updateEnvelope);


envelopesRouter.post('/:envelopeId/transactions', database.createTransaction);
envelopesRouter.get('/:envelopeId/transactions/:transactionId', database.getTransactionById);
envelopesRouter.get('/:envelopeId/transactions', database.getTransactionByEnvelope);
envelopesRouter.delete('/:envelopeId/transactions/:transactionId', database.deleteTransaction);
envelopesRouter.put('/:envelopeId/transactions/:transactionId', database.updateTransaction);

module.exports = envelopesRouter;