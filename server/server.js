const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// require the JSON files in the data folder
const Harrow = require('./data/Harrow.json');
const Heathrow = require('./data/Heathrow.json');
const Statford = require('./data/Stratford.json');

app.get('/', (request,response) => {
    response.send(
        {
            SupportedRoutes : [
                '/Pharmacies',
                '/Doctors',
                '/Colleges',
                '/Hospitals',
            ],
            Version:"0.0.0.1",
            Author: "dschouw"
        });
});

app.get('/Heathrow', (request,response) => {
    response.send(Heathrow);
    });


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});