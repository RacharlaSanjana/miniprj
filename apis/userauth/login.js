const express = require('express');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'AZMLNKCD'; // Replace with your secret key

const login = async (req, res) => {
    let { u_name, u_pwd } = req.body;

    try {
        // Find the user with the given credentials
        const user = await User.findOne({ u_name, u_pwd });

        if (user) {
            // If user is found, authentication is successful
            // Generate a token
            const token = jwt.sign({ id: user._id, u_name: user.u_name }, JWT_SECRET, { expiresIn: '1h' });

            // Return the token and user details
            res.json({ auth: 'success', token, user: { u_name: user.u_name, u_email: user.u_email } });
        } else {
            // If user is not found, authentication fails
            res.status(401).json({ auth: 'failed', message: 'Invalid credentials' });
        }
        console.log('Auth response sent');
    } catch (err) {
        console.log('Error in authentication:', err);
        res.status(500).json({ auth: 'failed', message: err.message });
    }
};

const insertUser = async (req, res) => {
    const { u_id, u_name, u_pwd, u_email, u_addr, u_contact } = req.body;

    const obj = {
        u_id,
        u_name,
        u_pwd,
        u_email,
        u_addr,
        u_contact
    };

    const useritem = new User(obj);

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ u_email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already present' });
        }

        // Save new user
        const savedUser = await useritem.save();
        console.log('User inserted');
        res.status(201).json(savedUser);

    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while inserting the user' });
    }
};

// Update user details
const update_user = async (req, res) => {
    const { u_id, u_name, u_pwd, u_email, u_addr, u_contact } = req.body;

    const user = {
        u_name,
        u_pwd,
        u_email,
        u_addr,
        u_contact
    };

    try {
        const updateUser = await User.updateOne({ u_id }, user);

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
        const deletedUser = await User.deleteOne({ u_id });

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
