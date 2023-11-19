require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const routes = require('./router/routes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
