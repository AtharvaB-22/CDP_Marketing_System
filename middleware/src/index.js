const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const healthRoutes = require('./routes/health');
const customerRoutes = require('./routes/customer');
const eventRoutes = require('./routes/events');
const chatbotRoutes = require('./routes/chatbot');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('./logger');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();


// Load environment variables
dotenv.config();

// Enable CORS for all origins (you can specify origins if necessary)
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      message: 'Too many requests from this IP, please try again after 15 minutes',
    });
  },
});
app.use(limiter); // Apply rate limiting to all requests


// Log all incoming requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Mock authentication
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in: ${username}`);
    res.json({ token });
  } else {
    logger.error('Invalid login attempt');
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    logger.warn('Access denied: No token provided');
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    logger.info(`User authenticated: ${verified.username}`);
    next();
  } catch (err) {
    logger.error('Invalid token');
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Apply authentication to protected routes
app.use('/api/customers', authenticate);
app.use('/api/events', authenticate);

// Routes
app.use('/api', healthRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Middleware is running' });
});

// Mock Unomi API
app.get('/api/unomi/context', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Mock Unomi response',
  });
});

// Mock Mautic API
// app.post('/api/mautic/contacts', (req, res) => {
//   res.status(201).json({
//     status: 'OK',
//     message: 'Mock Mautic response',
//   });
// });

app.post('/api/mautic/contacts', async (req, res) => {
  try {
    const contactData = req.body;
    const response = await axios.post(
      `${process.env.MAUTIC_URL}/api/contacts/new`,
      contactData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MAUTIC_API_KEY}`, // Add your Mautic API Key
        }
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    logger.error('Error creating contact in Mautic', error);
    res.status(500).json({ message: 'Error creating contact in Mautic' });
  }
});



const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Middleware API',
      version: '1.0.0',
      description: 'API for CDP + Marketing Automation System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Middleware running on port ${PORT}`);
});