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

function getCity(cityName) {
    //uppercase the first letter of the city name

    switch (cityName.toUpperCase()) {
        case 'HARROW':
            return Harrow;
        case 'HEATHROW':
            return Heathrow;
        case 'STRATFORD':
            return Statford;
        default:
            return null;
    }
}

const validCategories = ['PHARMACIES', 'DOCTORS', 'COLLEGES', 'HOSPITALS'];

app.get('/:city/:category', (request,response) => {
    const city = getCity(request.params.city);
    if (city)
    {
        const category = request.params.category.toUpperCase();
        if (validCategories.includes(category))
        {
            response.send(city[category.toLowerCase()]);
        }
        else
        {
            response.status(404).send({Error: `Invalid Category ${category}`});
        }
    }
    else {
        response.status(404).send("City not found");
    }

    });


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});