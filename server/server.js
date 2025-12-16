const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http'); // Import HTTP
const { Server } = require('socket.io'); // Import Socket.io
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.io with CORS to allow client connection
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"], // Adjust if your frontend port differs
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Make 'io' accessible in routes via req.app.get('io')
app.set('io', io);

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Socket Connection Logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: Listen using 'server', not 'app'
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});