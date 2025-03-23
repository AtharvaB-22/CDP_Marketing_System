const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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
 *                   example: Hello! How can I assist you today?
 */
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // Generate response using Google Gemini
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error generating chatbot response:', error);
    res.status(500).json({ error: 'Failed to generate chatbot response' });
  }
});

module.exports = router;