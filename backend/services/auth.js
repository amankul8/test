const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUNDS = 10;

module.exports = {
    async register(email, password) {
        try {

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return {
                    success: false,
                    message: 'Email already in use',
                    data: null
                };
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const newUser = new User({
                email,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            return {
                success: true,
                message: 'Registration successful',
                data: { id: savedUser._id, email: savedUser.email }
            };
        } catch (err) {
            return {
                success: false,
                message: 'Internal server error',
                data: null
            };

        }
    },

    async login(email, password) {
        try {
        const user = await User.findOne({ email });

        if (!user) {
            return {
                success: false,
                message: 'User not found',
                data: {}
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return {
                success: false,
                message: 'Invalid password',
                data: {}
            };
        }

        const { password: _, ...userWithoutPassword } = user.toObject();

            return {
                success: true,
                message: 'Login successful',
                data: userWithoutPassword
            };
        } catch (err) {
        console.error('❌ MongoDB error during login:', err);
            return {
                success: false,
                message: 'Internal server error',
                data: null
            };
        }
    },

    async generateToken(user) {

        const SECRET_KEY  = process.env.JWT_SECRET_KEY;

        return await jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
    }


};