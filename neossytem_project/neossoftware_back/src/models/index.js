"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require ("../../config");

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

var db = {};

fs.readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      console.log("#######ADD TO MODEL: " + file);
        var model = sequelize.import(path.join(__dirname,file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
