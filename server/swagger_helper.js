"use strict";

const util = require('util');
const swagger_ui = require('swagger-ui-express');
const validator = require('swagger-express-validator');

/**
 * SwaggerHelper.
 * @author R.Bellamy
 */
class SwaggerHelper {

    // Add swagger-based CRUD validation.
    static addValidation(app, schema) {

        const opts = {
            schema, 
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
        app.use(validator(opts));
    }

    // Add swagger-ui docs.
    static addUI(app, schema, path) {
        
        const swagger_ui_options = {
            customCss: '.swagger-ui .topbar { display: none }'
        };     
        
        app.use(`/${path}/api`, swagger_ui.serveFiles(schema), 
            swagger_ui.setup(schema, swagger_ui_options));
    }
}

module.exports = SwaggerHelper;