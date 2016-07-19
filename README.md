# The Cloud Stove Frontend

[![wercker status](https://app.wercker.com/status/b45c53af564143d46d25dc45aaa3dfe4/s/master "wercker status")](https://app.wercker.com/project/bykey/b45c53af564143d46d25dc45aaa3dfe4)

The Cloud Stove gives users deployment recommendations for their cloud
applications. Application instances are derived from generic blueprints and
enriched with the specific characteristics and requirements of the application
to be deployed. Blueprints are generic application scaffolds that represent
different application architectures to capture relevant differences in overall
deployment strategies. Deployment recommendations are created by optimizing the
use of available provider offerings with respect to the captured application
specifications and requirements.

## Setting Up a Development Environment

* Clone the Cloud Stove Frontend repository
  
  ```
  git clone git@github.com:inz/cloud-stove-ui.git
  ```
    
* Install Node (https://nodejs.org/).

* Run the test suite to see if everything works:
  
  ```
  npm run test
  ```

## Making Changes

See the [contribution guide](./CONTRIBUTING.md).

## CI & Deployment

Every push to the GitHub repository will initiate a build on [wercker](https://app.wercker.com/#applications/573436394cb4918106077ad1). The current status of our CI builds (for all branches) is shown below.

[![wercker status](https://app.wercker.com/status/b45c53af564143d46d25dc45aaa3dfe4/m "wercker status")](https://app.wercker.com/project/bykey/b45c53af564143d46d25dc45aaa3dfe4)

Successful CI builds are then deployed to a [Heroku pipeline](https://dashboard.heroku.com/pipelines/53240f69-dd6a-4fd5-ad6e-a831d718dd42) with a staging application at https://staging.frontend.thestove.io. To inspect and modify the staging app's configuration use the [application dashboard](https://dashboard.heroku.com/apps/serene-garden-85460).

## Communication & Organization

Planning and development of the Cloud Stove is coordinated using GitHub [issues](https://github.com/inz/cloud-stove-ui/issues), [milestones](https://github.com/inz/cloud-stove-ui/milestones), and [pull requests](https://github.com/inz/cloud-stove-ui/pulls). 

In the [Cloud Stove Roadmap](https://github.com/inz/cloud-stove/wiki/Roadmap) we discuss upcoming features for both, the backend and the frontend, and define milestones and issues to implement them.

Daily communication and coordination happens on Slack:

* in `#cloud-stove` on https://cloudguysseal.slack.com

If you don't have access to any of the resources mentioned above, get in touch
with [Christian](mailto:christian@thestove.io).


