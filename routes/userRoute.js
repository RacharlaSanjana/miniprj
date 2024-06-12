const express = require('express');
const router = express.Router();
const login = require('../apis/userauth/login');

// Route for handling login requests
router.post("/login", login.login)
router.post("/register", login.insertUser)
router.put("/update",login.update_user)
router.delete("/delete",login.delete_user)


module.exports = router;
