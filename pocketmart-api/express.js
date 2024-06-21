const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Validate environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Error: Environment variable ${varName} is not set.`);
        process.exit(1);
    }
});

// Database connection
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Graceful shutdown
const shutdown = () => {
    pool.end(() => {
        console.log('Closed database connection pool.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Route to add a new product
app.post('/products', async (req, res) => {
    const { name, categoryid, price, stockquantity, productimage, shop } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, categoryid, price, stockquantity, productimage, shop) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, categoryid, price, stockquantity, productimage, shop]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE productid = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to fetch all categories
app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name, itemimage } = req.body;
    try {
      const result = await pool.query(
        'UPDATE categories SET name = $1, itemimage = $2 WHERE categoryid = $3 RETURNING *',
        [name, itemimage, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM categories WHERE categoryid = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Route to update a product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, categoryid, price, stockquantity, productimage, shop } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, categoryid = $2, price = $3, stockquantity = $4, productimage = $5, shop = $6 WHERE productid = $7 RETURNING *',
            [name, categoryid, price, stockquantity, productimage, shop, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Server startup
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
