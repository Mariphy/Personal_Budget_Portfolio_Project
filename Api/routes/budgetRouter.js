const express = require('express');
const budgetRouter = express.Router();
const database = require('../DB/queries');


budgetRouter.post('/', database.createBudget);
budgetRouter.get('/:budgetId', database.getBudgetById);
budgetRouter.get('/', database.getBudget);
budgetRouter.delete('/:budgetId', database.deleteBudget);
budgetRouter.put('/:budgetId', database.updateBudget);

module.exports = budgetRouter;