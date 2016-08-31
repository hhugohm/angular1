var config = require('../config');
var restify = require('restify');
var Logger = new require('bunyan');
var restifyValidation = require('node-restify-validation');
var restifyHelper = require('./helpers/restify.js');
var server = restify.createServer({
    name: 'bccertifications',
    log: new Logger.createLogger({
        name: 'bccertifications',
        serializers: {
            req: Logger.stdSerializers.req
        }
    }),
    formatters: restifyHelper.formatters
});
var path = require('path');
var routes = require('./routes')(server);
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password, {
        host: config.mysql.host,
        port: config.mysql.port,
        dialect: config.mysql.dialect,
        pool: config.mysql.pool,
        define: {
            timestamps: false
        }
});

server.use(restify.bodyParser({mapParams: true}));//true recibe JSON - false recibe form
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restifyValidation.validationPlugin({errorHandler: restify.errors.InvalidArgumentError}));
server.pre(restify.CORS({
  origins: ['*'],
  headers: ['x-requested-with']
}));
// CORS FIX
// Manually implement the method not allowed handler to fix failing preflights
server.on( "MethodNotAllowed", function( request, response )
{
    if ( request.method.toUpperCase() === "OPTIONS" )
    {
        // Send the CORS headers
        //
        response.header( "Access-Control-Allow-Credentials", true                                    );
        response.header( "Access-Control-Allow-Headers",     restify.CORS.ALLOW_HEADERS.join( ", " ) );
        response.header( "Access-Control-Allow-Methods",     "GET, POST, PUT, DELETE, OPTIONS"       );
        response.header( "Access-Control-Allow-Origin",      request.headers.origin                  );
        response.header( "Access-Control-Max-Age",           0                                       );
      //  response.header( "Content-type",                     "text/plain charset=UTF-8"              );
        response.header( "Content-type",                     "application/json"        );
        response.header( "Content-length",                   0                                       );

        response.send( 204 );
    }
    else
    {
        response.send( new restify.MethodNotAllowedError() );
    }
} );

server.pre(function (request, response, next) {
    request.log.info({req: request}, 'REQUEST');
    next();
});

routes.generateRoutes(path.resolve(__dirname) + '/controllers/', function (err, routes) {
    if (err) {
        throw err;
    }

    //Swagger
    var swaggerJSDoc = require('swagger-jsdoc');

    var options = {
        swaggerDefinition: {
            info: {
                title: 'Digital Assets',
                version: '1.0.0'
            },
            basePath: '/api',
            consumes :["application/json"],
            produces: 'application/json'
        },
        apis: routes
    };

    var swaggerSpec = swaggerJSDoc(options);

    server.get('/api-docs.json', function (req, res, next) {
        res.json(swaggerSpec);
    });

    server.initialized = true;

    server.listen(config.port, function () {
        console.log('%s listening at %s', server.name, server.url);
    });

    sequelize.authenticate()
        .then(function(err) {
            console.log("Connection to mysql has been established successfully");
        })
        .catch(function(err) {
            console.log("Unable to connect to mysql DataBase", err);
        });

});
/**
 * Default callback
 * @callback defaultCallback
 * @param {Error} error - The error object
 * @param {*} [data] - The data
 */

module.exports = server;
