#### Overview

Authentication is a process in which the credentials provided are compared to those on file in a database of authorized users' information on a local operating system or within an authentication server. If the credentials match, the process is completed and the user is granted authorization for access.
GitHub has API that can be used for authentication. To use it first you should register your application on GitHub.

##### OAuth2

OAuth2 is a protocol that lets external apps request authorization to private details in a user's GitHub account without getting their password. This is preferred over Basic Authentication because tokens can be limited to specific types of data, and can be revoked by users at any time. All developers need to register their application before getting started. A registered OAuth application is assigned a unique Client ID and Client Secret.

GitHub's OAuth implementation supports the standard authorization code grant type. This standard works like this:

(A)  The client initiates the flow by directing the resource owner's
     user-agent to the authorization endpoint.  The client includes
     its client identifier, requested scope, local state, and a
     redirection URI to which the authorization server will send the
     user-agent back once access is granted (or denied).

(B)  The authorization server authenticates the resource owner (via
     the user-agent) and establishes whether the resource owner
     grants or denies the client's access request.

(C)  Assuming the resource owner grants access, the authorization
     server redirects the user-agent back to the client using the
     redirection URI provided earlier (in the request or during
     client registration).  The redirection URI includes an
     authorization code and any local state provided by the client
     earlier.

(D)  The client requests an access token from the authorization
     server's token endpoint by including the authorization code
     received in the previous step.  When making the request, the
     client authenticates with the authorization server.  The client
     includes the redirection URI used to obtain the authorization
     code for verification.

(E)  The authorization server authenticates the client, validates the
     authorization code, and ensures that the redirection URI
     received matches the URI used to redirect the client in
     step (C).  If valid, the authorization server responds back with
     an access token and, optionally, a refresh token.

Resources: 
1. [Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1)
2. [Other Authentication Methods](https://developer.github.com/v3/auth/)
3. [OAuth 2.0 простым и понятным языком](https://habrahabr.ru/company/mailru/blog/115163/)




##### Authentication using JavaScript (no backend)

My first implementation of GitHub authentication is done with the help of JavaScript (just front-end).
The biggest disadvantage of this method is that when I send POST request from JavaScript, browser starts downloading file from response. And then you have to copy the text from that file manually. 
When you do this, JS finds access token in that text and let you recieve information from GitHub.
This is very uncomfortable, so I've tried to find any information about this problem. But I couldn't find anything, so I've started a topic at stackoverflow and one of the solution is that using https instead of http may help, but I can't test it because I have only http.
Another solution is to use CORS, but you should setup it at GitHub server.

I uploaded this implementation on hosting - http://braga.fedyunin.com.ua/
You can also check it locally (but it won't work, because when I registered my application at github, I used http://braga.fedyunin.com.ua/ as application URL) [here](Authorization-with-JS/index.html)

Resources: 
1. [OAuth](https://developer.github.com/v3/oauth/)
2. [Using CORS](http://www.html5rocks.com/en/tutorials/cors/)




##### Authentication using NodeJS-GitHub Api

There are more ways to communicate with GitHub using Node.JS module which provides an object oriented wrapper for the GitHub v3 API.
The best solution for me is [JavaScript GitHub API for Node.JS](https://github.com/mikedeboer/node-github). It provides clear functionality and has good documentation.

I also add this module [here](/github-nodejs/)

Resources:
1. [octonode](https://github.com/pksunkara/octonode)
2. [JavaScript GitHub API for Node.JS](https://github.com/mikedeboer/node-github)




##### Authentication using Sinatra

Another way to make authentication with the help of GitHub is suggested by GitHub API documentation. But this method requires ruby to start the server and it's very similar to the previous method. 
So I didn't add any code.

Resources:
1. [GitHub Basics of Authentication](https://developer.github.com/guides/basics-of-authentication/)


