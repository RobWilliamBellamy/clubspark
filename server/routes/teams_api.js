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
            res.json({
                status: 200,
                msg: 'Post team successful'});
        });

        router.put('/', (req, res, next) => {

            this.teams_dao.updateTeam(req.body)
            .then(() => {
                res.json({
                    status: 200,
                    msg: 'Put team successful'});
            })
            .catch((err) => {
                res.json({status: 500});
            });            
        });

        router.delete('/', (req, res, next) => {
            res.json({
                status: 200,
                msg: 'Delete team successful'
            });
        });

        return router;
    }
}

module.exports = TeamsAPI;