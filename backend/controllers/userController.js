import express from "express";
import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

    // res.send('auth user')
});

//@desc Register user
//@route POST /api/users/login
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
    // res.send('register user')
});

//@desc Logout user / clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    // res.send('logout user')
    res.status(200).json({message: 'Logged out successfully'})
});

//@desc get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Invalid user data')
    }

    // res.send('get user profile')
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

//@desc get users 
//@route GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

//@desc get users 
//@route GET /api/users
//@access Private/admin/:id
const getUsersByID = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if(user) {
        return res.json(user);
    } else {
        res.status(404)
        throw new Error('User not found')
}
})

//@desc Delete users 
//@route DELETE /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({_id: user._id});
        res.status(200).json({message: "User deleted successfully!"})
    } else {
        res.status(404)
        throw new Error('User not found!');
    }
});

//@desc Update users 
//@route PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
    const {name, email, isAdmin} = req.body;

    const user = await User.findById(req.params.id);

    if (user) {
        user.name = name;
        user.email = email;
        user.isAdmin = isAdmin;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404)
        throw new Error('User not found!');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUsersByID,
    updateUser
}





