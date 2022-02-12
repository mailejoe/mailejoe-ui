# Mailejoe

This is the frontend framework used for the Mailejoe. It is React 17.x and heavily focused
towards integration tests.

## Development Setup

- Node 10.x+
- NPM 6.x+

### Installing Dependencies

```
npm install
```

### Running the Application

```
cross-env REACT_APP_API_URL=http://localhost:8000 npm run start
```

If you want to run without the API running, you can launch a mock API locally to test the UI against.

In a separate terminal launch the webserver locally by running:

```
node backend/mock-server.js
```

You can modify backend/db.json to add more content or change content for testing purposes.

### Running with the API

To run the API along with the UI, first modify .env.development and change IS_LOCAL to "false".

## Deployments

All deployments are done via CircleCI integration.

The configuration setup for CircleCI is commits to the `develop` branch will be deployed to a Dev environment,
commits to `release*` AND `hot-fix*` will be deployed to staging environment, and commits to `master` will be deployed
to a production environment.

NOTE: For security purposes the Access Keys/Secrets above should be manually rotated on a 30 day
interval by an administrator.

## Testing

TODO
