const express = require('express');
const budgetRouter = express.Router();
const database = require('../controllers/queries');


budgetRouter.post('/', database.createBudget);
budgetRouter.get('/:budgetId', database.getBudgetById);
budgetRouter.delete('/:budgetId', database.deleteBudget);
budgetRouter.put('/:budgetId', database.updateBudget);

module.exports = budgetRouter;