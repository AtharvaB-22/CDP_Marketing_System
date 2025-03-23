/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Get health status
 *     description: Returns the health status of the middleware and its dependencies.
 *     responses:
 *       200:
 *         description: Health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 services:
 *                   type: object
 *                   properties:
 *                     unomi:
 *                       type: boolean
 *                       example: true
 *                     mautic:
 *                       type: boolean
 *                       example: true
 *                     elasticsearch:
 *                       type: boolean
 *                       example: true
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/health', async (req, res) => {
  try {
    const services = {
      unomi: false,
      mautic: false,
      elasticsearch: false
    };
    
    try {
      await axios.get(process.env.UNOMI_URL || 'http://unomi:8181');
      services.unomi = true;
    } catch (e) {
      console.log('Unomi health check failed');
    }
    
    try {
      await axios.get(process.env.MAUTIC_URL || 'http://mautic:80');
      services.mautic = true; 
    } catch (e) {
      console.log('Mautic health check failed');
    }
    
    try {
      await axios.get('http://elasticsearch:9200/_cluster/health');
      services.elasticsearch = true;
    } catch (e) {
      console.log('Elasticsearch health check failed');
    }
    
    res.json({
      status: 'OK',
      services
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/health/services', async (req, res) => {
  try {
    const services = {
      unomi: false,
      mautic: false,
      elasticsearch: false
    };
    
    try {
      await axios.get(process.env.UNOMI_URL || 'http://unomi:8181');
      services.unomi = true;
    } catch (e) {
      console.log('Unomi health check failed');
    }
    
    try {
      await axios.get(process.env.MAUTIC_URL || 'http://mautic:80');
      services.mautic = true; 
    } catch (e) {
      console.log('Mautic health check failed');
    }
    
    try {
      await axios.get('http://elasticsearch:9200/_cluster/health');
      services.elasticsearch = true;
    } catch (e) {
      console.log('Elasticsearch health check failed');
    }
    
    res.json({
      status: 'OK',
      services
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
