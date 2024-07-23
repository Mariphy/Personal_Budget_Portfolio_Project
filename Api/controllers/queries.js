const db = require('../config/index');

const getEnvelopes = async (req, res) => {
  try {
    const envelopes = await db.query('SELECT * FROM envelopes ORDER BY id ASC');
    if (envelopes.rowCount < 1) {
      return res.status(404).send({message: "Records not found"});
    }
    res.status(200).json({data: envelopes.rows})
  } catch(error) {
    res.status(500).json({ error: 'An error occurred while fetching envelopes' });
  }
};

const getBudget = async (req, res) => {
  try {
    const budget = await db.query('SELECT * FROM budget ORDER BY id ASC');
    if (budget.rowCount < 1) {
      return res.status(404).send({message: "Records not found"});
    }
    res.status(200).json({data: budget.rows})
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching budget' });
  }
};

const getEnvelopeById = async (req, res) => {
  const id = req.params.envelopeId;

  if (!id) {
    return res.status(400).json({ error: 'Envelope ID is required' });
  }

  try {
    const envelope = await db.query('SELECT * FROM envelopes WHERE id = $1', [id]);
    if (envelope.rows.length === 0) {
      res.status(404).send({message: `Envelope with ID ${id} does not exist`});
    } else {
      res.status(200).json({data: envelope.rows});
    }
  } catch(error) {
    res.status(500).json({ error: 'An error occurred while fetching envelope' });
  }

};

const getBudgetById = async (req, res) => {
  const id = req.params.budgetId;

  if (!id) {
    return res.status(400).json({ error: 'Budget ID is required' });
  }

  try {
    const budget = await db.query('SELECT * FROM budget WHERE id = $1', [id]);
    if (budget.rows.length === 0) {
      res.status(404).send({message: `Budget with ID ${id} does not exist`});
    } else {
      res.status(200).json({data: budget.rows})
    }
  } catch(error) {
    res.status(500).json({ error: 'An error occurred while fetching budget' });
  }
};

const getTransactionByEnvelope = async (req, res) => {
  const envelopeId = req.params.envelopeId;

  try {
    const transactions = await db.query('SELECT * FROM transactions WHERE envelope_id = $1', [envelopeId]);
    if (transactions.rows.length === 0) {
      res.status(404).send({message: `No transactions for this envelope`});
    } else {
      res.status(200).json({data: transactions.rows});
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
};

const getTransactionById = async (req, res) => {
  const id = req.params.transactionId;

  if (!id) {
    return res.status(400).json({ error: 'Transaction ID is required' });
  };

  try {
    const transaction = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    if (transaction.rows.length === 0) {
      res.status(404).send({message: `Transaction with ID ${id} does not exist`});
    } else {
      res.status(200).json({data: transaction.rows})
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transaction' });
  }
};

const createEnvelope = async (req, res) => {
  const {name, amount, budget_id} = req.body;
  const totalAmountQuery = `WITH total_amount AS (
      SELECT SUM(amount) AS total
      FROM envelopes 
      WHERE budget_id = $1
    ),
    current_budget AS (
      SELECT amount 
      FROM budget
      WHERE id = $1
    )
    SELECT total_amount.total, current_budget.amount,
      CASE 
        WHEN total_amount.total < current_budget.amount THEN 'true'
        ELSE 'false'
      END
    FROM total_amount, current_budget`;
  try {
    const result = await db.query(totalAmountQuery, [budget_id]);

    if (result.rows[0].case === 'false') {
      res.status(200).send({ message: 'You went over budget, consider another amount' });
    } else {
      const newEnvelope = await  db.query('INSERT INTO envelopes (name, amount, budget_id) VALUES ($1, $2, $3) RETURNING *', [name, amount, budget_id]);
      res.status(201).json({message:`Envelope added with ID: ${newEnvelope.rows[0].id}`, data: newEnvelope.rows})
    }
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating envelope' });
  }
};

const createBudget = async (req, res) => {
  const {amount} = req.body;
  
  try {
    if (!amount) {
      res.status(400).json({message: "budget not created"})
    } else {
      const newBudget = await  db.query('INSERT INTO budget (amount) VALUES ($1) RETURNING *', [amount]);
      res.status(201).json({message:`Budget added with ID: ${newBudget.rows[0].id}`, data: newBudget.rows});
    }  
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating budget' });
  }
};

const createTransaction = async (req, res) => {
  const {date, amount, recipient} = req.body;
  const envelope_id = req.params.envelopeId;

  if (!envelope_id || !date || !amount || !recipient) {
    return res.status(400).json({ error: 'More data required' });
  };

  try{
    await db.query('BEGIN');
    const transaction = await db.query('INSERT INTO transactions (date, amount, recipient, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *', [date, amount, recipient, envelope_id]);
    await db.query('UPDATE envelopes SET amount = amount - $1 WHERE id = $2', [amount, envelope_id]);
    await db.query('UPDATE budget SET amount = amount - $1 WHERE id = 1', [amount]);
    await db.query('COMMIT');

    res.status(201).send({message: `Transaction added`, data: transaction.rows[0]});


  } catch(error) {
    await db.query('ROLLBACK');
    res.status(500).send({error: 'An error occurred while adding transaction' })
  }
};

const updateEnvelope = async (req, res) => {
  const id = req.params.envelopeId;
  const {name, amount, budget_id} = req.body;

  try {
    const updatedEnvelope = await db.query (
      'UPDATE envelopes SET name = $1, amount = $2 , budget_id = $3 WHERE id = $4',
      [name, amount, budget_id, id]);
    res.status(200).send({message: `Envelope modified with ID: ${id}`, data: updatedEnvelope.rows[0]})  
  } catch(error) {
    return res.status(500).send({error: 'An error occurred while updating envelope'});
  }
 
};

const updateBudget = async (req, res) => {
  const id = req.params.budgetId;
  const {amount} = req.body;

  try {
    const updatedBudget = await  db.query (
      'UPDATE budget SET amount = $1 WHERE id = $2',
      [amount, id]);
    res.status(200).send({message: `Budget modified with ID: ${id}`, data: updatedBudget.rows[0]})  
  } catch(error) {
    return res.status(500).send({error: 'An error occurred while updating budget'});
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.transactionId;
  const {date, amount, recipient, envelope_id} = req.body;
  const budget_id = 1;

  try{
    await db.query('BEGIN');
    const updatedTransaction = await db.query( 'UPDATE transactions SET date = $1, amount = $2, recipient = $3, envelope_id = $4 WHERE id = $5',
      [date, amount, recipient, envelope_id, id]);
    const previousAmount = await db.query("SELECT amount FROM transactions WHERE id = $1", [id]);  
    await db.query  ('UPDATE envelopes SET amount = amount + $1 - $2 WHERE id = $3', [previousAmount, amount, envelope_id]);
    await db.query('UPDATE budget SET amount = amount + $1 - $2 WHERE id = $3', [previousAmount, amount, budget_id]);
    await db.query('COMMIT');
    res.status(200).send({message: `Transaction modified with ID: ${id}`, data: updatedTransaction.rows[0]});
  } catch(error) {
    await db.query('ROLLBACK');
    res.status(500).send({error: 'An error occurred while adding transaction' });
  }

};

const deleteEnvelope = async (req, res) => {
  const id = req.params.envelopeId;
  
  try{
    const deletedEnvelope = await db.query ('DELETE FROM envelopes WHERE id = $1', [id]);
    res.status(204).send(`Envelope deleted with ID: ${id}`);
  } catch(error) {
    return res.status(500).send({error: 'An error occurred while deleting envelope'});
  }
};

const deleteBudget = async (req, res) => {
  const id = req.params.budgetId;

  try{
    const deletedEnvelope = await db.query ('DELETE FROM budget WHERE id = $1', [id]);
    res.status(200).send(`Budget deleted with ID: ${id}`);
  } catch(error) {
    return res.status(500).send({error: 'An error occurred while deleting budget'});
  }  
 
}
const deleteTransaction = async (req, res) => {
  const id = req.params.transactionId;
  const envelope_id = req.params.envelopeId;

  try {
    await db.query('BEGIN');
    const previousAmount = await db.query('SELECT amount FROM transactions WHERE id = $1', [id]);
    if (!previousAmount.rows[0]) {
      return res.status(404).send(`No transaction found with ID: ${id}`);
    }
    await db.query('UPDATE envelopes SET amount = amount + $1 WHERE id = $2', [previousAmount, envelope_id]);
    await db.query('UPDATE budget SET amount = amount + $1 WHERE id = 1', [previousAmount]);
    await db.query ('DELETE FROM transactions WHERE id = $1', [id]);
    await db.query('COMMIT');
    res.status(200).send(`Transaction deleted with ID: ${id}`);
  } catch(error) {
    await db.query('ROLLBACK');
    res.status(500).send({error: 'An error occurred while adding transaction' });
  }
};

module.exports = { getEnvelopes, 
  getEnvelopeById, 
  createEnvelope, 
  updateEnvelope, 
  deleteEnvelope,
  createBudget,
  getBudget,
  getBudgetById,
  deleteBudget,
  updateBudget,
  getTransactionById,
  deleteTransaction,
  createTransaction,
  getTransactionByEnvelope,
  updateTransaction
}