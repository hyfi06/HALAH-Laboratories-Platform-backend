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
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  sendgridApiKey: process.env.MAIL_KEY,
  businessMail: process.env.BUSINESS_MAIL,
  dbCollections: {
    users: 'usersCSV',
    orders: 'orders',
    apiKeys: 'apiKeys',
    exams: 'exams',
    results: 'results',
    messages: 'messages',
  },
  defaultPath: {
    Administrator: '/users',
    Doctor: '/patients',
    Bacteriologist: '/patients',
    Patient: '/tests',
  },
  loginUrl: process.env.LOGIN_URL,
};

module.exports = { config };
