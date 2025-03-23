/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Process an event
 *     description: Processes an event (e.g., pageView, click).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: pageView
 *               sessionId:
 *                 type: string
 *                 example: test123
 *     responses:
 *       201:
 *         description: Event processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event processed successfully
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock event handler
router.post('/', async (req, res) => {
  try {
    const { type, sessionId } = req.body;
    if (!type || !sessionId) {
      return res.status(400).json({ message: 'Type and sessionId are required' });
    }

    // Log the event
    console.log('Event received:', { type, sessionId });

    // Mock response
    res.status(201).json({ message: 'Event processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;