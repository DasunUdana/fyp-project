const express = require('express');
const route = require('./routes');
const smartContract = require('./smartContracts');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

const init = async function() {
    await smartContract.registerAdmin();
}();

app.all('/*', (req, res, next) => {
    // CORS headers - Set custom headers for CORS
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token, X-Vw-Anonymous-Id, X-Key, Cache-Control, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// host port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started == ${PORT}`)
});
