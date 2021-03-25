"use strict";

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
                res.status(200).json({ countries: countries });
            })
            .catch((err) => {                
                res.status(500).json({ err: err });
            });          
        });

        return router;
    }
}

module.exports = CountriesAPI;