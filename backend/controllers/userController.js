const asyncHandler = require('express-async-handler');
const express = require('express')
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');
const refresh = require('./refreshController')
const mongoose = require("mongoose");



// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


exports.getAllUser = asyncHandler(async (req, res) => {

    const user = await User.find();
    console.log(user);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }
  });
  

  // @desc    Update user information
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
    const { name, email, type,balance } = req.body;
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      // Update the user information
      user.name = name || user.name;
      user.email = email || user.email;
      user.type = type || user.type;
      user.balance = balance || user.balance;
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  exports.updateBalance = asyncHandler(async (req, res) => {
    const { id, balance } = req.params;
    
    try {
      const user = await User.findById(id);
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      // Update the user information
      user.balance = user.balance - balance;
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  
  
  
  


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {res.status(401).json({message:"Wrong email"})}
   
   
    if (!await user.matchPassword(password)) {
        res.status(401).json({message:"Wrong password"})
    } 

    let refreshToken = await refresh.createToken(user);
    const accessToken = generateToken(user._id);

    res.status(200).cookie('accessToken', accessToken, {
        domain:'localhost:3000',
        sameSite: 'none',
        httpOnly: true,
     
    })
    .cookie('refreshToken', refreshToken, {
        domain: 'localhost:3000',
            sameSite: 'none',
            httpOnly: true,
           
        })
    .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: accessToken,
        refreshToken: refreshToken,
        photo:user.photo,
        balance: user.balance,
        isAdmin: user.type === 'admin',
        isStaff: user.type === 'staff',
    });

    
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({message:"User exists"});
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        type: 'user',
        balance: 100,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            balance: user.balance,
            token: generateToken(user._id),
         
        });
    } else {
        res.status(400).json({ message: "Invalid user data" })
        throw new Error('Invalid user data');
    }
});



