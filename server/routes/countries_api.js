"use strict";

const swagger_ui = require('swagger-ui-express');
const countriesSwagger = require('./../swagger/countries_swagger');

const express = require('express');
const router = express.Router();

/**
 * CountriesAPI.
 * Express route for countries API.
 * @author R.Bellamy
 */
class CountriesAPI {

    constructor(app, teams_dao) {   

        this.teams_dao = teams_dao;
        return this.createAPI(app);
    }

    // Create the countries API.
    createAPI(app) {

        router.get("/", (req, res, next) => {

            this.teams_dao.getCountries()
            .then((countries) => {
                res.status(200).json(countries);
            })
            .catch((err) => {                
                res.status(500).json({ err: err });
            });          
        });

        // Add swagger ui to document API
        const swagger_ui_options = {
            customCss: '.swagger-ui .topbar { display: none }'
        };     
                
        app.use('/countries/api', swagger_ui.serveFiles(countriesSwagger), 
            swagger_ui.setup(countriesSwagger, swagger_ui_options));

        return router;
    }
}

module.exports = CountriesAPI;