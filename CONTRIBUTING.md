# Contribution Guide

Thank you for your interest in contributing to the Cloud Stove. Please note that the project adheres to the Contributor Covenant [code of conduct](./CODE_OF_CONDUCT.md). By participating in this project you are expected to uphold its terms.

Currently, the Cloud Stove is split across two repositories: the backend Rails app, and the frontend AngularJS application. This guide focuses on the front end AngularJS app.

## Setting Up a Development Environment
Check that you have `npm > 3` and `node > 5` installed on your system, visit [NodeJS](https://nodejs.org/) otherwise.

1. Clone the Cloud Stove Frontend repository
  
  ```shell
  git clone git@github.com:sealuzh/cloud-stove-ui.git
  cd cloud-stove-ui
  ```

2. Install dependencies

  ```shell
  npm install
  ```

3. Start the Webpack Development server

  ```shell
  npm start
  ```
  
  Make sure that your backend installation is running on `http://localhost:3000` or point `API_URL` to a running installation. If you plan to _only_ work on the front end, you _could_ point your local app at the staging (`http://staging.backend.thestove.io/`) or production (`https://api.thestove.io`) backends (keep in mind that you might need to disable the same-origin policy in your browser). 

## Making Changes

* Pick a story from the backlog in the [List of issues](https://github.com/sealuzh/cloud-stove-ui/issues) and assign yourself to it.

* Create a topic branch for your changes.
  
  ```shell
  git checkout -b <feature/my-awesome-feature>
  ```

  Namespaces: `feature/*`, `fix/*`, `hotfix/*`, `support/*`

* Make your change. Add tests for your change. Make the tests pass:
  
  ```shell
  npm run test
  ```
  
  * The wiki has some [troubleshooting tips](https://github.com/sealuzh/cloud-stove/wiki#troubleshooting) if tests fail.

* Make sure that your code always has appropriate test coverage.

* Push your topic branch and [submit a pull request](https://github.com/sealuzh/cloud-stove-ui/compare). To keep our project history clean, always rebase your changes onto master.

You should also periodically push your topic branches during development. That
way, there will always be a reasonably current backup of your work in the
upstream repository, and the whole team can get a feel on what others are
working on.

## Tips and Tricks

* Continuous test execution and live reload:

  ```shell
  npm run test-watch
  ```

  * Automatically runs affected tests on file edit.

* Test Wercker CI build locally

  ```shell
  wercker build
  ```

  * Requires wercker CLI: http://wercker.com/cli/
  * Use `--attach-on-error` to debug failing builds
  * Use `--docker-local` to use locally cached containers