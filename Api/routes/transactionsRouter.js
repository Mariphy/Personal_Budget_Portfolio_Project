const express = require('express');
const transactionsRouter = express.Router();
const database = require('../DB/queries');


transactionsRouter.post('/', database.createTransaction);
transactionsRouter.get('/:transactionId', database.getTransactionById);
transactionsRouter.get('/', database.getTransactions);
transactionsRouter.delete('/:transactionId', database.deleteTransaction);
//transactionsRouter.put('/:transactionId', database.updateTransaction);

module.exports = transactionsRouter;