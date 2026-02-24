import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const sign_up = async (req, res) => {
    const {name, email, role, password, phone} = req.body;
    if(!name || !email || !role) return res.status(400).json({message: "Missing required fields"});

    const existingUser = await User.findByEmail(email);

    if (existingUser) return res.status(400).json({message: "Email has already registered"});
    
    const salt = await bcrypt.genSalt(10);
    const password_hash =await bcrypt.hash(password, salt);
    User.create({
        name,
        email,
        role: role ?? 'customer',
        password_hash,
        phone
    });
    
    res.status(200).json({message: "Registed successfully"});
}

export const log_in = async (req,res) => {
    const {email, password} = req.body;
    console.log(email, password);
    if (!email || !password) return res.status(400).json({message: 'Email or Password cannot be blank!'});
    const user = await User.findByEmail(email);
    const auth = await User.authenticate(user,password);
    if (auth) {
        const token = jwt.sign(
            {user_id: user.user_id, role: user.role}, 
            process.env.SECRET_KEY,
            {expiresIn: '12h'}
        );
        res.status(200).json({
            message: "Successfully logged in", 
            token, 
            user_id: user.user_id,
            role: user.role
        });
    }else res.status(400).json({message: "Email or Password is incorrect"})
}
