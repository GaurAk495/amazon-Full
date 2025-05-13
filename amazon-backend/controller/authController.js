import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found. Please sign up first.' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // Sign JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.name },
            process.env.JWT_SECRET, // Make sure this is set in your environment variables
            { expiresIn: '24h' }
        );

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { userId: user._id, username: user.name, email: user.email } // Optional: send user info
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Optional: Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        const hashpwd = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashpwd });
        await user.save(); // Save the user to the database

        res.status(201).json({ success: true, message: 'Account Created Successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const logStatus = async (req, res) => {
    res.json({ success: true, message: 'user is valid', user: req.user })
}

export { login, signup, logStatus }