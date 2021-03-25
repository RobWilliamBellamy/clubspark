"use strict";

const swagger_helper = require('./../swagger_helper');
const teamsSwagger = require('./../swagger/teams_swagger');

const express = require('express');

const router = express.Router();

/**
 * TeamsAPI.
 * Express route for teams API.
 * @author R.Bellamy
 */
class TeamsAPI {

    constructor(app, teams_dao) {   
        
        this.teams_dao = teams_dao;    
        return this.createAPI(app);
    }

    // Create the teams CRUD API.
    createAPI(app) {

        // Add swagger validation and ui.
        swagger_helper.addValidation(router, teamsSwagger);
        swagger_helper.addUI(app, teamsSwagger, 'teams');

        router.get("/", (req, res, next) => {
                
            this.teams_dao.getTeams()
            .then((teams) => {
                res.status(200).json(teams);
            })
            .catch((err) => {
                res.status(500).json({ err: err });
            });          
        });

        router.post("/", (req, res, next) => {
            res.status(200).json({ msg: 'Post team successful' });
        });

        router.put('/', (req, res, next) => {

            this.teams_dao.updateTeam(req.body)
            .then(() => {
                res.status(200).json({ msg: 'Put team successful' });
            })
            .catch((err) => {
                res.status(500).json({ err: err });
            });            
        });

        router.delete('/', (req, res, next) => {
            res.status(200).json({ msg: 'Delete team successful' });
        }); 

        return router;
    }
}

module.exports = TeamsAPI;