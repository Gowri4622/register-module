const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/users-db'
);

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  status: String,
  activationToken: String,
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'gowrimanimaran0@gmail.com',
      pass: 'ftho irdg nwym wcwe',
  },
});

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).send('Email is already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate activation token
    const activationToken = jwt.sign({ name }, 'a27899fd71aa4e25abba2ef40b3cca2919654d2a78303ee9189458316fdfefc8', { expiresIn: '1h' });

    const user = new User({ name, email, password: hashedPassword, status: 'pending', activationToken });
    await user.save();

    // Send activation email
    const activationLink = `http://localhost:3000/activate/${activationToken}`;
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Activate your account',
      text: `Click the following link to activate your account: ${activationLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send('Registration successful. Check your email to activate your account.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Activation endpoint
app.get('/activate/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'a27899fd71aa4e25abba2ef40b3cca2919654d2a78303ee9189458316fdfefc8');

    // Extract necessary information from the decoded token
    const { email } = decodedToken;

    const user = await User.findOne({ name, activationToken: token });
    if (!user) {
      return res.status(404).send('Invalid activation token');
    }

    user.status = 'activated';
    user.activationToken = '';
    await user.save();

    res.redirect('http://localhost:3000/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.status !== 'activated') {
      return res.status(401).send('Account not activated');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ name }, 'a27899fd71aa4e25abba2ef40b3cca2919654d2a78303ee9189458316fdfefc8', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
