# Magic Transporter Rest API

## Overview

Magic Transporter API is a RESTful API built with Node.js, TypeScript, and MongoDB. This API allows you to manage "Magic Movers" and "Magic Items," track their loading activities, and log missions.


To view full documintation visit :

https://documenter.getpostman.com/view/18554306/2sAY4uEPti

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add a Magic Mover.
- Add a Magic Item.
- Load a Magic Mover with items, creating a DB log of this activity.
- Start a mission and update the Magic Mover's state to "on-mission."
- End a mission and unload all items, reverting the state to "resting."
- Fetch a list of Magic Movers sorted by the number of missions completed.

## Technologies

- **Node.js**: JavaScript runtime for building the API.
- **TypeScript**: Superset of JavaScript that adds static types.
- **MongoDB**: NoSQL database for storing Magic Movers and Magic Items.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Express**: Web framework for building RESTful APIs.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed locally or use MongoDB Atlas)
- [mongosh](https://www.mongodb.com/docs/mongodb-shell/) (MongoDB shell)

### Steps

1. Clone the repository:

   git clone https://github.com/baselah/magic_transporter.git
   cd magic_transporter

2. Install dependencies:
   npm install

3. Copy a .env.example file and paste it in the root directory and configure your MongoDB URI and   Port:

   MONGODB_URI=mongodb://localhost:27017/magic-mover

4. Run the API in development mode:
   
   npm run dev

5. Build the project :

   npm run build


6. run project in production mode :
  
  npm start


7. to run tests : 
  
  npm test