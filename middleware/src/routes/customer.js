/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Returns a list of all customers.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Atharva Behani
 *                   email:
 *                     type: string
 *                     example: behaniatharva@gmail.com
 *                   policyId:
 *                     type: string
 *                     example: "101"
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock customer data
const customers = [
  { id: 1, name: 'Atharva Behani', email: 'behaniatharva@gmail.com', policyId: '101' },
  { id: 2, name: 'Harun Khan', email: 'hk@gmail.com', policyId: '102' },
];

// Get all customers
router.get('/', (req, res) => {
  try {
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer by ID
router.get('/:id', (req, res) => {
  try {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;