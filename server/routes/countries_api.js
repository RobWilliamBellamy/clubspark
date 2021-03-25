"use strict";

const swagger_helper = require('./../swagger_helper');
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

        // Add swagger validation and ui.
        swagger_helper.addValidation(router, countriesSwagger);
        swagger_helper.addUI(app, countriesSwagger, 'countries');

        router.get("/", (req, res, next) => {

            this.teams_dao.getCountries()
            .then((countries) => {
                res.status(200).json(countries);
            })
            .catch((err) => {                
                res.status(500).json({ err: err });
            });          
        });

        return router;
    }
}

module.exports = CountriesAPI;