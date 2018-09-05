# bidding-app

- [bidding-app](#bidding-app)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)

## Introduction

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mishavp2001/bidding-app.git

# Go inside the directory
cd bidding-app

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation
Seller: Posts a project with details requirements. The post also includes the last day and time for accepting bids.
Buyer (Self-Employed): Bids for work on a fixed price or hourly basis.

High Level Requirements:
Assume all projects can be done remotely/online. You do not need to worry about matching by location. The Buyer with the lowest bid automatically wins the bid when the deadline is reached. Lowest bid is displayed on the project page. We have 50K registered Buyers. On average, 100 projects are posted every day. On average, each project receives 50 bids. On the homepage, we need to show 100 most recent projects. Optionally you can support pagination. You are welcome to assume unspecified requirements to make it better for the customers.
Programming Problem:  
If we are backend engineer:  Build the service-side only. You do not need to worry about the front-end piece. In-memory database is sufficient. Optionally, you are welcome to use a persistent data store of your choice. You are encouraged but not required to take advantage of a service code-generation framework of your choice when performing this exercise. If you are a front-end engineer: Feel free to mock backend service responses.
Expectations:
This is an open-ended exercise. The goal is to demonstrate how well you design a system with limited requirements Come prepared with high level Architecture and Design. You are expected to explain the rationale for your choice of technologies and architectural patterns.


Main functionality:
<ul>
<li>
  Add new project and describe what needs to be done and by when - WHAT and WHEN. Nice to have: add minimum and maximum bid.
</li>
<li>
  Add bid to existing projects.
</li>
<li>
  Automatically stop accept bidding and select a winer when project bid expiration time passed  
</li>
</ul>

Out of scope but important design considerations
  Ability to handle secure transactions inside the system
  Ability for project owner to pick winer not only on lowest bid but also other factors
  Allow to submit bids in decremental order only.  
  Allow automatic bid submits

Non-functional Requirements
  High availability
  Low latency is expected
  Highly reliable
  Absolutely Secure


Architectural diagram:

Client choice: (React) vs Angular
    - Quick Reactive UI
    - Complex components that present data consistently
    - Flexibility
    - https://medium.com/unicorn-supplies/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176

Server choice: (NodeJs) vs Java
    - Database queries
    - Scalability and simplicity
    - Development
Database choice: (MongoDB) vs Cassandra
    MongoDB supports a “single master” model vs Cassandra “multiple master” - uptime for writes.
    Rich data model then MongoDB
    If your application needs secondary indexes and needs flexibility in the query model then MongoDB is a better fit

    - Reads load - need highly reliable response on reads - 50K service providers = 2008/hour = 34/min
    - Writes load - 100 projects plus 50 bids per project = 5'000 writes per day = 208/hour

Load Balancer 
    Between Application Servers and Cache servers - CDN
    Between Clients and Application servers
