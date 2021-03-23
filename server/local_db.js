"use strict";

const sqlite3 = require('sqlite3');
const config = require('./config');

/**
 * LocalDB.
 * Establish a connection to local DB file as defined in the config JSON.
 * Provide various DB query methods.
 * @author R.Bellamy
 */
class LocalDB {

    // Constructor.
    constructor() {
        this.init();
    }

    // Initialise, connect to DB.
    init() {
        this.createDAO();
    }

    // Create database access object.
    createDAO() {

        this.db = new sqlite3.Database(config.database, (err) => {

            if (err) {
                console.log('Could not connect to database', err);
            } else {
                console.log('DB connected');
            }
        });
    }

    // Run a query against the DB.
    run(sql, params = []) {

        return new Promise((resolve, reject) => {

                this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID });
                }
            })
        });
    }

    // Get query from the DB.
    get(sql, params = []) {

        return new Promise((resolve, reject) => {

                this.db.get(sql, params, function (err, result) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err);
                    reject(err)
                }
                else {
                    resolve(result);
                }
            })
        });
    }

    // All query from the DB.
    all(sql, params = []) {

        return new Promise((resolve, reject) => {

                this.db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err);
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            })
        });
    }
}

module.exports = LocalDB;
