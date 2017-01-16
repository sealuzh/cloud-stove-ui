# The Cloud Stove Front End

[![wercker status](https://app.wercker.com/status/b45c53af564143d46d25dc45aaa3dfe4/s/master "wercker status")](https://app.wercker.com/project/bykey/b45c53af564143d46d25dc45aaa3dfe4)

The Cloud Stove gives users deployment recommendations for their cloud
applications. Application instances are derived from generic blueprints and
enriched with the specific characteristics and requirements of the application
to be deployed. Blueprints are generic application scaffolds that represent
different application architectures to capture relevant differences in overall
deployment strategies. Deployment recommendations are created by optimizing the
use of available provider offerings with respect to the captured application
specifications and requirements.

Backend: <https://github.com/inz/cloud-stove>

## Contributing

Want to contribute to the Cloud Stove? Awesome! Please check out the [contribution guide](./CONTRIBUTING.md) for details.

## CI & Deployment

### The Public Cloud Stove

Every push to the GitHub repository will initiate a build on [wercker](https://app.wercker.com/#applications/573436394cb4918106077ad1). The current status of our CI builds (for all branches) is shown below.

[![wercker status](https://app.wercker.com/status/b45c53af564143d46d25dc45aaa3dfe4/m "wercker status")](https://app.wercker.com/project/bykey/b45c53af564143d46d25dc45aaa3dfe4)

Successful CI builds are then deployed to a [Heroku pipeline](https://dashboard.heroku.com/pipelines/53240f69-dd6a-4fd5-ad6e-a831d718dd42) with a staging application at <https://staging.frontend.thestove.io>. To inspect and modify the staging app's configuration use the [application dashboard](https://dashboard.heroku.com/apps/serene-garden-85460).

#### Self-hosted Deployment

The recommended way to deploy Cloud Stove is with [Heroku](https://heroku.com). You can deploy the app using their `free` dynos and the free PostgreSQL plan for test installations. For production deployments, you should move to paid dynos to prevent your application from sleeping once your free dyno hours are spent.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Make sure to set the `API_URL` config variable for your app to a running backend instance, e.g.:

    heroku config:set API_URL=https://api.thestove.io

This would set the public Cloud Stove backend as API endpoint for your frontend installation. While this might be suitable for front end-only development, note that you will not be able to log in with an admin user.

## Communication & Organization

Planning and development of the Cloud Stove is coordinated using GitHub [issues](https://github.com/inz/cloud-stove-ui/issues), [milestones](https://github.com/inz/cloud-stove-ui/milestones), and [pull requests](https://github.com/inz/cloud-stove-ui/pulls). 

In the [Cloud Stove Roadmap](https://github.com/inz/cloud-stove/wiki/Roadmap) we discuss upcoming features for both, the backend and the frontend, and define milestones and issues to implement them.

Daily communication and coordination happens on [Slack](https://slack.thestove.io).


