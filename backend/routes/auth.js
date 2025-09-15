import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const router = express.Router();

//validation for sign up
const validateSignUpData = (data) => {
    const { username, email, password } = data;

    if(!username || username.trim().length < 2) {
        return 'Username must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
        return 'Valid email address required';
    }

    if(!password || password.length < 8 || password.length > 12){
        return 'Password must be between 8 and 12 characters';
    }

    return null;
};

//sign up route
router.post('/signup', async(req, res) => {
    try{
        const { username, email, password } = req.body;

        //server-side validation
        const validationError = validateSignUpData(req.body);
        if(validationError){
            return res.status(400).json({ message: validationError });
        }

        //check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if(existingUser){
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        //create user
        const newUser = new User({
            username, 
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        await newUser.save();

        //generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        //send response (no password!)
        res.status(201).json({
            message: 'Account created successfully!',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });
    } catch(error) {
        console.log('Registration error:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
});


//sign in route
router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;

        //validate input
        if(!email || !password){
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        //find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        //check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        //generate JWT token 
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        //send response (no password)
        res.status(200).json({
            message: 'Sign in successful',
            token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error){
        console.log('Login error: ', error);
        res.status(500).json({ message: 'Server error occurred' });
    }

});

export default router;