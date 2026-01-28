require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

// Import database and middleware
const prisma = require('./db');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const apiKeyMiddleware = require('./middleware/apiKey');

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const fileRoutes = require('./routes/files');
const ecommerceRoutes = require('./routes/ecommerce');
const emailRoutes = require('./routes/email');
const chatRoutes = require('./routes/chat');
const socialRoutes = require('./routes/social');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');
const mongoRoutes = require('./routes/mongo');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for now to avoid blocking resources
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Body parser and cookie parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression
app.use(compression());

// Logger
app.use(morgan('dev'));

// MongoDB Test Route (Public)
app.use('/api', mongoRoutes);

// Apply API Key security to all API routes
app.use('/api', apiKeyMiddleware);

// Rate limiting for all API routes
app.use('/api', apiLimiter);

// Swagger Documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nexus API',
      version: '2.0.0',
      description: 'API Documentation for Nexus Project',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => {
  res.json({
    message: 'Nexus API is running...',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// API Routes with specific rate limiters
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/products', ecommerceRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 handler
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start Server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Nexus Server Running                  ║
║   📍 Port: ${PORT}                           ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}            ║
║   🔒 Security: Enhanced                   ║
║   🗄️  Database: Connected                   ║
╚═══════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
  }
});

