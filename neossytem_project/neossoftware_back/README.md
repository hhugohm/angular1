# BackEnd instructions

Execute following command in order to create database

mysql -u youruser -p < script-db.sql


Change parameters in config.js

for example:
```
mysql: {
        host: 'localhost',
        port: '3306',
        user: 'youruser',
        password: 'yourpwd',
        database: 'neossoftwaredb',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
}
```

Install nodemon

```
npm install -g nodemon
```


Then execute :

```sh
$ npm install
$ npm start
```

common output is :

```sh
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/api.js`
#######ADD TO MODEL: user.js
Loading routes from: /home/neossoftware/development/angularjs/angular1/neossytem_project/neossoftware_back/src/controllers/api/user/index.js
bccertifications listening at http://[::]:8085
Executing (default): SELECT 1+1 AS result
Connection to mysql has been established successfully
```
