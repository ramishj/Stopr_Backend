"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const zod_1 = require("zod");
const User_1 = __importDefault(require("./models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth_1 = require("./jwtAuth");
const bcrypt = require('bcryptjs');
// Define Zod schemas for input validation
const loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
const registerSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    mobileNumber: zod_1.z.string().min(10).max(10),
    country: zod_1.z.string()
});
const login = async (req, res) => {
    try {
        console.log("Login Hit");
        // Validate request body against login schema
        const { username, password } = loginSchema.parse(req.body);
        // Check if all fields are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the user exists
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtAuth_1.JWT_SECRET, { expiresIn: '1d' });
        // Return user data or authentication token
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.error('Login error:', error);
        if (error instanceof zod_1.z.ZodError) {
            // Handle validation error
            res.status(400).json({ message: 'Invalid input', details: error.errors });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        // Validate request body against register schema
        console.log("Register Hit");
        const { firstName, username, email, password, mobileNumber, country } = registerSchema.parse(req.body);
        // Check if all fields are provided
        if (!firstName || !username || !email || !password || !mobileNumber || !country) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the username or email already exists
        const existingUser = await User_1.default.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
        // Create new user with hashed password and default watchlist
        const newUser = new User_1.default({
            firstName,
            username,
            email,
            password: hashedPassword,
            mobileNumber,
            country,
            watchlist: [{ name: 'default', symbols: [] }] // Add default watchlist
        });
        // Save user to the database
        await newUser.save();
        // Return success response
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Registration error:', error);
        if (error instanceof zod_1.z.ZodError) {
            // Handle validation error
            res.status(400).json({ message: 'Invalid input', details: error.errors });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.register = register;
//# sourceMappingURL=authController.js.map