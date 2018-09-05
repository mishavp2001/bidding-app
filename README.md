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
You are building a Market Place for Self-Employed.

You have two actors:

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
