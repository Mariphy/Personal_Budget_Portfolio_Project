const db = require('./index');

const getEnvelopes = (req, res) => {
    db.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

const getEnvelopeById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
  })
};

const createEnvelope = (req, res) => {
  const {name, amount} = req.body;

  db.query('INSERT INTO envelopes (name, amount) VALUES ($1, $2) RETURNING *', [name, amount], (error, results) => {
    if (error) {
        throw error
    }
    res.status(201).send(`Envelope added with ID: ${results.rows[0].id}`)
  })
};

module.exports = {getEnvelopes, getEnvelopeById, createEnvelope};