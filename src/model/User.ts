import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

// Define the Message interface and schema
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
});

// Define the User interface and schema
export interface User extends Document {
    username: string;
    email: string;
    password?: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];  // Using Message schema type, not ObjectId
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
    },
    password: {
        type: String,
        required :false,
        // required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required:false
        // required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required :false 
        // required: [true, "Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]  // Subdocument array of MessageSchema
});

// Indexes for faster querying
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

// Method to check if the verification code is still valid
UserSchema.methods.isVerifyCodeValid = function () {
    return this.verifyCodeExpiry > Date.now();
};

// Pre-save hook to hash password if modified
UserSchema.pre('save', async function (next) {
    // Ensure password is hashed only if modified
    if (!this.isModified('password')) return next();
    try {
        // Await the result of the hashing and assign it to this.password
        this.password = await bcrypt.hash(this.password!, 10);
        next();
    } catch (error: any) {
        // Handle error in case hashing fails
        next(error);
    }
});

// Compile and export the User model
const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;