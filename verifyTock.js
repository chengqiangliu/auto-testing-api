const createError = require('http-errors');
const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
const { secret } = require('./config');
var {unless} = require('express-unless');
const logger = require('./lib/logger').API;

function verifyToken(req, res, next){
    // Get the token from the request headers
    const authorization = req.header("Authorization");
    const token = authorization.split(" ")[1];
  
    if (typeof token !== 'undefined') {
      // Verify the token using the JWT library
      jwt.verify(token, secret , (err, decoded) => {
        if (err) {
          // If there's an error, return a 403 error response
          res.sendStatus(403) 
        } else {
          // If the token is valid, save the decoded payload to the request object
          req.user = decoded;
          // Call the next middleware or route handler
          next();
        }
      });
    } else {
      // If there's no token provided, return a 401 error response
      res.sendStatus(401) 
    }
  }


module.exports = verifyToken;