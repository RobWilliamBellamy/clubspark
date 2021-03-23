"use strict";

const express = require('express');
const router = express.Router();

/**
 * CountriesAPI.
 * Express route for countries API.
 * @author R.Bellamy
 */
class CountriesAPI {

    constructor(teams_dao) {   

        this.teams_dao = teams_dao;
        return this.createAPI();
    }

    // Create the countries API.
    createAPI() {

        router.get("/list", (req, res, next) => {

            this.teams_dao.getCountries()
            .then((countries) => {

                res.json({
                    status: 200,
                    countries: countries
                });
            })
            .catch((err) => {                
                res.json({status: 500});
            });          
        });

        return router;
    }
}

module.exports = CountriesAPI;