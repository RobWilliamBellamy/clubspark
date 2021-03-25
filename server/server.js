"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const TeamsDAO = require('./teams_dao');
const TeamsAPI = require('./routes/teams_api');
const CountriesAPI = require('./routes/countries_api');

const config = require('./configs/config');

const app = express();

/**
 * Server.
 * Express-based restful API server.
 * @author R.Bellamy.
 */
class Server {

    // Constructor.
    constructor() {
    }

    // Wait for DB to initialise before starting server.
    init() {

        return new Promise((resolve, reject) => {

            this.teams_dao = new TeamsDAO();
            this.teams_dao.init()
            .then(async () => {                
                await this.createServer();
                resolve();
            })
            .catch((err) => {
                console.log("Error initialising server", err);
                reject(err);
            });
        });
    }

    // Create server.
    createServer() {

        return new Promise((resolve, reject) => {

            // Add 'body-parser' middleware, limit size of message.
            app.use(bodyParser.json({
                limit: '1mb'
            }));

            // Use cors to allow requests from react app.
            app.use(cors());
            app.use(express.json());            
            app.use(express.urlencoded());     
            
            // Add message routes.
            app.use('/teams', new TeamsAPI(app, this.teams_dao));  
            app.use('/countries', new CountriesAPI(app, this.teams_dao));  
            
            // Error routes.            
            app.use((req, res, next) => { res.status(404).json({ err: 'Page not found' }); });  
            app.use((err, req, res, next) => {
                res.status(500);
                res.json(err);
            });          

            // Finally listen for requests on the specified port.            
            this.server = app.listen(config.port, () => {
                console.log(`Server listening at http://localhost:${config.port}`);
                resolve();
            });
        });
    }

    // Return the Express server instance for use in supertest.
    getServer() {

        return this.server;
    }

    // Close the server.
    closeServer() {

        this.server.close();
    }
}

module.exports = Server;