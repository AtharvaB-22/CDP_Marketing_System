# Customer Data Platform + Marketing Automation
Introduction
This project is a Customer Data Platform (CDP) and Marketing Automation System. It integrates various components, including Apache Unomi and Mautic, with a dynamic dashboard, LLM-based chatbot, and customizable widgets. The system collects, stores, and automates marketing workflows based on customer events. It also provides APIs for external access.
Prerequisites
Before running the project, ensure you have the following installed on your machine:
•	Docker (For running the services in containers)
•	Docker Compose (For managing multi-container setups)
•	Node.js (For the middleware backend)
•	npm or yarn (For managing dependencies in the frontend)
System Setup
Docker Setup
The project uses Docker Compose to set up the necessary services, including:
•	Elasticsearch
•	Apache Unomi
•	MySQL
•	Mautic
•	Middleware (Backend in Node.js)
The docker-compose.yml file is included in the root of the project. This file defines and configures all the services needed for the project.
Steps for Docker Setup:
Clone the repository:
git clone <repository-url>
cd <project-directory>
Build and start the Docker containers: Run the following command in the project root directory where docker-compose.yml is located:
docker-compose up --build
This command will download the necessary images, build the services, and start them in the background.
Access the services:

•	Elasticsearch: http://localhost:9200
•	Unomi: http://localhost:8181
•	Mautic: http://localhost:8080
•	Middleware (Backend): http://localhost:3000

Running the Project
Once the Docker containers are up and running, follow these steps to run the frontend and backend:
1. Backend (Node.js - Middleware)
Navigate to the middleware folder and install dependencies:
cd middleware
npm install
Start the backend:
npm start
2. Frontend (React)
Navigate to the frontend folder and install dependencies:
cd frontend
npm install
Start the frontend:
npm start
The frontend will be accessible at: http://localhost:3000

API Documentation
The REST API is used to retrieve customer data and trigger actions. All endpoints are documented in Swagger for easy access and integration.
Visit the Swagger UI at: http://localhost:3000/api-docs/#/

Screenshots
 
 
 
 
 

 
 


