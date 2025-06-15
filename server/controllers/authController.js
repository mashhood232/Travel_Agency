const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const signup = async (req, res) => {
  const { name, email, password, role, agencyDetails } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const newUser = new User({
      name,
      email,
      password, 
      role,
      agencyDetails: role === 'agency' ? agencyDetails : undefined,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful!', token, user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

module.exports = { signup, signin };
