# Making Changes

* Pick a story from the backlog in the [List of issues](https://github.com/inz/cloud-stove-ui/issues) and assign yourself to it

* Create a topic branch for your changes.
  
  ```
  git checkout -b <feature/my-awesome-feature>
  ```

  Namespaces: `feature/*`, `fix/*`, `hotfix/*`, `support/*`

* Make your change. Add tests for your change. Make the tests pass:
  
  ```
  npm run test
  ```
  
  * The wiki has some [troubleshooting tips](https://github.com/inz/cloud-stove/wiki#troubleshooting) if tests fail.

* Make sure that your code always has appropriate test coverage.

* Push your topic branch and [submit a pull request](https://github.com/inz/cloud-stove-ui/compare). To keep our project history clean, always rebase your changes onto master.

You should also periodically push your topic branches during development. That
way, there will always be a reasonably current backup of your work in the
upstream repository, and the whole team can get a feel on what others are
working on.

## Tips and Tricks

* Continuous test execution and live reload:

  ```
  npm run test-watch
  ```

  * Automatically runs affected tests on file edit.

* Test Wercker CI build locally

  ```
  wercker build
  ```

  * Requires wercker CLI: http://wercker.com/cli/
  * Use `--attach-on-error` to debug failing builds
  * Use `--docker-local` to use locally cached containers