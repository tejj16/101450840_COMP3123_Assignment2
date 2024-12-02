const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); 
const routes = express.Router();

// User signup
routes.post('/signup', async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save(); // Fixed missing `await`
        res.status(201).send({
            message: 'User created successfully',
            user: { username: savedUser.username, email: savedUser.email } // Minimal data returned
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.post('/login', async (req, res) => {
    const { username, password } = req.body;  // Use req.body for POST request

    try {
        // Find user by username or email
        const user = await UserModel.findOne({ $or: [{ username: username }, { email: username }] });

        if (user) {
            // Compare the hashed password in the database with the plain-text password provided
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                console.log("USER LOGGED IN: " + user);
                res.send({
                    status: true,
                    message: "Login successful",
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Invalid Username and/or password'
                });
            }
        } else {
            res.status(400).send({
                status: false,
                message: 'Invalid Username and/or password'
            });
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = routes;


