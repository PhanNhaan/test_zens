const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jokesRouter = require('./routes/jokes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

const URL = process.env.CLIENT_URL;

const corsOptions ={
    origin:URL, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/api/jokes', jokesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
