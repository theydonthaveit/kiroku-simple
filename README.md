# kiroku-simple
simple flask-react app - building blocks for major kiroku repo
## What I have completed:

Currently the 2 apps are not talking to each other, I never had enough time to do this.

`FRONTEND:`
* Standalone application
* Built in ReactJS, served on NodeJS
* Initiated via Facebook’s ‘create-react-app’ tool
* Webpack for build configuration
* Babel to trans-compile JSX to JavaScript for deployment

`How to RUN?`
* frontend (root) folder
* npm (yarn) install – this will install all dependencies from the package.json (lockfile)
* npm (yarn) start – this will start a server instance

`BACKEND:`
* Standalone application
* Designed as a RestFull API service
* Flask framework
* JSON Web Tokens for authentication (login and registration)
* SQLAlchemy framework for ORM

`How to RUN?`
### I used a virtualenv for python development but this is not required
* From the src folder run ‘pip install –r requirements.txt’
* Set the “flask app env” export FLASK_APP=main.py
* Then type: Flask run – this should start a server instance

`How to RUN database?`
### Postgres needs to be installed locally, if not try install Postgres APP ( way better than brew )
* Run: createdb kiroku-simple
* Run: (from within backend/db) python database_setup.py

`Possible end point tests:`
* curl -H 'Content-Type: application/json' -d '{"name":"Jay","email":"jay@kiroku.com","password":"kiroku-safe"}' -X POST http://127.0.0.1:5000/register/tokenize
* curl -H 'Content-Type: application/json' -d '{"name":"Jay","password":"kiroku-safe"}' -X POST http://127.0.0.1:5000/login/tokenize
* curl -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTk5OTQ0NjEsImlhdCI6MTUxOTk5NDQ1Niwic3ViIjoyfQ.Yyc35YLbLenVV9ykDBOOD1xJeHOVS4tH-8QCzoW_Ab8' -d '{"business":"dentist","client":"john","note":"has problems","workspace":"layout"}' -X POST http://127.0.0.1:5000/business/1
* curl -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTk5OTQ0NjEsImlhdCI6MTUxOTk5NDQ1Niwic3ViIjoyfQ.Yyc35YLbLenVV9ykDBOOD1xJeHOVS4tH-8QCzoW_Ab8' http://127.0.0.1:5000/business/5


## To complete and amend on the kiroku simple app:
* Project structure to [kiroku-main](https://github.com/theydonthaveit/kiroku/tree/develop)
* For each amendment to a table run a database migration script
* Create a modal for each new table
* Split route into separate 'blueprints'
* React frontend to communicate with the backend
* JWT stored in a session cache
* Backend to cache db content which is in additional to the initial request from the frontend but is in relation to the data
* Etc.

# FUTURE
## ARCHITECTURE (proposed):

`not limited to the following list and loads more to flesh out`

- [ ] Micro-service driven architecture
  - [ ] Served over HTTPS with SSL certificates
  - HTTP/2 seems widely accepted and might be something to keep in mind
- [ ] Front-end application
  - stand alone application
  - communicates to the back-end via a restful API
  - JWT used for authenication
  - understanding the deployment pipeline
    - module loading, mixins, etc.
  - understand what are our requirements
  - proposed frameworks:
    - Elm
    - React
    - Scala.js
- [ ] Back-end application
  - stand alone application
  - refer to below 'API structure'
  - web framework
    - Similar questions to the above for the front-end
  - proposed languages:
    - Python
    - Scala
    - Go
    - Elixir
- [ ] Database service
  - Traditional RDBMS SQL
  - Big Data NoSQL DB
- [ ] Caching service
  - shared between the back-end and front-end
  - to store the JWT for state checking on the session
  - can be used as an alternative to Indexed DB to store session work
  - Cache data served by the backend for when the frontend really needs it
    - performance and UX improvements
    - reducing how often we make requests to the API and the Database
  - solutions:
    - Memcache
    - Redis
- [ ] Load balancing service
  - to help with balance the load on our API
  - solution:
    - nginx or similar
- [ ] NLP service (real-time and post-processing offerings)
  - Secure web-socket connection with frontend for NLP “real-time” processing
- [ ] Offline service offering
- [ ] Docker
  - For development and deployment
  - deployment:
    - makes it easier to deploy or ship already packaged and tested applications
    - spin up a tested application when required depending on load
- [ ] AWS platform
- [ ] TravisCI CI/CD platform
- [ ] Environments:
  - development
  - testing
  - like-live
  - production
- [ ] Testing pipeline for CI/CD performance and quality improvements
  - cache test results
  - skip testing when no changes
  - web the code flow to prevent depreciation
  - requires a lot of fleshing out to understand what I mean
- [ ] Data pipeline service for NLP
# Project structure goal:
##### Git will be used with Github or Gitlab (I really like Gitlab)
Kiroku main but with the change that Kiroku would be the main git repo with:
* Frontend
* Backend
* nlp

each with their own repos.

# Proposed database design with ORM for the transaction data:

Postgres or similar RDBMS

Database migration script to manage amendments to the database
##### (example):
`tables:`
* user
* business
* client
* note

each table will be indexed with foreign-key relationships will be used as follows:

* user has a ‘one-to-one’ relationship with business
* business has a ‘many-to-many’ relationship with client
* client has a ‘one-to-many’ relationship with note

`benefit:`

When a request is made to the database we can easily prefetch all related content to an user accounts.

With this setup, we can also fetch the data in sub-sections. This setup allows for better reporting.


# API structure:
* Hybrid of RestFul and 'always serviced' API
* HEASTO type
* Required JWT and an API_KEY for the front-end to send with each request
* POST, GET, PUT, DELETE, PATCH supported (proper HTTP request methods)


## Further reading:
* podcast [Scala at Duolingo with Andre Kenji Horie](https://softwareengineeringdaily.com/2017/12/14/scala-at-duolingo-with-andre-kenji-horie/)
* architecture [Rewriting Duolingo's engine in Scala](http://making.duolingo.com/rewriting-duolingos-engine-in-scala)
* podcast [evaluate web framework](https://devchat.tv/js-jabber/jsj-302-evaluating-web-frameworks-kitson-kelly)
* article [event-driven api](https://nordicapis.com/5-protocols-for-event-driven-api-architectures/)
* links [numerous](https://github.com/theydonthaveit/kiroku/tree/develop)