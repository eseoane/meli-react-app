'use strict';

const app = require('express')();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const Boom = require('boom');

// for testing
module.exports = app;

require('dotenv').config();
const appPort = process.env.BACKEND_API_PORT || 10010;


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
// const swaggerDoc = require('./api/swagger.json'); // la forma de cargar directamente un json es esta
const spec = fs.readFileSync(path.join(__dirname, './src/api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// configuro el host que se va a usar en la documentacion
//swaggerDoc.host = process.env.NODE_ENV === 'production' ? 'api.localhost.com' : 'localhost:' + appPort;

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    // configuration
    const corsOptions = {
        //origin: 'http://localhost:3000',
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization']
    };

    const routerOptions = {
        swaggerUi: path.join(__dirname, '/docs'),
        apiDocs: path.join(__dirname, '/api-docs'),
        controllers: path.join(__dirname, './src/controllers')
        //useStubs: process.env.NODE_ENV !== 'production' // Conditionally turn on stubs (mock mode)
    };

    app.use(cors(corsOptions));
    app.use(compression());

    // swaggerMetadata() Interpret Swagger resources and attach metadata to request
    // must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
    //app.use(middleware.swaggerSecurity(securityHandlers));
    app.use(middleware.swaggerValidator());
    app.use(middleware.swaggerRouter(routerOptions));
    app.use(middleware.swaggerUi());

    // proceso los errores del swaggerValidator
    app.use((err, req, res, next) => {
        err = Boom.badRequest(err);
        if (err.results) {
            err.output.payload.errors = err.results.errors;
        }

        res.status(err.output.statusCode).json(err.output.payload);
    });

    // Start the server
    console.log('Your server is listening on port %d (http://localhost:%d)', appPort, appPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', appPort);
    app.listen(appPort);
});
