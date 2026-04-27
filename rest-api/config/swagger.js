const swaggerJsdoc = require('swagger-jsdoc');
const m2s = require('mongoose-to-swagger');
const { userModel, themeModel, postModel, courtModel, bookingModel } = require('../models');

// Auto-generate schemas from Mongoose models
const generatedSchemas = {
  User: m2s(userModel),
  Theme: m2s(themeModel),
  Post: m2s(postModel),
  Court: m2s(courtModel),
  Booking: m2s(bookingModel),
  // Custom schema for BusySlot (partial of Booking, no user data)
  BusySlot: {
    type: 'object',
    properties: {
      court: {
        type: 'object',
        properties: {
          number: { type: 'number' },
          type: { type: 'string' },
        },
      },
      date: { type: 'string', format: 'date' },
      startTime: { type: 'string' },
      endTime: { type: 'string' },
    },
  },
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Angular SoftUni project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth-cookie',
        },
      },
      schemas: generatedSchemas,
    },
    paths: {
      '/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                  required: ['username', 'email', 'password'],
                },
              },
            },
          },
          responses: {
            200: { description: 'User registered successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout user',
          security: [{ cookieAuth: [] }],
          responses: {
            200: { description: 'Logout successful' },
          },
        },
      },
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all users',
          responses: {
            200: { description: 'List of all users' },
          },
        },
      },
      '/users/profile': {
        get: {
          tags: ['Users'],
          summary: 'Get current user profile',
          security: [{ cookieAuth: [] }],
          responses: {
            200: { description: 'User profile data' },
            401: { description: 'Unauthorized' },
          },
        },
        put: {
          tags: ['Users'],
          summary: 'Update user profile',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Profile updated' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/themes': {
        get: {
          tags: ['Themes'],
          summary: 'Get all themes',
          responses: {
            200: { description: 'List of themes' },
          },
        },
        post: {
          tags: ['Themes'],
          summary: 'Create a new theme',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    themeName: { type: 'string', example: 'My New Theme' },
                    postText: { type: 'string', example: 'First post content' },
                  },
                  required: ['themeName', 'postText'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Theme created' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/themes/{themeId}': {
        get: {
          tags: ['Themes'],
          summary: 'Get a specific theme',
          parameters: [
            {
              name: 'themeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Theme data' },
            404: { description: 'Theme not found' },
          },
        },
        post: {
          tags: ['Posts'],
          summary: 'Create a post in a theme',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'themeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    postText: { type: 'string' },
                  },
                  required: ['postText'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Post created' },
            401: { description: 'Unauthorized' },
          },
        },
        put: {
          tags: ['Themes'],
          summary: 'Subscribe to a theme',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'themeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Subscribed successfully' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/themes/{themeId}/posts/{postId}': {
        put: {
          tags: ['Posts'],
          summary: 'Edit a post',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'themeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'postId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    postText: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Post updated' },
            401: { description: 'Unauthorized' },
          },
        },
        delete: {
          tags: ['Posts'],
          summary: 'Delete a post',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'themeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'postId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Post deleted' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/posts': {
        get: {
          tags: ['Posts'],
          summary: 'Get latest posts',
          responses: {
            200: { description: 'List of latest posts' },
          },
        },
      },
      '/likes/{postId}': {
        put: {
          tags: ['Likes'],
          summary: 'Like a post',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'postId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Post liked' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/courts': {
        get: {
          tags: ['Courts'],
          summary: 'Get all courts',
          responses: {
            200: { description: 'List of courts' },
          },
        },
        post: {
          tags: ['Courts'],
          summary: 'Create a new court',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    number: { type: 'number', example: 1 },
                    type: { type: 'string', enum: ['Clay', 'Hard', 'Grass'], example: 'Clay' },
                    isActive: { type: 'boolean', example: true },
                  },
                  required: ['number', 'type', 'isActive'],
                },
              },
            },
          },
          responses: {
            201: { description: 'Court created' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/courts/{courtId}': {
        get: {
          tags: ['Courts'],
          summary: 'Get a specific court',
          parameters: [
            {
              name: 'courtId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Court data' },
            404: { description: 'Court not found' },
          },
        },
        put: {
          tags: ['Courts'],
          summary: 'Update a court',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'courtId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    number: { type: 'number' },
                    type: { type: 'string', enum: ['Clay', 'Hard', 'Grass'] },
                    isActive: { type: 'boolean' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Court updated' },
            401: { description: 'Unauthorized' },
          },
        },
        delete: {
          tags: ['Courts'],
          summary: 'Delete a court',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'courtId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Court deleted' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/bookings': {
        post: {
          tags: ['Bookings'],
          summary: 'Create a new booking',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    court: { type: 'string', description: 'Court ID' },
                    date: { type: 'string', format: 'date', example: '2024-03-15' },
                    startTime: { type: 'string', example: '09:00' },
                    endTime: { type: 'string', example: '10:00' },
                  },
                  required: ['court', 'date', 'startTime', 'endTime'],
                },
              },
            },
          },
          responses: {
            201: { description: 'Booking created' },
            401: { description: 'Unauthorized' },
            409: { description: 'Time slot already booked' },
          },
        },
      },
      '/bookings/busy': {
        get: {
          tags: ['Bookings'],
          summary: 'Get busy slots for a specific date (no personal data)',
          parameters: [
            {
              name: 'date',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'date' },
              example: '2024-03-15',
            },
          ],
          responses: {
            200: {
              description: 'List of busy slots',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BusySlot' },
                  },
                },
              },
            },
            400: { description: 'Date parameter required' },
          },
        },
      },
      '/bookings/admin': {
        get: {
          tags: ['Bookings'],
          summary: 'Get all bookings for a date with full user info (admin only)',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'date',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'date' },
              description: 'Date to get bookings for (YYYY-MM-DD)',
              example: '2024-03-15',
            },
          ],
          responses: {
            200: { description: 'List of bookings with user data' },
            400: { description: 'Date parameter required' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden: Admin access required' },
          },
        },
      },
      '/bookings/my': {
        get: {
          tags: ['Bookings'],
          summary: 'Get current user bookings',
          security: [{ cookieAuth: [] }],
          responses: {
            200: { description: 'List of user bookings' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/bookings/{bookingId}': {
        get: {
          tags: ['Bookings'],
          summary: 'Get a specific booking',
          parameters: [
            {
              name: 'bookingId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Booking data' },
            404: { description: 'Booking not found' },
          },
        },
        put: {
          tags: ['Bookings'],
          summary: 'Update a booking',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'bookingId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    court: { type: 'string' },
                    date: { type: 'string', format: 'date' },
                    startTime: { type: 'string' },
                    endTime: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Booking updated' },
            401: { description: 'Unauthorized' },
            409: { description: 'Time slot already booked' },
          },
        },
        delete: {
          tags: ['Bookings'],
          summary: 'Soft delete a booking',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'bookingId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Booking deleted (soft delete)' },
            401: { description: 'Unauthorized' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
