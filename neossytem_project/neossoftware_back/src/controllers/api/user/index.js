'use strict';

var models          = require('../../../models');
var userBusiness    = require('../../../business/user');
var logger          = require('../../../helpers/logger');

var userEndpoint = {};


userEndpoint.create = function (req, res, next) {
  userBusiness.createUserBusieness(req.body, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...')
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.getUserById = function (req, res, next) {
  logger.debug('WEBSERVICE...'+ req.params.userId)
  userBusiness.getUserByIdBusiness(req.params, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...')
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.updateUserById = function (req, res, next) {
  console.log("id: " + req.params.userId);
  console.log("name: " + req.body.name );
  var params = {
      userId : req.params.userId,
      name : req.body.name,
      lastName : req.body.lastName
  };
  userBusiness.updateUserByIdBusiness(params, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...');
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.deleteUserById = function (req, res, next) {
  userBusiness.deleteUserByIdBusiness(req.params, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...')
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.authenticateUser = function (req, res, next) {
  userBusiness.authenticateUserBussiness(req.body, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...')
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.getAllUsers = function (req, res, next) {
    logger.debug('ALLLL');
  userBusiness.getAllUsersBusiness(req.params, function(err, result) {
      if(err){
         logger.debug('ERROR EN EL SQL...');
          res.send(400,err);
      } else {
          logger.debug('SUCCESS SQL...')
          res.send(200, result);
      }
      return next();
  });
};

userEndpoint.routes = [
  {
      route: '/',
      method: 'post',
      action: 'create',
      validation: {
          content: {
              name: {
                  isRequired: true,
                  isString: true
              },
              lastName: {
                isRequired: true,
                isString: true,
              },
              email: {
                  isRequired: true,
                  isString: true,
                  regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
              },
              password: {
                  isRequired: true,
                  isString: true,
              }
          }
      }
  },
  {
      route: '/:userId',
      method: 'get',
      action: 'getUserById'
  },
  {
      route : '/:userId',
      method : 'put',
      action : 'updateUserById'
  },
  {
      route : '/:userId',
      method : 'del',
      action : 'deleteUserById'
  },
    {
        route: '/',
        method: 'get',
        action: 'getAllUsers'
    },
    {
        route: '/authenticate',
        method: 'post',
        action: 'authenticateUser',
        validation: {
            content: {
                email: {
                    isRequired: true,
                    isString: true,
                    regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
                },
                password: {
                    isRequired: true,
                    isString: true,
                }
            }
        }
    }
];

module.exports = userEndpoint;
