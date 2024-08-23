const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config();

const connect = require('./config');
connect();

app.use('/', require('./routes/uploadDataRoutes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);