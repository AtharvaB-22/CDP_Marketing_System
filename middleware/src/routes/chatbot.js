/**
 * @swagger
 * /api/chatbot:
 *   post:
 *     summary: Interact with the chatbot
 *     description: Sends a message to the chatbot and receives a response.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Hello
 *     responses:
 *       200:
 *         description: Chatbot response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: You said: Hello
 */

const express = require('express');
const router = express.Router();

// Mock chatbot response
router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  // Mock response
  res.status(200).json({
    response: `You said: ${message}`,
  });
});

module.exports = router;