require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  sentryDns: process.env.SENTRY_DNS,
  sentryId: process.env.SENTRY_ID,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbCollections: {
    users: 'usersCSV',
    orders: 'orders',
    exams: 'exams',
  },
};

module.exports = { config };
