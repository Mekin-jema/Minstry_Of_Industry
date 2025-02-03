import { query } from '../db/connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM employee WHERE email = ?';
    const existingUser = await query(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      console.log("User already exists.");
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const insertUserQuery = 'INSERT INTO employee (name, email, password) VALUES (?, ?, ?)';
    const result = await query(insertUserQuery, [name, email, hashedPassword]);

    console.log("User created successfully.");
    res.status(201).json({ message: 'User created successfully', user: { id: result.insertId, name, email } });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const getUserQuery = 'SELECT * FROM employee WHERE email = ?';
    const users = await query(getUserQuery, [email]);

    if (users.length === 0) {
      console.log("User not found.");
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password.");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("Login successful.");
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export { signin, login };
