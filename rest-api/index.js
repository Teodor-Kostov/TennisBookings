global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
// const mongoose = require('mongoose');
const apiRouter = require('./router');
const cors = require('cors');
// const config = require('./config/config');
const { errorHandler } = require('./utils');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const seedDatabase = require('./config/seed');

dbConnector()
  .then(async () => {
    await seedDatabase();
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    app.use(cors({
      origin: config.origin,
      credentials: true
    }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}! Swagger UI: http://localhost:${config.port}/api-docs`));
  })
  .catch(console.error);