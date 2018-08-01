const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = 3000;
const api = require('./server/routes/api');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/ngApp'))); // Specify the angular code is placed

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ngApp/index.html'));
})

app.listen(PORT, () => {
    console.log('Server running on localhost ' + PORT);
})
