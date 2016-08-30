'use strict';


var models = require('../models');
var logger = require('../helpers/logger');
var dateFormat = require('dateformat');
var userDAO =  require('../dao/userDao');


var userBusiness = {};
var Sequelize = require('sequelize');


userBusiness.createUserBusieness = function (data, res) {
    logger.debug(':::EXECUTE BUSINESS INSERT::::');
    userDAO.createUserDAO(data, function(err, result) {
      logger.debug(':::ERROR::::'+err);
      logger.debug(':::SUCCES::::'+result);
      return res(err,result);
    });
      logger.debug(':::FINAL BUSINESS INSERT::::');
};

userBusiness.getUserByIdBusiness = function (data, res) {
    logger.debug(':::EXECUTE BUSINESS GET  USER BY ID::::');
    userDAO.getUserByIdDAO(data, function(err, result) {
      logger.debug(':::ERROR::::'+err);
      logger.debug(':::SUCCES::::'+result);
      return res(err,result);
    });
};

userBusiness.updateUserByIdBusiness = function (data, res) {
  logger.debug(':::NAME::::'+data.name);
  logger.debug(':::LASTNAME::::'+data.lastName);

  if(isEmpty(data.name) && isEmpty(data.lastName)){
        logger.debug(':::NO DATA USER::::');
        var err={error:'not data user to update, please send user information...'};
        return res(err,null);
  }
  if(!isEmpty(data.name) && !isEmpty(data.lastName)){
    logger.debug(':::NAME & LASTNAME::::');
      userDAO.updateUserByIdDAO(data, function(err, result) {
        return res(err,result);
      });
  } else if(!isEmpty(data.name)){
    logger.debug(':::ONLY NAME::::');
     userDAO.updateUserNameByIdDAO(data, function(err, result) {
        return res(err,result);
    });
    } else if(!isEmpty(data.lastName)){
        logger.debug(':::ONLY LASTNAME::::');
      userDAO.updateUserLastNameByIdDAO(data, function(err, result) {
        return res(err,result);
      });
   }
};
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

userBusiness.deleteUserByIdBusiness = function (data, res) {
    logger.debug(':::EXECUTE BUSINESS DELETE  USER BY ID::::');
    userDAO.deleteUserByIdDAO(data, function(err, result) {
      logger.debug(':::ERROR::::'+err);
      logger.debug(':::SUCCES::::'+result);
      return res(err,result);
    });
};

userBusiness.getAllUsersBusiness = function (data, res) {
    logger.debug(':::EXECUTE BUSINESS GET ALL USER::::');
    userDAO.getAllUsersDAO(data, function(err, result) {
      logger.debug(':::ERROR::::'+err);
      logger.debug(':::SUCCES::::'+result);
      return res(err,result);
    });

};
userBusiness.authenticateUserBussiness = function (data, res) {
    logger.debug(':::EXECUTE BUSINESS GET USER BY PASS::::');
     userDAO.authenticateUserDAO(data, function(err, result) {
      logger.debug(':::ERROR::::'+err);
      logger.debug(':::SUCCES::::'+result);
      return res(err,result);
    });

};



/*
userBusiness.getAllUsersBusiness = function (data, cb) {
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
                                      [Sequelize.fn('date_format', Sequelize.col('create_date'), '%d-%m-%Y'), 'createDate'],
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
*/
/*
userBusiness.createUserBusieness = function (data, cb) {
    logger.debug(':::EXECUTE INSERT USER QUERY::::');


    return models.sequelize.transaction(function(tx){
        return models.user.create({
                name: data.name,
                lastname: data.lastName,
                email: data.email,
                password: data.password,
                update_date: new Date(),
                create_date: new Date(),
                status: 1
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
*/

module.exports = userBusiness;
