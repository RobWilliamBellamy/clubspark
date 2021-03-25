"use strict";

const util = require('util');
const swagger_ui = require('swagger-ui-express');
const validator = require('swagger-express-validator');
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

        // Swagger validation. 
        const opts = {
            schema: teamsSwagger, 
            preserveResponseContentType: false,
            returnRequestErrors: true, 
            returnResponseErrors: true, 
            validateRequest: true,
            validateResponse: true,
            requestValidationFn: (req, data, errors) => {
                console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`); 
                throw errors;               
            },
            responseValidationFn: (req, data, errors) => {
                console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`);   
                throw errors;             
            },
        };
        router.use(validator(opts));

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
        
        // Add swagger ui to document API
        const swagger_ui_options = {
            customCss: '.swagger-ui .topbar { display: none }'
        };     
        
        app.use('/teams/api', swagger_ui.serveFiles(teamsSwagger), 
            swagger_ui.setup(teamsSwagger, swagger_ui_options));

        return router;
    }
}

module.exports = TeamsAPI;