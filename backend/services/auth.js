const SQLite = require('../db/sqlite');
const bcrypt = require('bcrypt');
const helpers = require('../utils/helpers');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

module.exports = {
    async register(email, password) {
        try {
            const db = SQLite.getInstance().db;

            const checkSql = `SELECT * FROM users WHERE email = ?`;
            const existingUser = await new Promise((resolve, reject) => {
                db.get(checkSql, [email], (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
            });

            if (existingUser) {
                return { success: false, message: 'Email already in use', data: null };
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const insertSql = `INSERT INTO users (email, password) VALUES (?, ?)`;
            const result = await new Promise((resolve, reject) => {
                db.run(insertSql, [email, hashedPassword], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ id: this.lastID });
                });
            });

            return {
                success: true,
                message: 'Registration successful',
                data: result
            };
        } catch (err) {
            console.error('❌ DB error during registration:', err);
            return { success: false, message: 'Internal server error', data: null };
        }
    },

    async login(email, password) {

        const db = SQLite.getInstance().db;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await helpers.sqlExecuteHelper(
            db,
            "SELECT * FROM users WHERE email = ?",
            [email],
        )

        if(!user) {
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
                message: "Password is invalid",
                data: {},
            };
        }

        const { password: _, ...userWithoutPassword } = user;

        return {
            success: true,
            message: "Successful",
            data: userWithoutPassword,
        };
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