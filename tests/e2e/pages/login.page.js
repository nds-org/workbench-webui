/* global angular:false expect:false inject:false module:false element:false browser:false by:false */

'use strict';

module.exports = {};

// Load other modules
var helpers = require('../helpers.e2e.js');
var shared = require('./shared.page.js');
var landing = require('./landing.page.js');

var TEST_HOSTNAME = shared.config.TEST_HOSTNAME;
var TEST_USERNAME = shared.config.TEST_USERNAME;
var TEST_PASSWORD = shared.config.TEST_PASSWORD;
var TEST_INVALID_PASSWORD = shared.config.TEST_INVALID_PASSWORD;

var INPUT_USERNAME_ID = 'inputNamespace';
var INPUT_PASSWORD_ID = 'inputPassword';

var PAGE_TITLE = 'Sign In to Labs Workbench';
var PAGE_ROUTE = TEST_HOSTNAME + '/login';

var LINK_REQUEST_ACCESS_ID = 'requestAccessLink';
var LINK_FORGOT_PASSWORD_ID = 'forgotPasswordLink';

var BTN_LOGIN_ID = 'loginBtn';

var loginBtn = function() {  return element(by.id(BTN_LOGIN_ID)); };
var usernameInput = function() {  return element(by.id(INPUT_USERNAME_ID)); };
var passwordInput = function() {  return element(by.id(INPUT_PASSWORD_ID)); };

var requestAccessLink = function() {  return element(by.id(LINK_REQUEST_ACCESS_ID)); };
var forgotPasswordLink = function() {  return element(by.id(LINK_FORGOT_PASSWORD_ID)); };

// Ensure that we are on the login page
module.exports.verify = function() {
  expect(browser.getCurrentUrl()).toBe(PAGE_ROUTE);
  expect(browser.getTitle()).toEqual(PAGE_TITLE);
};

module.exports.get = function() {
  landing.get();
  shared.navbar.clickSignIn();
  module.exports.verify();
};

module.exports.enterUsername = function(text) {
  usernameInput().sendKeys(text);
};
  
 module.exports.enterPassword = function(text) {
  passwordInput().sendKeys(text);
};

module.exports.clickLogin = function() {
  loginBtn().click();
};
  
module.exports.clickRequestAccessLink = function() {
  requestAccessLink().click();
};
  
module.exports.clickForgotPasswordLink = function() {
  forgotPasswordLink().click();
};