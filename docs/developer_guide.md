<!--
# @title Cloud Stove UI Developer Guide
-->
# Cloud Stove UI Developer Guide
The Cloud Stove currently consists of two main components: The backend API implemented using Ruby on Rails and the front end application implemented using AngularJS. This document should provide you with enough information to correctly set up the front end application, in order to extend its features. 

## Overview
The front end is written entirely using the framework [Angular 2](https://angular.io/) and in [TypeScript](typescriptlang.org). If you find yourself unfamiliar with either of these two, the fastest way to get a grasp of the concepts is by following the excellent [Learning Angular](https://angular.io/docs/ts/latest/guide/learning-angular.html) section of the official documentation. The Cloud Stove project is heavily inspired by the official samples provided by Google in its structure and tool usage.

### QuickStart
To get up and running as quick as possible, simply:

* Have `npm > 3` and `node > 5` installed on your system, visit [NodeJS](https://nodejs.org/) otherwise.
* `git clone git@github.com:inz/cloud-stove-ui.git && cd cloud-stove-ui` to clone the project.
* `npm install` to install all necessary dependencies.
* `npm start` to start the development server.

You can now start adding additional features, fixing bugs etc. The front end is configured that it automatically connects to the Cloud Stove back end on its default port. Live and hot reloading is enabled by default, and you do not have to restart the server after making changes.

### Structure, Configuration and important Files
The project is structured as follows:

* [docs](https://github.com/inz/cloud-stove-ui/tree/master/docs)

   Contains the documentation you are currently reading ;)

* [server](https://github.com/inz/cloud-stove-ui/tree/master/server)

   A basic [ExpressJS](https://expressjs.com) server to serve the static contents of the front end, when compiled and deployed in production. You can also use any kind of webserver that is able to statically serve files to fulfill this task. The provided server is used when deploying the front end as Docker container.

* [src](https://github.com/inz/cloud-stove-ui/tree/master/src)
   * [app](https://github.com/inz/cloud-stove-ui/tree/master/app)

      Contains all of the application code of the Cloud Stove front end.

   * [public](https://github.com/inz/cloud-stove-ui/tree/master/public)

      Contains all resources such as images and additional font files (icons) that are used by the front end.

   * [style](https://github.com/inz/cloud-stove-ui/tree/master/style)

      Contains application-wide `.scss` files to declare styles. Also embeds Bootstrap.

* [Procfile](https://github.com/inz/cloud-stove-ui/blob/master/Procfile), [app.json](https://github.com/inz/cloud-stove-ui/blob/master/app.json)

   Enables deployment on [Heroku](https://www.heroku.com/) and manages its configuration.

* [karma-shim.js](https://github.com/inz/cloud-stove-ui/blob/master/karma-shim.js), [karma.conf.js](https://github.com/inz/cloud-stove-ui/blob/master/karma-shim.js)

   Enables Unit-Testing using Karma.

* [protractor.conf.js](https://github.com/inz/cloud-stove-ui/blob/master/protractor.conf.js)

   Enables E2E using Protractor. By default, this project tests against Chrome. You can change this setting by overriding `{'browserName': 'chrome'}` in this file to your liking.

* [tsconfig.json](https://github.com/inz/cloud-stove-ui/blob/master/tsconfig.json), [tslint.json](https://github.com/inz/cloud-stove-ui/blob/master/tslint.json), [typedoc.json](https://github.com/inz/cloud-stove-ui/blob/master/typedoc.json)

   Configuration for various TypeScript-settings and linter settings. The `tslint` is mostly following Googles standard for Angular projects using TypeScript.

* [webpack.config.js](https://github.com/inz/cloud-stove-ui/blob/master/webpack.config.js)

   Config file for the [webpack](https://webpack.github.io/) module bundler. More information about the specific configuration can be found in the file itself. Most likely, you won't have to change it unless a new type of file should be included in the project or an update is necessary.

* [wercker.yml](https://github.com/inz/cloud-stove-ui/blob/master/wercker.yml)

   Wercker build file that specifies how this project is built using the CI infrastructre of [wercker](https://www.wercker.com/).

## Modules
The project is organized in [modules](https://angular.io/docs/ts/latest/guide/ngmodule.html) that help organize the application into blocks of functionality. Each folder in `src/app` usually contains a `.module.ts` file that specifies the module, its dependencies and its exports. Thus, functionality can be built in building blocks and be reused easily. To get a grasp what belongs into the same module, check out the [FAQ](https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-module-recommendations) from the Angular Team.

## Build
In order to deploy The Cloud Stove front end in production, you have a number of options.

### NodeJS
Use `npm run build` to generate all static assets for production. You can start the supplied express server using `npm run production`.

### Docker
Build the image on your machine using `docker build`, and start the container afterwards with your parameters of choice. Make sure to set the environment variables `API_URL` and/or `PORT` (defaults to 80) to your specific needs.

### Heroku
Make sure to set the `API_URL` config variable for your app to a running backend instance, e.g.:

    heroku config:set API_URL=https://api.thestove.io

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Tests
You can execute tests for the front end using one of two `npm` shortcuts.

* `npm run test` to execute unit tests
* `npm run e2e` to execute E2E tests

When running E2E tests, make sure that the front end AND the Cloud Stove back end is currently up and running on your local device using `npm start`.