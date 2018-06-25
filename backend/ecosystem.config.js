module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'REST-API',
      script: 'services/rest-api.js',
      instances: 5,
      env_production: {
        NODE_ENV: 'production',
      },
    }, {
      name: 'SUBSCRIBER',
      script: 'services/subscriber.js',
      instances: 3,
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
