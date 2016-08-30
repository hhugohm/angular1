'use strict';

var models = require('../models');
var logger = require('../helpers/logger');
var dateFormat = require('dateformat');
var appConstant = require('../helpers/appConstant');


var userDAO = {};
var Sequelize = require('sequelize');


userDAO.createUserDAO = function (data, cb) {
    logger.debug(':::EXECUTE INSERT USER QUERY::::');
    return models.sequelize.transaction(function(tx){
        return models.user.create({
                name: data.name,
                lastname: data.lastName,
                email: data.email,
                password: data.password,
                update_date: new Date(),
                create_date: new Date(),
                status: appConstant.ACTIVE
            },{transaction: tx
        }).then(function(user){
              cb(null, user);
        });
    }).catch(function(txErr){
        logger.debug(txErr);
        var fail={error:txErr.errors[0]};
        cb(fail, null);
    });
};

userDAO.getUserByIdDAO = function (data, cb) {
  logger.debug(':::EXECUTE SELECT A QUERY USER BY ID::::'+  data.userId);
    models.user.findOne({
                        where: {
                                iduser:  data.userId
                        },
                        attributes: [
                                      'iduser',
                                      'name',
                                      'lastname',
                                      'email',
                                      'password',
                                      [Sequelize.fn('date_format', Sequelize.col('create_date'), '%d/%m/%Y'), 'createDate'],
                                      [Sequelize.fn('date_format', Sequelize.col('update_date'), '%d/%m/%Y'), 'updateDate'],
                                      'status'
  ]}).then(function(result) {
        if (result) {
            logger.debug(':::RESULTADO::::' + result);
              cb(null, result);
          }else{
            var fail={error:'User: DOES NOT EXIST'}
              cb(fail,null);
          }
         return cb;
    }).catch(function (err) {
        var fail={error:err.message};
        logger.debug(':::ERROR::::' + err);
       cb(fail, null);
        return cb;
    });
};

userDAO.updateUserByIdDAO = function (data, cb) {
    logger.debug(':::EXECUTE UPDATE A QUERY::::');
    models.user.update({
            name     : data.name,
            lastname : data.lastName
        }, {
            where : {
                iduser:  data.userId
            }
        }).then(function(result) {
        if(result==1){
          var success={success:'1 row was update'};
          cb(null, success);
        }else{
          var fail={faild:'does not exit the user: ' + data.userId};
          cb(null, fail);
        }
        return cb;
    }).catch(function (err) {
        logger.debug(':::ERROR::::' + err);
        var fail={error:err.message};
        cb(fail, null);
        return cb;
    });
  };

  userDAO.updateUserNameByIdDAO = function (data, cb) {
      logger.debug(':::EXECUTE UPDATE A QUERY NAME::::');
      models.user.update({
              name     : data.name
          }, {
              where : {
                  iduser:  data.userId
              }
          }).then(function(result) {
          if(result==1){
            var success={success:'1 row was update'};
            cb(null, success);
          }else{
            var fail={faild:'does not exit the user: ' + data.userId};
            cb(null, fail);
          }
          return cb;
      }).catch(function (err) {
          logger.debug(':::ERROR::::' + err);
          var fail={error:err.message};
          cb(fail, null);
          return cb;
      });
    };

    userDAO.updateUserLastNameByIdDAO = function (data, cb) {
        logger.debug(':::EXECUTE UPDATE A QUERY LASTNAME::::');
        models.user.update({
                  lastname : data.lastName
            }, {
                where : {
                    iduser:  data.userId
                }
            }).then(function(result) {
            if(result==1){
              var success={success:'1 row was update'};
              cb(null, success);
            }else{
              var fail={faild:'does not exit the user: ' + data.userId};
              cb(null, fail);
            }
            return cb;
        }).catch(function (err) {
            logger.debug(':::ERROR::::' + err);
            var fail={error:err.message};
            cb(fail, null);
            return cb;
        });
      };


userDAO.deleteUserByIdDAO = function (data, cb) {
    logger.debug(':::EXECUTE SELECT A QUERY::::');
    models.user.destroy({
                        where: {
                              iduser:  data.userId
                            }
    },{ returning: true }).then(function(result) {
        logger.debug(':::RESULTADO::::' + result);
        if(result==1){
          var success={success:'1 row was deleted'};
          cb(null, success);
        }else{
          var fail={faild:'does not exit the user: ' + data.userId};
          cb(null, fail);
        }
        return cb;
    }).catch(function (err) {
        logger.debug(':::ERROR::::' + err);
        var fail={error:err.message};
        cb(fail, null);
        return cb;
    });
  };

userDAO.authenticateUserDAO = function (data, cb) {
    logger.debug(':::EXECUTE SELECT A QUERY::::');
    models.user.findOne({
                        where: {
                                email: data.email,
                                password: data.password
                        },
                        attributes: [
                                      'iduser',
                                      'name',
                                      'lastname',
                                      'email',
                                      'password',
                                      [Sequelize.fn('date_format', Sequelize.col('create_date'), '%d/%m/%Y'), 'createDate'],
                                      [Sequelize.fn('date_format', Sequelize.col('update_date'), '%d/%m/%Y'), 'updateDate'],
                                      'status'
  ]}).then(function(result) {
        if (result) {
            logger.debug(':::RESULTADO::::' + result);
              cb(null, result);
          }else{
            var fail={error:'User: DOES NOT EXIST'}
              cb(fail,null);
          }
         return cb;
    }).catch(function (err) {
        var fail={error:err.message}
        logger.debug(':::ERROR::::' + err);
       cb(fail, null);
        return cb;
    });
  };

userDAO.getAllUsersDAO = function (data, cb) {
    logger.debug(':::EXECUTE SELECT ALL USERS QUERY::::');
    var now = new Date();
    logger.debug('FECHA:::::::::::'+dateFormat(now,"dd/MM/yyyy HH:mm.ss"));
    models.user.findAll({
                        attributes: [
                                      'iduser',
                                      'name',
                                      'lastname',
                                      'email',
                                      'password',
                                      [Sequelize.fn('date_format', Sequelize.col('create_date'), '%d/%m/%Y'), 'createDate'],
                                      [Sequelize.fn('date_format', Sequelize.col('update_date'), '%d-%m-%Y'), 'updateDate'],
                                      'status'
  ]}).then(function(result) {
        if (result) {
          if(result.length>0) {
              cb(null, result);
          }else{
            var fail={error:'TABLE USER: IS EMPTY'}
              cb(fail,null);
          }
        }
         return cb;
    }).catch(function (err) {
        var fail={error:err.message}
        logger.debug(':::ERROR::::' + err);
       cb(fail, null);
        return cb;
    });
};

module.exports = userDAO;
