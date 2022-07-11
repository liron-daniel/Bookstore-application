import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';

import environments from '../../config/environments.js';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'First name is required!']
        },
        lastName: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Last name is required!']
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Email is required!'],
            unique: [true, 'Email is already taken'],
            validate (value) {
                if (!isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
            minlength: 8,
            validate (value) {
                if (!isStrongPassword(value)) {
                    throw new Error('Password is not strong enough');
                }
            }
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, environments.TOKEN_SECRET);

    user.tokens.push({token: token});
    
    await user.save();

    return token;
};

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({email: email});
    if (!user) throw new Error('Unable to login');

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) throw new Error('Unable to login');

    return user;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;
    delete userObj.__v;

    return userObj;
}

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ownerID'
});

const User = mongoose.model('User', userSchema);

export default User;