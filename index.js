const express = require('express');
const app = express();

const expressConfig = require('./config/express');
const PORT = require('./config/config');

expressConfig(app);


app.listen(PORT.PORT, () => console.log(`Server is listening on port ${PORT.PORT}...`));