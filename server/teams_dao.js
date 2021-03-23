"use strict";

const config = require('./config');
const fs = require('fs');
const xlsx = require('node-xlsx');

const LocalDB = require('./local_db');

/**
 * TeamsDAO.
 * Create a teams table on the local file system if none exists.
 * Load and insert team records from XLS spreadsheet if there are no records 
 * in the table.
 * Provide various get/update/insert queries for team records.
 * @author R.Bellamy
 */
class TeamsDAO {

    // Constructor.
    constructor() {
    }

    // Initialise create/insert records if necessary.
    init() {

        return new Promise((resolve, reject) => {

            this.db = new LocalDB();
            this.createTable()
            .then(() => this.loadExternalDataSource())
            .then(() => resolve())            
            .catch((err) => {
                console.log('TeamsDAO error creating teams table', err);
                reject(err);
            });
        });
    }

    // Create teams table if it does not exist.
    createTable() {

        const sql = `
        CREATE TABLE IF NOT EXISTS teams (
          id INT PRIMARY KEY,
          name VARCHAR,
          country VARCHAR,
          eliminated BOOLEAN)
        `
        return this.db.run(sql);
    }

    // Insert teams data from XLS spreadsheet if no data exists.    
    loadExternalDataSource() {

        return new Promise((resolve, reject) => {
            this.getTeams()
            .then((teams) => {

                if (teams && teams.length > 0) {
                    
                    console.log('TeamsDAO data already inserted, number of records', teams.length);
                    resolve();
                }
                else {
                    
                    console.log('TeamsDAO inserting new data');
                    const externalData = xlsx.parse(fs.readFileSync(config.data_source))[0].data;
                    
                    for (let i = 1; i < externalData.length; i++) {

                        const team = externalData[i];                        
                        this.insertTeam(team);
                    }

                    resolve();
                }
            });
        });
    }

    // Return all team records.
    getTeams() {

        const sql = `
        SELECT "id", "name", "country", "eliminated" FROM teams ORDER BY "name" ASC
        ;`

        return this.db.all(sql);
    }

    // Get a team record by id.
    getTeam(id) {
        
        const sql = `
        SELECT "id", "name", "country", "eliminated" FROM teams WHERE "id" = $1
        ;`

        return this.db.get([ id ]);
    }

    // Return a distinct country name list.
    getCountries() {

        const sql = `
        SELECT DISTINCT("country") AS "country" FROM teams ORDER BY "country" ASC
        ;`

        return this.db.all(sql);
    }

    // Insert a team record.
    insertTeam(team) {
        
        let vals = Object.values(team).map((v) => { return '"' + v + '"'});

        const sql = `
        INSERT INTO teams(id, name, country, eliminated) VALUES(` + vals + `)
        ;`

        return this.db.run(sql, []);
    }

    // Update a team record.
    updateTeam(team) {

    }
}

module.exports = TeamsDAO;
