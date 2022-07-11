import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';

import environments from '../../config/environments.js';

const adminSchema = new mongoose.Schema(
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
    }
);

adminSchema.pre('save', async function(next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    next();
});

adminSchema.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({_id: admin._id}, environments.TOKEN_SECRET);

    admin.tokens.push({token: token});
    
    await admin.save();

    return token;
};

adminSchema.statics.findAdminByEmailAndPassword = async (email, password) => {
    const admin = await Admin.findOne({email: email});
    if (!admin) throw new Error('Unable to login');

    const doesPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!doesPasswordMatch) throw new Error('Unable to login');

    return admin;
};

adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObj = admin.toObject();

    delete adminObj.password;
    delete adminObj.tokens;
    delete adminObj.__v;

    return adminObj;
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;