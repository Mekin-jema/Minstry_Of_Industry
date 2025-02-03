// controllers/authController.js
import Employee from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// User registration
export const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new Employee({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Employee.findOne({ email });
    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};