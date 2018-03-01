# kiroku-simple
simple flask-react app - building blocks for major kiroku repo

## REACT

The React element of this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Available Scripts

In the project directory, you can run:

### `yarn is a possible substitute for npm`

### `npm install`

Installs all dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## FLASK

### Considerations

### Possible frameworks:
`Quart, Falcon, Hug`

# FUTURE

## Possible technologies:
`Elm`

`Go or Elixir or Scala`

`PostgreSQL`

`NoSQL or Graph`
https://www.slideshare.net/lyonwj/natural-language-processing-with-graph-databases-and-neo4j

`AWS`

`Docker`

## Further reading:



Proposed architecture
Elm Go PSQL TravisCI Python or Scala or Haskell Rust Cassandra or Hadoop

Current tech proposed architecture:
Frontend with React
Standalone application
Servicing it's own build test and deploy pipeline
Could be dockerized
Using bable and webpack for configuration
Redux or similar for statement management and management of JWT

Backend with python
Standalone application served as a restful API via Flask SQLAlchemy JWT and modules and frameworks
Modularised
Models to manage database interactions
Register and login routes are not managed under before hooks with authentication
All other routes require a JWT

Some in-memory service to store JWT for user sessions.

Frontend app has an unique api key which allows it to make initial and all requests. This is in addition to the JWT which is created for user sessions.

User APP flow:

User registers
Supplying required details on form
If details are fine:
Detials are sent to the backend

If details are new:
Backend adds details to the database
Generate a JWT
Respond with a JWT
Else:
Deny and ask for new details

Front-end receives JWT and can now make further requests to the API

JWT stored on in-memory database servicing both the front and back end

The in-memory database only communicates with programmes serviced on specific ports

Use Case:
User navigates to a page which requires additional content not served to the front-end by the backend.

Frontend makes a request to the backend with the JWT.

Backend validates the JWT via decoding and checking the users id. Backend also looks up the JWT on the in-memory system to note the state of the user. Logged-in etc.

Backend is happy and retrieves the content required. Depending on the data required the backend might prefetch additional pending data and cache this on a websocket to serve later to the front-end if requested. I.e. we present a list of notes but the actual content of the notes are cached. When the user selects a particular note to view complete details, the backend will serve up the cache content for this note.

When a note is taken we have 2 options.
Store on the local web db in case connection drops
And to open up a websocket as soon as the user starts taking notes

Allow for offline recording and post processing