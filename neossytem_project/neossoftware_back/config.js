module.exports = (function () {
    'use strict';

    var config = {
        development: {
            port: 8085,
            jwt: {
                key: 'Q29suuGJCNmZ2g7h',
                algorithm: 'HS256',
                expiresIn: '2m' // expressed in seconds or a string describing a time span rauchg/ms '2 days','1d','10h','2.5 hrs','2h','1m','5s','100'
            },
            mysql: {
                    host: 'localhost',
                    port: '3306',
                    user: 'camus',
                    password: 'Temporal001',
                    database: 'neossoftwaredb',
                    dialect: 'mysql',
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 10000
                    }
            }
        },
        production: {}
    };

    return config[process.env.NODE_ENV || 'development'];
})();
