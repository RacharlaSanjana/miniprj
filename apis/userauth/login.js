const express = require('express');
const User = require('../../models/users');

const login = async (req, res) => {
    let u_name = req.body.u_name;
    let upwd = req.body.upwd;

    try {
        // Find the user with the given credentials
        const user = await User.findOne({ u_name, upwd });

        if (user) {
            // If user is found, authentication is successful
            res.json({ 'auth': 'success', 'user': u_name });
        } else {
            // If user is not found, authentication fails
            res.json({ 'auth': 'failed' });
        }
        console.log('Auth response sent');
    } catch (err) {
        console.log('Error in authentication:', err);
        res.json({ 'auth': 'failed', 'message': err.message });
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
            return res.status(404).send({ message: 'User already present' });
        }

        // Save new user
        const savedUser = await useritem.save();
        console.log('User inserted');
        res.status(201).send(savedUser);

    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ error: 'An error occurred while inserting the user' });
    }
};
//update user details
const update_user = async (req, res) => {
    let u_id = req.body.u_id
    const user = {
        u_name: req.body.u_name,
        u_pwd: req.body.u_pwd,
        u_email:req.body.u_email,
        u_addr:req.body.u_addr,
        u_contact:req.body.u_contact
    }
    try {
        const updateUser = await User.updateOne(
            { u_id }, user
        )
        if (updateUser.modifiedCount != 0) {
            console.log('User Details Updated', updateUser)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('User details not updated')
            res.send({ 'update': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
};
//delete user
const delete_user = async (req, res) => {
    let u_id = req.body.u_id;
    try {
        const deleteduser = await User.deleteOne({ u_id });
        if (deleteduser.deletedCount != 0) {
            console.log('User Deleted');
            res.send({ 'delete': 'success' });
        } else {
            console.log('User Not deleted');
            res.send({ 'delete': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    login,
    insertUser,
    update_user,
    delete_user
};
