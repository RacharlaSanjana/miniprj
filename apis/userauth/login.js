const express = require('express');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  // Import bcrypt for hashing passwords

// Secret key for JWT
const JWT_SECRET = 'AZMLNKCD'; // Replace with your secret key

// Login route
const login = async (req, res) => {
    const { u_name, u_pwd } = req.body;

    try {
        // Find the user with the given username
        const user = await User.findOne({ u_name });

        if (user && await bcrypt.compare(u_pwd, user.u_pwd)) {  // Compare hashed password
            // Generate a token
            const token = jwt.sign({ id: user._id, u_name: user.u_name }, JWT_SECRET, { expiresIn: '1h' });

            // Return the token and user details
            res.json({ auth: 'success', token, user: { u_name: user.u_name, u_email: user.u_email } });
        } else {
            // If user is not found or passwords do not match
            res.status(401).json({ auth: 'failed', message: 'Invalid credentials' });
        }
        console.log('Auth response sent');
    } catch (err) {
        console.error('Error in authentication:', err);
        res.status(500).json({ auth: 'failed', message: err.message });
    }
};

// Register new user
const insertUser = async (req, res) => {
    const { u_name, u_pwd, u_email, u_addr, u_contact } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ u_email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already present' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(u_pwd, 10);

        // Create a new user
        const useritem = new User({ u_name, u_pwd: hashedPassword, u_email, u_addr, u_contact });

        // Save new user
        const savedUser = await useritem.save();
        console.log('User inserted');
        res.status(201).json({ user: { u_name: savedUser.u_name, u_email: savedUser.u_email }, token: null });

    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while inserting the user' });
    }
};

// Update user details
const update_user = async (req, res) => {
    const { u_id, u_name, u_pwd, u_email, u_addr, u_contact } = req.body;

    // Update user object
    const userUpdates = { u_name, u_email, u_addr, u_contact };

    if (u_pwd) {
        // If a new password is provided, hash it
        userUpdates.u_pwd = await bcrypt.hash(u_pwd, 10);
    }

    try {
        const updateUser = await User.updateOne({ _id: u_id }, userUpdates);

        if (updateUser.modifiedCount !== 0) {
            console.log('User Details Updated', updateUser);
            res.json({ update: 'success' });
        } else {
            console.log('User details not updated');
            res.json({ update: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};

// Delete user
const delete_user = async (req, res) => {
    const { u_id } = req.body;

    try {
        const deletedUser = await User.deleteOne({ _id: u_id });

        if (deletedUser.deletedCount !== 0) {
            console.log('User Deleted');
            res.json({ delete: 'success' });
        } else {
            console.log('User Not deleted');
            res.json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

module.exports = {
    login,
    insertUser,
    update_user,
    delete_user
};
