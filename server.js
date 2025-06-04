const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const letterRoutes = require('./routes/letter');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/timeL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', authRoutes);
app.use('/api', letterRoutes);

app.listen(3000, () => console.log('Server TIME.L aktif di http://localhost:3000'));
