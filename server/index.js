const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config();

const connect = require('./config/db');
connect();

app.use('/', require('./routes/upload'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);