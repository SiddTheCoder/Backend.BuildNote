import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()


// Get the CORS origin from environment variable and remove trailing slashes
const corsOrigin = process.env.CORS_ORIGIN? process.env.CORS_ORIGIN.replace(/\/$/, '') : '*';

// ✅ CORS middleware
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Explicitly handle preflight requests
app.options('*', cors());

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(cookieParser())


//import routes
import userRoutes from './routes/user.routes.js'
import collectionRoutes from './routes/collection.routes.js'
import todoRoutes from './routes/todo.routes.js'
import authVerify from './routes/auth.routes.js'
import express from "express";
import healthRoutes from "./routes/health.route.js";





//use routes
app.use('/api/user', userRoutes)
app.use('/api/c', collectionRoutes)
app.use('/api/t', todoRoutes)

app.use('/api/auth', authVerify)

app.use("/health", healthRoutes); // Will respond to /health/ping

// //secured-routing endpoints for frontend
// app.get('/api/auth/verify', verifyJWT, (req, res) => {
//   // If the user reaches here, their token is valid
//   res.status(200).send('Authenticated');
// });

export default app