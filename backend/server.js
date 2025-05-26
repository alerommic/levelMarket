const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const gamesRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/order');

const allowedOrigins = [
  "http://localhost:5173",
  "https://level-market.vercel.app",
  "https://level-market-alerommics-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,    // front
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true                   // para permitir cookies
}));


app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    sameSite: 'none',                     
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true                         
  }
}));
app.use('/', gamesRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', checkoutRoutes);
app.use('/', orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});