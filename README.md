
Project Setup Guide
This guide will walk you through setting up the project on your local machine.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (version 18 or higher)
Docker
Docker Compose
Step-by-Step Setup
1. Clone the Repository
First, clone the repository to your local machine:

2. Set Up Environment Variables
Create a .env file in the root directory of the project and add the necessary environment variables. For example:

3. Build and Run Docker Containers
Use Docker Compose to build and run the containers:

This command will:

Build the Docker image for the application.
Start the MongoDB container.
Start the application container.

