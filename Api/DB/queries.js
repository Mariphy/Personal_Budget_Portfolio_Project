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

/*const getTransactions = (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      res.status(200).json(results.rows)
  })
};*/

const getEnvelopeById = (req, res) => {
  const id = req.params.envelopeId;

  db.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Envelope with ID ${id} does not exist`);
    } else {
      res.status(200).json(results.rows)
    }
  })
};

const getBudgetById = (req, res) => {
  const id = req.params.budgetId;

  db.query('SELECT * FROM budget WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Budget with ID ${id} does not exist`);
    } else {
      res.status(200).json(results.rows)
    }
  })
};

const getTransactionByEnvelope = (req, res) => {
  console.log(req.params)
  const envelopeId = req.params.envelopeId;
  console.log(envelopeId)

  db.query('SELECT * FROM transactions WHERE envelope_id = $1', [envelopeId], (error, results) => {
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
    if (results.rows.length === 0) {
      res.status(404).send(`Envelope with ID ${id} does not exist`);
    } else {
      res.status(200).json(results.rows)
    }
  })
};

const createEnvelope = (req, res) => {
  const {name, amount, budget_id} = req.body;

  db.query('INSERT INTO envelopes (name, amount, budget_id) VALUES ($1, $2, $3) RETURNING *', [name, amount, budget_id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(201).json({message:`Envelope added with ID: ${results.rows[0].id}`, data: results.rows})
  })
};

const createBudget = (req, res) => {
  const {amount} = req.body;
  if (amount === null) {
    res.status(400).json({message: "budget not created"})
  };  
  db.query('INSERT INTO budget (amount) VALUES ($1) RETURNING *', [amount], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).json({message: "Amount added"})
  });
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
  const {name, amount, budget_id} = req.body;
  db.query (
    'UPDATE envelopes SET name = $1, amount = $2 , budget_id = $3 WHERE id = $4',
    [name, amount, budget_id, id],
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

const updateTransaction = async (req, res) => {
  const id = req.params.transactionId;
  console.log(id)
  let previousAmount;
  try {
    const results = await db.query('SELECT amount FROM transactions WHERE id = $1', [id]);
    previousAmount = results.rows[0].amount;
  } catch (error) {
    throw error
  }

  console.log(previousAmount)
  const {date, amount, recipient, envelope_id} = req.body;
  if (previousAmount === amount) {
    db.query (
      'UPDATE transactions SET date = $1, amount = $2, recipient = $3, envelope_id = $4 WHERE id = $5',
      [date, amount, recipient, envelope_id, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Transaction modified with ID: ${id}`)
      }
    )
  } else {
    db.query('UPDATE envelopes SET amount = amount + $1 - $2 WHERE id = $3', [previousAmount, amount, envelope_id], (error, results) => {
      if (error) {
        throw error
      }
    });
    db.query('UPDATE budget SET amount = amount + $1 - $2 WHERE id = 1', [previousAmount, amount], (error, results) => {
      if (error) {
        throw error
      }
    });
    db.query (
      'UPDATE transactions SET date = $1, amount = $2, recipient = $3, envelope_id = $4 WHERE id = $5',
      [date, amount, recipient, envelope_id, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Transaction modified with ID: ${id}`)
      }
    )
  }
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

const deleteTransaction = async (req, res) => {
  const id = req.params.transactionId;
  const envelope_id = req.params.envelopeId;
  let previousAmount;
  try {
    const results = await db.query('SELECT amount FROM transactions WHERE id = $1', [id]);
    if (results.rows[0]) {
      previousAmount = results.rows[0].amount;
    } else {
      return res.status(404).send(`No transaction found with ID: ${id}`);
    }
  } catch (error) {
    throw error
  }

  console.log(previousAmount);

  try {
    await db.query('UPDATE envelopes SET amount = amount + $1 WHERE id = $2', [previousAmount, envelope_id]);
    await db.query('UPDATE budget SET amount = amount + $1 WHERE id = 1', [previousAmount]);
    await db.query ('DELETE FROM transactions WHERE id = $1', [id]);
    res.status(200).send(`transaction deleted with ID: ${id}`);
  } catch (error) {
    throw error
  }
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
  //getTransactions,
  getTransactionById,
  deleteTransaction,
  createTransaction,
  getTransactionByEnvelope,
  updateTransaction
};