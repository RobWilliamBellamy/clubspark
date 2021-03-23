"use strict";

const express = require('express');
const router = express.Router();

/**
 * TeamsAPI.
 * Express route for teams API.
 * @author R.Bellamy
 */
class TeamsAPI {

    constructor(teams_dao) {   

        this.teams_dao = teams_dao;
        return this.createAPI();
    }

    // Create the teams CRUD API.
    createAPI() {

        router.get("/list", (req, res, next) => {

            this.teams_dao.getTeams()
            .then((teams) => {

                res.json({
                    status: 200,
                    teams: teams
                });
            })
            .catch((err) => {
                res.json({status: 500});
            });          
        });

        router.post("/", (req, res, next) => {
            res.json({msg: 'Post successful'});
        });

        router.put('/', (req, res, next) => {

            this.teams_dao.updateTeam()
            .then(() => {
                res.json({msg: 'Put successful'});
            })
            .catch((err) => {
                res.json({status: 500});
            });            
        });

        router.delete('/', (req, res, next) => {
            res.json({msg: 'Delete successful'});
        });

        return router;
    }
}

module.exports = TeamsAPI;