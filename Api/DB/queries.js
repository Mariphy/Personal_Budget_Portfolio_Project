const db = require('./index');

const getEnvelopes = (req, res) => {
    db.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

const getBudget = (req, res) => {
  db.query('SELECT * FROM budget ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
};

const getTransactions = (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
};

const getEnvelopeById = (req, res) => {
  const id = req.params.envelopeId;

  db.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
  })
};

const getBudgetById = (req, res) => {
  const id = req.params.budgetId;

  db.query('SELECT * FROM budget WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
  })
};

const getTransactionById = (req, res) => {
  const id = req.params.transactionId;

  db.query('SELECT * FROM transactions WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
  })
};

const createEnvelope = (req, res) => {
  const {name, amount, budget_id} = req.body;

  db.query('INSERT INTO envelopes (name, amount, budget_id) VALUES ($1, $2, $3) RETURNING *', [name, amount, budget_id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(201).send(`Envelope added with ID: ${results.rows[0].id}`)
  })
};

const createBudget = (req, res) => {
  const {amount} = req.body;
  db.query('INSERT INTO budget (amount) VALUES ($1) RETURNING *', [amount], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Amount added`)
  })
};

const createTransaction = (req, res) => {
  const {date, amount, recipient, envelope_id} = req.body;
  db.query('UPDATE envelopes SET amount = amount - $1 WHERE id = $2', [amount, envelope_id], (error, results) => {
    if (error) {
      throw error
    }
  });
  db.query('UPDATE budget SET amount = amount - $1 WHERE id = 1', [amount], (error, results) => {
    if (error) {
      throw error
    }
  });
  db.query('INSERT INTO transactions (date, amount, recipient, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *', [date, amount, recipient, envelope_id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Transaction added`)
  });
  
};

const updateEnvelope = (req, res) => {
  const id = req.params.envelopeId;
  const {name, amount} = req.body;
  db.query (
    'UPDATE envelopes SET name = $1, amount = $2 WHERE id = $3',
    [name, amount, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Envelope modified with ID: ${id}`)
    }
  )
};

const updateBudget = (req, res) => {
  const id = req.params.budgetId;
  const {amount} = req.body;
  db.query (
    'UPDATE budget SET amount = $1 WHERE id = $2',
    [amount, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Budget modified with ID: ${id}`)
    }
  )
};



const deleteEnvelope = (req, res) => {
  const id = req.params.envelopeId;

  db.query ('DELETE FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Envelope deleted with ID: ${id}`)
  })
};

const deleteBudget = (req, res) => {
  const id = req.params.budgetId;

  db.query ('DELETE FROM budget WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Budget deleted with ID: ${id}`)
  })
};

const deleteTransaction = (req, res) => {
  const id = req.params.transactionId;

  db.query ('DELETE FROM transactions WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`transaction deleted with ID: ${id}`)
  })
};

module.exports = {getEnvelopes, 
  getEnvelopeById, 
  createEnvelope, 
  updateEnvelope, 
  deleteEnvelope,
  createBudget,
  getBudget,
  getBudgetById,
  deleteBudget,
  updateBudget,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  createTransaction,
  //updateTransaction
};