/** section: github, internal
 *  OAuth
 *
 *  OAuth usage example.
 *
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <mike@c9.io>
 **/

var http = require('http');
var Url = require('url');
var querystring = require('querystring');

var Client = require('../index');
var OAuth2 = require('oauth').OAuth2;

var github = new Client({
  version: '3.0.0'
});

var clientId = 'b1cb56eafd6ae4949b88';
var secret = 'fe5932a89112a4ae30d8e23a85bcd7f2ab68be80';
var oauth = new OAuth2(clientId, secret, 'https://github.com/', 'login/oauth/authorize', 'login/oauth/access_token');

// for demo purposes use one global access token
// in production this has to be stored in a user session
var accessToken = '';

http.createServer(function (req, res) {
  var url = Url.parse(req.url);
  var path = url.pathname;
  var query = querystring.parse(url.query);

  if (path === '/' || path.match(/^\/user\/?$/)) {
    // redirect to github if there is no access token
    if (!accessToken) {
      res.writeHead(303, {
        Location: oauth.getAuthorizeUrl({
          redirect_uri: 'http://localhost:7878/github-callback',
          scope: 'user,repo,gist'
        })
      });
      res.end();
      return;
    }

    // use github API
    github.user.get({}, function (err, user) {
      if (err) {
        res.writeHead(err.code);
        res.end(err + '');
        return;
      }
      res.writeHead(200);
      res.end(JSON.stringify(user));
    });
    return;
  }
 // URL called by github after authenticating
  if (path.match(/^\/github-callback\/?$/)) {
    // upgrade the code to an access token
    oauth.getOAuthAccessToken(query.code, {}, function (err, accessTok) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.end(err + '');
        return;
      }

      accessToken = accessTok;

      // authenticate github API
      github.authenticate({
        type: 'oauth',
        token: accessToken
      });

      // redirect back
      res.writeHead(303, {
        Location: '/'
      });
      res.end();
    });
    return;
  }

  res.writeHead(404);
  res.end('404 - Not found');
}).listen(7878);

console.log('listening at http://localhost:7878');
